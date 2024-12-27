import React from "react";

import { TeamsGuard } from "@/page-implementations/boards/guards/teams.guard";

interface BoardLayoutProps {
  children: React.ReactNode;
}
export const BoardLayout = ({ children }: BoardLayoutProps) => {
  return <TeamsGuard>{children}</TeamsGuard>;
};
