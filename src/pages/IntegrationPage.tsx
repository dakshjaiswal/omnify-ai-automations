import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiSimulator } from "@/components/integration/ApiSimulator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Database, Link2, RefreshCw, Server, Settings, Shield, Zap } from "lucide-react";

const IntegrationPage = () => {
  const { toast } = useToast();
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState("");
  const [isZapierConnecting, setIsZapierConnecting] = useState(false);
  
  const handleConnectZapier = () => {
    if (!zapierWebhookUrl.trim()) {
      toast({
        title: "Missing webhook URL",
        description: "Please enter a valid Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsZapierConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      toast({
        title: "Zapier connected",
        description: "Your Zapier integration is now active",
      });
      setIsZapierConnecting(false);
    }, 1500);
  };
  
  const integrations = [
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with 5,000+ apps using Zapier webhooks",
      icon: <Zap className="h-6 w-6" />,
      status: "disconnected",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Sync data with Salesforce CRM",
      icon: <Database className="h-6 w-6" />,
      status: "connected",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Send notifications and alerts to Slack channels",
      icon: <Link2 className="h-6 w-6" />,
      status: "connected",
    },
    {
      id: "google",
      name: "Google Workspace",
      description: "Integrate with Google Docs, Sheets, and Calendar",
      icon: <Server className="h-6 w-6" />,
      status: "disconnected",
    },
  ];
  
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Integration Simulator</h1>
        <p className="text-muted-foreground mt-1">
          Connect Omnify with your existing systems through secure API integrations
        </p>
      </div>
      
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="api">API Simulator</TabsTrigger>
          <TabsTrigger value="integrations">Third-Party Apps</TabsTrigger>
          <TabsTrigger value="config">Integration Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <div className="mb-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>
                  Test how Omnify connects to your existing systems via API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  The API simulator allows you to test how Omnify would integrate with your existing systems.
                  Select an endpoint, configure the request parameters, and send the request to see the simulated response.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <ApiSimulator />
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card 
                key={integration.id} 
                className={cn(
                  "glass-card overflow-hidden transition-all duration-300 hover:shadow-md",
                  integration.status === "connected" && "border-sidebar-primary/50"
                )}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/50 p-2 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div>
                      {integration.status === "connected" ? (
                        <Badge className="bg-sidebar-primary">Connected</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Disconnected</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {integration.id === "zapier" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://hooks.zapier.com/..."
                          value={zapierWebhookUrl}
                          onChange={(e) => setZapierWebhookUrl(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Create a Zap in Zapier and copy the webhook URL here
                        </p>
                      </div>
                      <Button 
                        className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90"
                        onClick={handleConnectZapier}
                        disabled={isZapierConnecting}
                      >
                        {isZapierConnecting ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Connect to Zapier
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                  
                  {integration.id === "salesforce" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-green-500">
                        <Shield className="h-4 w-4" />
                        <span>Connected with OAuth2</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Last Synced</Label>
                        <div className="text-sm">Today at 10:42 AM</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {integration.id === "slack" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-green-500">
                        <Shield className="h-4 w-4" />
                        <span>Connected with OAuth2</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Connected Channels</Label>
                        <div className="text-sm">#notifications, #alerts</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Channels
                      </Button>
                    </div>
                  )}
                  
                  {integration.id === "google" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Connect to Google Workspace to integrate with Google Docs, Sheets, and Calendar.
                      </p>
                      <Button className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90">
                        <Link2 className="h-4 w-4 mr-2" />
                        Connect Google Workspace
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="config">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure global settings for all integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-rate">API Rate Limit</Label>
                  <Input
                    id="api-rate"
                    type="number"
                    defaultValue="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of API calls per minute
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout</Label>
                  <Input
                    id="timeout"
                    type="number"
                    defaultValue="30"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum time in seconds to wait for a response
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retry">Retry Attempts</Label>
                  <Input
                    id="retry"
                    type="number"
                    defaultValue="3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of times to retry failed requests
                  </p>
                </div>
                
                <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationPage;
