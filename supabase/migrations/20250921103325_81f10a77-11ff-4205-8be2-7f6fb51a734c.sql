-- Create tables for system configurations and localizations

-- Table for number/currency formats
CREATE TABLE public.number_formats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  decimal_separator TEXT NOT NULL,
  group_separator TEXT NOT NULL,
  group_sizes INTEGER[] NOT NULL DEFAULT '{3}',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for localizations/currencies
CREATE TABLE public.localizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  locale_code TEXT NOT NULL UNIQUE,
  currency_code TEXT,
  currency_name TEXT,
  currency_symbol TEXT,
  decimal_places INTEGER DEFAULT 2,
  date_format TEXT,
  time_format TEXT,
  configuration JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for translations
CREATE TABLE public.translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language_code TEXT NOT NULL,
  language_name_english TEXT NOT NULL,
  language_name_native TEXT NOT NULL,
  translation_key TEXT NOT NULL,
  translation_value TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(language_code, translation_key)
);

-- Table for system settings
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.number_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.localizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only access
CREATE POLICY "Admins can manage number formats" 
ON public.number_formats FOR ALL
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin']));

CREATE POLICY "Admins can manage localizations" 
ON public.localizations FOR ALL
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin']));

CREATE POLICY "Admins can manage translations" 
ON public.translations FOR ALL
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin']));

CREATE POLICY "Admins can manage system settings" 
ON public.system_settings FOR ALL
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin']));

-- Allow read access for active items to authenticated users
CREATE POLICY "Users can view active number formats" 
ON public.number_formats FOR SELECT
USING (is_default = true OR auth.role() = 'authenticated');

CREATE POLICY "Users can view active localizations" 
ON public.localizations FOR SELECT
USING (is_active = true);

CREATE POLICY "Users can view active translations" 
ON public.translations FOR SELECT
USING (is_active = true);

CREATE POLICY "Users can view active system settings" 
ON public.system_settings FOR SELECT
USING (is_active = true);

-- Create triggers for updated_at
CREATE TRIGGER update_number_formats_updated_at
BEFORE UPDATE ON public.number_formats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_localizations_updated_at
BEFORE UPDATE ON public.localizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
BEFORE UPDATE ON public.translations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default number formats from the uploaded file
INSERT INTO public.number_formats (name, decimal_separator, group_separator, group_sizes, is_default) VALUES
('US/UK Format', '.', ',', '{3}', true),
('European Format', ',', '.', '{3}', false),
('French Format', ',', ' ', '{3}', false),
('Indian Format', '.', ',', '{3,2}', false),
('Custom Format 1', '/', ',', '{3}', false),
('Custom Format 2', '.', ',', '{3,0}', false);