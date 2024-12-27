import { useSession } from "next-auth/react";
import React, { useRef } from "react";

import { ButtonLoading } from "@/components/ui/button";
import {
  ProfileForm,
  type ProfileFormRef,
} from "@/page-implementations/settings/profile/forms/profile.form";
import { SettingsPageLayout } from "@/page-implementations/settings/settings-page-layout";
import { api } from "@/utils/api";

export const SettingsProfile = () => {
  const { data } = useSession();
  const ref = useRef<ProfileFormRef>(null);
  const {
    data: user,
    isLoading,
    refetch,
  } = api.profile.get.useQuery(undefined, {
    enabled: !!data?.user,
  });
  const { mutate, isPending } = api.profile.update.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <SettingsPageLayout isLoading={isLoading}>
      {!!user && (
        <>
          <ProfileForm
            ref={ref}
            user={user}
            onSubmit={mutate}
            isPending={isPending}
          />
          <ButtonLoading
            onClick={() => ref.current?.submit()}
            isLoading={isPending}
          >
            Save
          </ButtonLoading>
        </>
      )}
    </SettingsPageLayout>
  );
};
