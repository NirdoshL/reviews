"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/providers/auth.provider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-muted-foreground">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-8">
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-sm">{user.data.name}</p>
            </div>
            <div className="flex gap-8">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm">{user.data.email}</p>
            </div>
            <div className="flex gap-8">
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <Badge variant="secondary" className="mt-1">
                {user.data.role}
              </Badge>
            </div>
            <div className="flex gap-8">
              <label className="text-sm font-medium text-muted-foreground">
                User ID
              </label>
              <p className="text-sm">{user.data._id}</p>
            </div>
            <div className="flex gap-8">
              <label className="text-sm font-medium text-muted-foreground">
                Account Status
              </label>
              <Badge
                variant={user.data.is_disabled ? "destructive" : "default"}
                className="mt-1"
              >
                {user.data.is_disabled ? "Disabled" : "Active"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
