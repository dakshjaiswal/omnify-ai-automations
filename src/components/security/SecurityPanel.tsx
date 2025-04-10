
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, Copy, Eye, EyeOff, Key, Lock, RefreshCw, Shield, ShieldAlert, ShieldCheck, User, Users } from "lucide-react";

const users = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Invited" },
];

const permissions = [
  { name: "Dashboard", admin: true, user: true },
  { name: "Create Workflows", admin: true, user: true },
  { name: "Edit Workflows", admin: true, user: false },
  { name: "Delete Workflows", admin: true, user: false },
  { name: "View Analytics", admin: true, user: true },
  { name: "Export Data", admin: true, user: false },
  { name: "Manage Users", admin: true, user: false },
  { name: "API Access", admin: true, user: false },
  { name: "Security Settings", admin: true, user: false },
];

const authProviders = [
  { id: "email", name: "Email & Password", enabled: true },
  { id: "google", name: "Google", enabled: false },
  { id: "microsoft", name: "Microsoft", enabled: false },
  { id: "saml", name: "SAML", enabled: false },
];

export function SecurityPanel() {
  const { toast } = useToast();
  const [currentAuthProviders, setCurrentAuthProviders] = useState(authProviders);
  const [showApiKey, setShowApiKey] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    mfa: false,
    sessionTimeout: "30",
    passwordPolicy: "medium",
    dataEncryption: true,
    apiAccess: true,
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
    <div className="space-y-6">
      <Tabs defaultValue="access" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="api">API Security</TabsTrigger>
          <TabsTrigger value="data">Data Protection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="access" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Users & Permissions</CardTitle>
              <CardDescription>
                Manage who has access to Omnify and what they can do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">User Management</h3>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Invite User
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={user.role === "Admin" ? "default" : "outline"}
                                className={user.role === "Admin" ? "bg-sidebar-primary" : ""}
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  user.status === "Active"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-yellow-500/20 text-yellow-500"
                                )}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Permission Roles</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure what different user roles can access
                    </p>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Permission</TableHead>
                          <TableHead className="text-center">Admin</TableHead>
                          <TableHead className="text-center">User</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissions.map((permission) => (
                          <TableRow key={permission.name}>
                            <TableCell className="font-medium">{permission.name}</TableCell>
                            <TableCell className="text-center">
                              {permission.admin ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.user ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>
                Configure how users authenticate to your Omnify instance
              </CardDescription>
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
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>
                Manage API keys and access control for external services
              </CardDescription>
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
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>
                Configure data encryption and compliance settings
              </CardDescription>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
