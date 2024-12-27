import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BoardGuard } from "@/page-implementations/boards/guards/board.guard";
import { AppSidebar } from "@/page-implementations/boards/shared/layouts/app-sidebar";
import { PageContentHeader } from "@/page-implementations/boards/shared/layouts/page-content-header";

interface BoardPageLayoutProps {
  children: React.ReactNode;
}
export const BoardPageLayout = ({ children }: BoardPageLayoutProps) => {
  return (
    <BoardGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <PageContentHeader />
          <div className="p-2 md:p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </BoardGuard>
  );
};
