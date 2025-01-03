import Head from "next/head";
import React from "react";

import { Metadata } from "@/config/metadata";
import { SettingsProfile } from "@/page-implementations/settings/profile";

const SettingsProfilePage = () => {
  return (
    <>
      <Head>
        <title>{Metadata.title.settings.profile}</title>
        <meta name="description" content="Update Taskify user's profile" />
      </Head>
      <SettingsProfile />
    </>
  );
};

export default SettingsProfilePage;
