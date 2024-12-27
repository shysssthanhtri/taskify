import Head from "next/head";
import React from "react";

import { SettingsAppearance } from "@/page-implementations/settings/appearance";

const SettingsAppearancePage = () => {
  return (
    <>
      <Head>
        <title>Settings - Appearance</title>
        <meta name="description" content="Update Taskify user's appearance" />
      </Head>
      <SettingsAppearance />
    </>
  );
};

export default SettingsAppearancePage;
