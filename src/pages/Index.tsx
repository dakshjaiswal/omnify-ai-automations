
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart4, CalendarClock, Lock, Settings, Workflow, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Simulated login for demo purposes
  const simulateLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome to Omnify",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-omnify-900 to-omnify-800">
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary mb-2">Omnify</h1>
            <p className="text-muted-foreground">
              The AI-powered business automation platform
            </p>
          </div>
          <AuthForm />
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              className="text-sidebar-primary" 
              onClick={simulateLogin}
            >
              Demo Login (Skip Authentication)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard features
  const features = [
    {
      title: "Automated Workflows",
      description: "Create and manage intelligent workflows that reduce manual tasks and errors",
      icon: <Workflow className="h-6 w-6" />,
      path: "/workflows",
      color: "from-omnify-teal/20 to-omnify-teal/10",
      textColor: "text-omnify-teal",
    },
    {
      title: "Real-Time Analytics",
      description: "Get insights into your business operations with live dashboards and reports",
      icon: <BarChart4 className="h-6 w-6" />,
      path: "/analytics",
      color: "from-omnify-indigo/20 to-omnify-indigo/10",
      textColor: "text-omnify-indigo",
    },
    {
      title: "Integration Simulator",
      description: "Connect with existing systems using our API simulation tools",
      icon: <Zap className="h-6 w-6" />,
      path: "/integration",
      color: "from-omnify-purple/20 to-omnify-purple/10",
      textColor: "text-omnify-purple",
    },
    {
      title: "Security Settings",
      description: "Configure enterprise-grade security and access controls",
      icon: <Lock className="h-6 w-6" />,
      path: "/security",
      color: "from-omnify-red/20 to-omnify-red/10",
      textColor: "text-omnify-red",
    },
  ];

  const stats = [
    { label: "Automated Tasks", value: "142", change: "+12%" },
    { label: "Efficiency Gain", value: "27%", change: "+5%" },
    { label: "Error Reduction", value: "68%", change: "+7%" },
    { label: "Time Saved", value: "143h", change: "+28%" },
  ];

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 min-h-screen animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Welcome to Omnify</h1>
        <p className="text-muted-foreground">
          Your AI-powered business automation platform
        </p>
      </header>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
        {features.map((feature, index) => (
          <Link to={feature.path} key={index} className="block group">
            <Card className={cn(
              "glass-card overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-sidebar-primary/50",
              "h-full"
            )}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-2 rounded-lg bg-gradient-to-br",
                    feature.color
                  )}>
                    <div className={feature.textColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="mt-2 animated-border-button"
                >
                  Explore {feature.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Last login: Today at 9:41 AM
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
