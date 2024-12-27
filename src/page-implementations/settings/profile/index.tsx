import { useSession } from "next-auth/react";
import React from "react";

import { ProfileForm } from "@/page-implementations/settings/profile/forms/profile.form";
import { SettingsPageLayout } from "@/page-implementations/settings/settings-page-layout";

export const SettingsProfile = () => {
  const { data } = useSession();
  const user = data?.user;
  if (!user) return null;

  return (
    <SettingsPageLayout>
      <ProfileForm user={user} />
    </SettingsPageLayout>
  );
};
