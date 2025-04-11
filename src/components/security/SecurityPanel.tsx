
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessControlTab } from "./tabs/AccessControlTab";
import { AuthenticationTab } from "./tabs/AuthenticationTab";
import { ApiSecurityTab } from "./tabs/ApiSecurityTab";
import { DataProtectionTab } from "./tabs/DataProtectionTab";

export function SecurityPanel() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="access" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="api">API Security</TabsTrigger>
          <TabsTrigger value="data">Data Protection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="access" className="space-y-6">
          <AccessControlTab />
        </TabsContent>
        
        <TabsContent value="auth" className="space-y-6">
          <AuthenticationTab />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <ApiSecurityTab />
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <DataProtectionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
