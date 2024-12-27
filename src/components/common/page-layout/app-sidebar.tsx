import React from "react";

import { BoardsNav } from "@/components/common/page-layout/boards-nav";
import { ProjectsNav } from "@/components/common/page-layout/projects-nav";
import { TeamsSwitcher } from "@/components/common/page-layout/teams-switcher";
import { UserNav } from "@/components/common/page-layout/user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
export const AppSidebar = (props: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamsSwitcher
          teams={[
            {
              id: "1",
              name: "Team 1",
            },
            {
              id: "2",
              name: "Team 2",
            },
            {
              id: "3",
              name: "Team 3",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <BoardsNav />
        <ProjectsNav />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
