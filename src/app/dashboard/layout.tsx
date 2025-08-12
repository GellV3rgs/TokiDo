import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  Home,
  ListTodo,
  BarChart2,
  Settings,
  BrainCircuit,
  Users,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Header } from "@/components/dashboard/header";
import { Logo } from "@/components/icons/logo";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: ListTodo, label: "Tasks", href: "/dashboard/tasks" },
  { icon: BrainCircuit, label: "AI Insights", href: "/dashboard/insights", managerOnly: true },
  { icon: BarChart2, label: "Reports", href: "/dashboard/reports" },
  { icon: Users, label: "Team", href: "/dashboard/team", managerOnly: true },
];


export default function DashboardLayout({
  children,
  ...props
}: {
  children: ReactNode;
}) {

  // This is a placeholder for real authentication logic.
  const isAuthenticated = true; 
  if (!isAuthenticated) {
    redirect("/");
  }

  // Placeholder for role, in a real app this would come from the session.
  const role = 'manager';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
                <Logo className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden">TimeFlow</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => 
                (!item.managerOnly || role === 'manager') && (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton tooltip={item.label} isActive={false}>
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <Header />
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
