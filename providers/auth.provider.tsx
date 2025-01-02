"use client";

import ReviewLoader from "@/app/loading";
import { useUser } from "@/hooks/use-user";
import { UserResponse } from "@/types/auth/user";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  user: UserResponse | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <ReviewLoader />;
  }

  if (!user) {
    return null;
  }

  const value = {
    user,
    isLoading: isUserLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
