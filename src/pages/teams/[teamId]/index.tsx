import Head from "next/head";
import React, { useEffect } from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { useProjects } from "@/hooks/use-projects";
import { TeamGuard } from "@/page-implementations/boards/guards/team.guard";
import { CreateProjectDialog } from "@/page-implementations/boards/shared/dialogs/create-project.dialog";

const TeamPage = () => {
  const { projects, create, isCreating, initActiveProjectId } = useProjects();

  useEffect(() => {
    initActiveProjectId();
  }, [initActiveProjectId]);

  return (
    <>
      <Head>
        <title>{Metadata.title.board.team}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      <TeamGuard>
        <CreateProjectDialog
          open={!projects.length}
          isPending={isCreating}
          onSubmit={create}
        />
        <LoadingPage message="Loading projects" />
      </TeamGuard>
    </>
  );
};

export default TeamPage;
