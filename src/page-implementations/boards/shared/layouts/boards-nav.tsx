import { ChevronRight, type LucideIcon } from "lucide-react";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export const BoardsNav = () => {
  const items: {
    title: string;
    path: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      path: string;
    }[];
  }[] = [
    {
      title: "Scrum",
      path: "/scrum",
      items: [
        {
          title: "Active",
          path: "/scrum/active",
        },
        {
          title: "Backlog",
          path: "/scrum/backlog",
        },
      ],
    },
    {
      title: "Kanban",
      path: "/kanban",
      items: [
        {
          title: "Active",
          path: "/kanban/active",
        },
        {
          title: "Backlog",
          path: "/kanban/backlog",
        },
      ],
    },
    {
      title: "Settings",
      path: "/settings",
      items: [
        {
          title: "Account",
          path: "/settings/account",
        },
        {
          title: "Project",
          path: "/settings/project",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Boards</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.path}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
