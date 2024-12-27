import React from "react";

import { Separator } from "@/components/ui/separator";
import { SettingsPageSidebar } from "@/page-implementations/settings/shared/settings-page-sidebar";

interface SettingsPageLayoutProps {
  children: React.ReactNode;
}
export const SettingsPageLayout = ({ children }: SettingsPageLayoutProps) => {
  return (
    <div className="container mx-auto space-y-6 p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal profile.
          <br />
          This will be shared across teams and projects.
        </p>
      </div>
      <Separator />
      <div className="flex">
        <SettingsPageSidebar />
      </div>
    </div>
  );
};
