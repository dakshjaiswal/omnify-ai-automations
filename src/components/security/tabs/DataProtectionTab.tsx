
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck } from "lucide-react";

export function DataProtectionTab() {
  const { toast } = useToast();
  const [securitySettings, setSecuritySettings] = useState({
    dataEncryption: true,
    auditLogging: true,
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
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Data Protection</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure data encryption and compliance settings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="data-encryption" className="cursor-pointer">
              Data Encryption
            </Label>
            <p className="text-sm text-muted-foreground">
              Encrypt all data at rest and in transit
            </p>
          </div>
          <Switch
            id="data-encryption"
            checked={securitySettings.dataEncryption}
            onCheckedChange={(v) => updateSecuritySetting("dataEncryption", v)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="audit-logging" className="cursor-pointer">
              Audit Logging
            </Label>
            <p className="text-sm text-muted-foreground">
              Log all user actions for compliance purposes
            </p>
          </div>
          <Switch
            id="audit-logging"
            checked={securitySettings.auditLogging}
            onCheckedChange={(v) => updateSecuritySetting("auditLogging", v)}
          />
        </div>
        
        <div className="rounded-lg border p-4 bg-sidebar-primary/5 border-sidebar-primary/20">
          <div className="flex">
            <ShieldCheck className="h-5 w-5 text-sidebar-primary mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-sidebar-primary">Enterprise-Grade Security</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Omnify implements industry-standard security protocols including AES-256 encryption, OAuth 2.0, and complies with GDPR, HIPAA, and SOC 2 requirements.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Data Retention Policy</h3>
          <RadioGroup
            value="90days"
            onValueChange={(v) => console.log(v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30days" id="retention-30" />
              <Label htmlFor="retention-30">30 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90days" id="retention-90" />
              <Label htmlFor="retention-90">90 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1year" id="retention-1year" />
              <Label htmlFor="retention-1year">1 year</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlimited" id="retention-unlimited" />
              <Label htmlFor="retention-unlimited">Unlimited</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
