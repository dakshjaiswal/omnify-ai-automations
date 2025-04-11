
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, AlertTriangle } from "lucide-react";

// Mock data for users and permissions
const users = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Invited" },
];

const permissions = [
  { name: "Dashboard", admin: true, user: true },
  { name: "Create Workflows", admin: true, user: true },
  { name: "Edit Workflows", admin: true, user: false },
  { name: "Delete Workflows", admin: true, user: false },
  { name: "View Analytics", admin: true, user: true },
  { name: "Export Data", admin: true, user: false },
  { name: "Manage Users", admin: true, user: false },
  { name: "API Access", admin: true, user: false },
  { name: "Security Settings", admin: true, user: false },
];

export function AccessControlTab() {
  const { toast } = useToast();
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Users & Permissions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage who has access to Omnify and what they can do
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">User Management</h3>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "Admin" ? "default" : "outline"}
                          className={user.role === "Admin" ? "bg-sidebar-primary" : ""}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            user.status === "Active"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-yellow-500/20 text-yellow-500"
                          )}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Permission Roles</h3>
              <p className="text-sm text-muted-foreground">
                Configure what different user roles can access
              </p>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                    <TableHead className="text-center">User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.name}>
                      <TableCell className="font-medium">{permission.name}</TableCell>
                      <TableCell className="text-center">
                        {permission.admin ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {permission.user ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
