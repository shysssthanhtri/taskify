import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Routes } from "@/config/routes";
import { CreateTeamDialog } from "@/page-implementations/boards/shared/dialogs/create-team.dialog";
import { api } from "@/utils/api";

const TeamsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: teams = [], refetch } = api.team.get.useQuery(undefined, {
    enabled: !!session?.user,
  });
  const { mutate, isPending } = api.team.create.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const team = teams[0];
    if (team) {
      void router.push(Routes.teams.id(team.id));
    }
  }, [teams, router]);

  if (!teams.length) {
    return <CreateTeamDialog open isPending={isPending} onSubmit={mutate} />;
  }

  return <LoadingPage message="Loading teams" />;
};

export default TeamsPage;
