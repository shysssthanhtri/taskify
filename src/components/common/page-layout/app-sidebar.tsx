import React from "react";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
export const AppSidebar = (props: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>Hello world</SidebarHeader>
    </Sidebar>
  );
};
