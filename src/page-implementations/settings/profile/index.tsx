import { useSession } from "next-auth/react";
import React, { useRef } from "react";

import { ButtonLoading } from "@/components/ui/button";
import {
  ProfileForm,
  type ProfileFormRef,
} from "@/page-implementations/settings/profile/forms/profile.form";
import { SettingsPageLayout } from "@/page-implementations/settings/settings-page-layout";

export const SettingsProfile = () => {
  const { data } = useSession();
  const ref = useRef<ProfileFormRef>(null);

  const user = data?.user;
  if (!user) return null;

  return (
    <SettingsPageLayout>
      <ProfileForm
        ref={ref}
        user={user}
        onSubmit={(value) => {
          console.log(value);
        }}
      />
      <ButtonLoading onClick={() => ref.current?.submit()}>Save</ButtonLoading>
    </SettingsPageLayout>
  );
};
