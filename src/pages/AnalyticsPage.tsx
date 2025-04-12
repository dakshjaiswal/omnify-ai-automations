import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, BarChart4, Clock, Download, FilePieChart, LineChart, PieChart, RefreshCw } from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { ChartComponent } from "@/components/dashboard/ChartComponent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AnalyticsPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("7days");
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  
  return (
    <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights into your business automation performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </>
            )}
          </Button>
          
          <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricsCard
          title="Total Workflows"
          value="24"
          icon={<LineChart className="h-4 w-4 text-sidebar-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricsCard
          title="Active Workflows"
          value="18"
          icon={<BarChart4 className="h-4 w-4 text-sidebar-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
        
        <MetricsCard
          title="Tasks Completed"
          value="1,284"
          icon={<FilePieChart className="h-4 w-4 text-sidebar-primary" />}
          trend={{ value: 24, isPositive: true }}
        />
        
        <MetricsCard
          title="Failed Tasks"
          value="7"
          icon={<Clock className="h-4 w-4 text-sidebar-primary" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <ChartComponent
          title="Workflow Performance"
          description="Task completion rate over time"
          type="area"
        />
        
        <ChartComponent
          title="Error Rates"
          description="Task failures by workflow type"
          type="bar"
        />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <ChartComponent
            title="Efficiency Metrics"
            description="Time saved by automation (hours)"
            type="line"
          />
        </div>
        <div className="lg:col-span-1">
          <ChartComponent
            title="Workflow Distribution"
            description="Tasks by category"
            type="pie"
            showTimeSelector={false}
          />
        </div>
      </div>
      
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Resource Usage</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Task Executions</CardTitle>
              <CardDescription>
                Latest workflow tasks executed in your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium border-b">
                  <div>Task ID</div>
                  <div>Workflow</div>
                  <div>Status</div>
                  <div>Time</div>
                  <div>Duration</div>
                </div>
                <div className="divide-y">
                  {[
                    { id: "T-1428", workflow: "Daily Sales Report", status: "completed", time: "4 min ago", duration: "1.2s" },
                    { id: "T-1427", workflow: "Inventory Check", status: "completed", time: "12 min ago", duration: "2.8s" },
                    { id: "T-1426", workflow: "Social Post", status: "failed", time: "45 min ago", duration: "0.5s" },
                    { id: "T-1425", workflow: "Customer Email", status: "completed", time: "1 hour ago", duration: "0.9s" },
                    { id: "T-1424", workflow: "Data Backup", status: "completed", time: "3 hours ago", duration: "15.2s" },
                  ].map((task) => (
                    <div key={task.id} className="grid grid-cols-5 p-4 text-sm">
                      <div className="font-medium">{task.id}</div>
                      <div>{task.workflow}</div>
                      <div>
                        <Badge
                          variant="outline"
                          className={cn(
                            task.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          )}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">{task.time}</div>
                      <div>{task.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartComponent
              title="Response Time"
              description="Average workflow execution time"
              type="line"
            />
            <ChartComponent
              title="Success Rate"
              description="Task success percentage over time"
              type="area"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartComponent
              title="API Calls"
              description="Number of API requests per day"
              type="bar"
            />
            <ChartComponent
              title="Storage Usage"
              description="Data storage consumption"
              type="area"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Recent actions performed by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 text-sm font-medium border-b">
                  <div>User</div>
                  <div>Action</div>
                  <div>Resource</div>
                  <div>Time</div>
                </div>
                <div className="divide-y">
                  {[
                    { user: "Admin User", action: "Created", resource: "Email Notification Workflow", time: "Just now" },
                    { user: "John Doe", action: "Modified", resource: "CRM Integration", time: "1 hour ago" },
                    { user: "Jane Smith", action: "Viewed", resource: "Analytics Dashboard", time: "2 hours ago" },
                    { user: "Admin User", action: "Deleted", resource: "Old Test Workflow", time: "Yesterday" },
                    { user: "John Doe", action: "Exported", resource: "Monthly Report", time: "Yesterday" },
                  ].map((activity, i) => (
                    <div key={i} className="grid grid-cols-4 p-4 text-sm">
                      <div className="font-medium">{activity.user}</div>
                      <div>{activity.action}</div>
                      <div>{activity.resource}</div>
                      <div className="text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
