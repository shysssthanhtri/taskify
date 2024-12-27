import { useSession } from "next-auth/react";
import React from "react";

import { LoadingPage } from "@/components/common/loading-page";
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
  } = api.team.get.useQuery(undefined, {
    enabled: !!session?.user,
  });

  if (!isFetched || isFetching) {
    return <LoadingPage message="Loading teams" />;
  }

  if (!teams.length) {
    return <>Empty</>;
  }
  return <>{children}</>;
};
