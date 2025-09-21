import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Settings, Globe, MessageSquare, Download } from "lucide-react";
import formats from "@/data/formats.json";

interface NumberFormat {
  id: string;
  name: string;
  decimal_separator: string;
  group_separator: string;
  group_sizes: number[];
  is_default: boolean;
}

interface Localization {
  id: string;
  locale_code: string;
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  date_format: string;
  time_format: string;
  is_active: boolean;
}

interface Translation {
  id: string;
  language_code: string;
  language_name_english: string;
  language_name_native: string;
  translation_key: string;
  translation_value: string;
}

const SystemSettings = () => {
  const [numberFormats, setNumberFormats] = useState<NumberFormat[]>([]);
  const [localizations, setLocalizations] = useState<Localization[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadNumberFormats(),
        loadLocalizations(),
        loadTranslations(selectedLanguage)
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load system settings data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadNumberFormats = async () => {
    const { data, error } = await supabase.functions.invoke('admin-localization', {
      body: { action: 'get-formats' }
    });

    if (error) throw error;
    setNumberFormats(data || []);
  };

  const loadLocalizations = async () => {
    const { data, error } = await supabase.functions.invoke('admin-localization', {
      body: { action: 'get-localizations' }
    });

    if (error) throw error;
    setLocalizations(data || []);
  };

  const loadTranslations = async (language: string) => {
    const { data, error } = await supabase.functions.invoke('admin-localization', {
      body: { action: 'get-translations', data: { language } }
    });

    if (error) throw error;
    setTranslations(data || []);
  };

  const importFormats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('admin-localization', {
        body: { 
          action: 'import-formats', 
          data: { formats } 
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Imported ${data.inserted} number formats`,
      });
      
      await loadNumberFormats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to import formats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const importLocalizations = async (file: File) => {
    try {
      setLoading(true);
      const text = await file.text();
      const data = JSON.parse(text);
      
      const { data: result, error } = await supabase.functions.invoke('admin-localization', {
        body: { 
          action: 'import-localizations', 
          data: { localizations: data } 
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Imported ${result.inserted} localizations`,
      });
      
      await loadLocalizations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to import localizations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const importTranslations = async (file: File) => {
    try {
      setLoading(true);
      const text = await file.text();
      const data = JSON.parse(text);
      
      const { data: result, error } = await supabase.functions.invoke('admin-localization', {
        body: { 
          action: 'import-translations', 
          data: { translations: data } 
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Imported ${result.inserted} translations`,
      });
      
      await loadTranslations(selectedLanguage);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to import translations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Manage localization, translations, and system configurations
          </p>
        </div>
      </div>

      <Tabs defaultValue="formats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formats" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Number Formats
          </TabsTrigger>
          <TabsTrigger value="localizations" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Localizations
          </TabsTrigger>
          <TabsTrigger value="translations" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Translations
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Number Formats</CardTitle>
              <CardDescription>
                Configure how numbers and currencies are displayed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {numberFormats.map((format) => (
                  <div key={format.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{format.name}</h3>
                        {format.is_default && <Badge variant="default">Default</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Decimal: "{format.decimal_separator}" | Group: "{format.group_separator}" | 
                        Sizes: [{format.group_sizes.join(", ")}]
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localizations</CardTitle>
              <CardDescription>
                Manage locale-specific settings and currencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {localizations.map((localization) => (
                  <div key={localization.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{localization.locale_code}</h3>
                        {localization.is_active && <Badge variant="outline">Active</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {localization.currency_name} ({localization.currency_code}) - {localization.currency_symbol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Translations</CardTitle>
              <CardDescription>
                Manage multilingual text translations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="language-select">Select Language</Label>
                <Input
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    loadTranslations(e.target.value);
                  }}
                  placeholder="Enter language code (e.g., en, fr, de)"
                />
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {translations.map((translation) => (
                  <div key={translation.id} className="p-3 border rounded-lg">
                    <div className="font-mono text-sm text-muted-foreground">
                      {translation.translation_key}
                    </div>
                    <div className="mt-1">
                      {translation.translation_value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Import Formats
                </CardTitle>
                <CardDescription>
                  Import number formatting configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={importFormats} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Default Formats
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Import Localizations
                </CardTitle>
                <CardDescription>
                  Upload localization JSON file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) importLocalizations(file);
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Import Translations
                </CardTitle>
                <CardDescription>
                  Upload translations JSON file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) importTranslations(file);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;