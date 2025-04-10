
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityPanel } from "@/components/security/SecurityPanel";

const SecurityPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Security Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure enterprise-grade security and access control
        </p>
      </div>
      
      <div className="mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Enterprise-Grade Security</CardTitle>
            <CardDescription>
              Omnify implements industry-standard security protocols
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg border bg-card/50">
                <div className="text-sidebar-primary font-semibold mb-1">OAuth2/SAML</div>
                <p className="text-sm text-muted-foreground">
                  Secure authentication with industry standards
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <div className="text-sidebar-primary font-semibold mb-1">Data Encryption</div>
                <p className="text-sm text-muted-foreground">
                  AES-256 encryption at rest and in transit
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <div className="text-sidebar-primary font-semibold mb-1">Role-Based Access</div>
                <p className="text-sm text-muted-foreground">
                  Granular permission controls for all users
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <div className="text-sidebar-primary font-semibold mb-1">Audit Logging</div>
                <p className="text-sm text-muted-foreground">
                  Comprehensive logging of all system activity
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <SecurityPanel />
    </div>
  );
};

export default SecurityPage;
