import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { Metadata } from "@/config/metadata";
import { Routes } from "@/config/routes";
import { SettingsPageSidebar } from "@/page-implementations/settings/shared/settings-page-sidebar";

interface SettingsPageLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}
export const SettingsPageLayout = ({
  children,
  isLoading,
}: SettingsPageLayoutProps) => {
  return (
    <div className="container mx-auto space-y-6 p-10">
      <div className="space-y-0.5">
        <Link href={Routes.home} className="text-sm hover:underline">
          Back to {Metadata.name}
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal profile.
          <br />
          This will be shared across teams and projects.
        </p>
      </div>
      <Separator />
      <div className="flex gap-x-8">
        <SettingsPageSidebar />
        <div className="flex flex-1 flex-col gap-y-4">
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          {!isLoading && children}
        </div>
      </div>
    </div>
  );
};
