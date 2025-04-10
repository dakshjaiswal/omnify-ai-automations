
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Check, Copy, Database, RefreshCw, RotateCw, Server, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample API endpoints
const apiEndpoints = [
  { name: "CRM Customer Data", url: "https://api.example.com/crm/customers", method: "GET", category: "CRM" },
  { name: "ERP Inventory Status", url: "https://api.example.com/erp/inventory", method: "GET", category: "ERP" },
  { name: "Email Marketing List", url: "https://api.example.com/marketing/emails", method: "GET", category: "Marketing" },
  { name: "Create Customer", url: "https://api.example.com/crm/customers", method: "POST", category: "CRM" },
  { name: "Update Inventory", url: "https://api.example.com/erp/inventory", method: "PUT", category: "ERP" },
  { name: "Send Notification", url: "https://api.example.com/notifications/send", method: "POST", category: "Notifications" },
];

// Sample API response data
const sampleData = {
  customers: [
    { id: "CUST-001", name: "Acme Corp", email: "contact@acmecorp.com", status: "active" },
    { id: "CUST-002", name: "Globex Industries", email: "info@globex.com", status: "active" },
    { id: "CUST-003", name: "Initech LLC", email: "support@initech.com", status: "inactive" },
  ],
  inventory: [
    { id: "INV-001", product: "Widget A", quantity: 250, status: "in_stock" },
    { id: "INV-002", product: "Widget B", quantity: 120, status: "in_stock" },
    { id: "INV-003", product: "Widget C", quantity: 0, status: "out_of_stock" },
  ],
  marketing: [
    { id: "LST-001", name: "Newsletter Subscribers", count: 1240, lastUpdated: "2023-04-15" },
    { id: "LST-002", name: "Product Updates", count: 890, lastUpdated: "2023-04-20" },
  ],
};

