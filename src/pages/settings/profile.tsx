import Head from "next/head";
import React from "react";

import { SettingsProfile } from "@/page-implementations/settings/profile";

const SettingsProfilePage = () => {
  return (
    <>
      <Head>
        <title>Settings - Profile</title>
        <meta name="description" content="Update Taskify user's profile" />
      </Head>
      <SettingsProfile />
    </>
  );
};

export default SettingsProfilePage;
