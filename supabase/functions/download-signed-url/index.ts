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

    const userId = userData.user.id;

    // Parse request body
    const { documentId, path, bucket = "user-files", expires = 600 } = await req.json();

    if (!documentId && !path) {
      return new Response(
        JSON.stringify({ error: "Missing documentId or path" }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let storagePath = path;
    let canAccess = false;

    // Check if user is admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .in("role", ["admin", "super_admin", "accountant", "consultant"])
      .single();

    const isAdmin = !!roleData;

    // If documentId provided, look up the document
    if (documentId) {
      const { data: doc, error: docError } = await supabase
        .from("documents")
        .select("storage_path, user_id")
        .eq("id", documentId)
        .single();

      if (docError || !doc) {
        return new Response(
          JSON.stringify({ error: "Document not found" }), 
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      storagePath = doc.storage_path;
      
      // Check access: admin or owner
      canAccess = isAdmin || doc.user_id === userId;
    } else {
      // If raw path provided, check ownership via path prefix or admin status
      // Path format: {user_id}/...
      const pathUserId = storagePath.split('/')[0];
      canAccess = isAdmin || pathUserId === userId;
    }

    if (!canAccess) {
      return new Response(
        JSON.stringify({ error: "Forbidden - You don't have access to this file" }), 
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create signed URL using service role
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, expires);

    if (error) {
      console.error("Signed URL error:", error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`User ${userId} (admin: ${isAdmin}) accessed file: ${storagePath}`);

    return new Response(
      JSON.stringify({ 
        url: data.signedUrl, 
        expires,
        path: storagePath
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
