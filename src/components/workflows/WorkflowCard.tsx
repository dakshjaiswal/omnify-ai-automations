
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Check, FileText, Mail, Calendar, BarChart, BellRing, Database } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { WorkflowConfig } from "./WorkflowConfig";

export interface WorkflowCardProps {
  id: string;
  title: string;
  description: string;
  category: "reporting" | "notification" | "data" | "scheduling";
  complexity: "simple" | "medium" | "complex";
  status?: "active" | "inactive";
  className?: string;
}

export function WorkflowCard({
  id,
  title,
  description,
  category,
  complexity,
  status = "inactive",
  className,
}: WorkflowCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const { toast } = useToast();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const getIcon = () => {
    switch (category) {
      case "reporting":
        return <FileText className="h-4 w-4" />;
      case "notification":
        return <Mail className="h-4 w-4" />;
      case "data":
        return <Database className="h-4 w-4" />;
      case "scheduling":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getComplexityColor = () => {
    switch (complexity) {
      case "simple":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "complex":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
    }
  };

  const activateWorkflow = () => {
    setCurrentStatus("active");
    toast({
      title: "Workflow activated",
      description: `${title} is now active and running.`,
    });
  };

  const deactivateWorkflow = () => {
    setCurrentStatus("inactive");
    toast({
      title: "Workflow deactivated",
      description: `${title} has been paused.`,
    });
  };

  const handleConfigSave = (config: any) => {
    console.log("Workflow config saved:", config);
    setIsConfigOpen(false);
    toast({
      title: "Workflow configured",
      description: "Your workflow configuration has been saved.",
    });
  };

  return (
    <Card className={cn("glass-card overflow-hidden transition-all duration-300 hover:shadow-md hover:border-sidebar-primary/50", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">
              {description}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "ml-2",
              getComplexityColor()
            )}
          >
            {complexity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            {getIcon()}
            <span className="ml-1">{category}</span>
          </Badge>
          
          <Badge 
            variant={currentStatus === "active" ? "default" : "outline"}
            className={cn(
              "flex items-center space-x-1",
              currentStatus === "active" 
                ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                : "text-muted-foreground"
            )}
          >
            {currentStatus === "active" ? (
              <Zap className="h-3 w-3 mr-1" />
            ) : (
              <Clock className="h-3 w-3 mr-1" />
            )}
            {currentStatus === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between">
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Configure Workflow</DialogTitle>
              <DialogDescription>
                Customize how this workflow operates based on your business needs.
              </DialogDescription>
            </DialogHeader>
            <WorkflowConfig 
              workflowId={id}
              workflowTitle={title}
              category={category}
              onSave={handleConfigSave}
            />
          </DialogContent>
        </Dialog>
        
        {currentStatus === "active" ? (
          <Button 
            variant="outline" 
            size="sm"
            className="text-destructive border-destructive/20 hover:bg-destructive/10"
            onClick={deactivateWorkflow}
          >
            Deactivate
          </Button>
        ) : (
          <Button 
            size="sm"
            className="bg-sidebar-primary hover:bg-sidebar-primary/90"
            onClick={activateWorkflow}
          >
            Activate
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
