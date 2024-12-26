import Head from "next/head";
import { signIn } from "next-auth/react";
import React from "react";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Metadata } from "@/config/metadata";

export const AuthPage = () => {
  return (
    <>
      <Head>
        <title>{Metadata.title.authentication}</title>
      </Head>
      <div className="flex h-full">
        <div className="hidden flex-1 flex-col bg-zinc-900 text-lg text-white md:flex">
          <div className="flex-1 p-8">{Metadata.name}</div>
          <div className="p-8">{Metadata.description}</div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4 bg-muted">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In to continue
          </h1>
          <Button
            variant="outline"
            type="button"
            onClick={() => signIn("google")}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>
    </>
  );
};
