
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart4, 
  LogOut, 
  Plug, 
  Settings, 
  Shield, 
  User,
  Workflow, 
  ChevronLeft, 
  ChevronRight,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Automated Workflows", path: "/workflows", icon: Workflow },
  { name: "Analytics", path: "/analytics", icon: BarChart4 },
  { name: "Integration Simulator", path: "/integration", icon: Plug },
  { name: "Security Settings", path: "/security", icon: Shield },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold">O</span>
            </div>
            <span className="ml-2 text-xl font-bold text-sidebar-foreground">Omnify</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold">O</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-1 px-2">
            {mainNavItems.map((item) => (
              <Tooltip key={item.path} delayDuration={collapsed ? 0 : 1000}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2 rounded-md transition-colors group",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                        collapsed && "justify-center"
                      )
                    }
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "sm"}
                  className={cn(
                    "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                    collapsed && "mx-auto"
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  {!collapsed && <span className="ml-2">Logout</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
