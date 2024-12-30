import Head from "next/head";
import React from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AuthPage } from "@/page-implementations/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { sessionStatus } = useCurrentUser();
  return (
    <>
      <Head>
        <title>{Metadata.title.home}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      {sessionStatus === "loading" && <LoadingPage message="Authenticating" />}
      {sessionStatus === "unauthenticated" && <AuthPage />}
      {sessionStatus === "authenticated" && children}
    </>
  );
};
