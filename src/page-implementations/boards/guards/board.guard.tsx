import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { ForbiddenPage } from "@/components/common/forbidden-page";
import { LoadingPage } from "@/components/common/loading-page";
import { ProjectEntity } from "@/entities/project.entity";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/utils/api";

interface BoardGuardProps {
  children: React.ReactNode;
}
export const BoardGuard = ({ children }: BoardGuardProps) => {
  const { query } = useRouter();
  const { user } = useCurrentUser();

  const { id: projectId, teamId } = useMemo(() => {
    return ProjectEntity.pick({ id: true, teamId: true }).parse({
      id: query.projectId,
      teamId: query.teamId,
    });
  }, [query]);

  const {
    data: canAccess,
    isFetched,
    isFetching,
  } = api.permission.checkUserCanAccessProject.useQuery(
    {
      id: projectId,
      teamId,
    },
    { enabled: !!user },
  );

  if (!isFetched || isFetching) {
    return <LoadingPage message="Checking project permission" />;
  }

  if (!canAccess) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};
