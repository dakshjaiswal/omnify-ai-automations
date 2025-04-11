
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, RefreshCw, ShieldAlert } from "lucide-react";

export function ApiSecurityTab() {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    apiAccess: true,
  });
  
  const updateSecuritySetting = (key: string, value: any) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    
    toast({
      title: "Setting updated",
      description: `${key} has been updated`,
    });
  };
  
  const generateNewApiKey = () => {
    toast({
      title: "New API key generated",
      description: "Your new API key has been generated",
    });
  };
  
  const copyApiKey = () => {
    navigator.clipboard.writeText("sk_test_omnify_123456789");
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard",
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>API Security</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage API keys and access control for external services
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="api-access" className="cursor-pointer">
              Enable API Access
            </Label>
            <p className="text-sm text-muted-foreground">
              Allow external systems to connect via API
            </p>
          </div>
          <Switch
            id="api-access"
            checked={securitySettings.apiAccess}
            onCheckedChange={(v) => updateSecuritySetting("apiAccess", v)}
          />
        </div>
        
        {securitySettings.apiAccess && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Keys</h3>
            
            <div className="p-4 border rounded-lg bg-card/50">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    value={showApiKey ? "sk_test_omnify_123456789" : "••••••••••••••••••••••••"}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={copyApiKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/20 hover:bg-destructive/10"
                  onClick={generateNewApiKey}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border p-4 bg-yellow-500/5 border-yellow-500/20">
              <div className="flex">
                <ShieldAlert className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-500">Security Notice</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    API keys provide full access to your account. Keep them secure and never share them in public repositories or client-side code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
