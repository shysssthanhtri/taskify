import type React from "react";

import { ForbiddenPage } from "@/components/common/forbidden-page";
import { LoadingPage } from "@/components/common/loading-page";
import { useTeams } from "@/hooks/use-teams";
import { api } from "@/utils/api";

interface TeamGuardProps {
  children: React.ReactNode;
}
export const TeamGuard = ({ children }: TeamGuardProps) => {
  const { activeTeamId } = useTeams();

  const {
    data: canAccess,
    isFetched,
    isFetching,
  } = api.permission.checkUserCanAccessTeam.useQuery(
    { id: activeTeamId },
    {
      enabled: !!activeTeamId,
    },
  );

  if (!isFetched || isFetching) {
    return <LoadingPage message="Checking team permissions" />;
  }

  if (!canAccess) {
    return <ForbiddenPage />;
  }

  return children;
};
