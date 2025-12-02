import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Admin emails - users with these emails get admin role
const adminEmails = [
  "info@ijlanga.co.za",
  "orders@ijlanga.co.za",
  "noreply@ijlanga.co.za",
  "billings@ijlanga.co.za",
  "admin@ijlanga.co.za",
  "ij.langa11@gmail.com",
  "ij.langa@live.co.za",
  "innocent@ijlanga.co.za",
  "correspondence@ijlanga.co.za",
  "ij.langaitc@consultant.com"
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const record = body.record || body;
    
    console.log("Processing user profile creation for:", record?.email);
    
    if (!record || !record.id || !record.email) {
      console.error("Missing record data:", record);
      return new Response(
        JSON.stringify({ error: "Missing required record data" }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const userId = record.id;
    const email = (record.email || "").toLowerCase().trim();
    const fullName = record.raw_user_meta_data?.full_name || 
                     record.user_metadata?.full_name || 
                     email.split('@')[0];

    // Determine role based on email
    const isAdmin = adminEmails.map(e => e.toLowerCase()).includes(email);
    const role = isAdmin ? 'super_admin' : 'user';

    console.log(`User ${email} assigned role: ${role}`);

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!existingProfile) {
      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ 
          id: userId, 
          full_name: fullName,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
      } else {
        console.log("Profile created successfully");
      }
    }

    // Check if user_roles entry exists
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!existingRole) {
      // Create user_roles entry
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ 
          user_id: userId, 
          role: role as any,
          assigned_at: new Date().toISOString()
        });

      if (roleError) {
        console.error("Role assignment error:", roleError);
      } else {
        console.log("Role assigned successfully:", role);
      }
    }

    // Create placeholder file in storage to ensure user folder exists
    const keepPath = `${userId}/.keep`;
    const dummy = new Blob(["created"]);
    const { error: uploadErr } = await supabase.storage
      .from("user-files")
      .upload(keepPath, dummy, { upsert: false });

    if (uploadErr && !uploadErr.message?.includes("already exists")) {
      console.log("Storage folder creation note:", uploadErr.message);
    } else {
      console.log("Storage folder created or exists");
    }

    return new Response(
      JSON.stringify({ success: true, role, userId }), 
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