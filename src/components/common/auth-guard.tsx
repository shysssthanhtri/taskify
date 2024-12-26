import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

import { AuthPage } from "@/page-implementations/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        Authenticating
      </div>
    );
  }

  if (status === "unauthenticated") return <AuthPage />;

  return children;
};
