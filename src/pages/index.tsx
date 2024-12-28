import Head from "next/head";
import { useEffect } from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { useTeams } from "@/hooks/use-teams";
import { CreateTeamDialog } from "@/page-implementations/boards/shared/dialogs/create-team.dialog";

export default function Home() {
  const { teams, isLoading, create, isCreating, initActiveTeamId } = useTeams();

  useEffect(() => {
    initActiveTeamId();
  }, [initActiveTeamId]);

  return (
    <>
      <Head>
        <title>{Metadata.title.home}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      <>
        <LoadingPage message="Loading teams" />
        <CreateTeamDialog
          open={!isLoading && !teams.length}
          isPending={isCreating}
          onSubmit={create}
        />
      </>
    </>
  );
}
