import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LocalizationRequest {
  action: string;
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Authentication failed");
    }

    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData || !['admin', 'super_admin'].includes(userData.role)) {
      throw new Error("Insufficient permissions - Admin access required");
    }

    const { action, data }: LocalizationRequest = await req.json();
    let result;

    switch (action) {
      case 'import-formats':
        // Import number formats from uploaded data
        const formats = data.formats;
        const formatsToInsert = formats.map((format: any, index: number) => ({
          name: `Format ${index + 1}`,
          decimal_separator: format.DecimalSeparator,
          group_separator: format.GroupSeparator,
          group_sizes: format.GroupSizes,
          is_default: index === 0
        }));

        const { data: insertedFormats, error: formatsError } = await supabase
          .from('number_formats')
          .upsert(formatsToInsert, { onConflict: 'name' })
          .select();

        if (formatsError) throw formatsError;
        result = { success: true, inserted: insertedFormats.length };
        break;

      case 'import-localizations':
        // Import localizations data
        const localizations = data.localizations;
        const localizationsToInsert = Object.entries(localizations).map(([localeCode, config]: [string, any]) => ({
          locale_code: localeCode,
          configuration: config,
          currency_code: config.currency?.code || null,
          currency_name: config.currency?.name || null,
          currency_symbol: config.currency?.symbol || null,
          date_format: config.dateFormat || null,
          time_format: config.timeFormat || null,
          is_active: true
        }));

        const { data: insertedLocalizations, error: localizationsError } = await supabase
          .from('localizations')
          .upsert(localizationsToInsert, { onConflict: 'locale_code' })
          .select();

        if (localizationsError) throw localizationsError;
        result = { success: true, inserted: insertedLocalizations.length };
        break;

      case 'import-translations':
        // Import translations data in batches
        const translations = data.translations;
        const translationsToInsert = [];

        for (const [langCode, langData] of Object.entries(translations)) {
          const { EnglishName, NativeName, Strings } = langData as any;
          
          for (const [key, value] of Object.entries(Strings || {})) {
            translationsToInsert.push({
              language_code: langCode,
              language_name_english: EnglishName,
              language_name_native: NativeName,
              translation_key: key,
              translation_value: value as string,
              is_active: true
            });
          }
        }

        // Insert in batches of 1000 to avoid timeout
        const batchSize = 1000;
        let totalInserted = 0;

        for (let i = 0; i < translationsToInsert.length; i += batchSize) {
          const batch = translationsToInsert.slice(i, i + batchSize);
          const { data: batchResult, error: batchError } = await supabase
            .from('translations')
            .upsert(batch, { onConflict: 'language_code,translation_key' })
            .select('id');

          if (batchError) throw batchError;
          totalInserted += batchResult.length;
        }

        result = { success: true, inserted: totalInserted };
        break;

      case 'get-formats':
        const { data: formats, error: getFormatsError } = await supabase
          .from('number_formats')
          .select('*')
          .order('created_at', { ascending: false });

        if (getFormatsError) throw getFormatsError;
        result = formats;
        break;

      case 'get-localizations':
        const { data: localizations, error: getLocalizationsError } = await supabase
          .from('localizations')
          .select('*')
          .order('locale_code');

        if (getLocalizationsError) throw getLocalizationsError;
        result = localizations;
        break;

      case 'get-translations':
        const { language } = data;
        const { data: translations, error: getTranslationsError } = await supabase
          .from('translations')
          .select('*')
          .eq('language_code', language)
          .order('translation_key');

        if (getTranslationsError) throw getTranslationsError;
        result = translations;
        break;

      case 'update-setting':
        const { key, value, description } = data;
        const { data: updatedSetting, error: settingError } = await supabase
          .from('system_settings')
          .upsert({
            setting_key: key,
            setting_value: value,
            description: description
          }, { onConflict: 'setting_key' })
          .select()
          .single();

        if (settingError) throw settingError;
        result = updatedSetting;
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in admin-localization function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);