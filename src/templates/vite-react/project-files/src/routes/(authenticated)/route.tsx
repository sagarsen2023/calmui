import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/modules/layout/header";
import SideBar from "@/modules/layout/sidebar";

export const Route = createFileRoute("/(authenticated)")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        <SideBar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative w-full">
          {/* Top Bar */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 overflow-auto px-6 mt-20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
