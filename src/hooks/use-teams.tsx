import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

import { Routes } from "@/config/routes";
import { TeamEntity } from "@/entities/team.entity";
import { api } from "@/utils/api";

export const useTeams = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const {
    data: teams = [],
    refetch,
    isFetched,
    isFetching,
  } = api.team.get.useQuery(undefined, {
    enabled: !!session?.user,
  });

  const { mutate, isPending } = api.team.create.useMutation({
    onSuccess: () => refetch(),
  });

  const activeTeamId = useMemo<string>(() => {
    if (!router.query.teamId) return "";

    const parsedResult = validateTeamIdSchema.safeParse({
      id: router.query.teamId,
    });

    if (!parsedResult.success) {
      void router.push(Routes.home);
      return "";
    }

    return parsedResult.data.id;
  }, [router]);

  const setActiveTeamId = useCallback(
    (teamId: string) => {
      void router.push(Routes.teams.id(teamId));
    },
    [router],
  );

  const initActiveTeamId = useCallback(() => {
    const teamId = teams[0]?.id;
    if (!teamId) return;
    setActiveTeamId(teamId);
  }, [setActiveTeamId, teams]);

  return {
    teams,
    refetch,
    isLoading: !isFetched || isFetching,
    isCreating: isPending,
    create: mutate,
    activeTeamId,
    setActiveTeamId,
    initActiveTeamId,
  };
};

const validateTeamIdSchema = TeamEntity.pick({ id: true });
