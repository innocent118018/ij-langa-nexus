import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get auth header
    const authHeader = req.headers.get("authorization") || "";
    const jwt = authHeader.replace("Bearer ", "");
    
    if (!jwt) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - No token provided" }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user from JWT
    const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
    
    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const adminId = userData.user.id;

    // Check if user is admin using user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", adminId)
      .in("role", ["admin", "super_admin", "accountant", "consultant"])
      .single();

    if (roleError || !roleData) {
      console.log("Access denied - not an admin:", adminId);
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }), 
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const targetUserId = formData.get("user_id") as string;
    const documentType = formData.get("document_type") as string || "general";
    const description = formData.get("description") as string || "";

    if (!file || !targetUserId) {
      return new Response(
        JSON.stringify({ error: "Missing file or user_id" }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate target user exists
    const { data: targetUser, error: targetError } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", targetUserId)
      .single();

    if (targetError || !targetUser) {
      return new Response(
        JSON.stringify({ error: "Target user not found" }), 
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate storage path: {user_id}/{timestamp}-{filename}
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `${targetUserId}/${timestamp}-${safeFilename}`;

    // Read file content
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    // Upload to storage using service role
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user-files")
      .upload(storagePath, fileData, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: `Upload failed: ${uploadError.message}` }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert document metadata
    const { data: docData, error: docError } = await supabase
      .from("documents")
      .insert({
        user_id: targetUserId,
        storage_path: storagePath,
        filename: file.name,
        content_type: file.type,
        size: file.size,
        uploaded_by: adminId,
        category: documentType,
        visibility: "private"
      })
      .select()
      .single();

    if (docError) {
      console.error("Document insert error:", docError);
      // Try to clean up uploaded file
      await supabase.storage.from("user-files").remove([storagePath]);
      return new Response(
        JSON.stringify({ error: `Document record failed: ${docError.message}` }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create notification for user
    await supabase
      .from("notifications")
      .insert({
        user_id: targetUserId,
        title: "New Document Uploaded",
        message: `A new document "${file.name}" has been uploaded to your account.`,
        type: "info",
        is_read: false
      });

    // Log admin action
    console.log(`Admin ${adminId} uploaded file for user ${targetUserId}: ${storagePath}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        document: docData,
        message: "File uploaded successfully"
      }), 
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error("Function error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