export function ApiSimulator() {
  const { toast } = useToast();
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [requestBody, setRequestBody] = useState("");
  const [headerKey, setHeaderKey] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [headers, setHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json",
    "Authorization": "Bearer simulated-api-key",
  });

  const getEndpointDetails = () => {
    return apiEndpoints.find((endpoint) => endpoint.name === selectedEndpoint);
  };

  const handleEndpointChange = (value: string) => {
    setSelectedEndpoint(value);
    setResponseData(null);
    setIsResponseVisible(false);
    
    // Set default request body based on endpoint
    const endpoint = apiEndpoints.find((ep) => ep.name === value);
    if (endpoint?.method === "POST" || endpoint?.method === "PUT") {
      if (endpoint.category === "CRM") {
        setRequestBody(JSON.stringify({
          name: "New Customer",
          email: "customer@example.com",
          status: "active"
        }, null, 2));
      } else if (endpoint.category === "ERP") {
        setRequestBody(JSON.stringify({
          product: "Widget D",
          quantity: 100,
          status: "in_stock"
        }, null, 2));
      } else if (endpoint.category === "Notifications") {
        setRequestBody(JSON.stringify({
          recipient: "user@example.com",
          subject: "Important Notification",
          message: "This is a test notification"
        }, null, 2));
      }
    } else {
      setRequestBody("");
    }
  };

  const addHeader = () => {
    if (headerKey.trim() && headerValue.trim()) {
      setHeaders({
        ...headers,
        [headerKey]: headerValue,
      });
      setHeaderKey("");
      setHeaderValue("");
      
      toast({
        title: "Header added",
        description: `${headerKey}: ${headerValue}`,
      });
    }
  };

  const removeHeader = (key: string) => {
    const { [key]: _, ...rest } = headers;
    setHeaders(rest);
  };

  const handleSendRequest = () => {
    const endpoint = getEndpointDetails();
    if (!endpoint) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let response;
      if (endpoint.category === "CRM") {
        response = { data: sampleData.customers, status: 200, message: "Success" };
      } else if (endpoint.category === "ERP") {
        response = { data: sampleData.inventory, status: 200, message: "Success" };
      } else if (endpoint.category === "Marketing") {
        response = { data: sampleData.marketing, status: 200, message: "Success" };
      } else if (endpoint.method === "POST" || endpoint.method === "PUT") {
        try {
          const payload = JSON.parse(requestBody);
          response = { 
            data: { id: `SIM-${Math.floor(Math.random() * 1000)}`, ...payload }, 
            status: 201, 
            message: "Created" 
          };
        } catch (error) {
          response = { error: "Invalid JSON in request body", status: 400, message: "Bad Request" };
        }
      } else {
        response = { data: [], status: 200, message: "Success" };
      }
      
      setResponseData(response);
      setIsLoading(false);
      setIsResponseVisible(true);
      
      toast({
        title: `${endpoint.method} Request Sent`,
        description: `Status: ${response.status} ${response.message}`,
      });
    }, 1500);
  };

  const handleCopyResponse = () => {
    if (responseData) {
      navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
      toast({
        title: "Copied to clipboard",
        description: "Response data copied to clipboard",
      });
    }
  };

  const handleGenerateCode = () => {
    const endpoint = getEndpointDetails();
    if (!endpoint) return;
    
    const codeSnippet = `// JavaScript fetch example
fetch("${endpoint.url}", {
  method: "${endpoint.method}",
  headers: ${JSON.stringify(headers, null, 2)},
  ${endpoint.method !== "GET" ? `body: ${requestBody}` : ""}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`;

    navigator.clipboard.writeText(codeSnippet);
    
    toast({
      title: "Code generated",
      description: "JavaScript fetch example copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>API Request</CardTitle>
          <CardDescription>
            Configure and test API integration with external systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">Select Endpoint</Label>
            <Select value={selectedEndpoint} onValueChange={handleEndpointChange}>
              <SelectTrigger id="endpoint">
                <SelectValue placeholder="Choose an API endpoint" />
              </SelectTrigger>
              <SelectContent>
                {apiEndpoints.map((endpoint) => (
                  <SelectItem key={endpoint.name} value={endpoint.name}>
                    <div className="flex items-center">
                      <span className={cn(
                        "inline-block w-14 text-xs font-bold mr-2 py-0.5 px-1.5 rounded",
                        endpoint.method === "GET" ? "bg-sidebar-primary/20 text-sidebar-primary" :
                        endpoint.method === "POST" ? "bg-green-500/20 text-green-500" :
                        endpoint.method === "PUT" ? "bg-blue-500/20 text-blue-500" :
                        "bg-red-500/20 text-red-500"
                      )}>
                        {endpoint.method}
                      </span>
                      {endpoint.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedEndpoint && (
            <Tabs defaultValue="params" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="params">Parameters</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
              
              <TabsContent value="params" className="space-y-4">
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Endpoint URL</Label>
                  </div>
                  <div className="relative">
                    <Input
                      value={getEndpointDetails()?.url || ""}
                      readOnly
                      className="pr-10 text-muted-foreground"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Server className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <Label>Method</Label>
                  </div>
                  <div className="relative">
                    <Input
                      value={getEndpointDetails()?.method || ""}
                      readOnly
                      className="pr-10 text-muted-foreground"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="headers" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3 sm:col-span-1">
                    <Label htmlFor="header-key">Key</Label>
                    <Input
                      id="header-key"
                      placeholder="Content-Type"
                      value={headerKey}
                      onChange={(e) => setHeaderKey(e.target.value)}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <Label htmlFor="header-value">Value</Label>
                    <Input
                      id="header-value"
                      placeholder="application/json"
                      value={headerValue}
                      onChange={(e) => setHeaderValue(e.target.value)}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-1 flex items-end">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={addHeader}
                      disabled={!headerKey.trim() || !headerValue.trim()}
                    >
                      Add Header
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(headers).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHeader(key)}
                              className="h-8 w-8"
                            >
                              <ArrowUp className="h-4 w-4 rotate-45" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="body" className="space-y-4">
                <div className="pt-2">
                  <Label htmlFor="request-body">Request Body (JSON)</Label>
                  <Textarea
                    id="request-body"
                    placeholder={`{\n  "key": "value"\n}`}
                    className="font-mono h-[200px]"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="text-sidebar-primary border-sidebar-primary/20"
            onClick={handleGenerateCode}
            disabled={!selectedEndpoint}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Code
          </Button>
          <Button
            className="bg-sidebar-primary hover:bg-sidebar-primary/90"
            onClick={handleSendRequest}
            disabled={!selectedEndpoint || isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <ArrowUp className="mr-2 h-4 w-4" />
                Send Request
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className={cn("glass-card transition-all duration-300", isResponseVisible ? "opacity-100" : "opacity-50")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Response</CardTitle>
              <CardDescription>
                View and inspect the response from the API
              </CardDescription>
            </div>
            {responseData && (
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={handleCopyResponse}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsResponseVisible(false)}>
                  <ArrowDown className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-sidebar-primary" />
                <p className="text-muted-foreground">Waiting for response...</p>
              </div>
            </div>
          ) : responseData ? (
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <div className={cn(
                  "px-2 py-1 rounded text-sm font-medium",
                  responseData.status >= 200 && responseData.status < 300
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                )}>
                  Status: {responseData.status}
                </div>
                <div className="text-sm text-muted-foreground">
                  {responseData.message}
                </div>
              </div>
              
              <div className="border rounded-lg p-4 font-mono text-sm overflow-auto max-h-[300px] bg-card/50">
                <pre>{JSON.stringify(responseData, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Database className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
              <p className="text-muted-foreground">
                Select an endpoint and send a request to see the response here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
