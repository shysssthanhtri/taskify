import React, { useRef } from "react";

import { Button, ButtonLoading } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  ProfileForm,
  type ProfileFormRef,
} from "@/page-implementations/settings/profile/forms/profile.form";
import { SettingsPageLayout } from "@/page-implementations/settings/settings-page-layout";

export const SettingsProfile = () => {
  const { user, isLoading, updateProfile, isUpdating } = useCurrentUser();
  const ref = useRef<ProfileFormRef>(null);

  return (
    <SettingsPageLayout isLoading={isLoading}>
      {!!user && (
        <>
          <ProfileForm
            ref={ref}
            user={user}
            onSubmit={updateProfile}
            isPending={isUpdating}
          />
          <Separator />
          <div className="flex gap-x-4">
            <Button
              onClick={() => ref.current?.reset()}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
            <ButtonLoading
              onClick={() => ref.current?.submit()}
              isLoading={isUpdating}
              className="flex-1"
            >
              Save
            </ButtonLoading>
          </div>
        </>
      )}
    </SettingsPageLayout>
  );
};
