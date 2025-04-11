
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Shield } from "lucide-react";

// Mock data for auth providers
const authProviders = [
  { id: "email", name: "Email & Password", enabled: true },
  { id: "google", name: "Google", enabled: false },
  { id: "microsoft", name: "Microsoft", enabled: false },
  { id: "saml", name: "SAML", enabled: false },
];

export function AuthenticationTab() {
  const { toast } = useToast();
  const [currentAuthProviders, setCurrentAuthProviders] = useState(authProviders);
  const [securitySettings, setSecuritySettings] = useState({
    mfa: false,
    sessionTimeout: "30",
    passwordPolicy: "medium",
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
  
  const toggleAuthProvider = (id: string) => {
    setCurrentAuthProviders((prev) =>
      prev.map((provider) =>
        provider.id === id
          ? { ...provider, enabled: !provider.enabled }
          : provider
      )
    );
    
    const provider = currentAuthProviders.find((p) => p.id === id);
    toast({
      title: provider?.enabled ? "Provider disabled" : "Provider enabled",
      description: `${provider?.name} authentication ${provider?.enabled ? "disabled" : "enabled"}`,
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Authentication Settings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure how users authenticate to your Omnify instance
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Authentication Providers</h3>
          <div className="space-y-4">
            {currentAuthProviders.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {provider.id === "email" && <Lock className="h-5 w-5 mr-2" />}
                  {provider.id === "google" && <span className="mr-2">G</span>}
                  {provider.id === "microsoft" && <span className="mr-2">M</span>}
                  {provider.id === "saml" && <Shield className="h-5 w-5 mr-2" />}
                  <Label htmlFor={`provider-${provider.id}`} className="cursor-pointer">
                    {provider.name}
                  </Label>
                </div>
                <Switch
                  id={`provider-${provider.id}`}
                  checked={provider.enabled}
                  onCheckedChange={() => toggleAuthProvider(provider.id)}
                  disabled={provider.id === "email"} // Email is required
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Security Options</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mfa" className="cursor-pointer">
                Multi-factor Authentication
              </Label>
              <p className="text-sm text-muted-foreground">
                Require MFA for all users
              </p>
            </div>
            <Switch
              id="mfa"
              checked={securitySettings.mfa}
              onCheckedChange={(v) => updateSecuritySetting("mfa", v)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              min="5"
              max="120"
              value={securitySettings.sessionTimeout}
              onChange={(e) => updateSecuritySetting("sessionTimeout", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Password Policy</Label>
            <RadioGroup
              value={securitySettings.passwordPolicy}
              onValueChange={(v) => updateSecuritySetting("passwordPolicy", v)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="policy-low" />
                <Label htmlFor="policy-low">Basic (8+ characters)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="policy-medium" />
                <Label htmlFor="policy-medium">
                  Medium (8+ chars, uppercase, number)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="policy-high" />
                <Label htmlFor="policy-high">
                  Strong (12+ chars, uppercase, number, special)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
