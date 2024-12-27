import { useSession } from "next-auth/react";
import React from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { AuthPage } from "@/page-implementations/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingPage message="Authenticating" />;
  }

  if (status === "unauthenticated") return <AuthPage />;

  return children;
};
