import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { Routes } from "@/config/routes";
import { ProjectEntity } from "@/entities/project.entity";
import { useTeams } from "@/hooks/use-teams";
import { api } from "@/utils/api";

export const useProjects = () => {
  const router = useRouter();
  const { activeTeamId } = useTeams();

  const {
    data: projects = [],
    refetch,
    isFetched,
    isFetching,
  } = api.project.get.useQuery(
    { teamId: activeTeamId },
    {
      enabled: !!activeTeamId,
    },
  );

  const { mutate, isPending } = api.project.create.useMutation({
    onSuccess: () => refetch(),
  });

  const activeProjectId = useMemo<string>(() => {
    if (!router.query.projectId) return "";

    const parsedResult = validateProjectIdSchema.safeParse({
      id: router.query.projectId,
    });

    if (!parsedResult.success) {
      void router.push(Routes.teams.id(activeTeamId));
      return "";
    }

    return parsedResult.data.id;
  }, [activeTeamId, router]);

  const setActiveProjectId = useCallback(
    (projectId: string) => {
      void router.push(Routes.projects.kanban(activeTeamId, projectId));
    },
    [activeTeamId, router],
  );

  const initActiveProjectId = useCallback(() => {
    const projectId = projects[0]?.id;
    if (!projectId) return;
    setActiveProjectId(projectId);
  }, [setActiveProjectId, projects]);

  return {
    projects,
    isLoading: !isFetched || isFetching,
    create: (project: Omit<Parameters<typeof mutate>[0], "teamId">) =>
      mutate({
        ...project,
        teamId: activeTeamId,
      }),
    isCreating: isPending,
    activeProjectId,
    initActiveProjectId,
    setActiveProjectId,
  };
};

const validateProjectIdSchema = ProjectEntity.pick({ id: true });
