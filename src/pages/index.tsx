import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { LoadingPage } from "@/components/common/loading-page";
import { Metadata } from "@/config/metadata";
import { Routes } from "@/config/routes";
import { CreateTeamDialog } from "@/page-implementations/boards/shared/dialogs/create-team.dialog";
import { api } from "@/utils/api";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: teams = [],
    refetch,
    isFetched,
  } = api.team.get.useQuery(undefined, {
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

  return (
    <>
      <Head>
        <title>{Metadata.title.home}</title>
        <meta name="description" content={Metadata.description} />
      </Head>
      {!teams.length && isFetched ? (
        <CreateTeamDialog open isPending={isPending} onSubmit={mutate} />
      ) : (
        <LoadingPage message="Loading teams" />
      )}
    </>
  );
}
