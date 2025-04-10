
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SecurityPanel } from "@/components/security/SecurityPanel";
import { Shield, ShieldCheck, Lock, FileCheck, Server } from "lucide-react";

const SecurityPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Security & Compliance</h1>
        <p className="text-muted-foreground mt-1">
          Enterprise-grade security and regulatory compliance for your business operations
        </p>
      </div>
      
      <div className="mb-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-sidebar-primary" />
              <div>
                <CardTitle>Enterprise-Grade Security & Compliance</CardTitle>
                <CardDescription>
                  Omnify implements industry-standard security protocols to protect your business data
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg border bg-card/50 flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="h-4 w-4 text-sidebar-primary" />
                  <div className="text-sidebar-primary font-semibold">OAuth2/SAML</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Secure authentication with industry standards for enterprise client access
                </p>
                <Badge className="mt-2 self-start bg-sidebar-primary/20 text-sidebar-primary">Certified</Badge>
              </div>
              
              <div className="p-4 rounded-lg border bg-card/50 flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-sidebar-primary" />
                  <div className="text-sidebar-primary font-semibold">Data Encryption</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  AES-256 encryption at rest and in transit for all client data
                </p>
                <Badge className="mt-2 self-start bg-sidebar-primary/20 text-sidebar-primary">Industry Standard</Badge>
              </div>
              
              <div className="p-4 rounded-lg border bg-card/50 flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <FileCheck className="h-4 w-4 text-sidebar-primary" />
                  <div className="text-sidebar-primary font-semibold">Compliance</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  GDPR, HIPAA, SOC 2 and industry-specific regulatory compliance
                </p>
                <Badge className="mt-2 self-start bg-sidebar-primary/20 text-sidebar-primary">Certified</Badge>
              </div>
              
              <div className="p-4 rounded-lg border bg-card/50 flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Server className="h-4 w-4 text-sidebar-primary" />
                  <div className="text-sidebar-primary font-semibold">Data Isolation</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete client data isolation and tenant separation architecture
                </p>
                <Badge className="mt-2 self-start bg-sidebar-primary/20 text-sidebar-primary">Enterprise Ready</Badge>
              </div>
            </div>
            
            <div className="mt-6 bg-sidebar-primary/10 border border-sidebar-primary/20 rounded-lg p-4">
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-sidebar-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sidebar-primary">How We Protect Your Data</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Omnify's security framework is built on the principle that your data remains yours at all times. We implement 
                    a multi-layered security approach with encryption, access controls, continuous monitoring, and regulatory compliance 
                    to ensure your business operations remain secure when delegated to our platform.
                  </p>
                </div>
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
