import Head from "next/head";
import React from "react";

import { Metadata } from "@/config/metadata";
import { SettingsAppearance } from "@/page-implementations/settings/appearance";

const SettingsAppearancePage = () => {
  return (
    <>
      <Head>
        <title>{Metadata.title.settings.appearance}</title>
        <meta name="description" content="Update Taskify user's appearance" />
      </Head>
      <SettingsAppearance />
    </>
  );
};

export default SettingsAppearancePage;
