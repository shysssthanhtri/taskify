import React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BoardsNav } from "@/page-implementations/boards/shared/layouts/boards-nav";
import { TeamsSelect } from "@/page-implementations/boards/shared/layouts/teams-select";
import { TeamsSwitcher } from "@/page-implementations/boards/shared/layouts/teams-switcher";
import { UserNav } from "@/page-implementations/boards/shared/layouts/user-nav";

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
      </SidebarContent>
      <SidebarFooter>
        <TeamsSelect />
        <Separator />
        <UserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
