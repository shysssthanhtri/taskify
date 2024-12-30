import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

import { api } from "@/utils/api";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const {
    data: user,
    refetch,
    isFetching,
    isFetched,
  } = api.profile.get.useQuery(undefined, {
    enabled: !!session?.user,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const { mutateAsync: getUploadImageUrl } =
    api.profile.getUploadImageUrl.useMutation({});
  const { mutateAsync } = api.profile.update.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const updateProfile = useCallback(
    async (user: {
      name?: string | null;
      alias?: string | null;
      image: string | null | undefined | File;
    }) => {
      setIsUpdating(true);
      try {
        const image = user.image;
        const actualUrl =
          image instanceof File
            ? await (async () => {
                const { uploadUrl, actualUrl } = await getUploadImageUrl({
                  contentType: image.type,
                });
                await fetch(uploadUrl, {
                  method: "put",
                  headers: {
                    "Content-Type": image.type,
                  },
                  body: image,
                });
                return actualUrl;
              })()
            : image;

        await mutateAsync({
          ...user,
          image: actualUrl,
        });
      } catch (err) {
      } finally {
        setIsUpdating(false);
      }
    },
    [getUploadImageUrl, mutateAsync],
  );

  return {
    user,
    isLoading: !isFetched || isFetching,
    sessionStatus: status,
    isUpdating,
    updateProfile,
  };
};
