import Head from "next/head";
import { useSession } from "next-auth/react";
import React from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { AuthPage } from "@/page-implementations/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>{Metadata.title.home}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      {status === "loading" && <LoadingPage message="Authenticating" />}
      {status === "unauthenticated" && <AuthPage />}
      {status === "authenticated" && children}
    </>
  );
};
