import { useSession } from "next-auth/react";
import React from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { CreateTeamDialog } from "@/page-implementations/boards/shared/dialogs/create-team.dialog";
import { api } from "@/utils/api";

interface TeamsGuardProps {
  children: React.ReactNode;
}
export const TeamsGuard = ({ children }: TeamsGuardProps) => {
  const { data: session } = useSession();
  const {
    data: teams = [],
    isFetched,
    isFetching,
    refetch,
  } = api.team.get.useQuery(undefined, {
    enabled: !!session?.user,
  });
  const { mutate, isPending } = api.team.create.useMutation({
    onSuccess: () => refetch(),
  });

  if (!isFetched || isFetching) {
    return <LoadingPage message="Loading teams" />;
  }

  if (!teams.length) {
    return <CreateTeamDialog open isPending={isPending} onSubmit={mutate} />;
  }
  return <>{children}</>;
};
