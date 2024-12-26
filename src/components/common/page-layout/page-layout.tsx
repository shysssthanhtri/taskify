import { AppSidebar } from "@/components/common/page-layout/app-sidebar";
import { PageContentHeader } from "@/components/common/page-layout/page-content-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface PayLayoutProps {
  children: React.ReactNode;
}
export const PayLayout = ({ children }: PayLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageContentHeader />
        <div className="p-2 md:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
