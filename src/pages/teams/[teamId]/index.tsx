import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";

import { ForbiddenPage } from "@/components/common/forbidden-page";
import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { Routes } from "@/config/routes";
import { TeamEntity } from "@/entities/team.entity";
import { CreateProjectDialog } from "@/page-implementations/boards/shared/dialogs/create-project.dialog";
import { api } from "@/utils/api";

const TeamPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const teamId = useMemo(() => {
    const obj = TeamEntity.pick({ id: true }).parse({
      id: router.query.teamId,
    });
    return obj.id;
  }, [router]);

  const { data: canAccess, isFetched: isAccessChecked } =
    api.permission.checkUserCanAccessTeam.useQuery(
      { id: teamId },
      {
        enabled: !!session?.user && !!teamId,
      },
    );

  const {
    data: projects = [],
    refetch,
    isFetched,
  } = api.project.get.useQuery(
    { teamId },
    {
      enabled: !!session?.user && !!teamId && !!canAccess,
    },
  );
  const { mutate, isPending } = api.project.create.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const project = projects[0];
    if (project) {
      void router.push(Routes.projects.kanban(project.teamId, project.id));
    }
  }, [projects, router]);

  if (isAccessChecked) {
    if (!canAccess) {
      return <ForbiddenPage />;
    }

    if (!projects.length && isFetched) {
      return (
        <CreateProjectDialog
          open
          isPending={isPending}
          onSubmit={(project) =>
            mutate({
              ...project,
              teamId,
            })
          }
        />
      );
    }
  }

  return (
    <>
      <Head>
        <title>{Metadata.title.board.team}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      {isAccessChecked && !canAccess && <ForbiddenPage />}
      {isAccessChecked && canAccess && !projects.length && isFetched && (
        <CreateProjectDialog
          open
          isPending={isPending}
          onSubmit={(project) =>
            mutate({
              ...project,
              teamId,
            })
          }
        />
      )}
      {isAccessChecked && canAccess && !(!projects.length && isFetched) && (
        <LoadingPage message="Loading projects" />
      )}
    </>
  );
};

export default TeamPage;
