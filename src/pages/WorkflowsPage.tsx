
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WorkflowCard, WorkflowCardProps } from "@/components/workflows/WorkflowCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Sample workflow data
const workflows: WorkflowCardProps[] = [
  {
    id: "workflow-1",
    title: "Daily Sales Report",
    description: "Automatically generates and emails daily sales reports to the management team",
    category: "reporting",
    complexity: "medium",
    status: "active",
  },
  {
    id: "workflow-2",
    title: "Customer Onboarding",
    description: "Streamlines the customer onboarding process with automated welcome emails and setup instructions",
    category: "notification",
    complexity: "complex",
    status: "active",
  },
  {
    id: "workflow-3",
    title: "Inventory Alert",
    description: "Monitors inventory levels and sends alerts when products are running low",
    category: "notification",
    complexity: "simple",
    status: "inactive",
  },
  {
    id: "workflow-4",
    title: "Weekly Data Backup",
    description: "Performs automatic backups of critical business data on a weekly schedule",
    category: "data",
    complexity: "medium",
    status: "active",
  },
  {
    id: "workflow-5",
    title: "Invoice Generation",
    description: "Creates and sends invoices to customers on a specified schedule",
    category: "reporting",
    complexity: "complex",
    status: "inactive",
  },
  {
    id: "workflow-6",
    title: "Social Media Posting",
    description: "Schedules and posts content to various social media platforms",
    category: "scheduling",
    complexity: "medium",
    status: "inactive",
  },
];

const WorkflowsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("");
  
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "active") return matchesSearch && workflow.status === "active";
    if (currentTab === "inactive") return matchesSearch && workflow.status === "inactive";
    
    return matchesSearch && workflow.category === currentTab;
  });

  const handleCreateWorkflow = () => {
    if (newWorkflowName.trim()) {
      // In a real app, we would create the workflow in the database
      toast({
        title: "Workflow created",
        description: `${newWorkflowName} has been created successfully.`,
      });
      
      setNewWorkflowName("");
      setNewWorkflowDescription("");
      setIsCreateDialogOpen(false);
    }
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Automated Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Create, monitor, and optimize your business automation workflows
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0 bg-sidebar-primary hover:bg-sidebar-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Create a custom workflow to automate your business processes
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Workflow Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Customer Onboarding"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Briefly describe what this workflow will do"
                  value={newWorkflowDescription}
                  onChange={(e) => setNewWorkflowDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-sidebar-primary hover:bg-sidebar-primary/90"
                onClick={handleCreateWorkflow}
                disabled={!newWorkflowName.trim()}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Sliders className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-7 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="reporting">Reports</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentTab}>
          {filteredWorkflows.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} {...workflow} />
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No workflows found</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  {searchTerm
                    ? `No workflows match your search "${searchTerm}"`
                    : "There are no workflows in this category yet."}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Workflow
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Workflow</DialogTitle>
                      <DialogDescription>
                        Create a custom workflow to automate your business processes
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Workflow Name
                        </label>
                        <Input
                          id="name"
                          placeholder="e.g., Customer Onboarding"
                          value={newWorkflowName}
                          onChange={(e) => setNewWorkflowName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description
                        </label>
                        <Input
                          id="description"
                          placeholder="Briefly describe what this workflow will do"
                          value={newWorkflowDescription}
                          onChange={(e) => setNewWorkflowDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        className="bg-sidebar-primary hover:bg-sidebar-primary/90"
                        onClick={handleCreateWorkflow}
                        disabled={!newWorkflowName.trim()}
                      >
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowsPage;
