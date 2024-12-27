import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { api } from "@/utils/api";

const TeamPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const teamId = useMemo<string>(() => router.query.teamId as string, [router]);
  const {
    data: projects = [],
    isFetched,
    isFetching,
    refetch,
  } = api.project.get.useQuery(
    { teamId },
    {
      enabled: !!session?.user && !!teamId,
    },
  );

  return <LoadingPage message="Loading projects" />;
};

export default TeamPage;
