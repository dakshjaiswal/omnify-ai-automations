
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import Index from "./pages/Index";
import WorkflowsPage from "./pages/WorkflowsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import IntegrationPage from "./pages/IntegrationPage";
import SecurityPage from "./pages/SecurityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/workflows" element={<WorkflowsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/integration" element={<IntegrationPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
