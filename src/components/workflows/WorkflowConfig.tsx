
import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface WorkflowConfigProps {
  workflowId: string;
  workflowTitle: string;
  category: "reporting" | "notification" | "data" | "scheduling";
  onSave: (config: any) => void;
}

export function WorkflowConfig({
  workflowId,
  workflowTitle,
  category,
  onSave,
}: WorkflowConfigProps) {
  const [config, setConfig] = useState({
    frequency: "daily",
    time: "09:00",
    notifyOnCompletion: true,
    notifyOnError: true,
    priority: 50,
    retries: 3,
    recipients: "",
    dataSource: "database",
    integrations: [] as string[],
  });

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const toggleIntegration = (integration: string) => {
    setConfig((prev) => {
      const integrations = [...prev.integrations];
      if (integrations.includes(integration)) {
        return {
          ...prev,
          integrations: integrations.filter((i) => i !== integration),
        };
      } else {
        return {
          ...prev,
          integrations: [...integrations, integration],
        };
      }
    });
  };

  const handleSave = () => {
    onSave({
      workflowId,
      ...config,
    });
  };

  // Render different config options based on category
  const renderCategorySpecificOptions = () => {
    switch (category) {
      case "reporting":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">Report Format</Label>
                <Select
                  value={config.dataSource}
                  onValueChange={(v) => updateConfig("dataSource", v)}
                >
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Input
                  id="recipients"
                  placeholder="email@example.com"
                  value={config.recipients}
                  onChange={(e) => updateConfig("recipients", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case "notification":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input
                id="recipients"
                placeholder="email@example.com"
                value={config.recipients}
                onChange={(e) => updateConfig("recipients", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple email addresses with commas
              </p>
            </div>
          </div>
        );
      case "data":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataSource">Data Source</Label>
              <Select
                value={config.dataSource}
                onValueChange={(v) => updateConfig("dataSource", v)}
              >
                <SelectTrigger id="dataSource">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="api">External API</SelectItem>
                  <SelectItem value="file">File Upload</SelectItem>
                  <SelectItem value="stream">Data Stream</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "scheduling":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={config.time}
                  onChange={(e) => updateConfig("time", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={config.frequency}
                  onValueChange={(v) => updateConfig("frequency", v)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-2">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          {renderCategorySpecificOptions()}
          
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={config.frequency}
              onValueChange={(v) => updateConfig("frequency", v)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notify-complete" className="cursor-pointer">
              Notify on completion
            </Label>
            <Switch
              id="notify-complete"
              checked={config.notifyOnCompletion}
              onCheckedChange={(v) => updateConfig("notifyOnCompletion", v)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notify-error" className="cursor-pointer">
              Notify on error
            </Label>
            <Switch
              id="notify-error"
              checked={config.notifyOnError}
              onCheckedChange={(v) => updateConfig("notifyOnError", v)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="priority">Priority</Label>
                <span className="text-sm text-muted-foreground">{config.priority}</span>
              </div>
              <Slider
                id="priority"
                min={0}
                max={100}
                step={10}
                value={[config.priority]}
                onValueChange={([value]) => updateConfig("priority", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retries">Retry Attempts</Label>
              <Select
                value={config.retries.toString()}
                onValueChange={(v) => updateConfig("retries", parseInt(v))}
              >
                <SelectTrigger id="retries">
                  <SelectValue placeholder="Select retry attempts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 (No retries)</SelectItem>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <div className="space-y-4">
            {["Zapier", "Slack", "Microsoft Teams", "Google Workspace", "Salesforce"].map((integration) => (
              <div key={integration} className="flex items-center justify-between">
                <Label htmlFor={`integration-${integration}`} className="cursor-pointer">
                  {integration}
                </Label>
                <Switch
                  id={`integration-${integration}`}
                  checked={config.integrations.includes(integration)}
                  onCheckedChange={() => toggleIntegration(integration)}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="mt-6">
        <Button variant="outline" type="button" onClick={() => onSave(null)}>
          Cancel
        </Button>
        <Button 
          type="button" 
          className="bg-sidebar-primary hover:bg-sidebar-primary/90"
          onClick={handleSave}
        >
          Save Configuration
        </Button>
      </DialogFooter>
    </div>
  );
}
