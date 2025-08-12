"use client";

import { Bell, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserNav } from "@/components/dashboard/user-nav";
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "next-themes";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useState } from "react";

// Placeholder for now. We don't have role management passed to this component yet.
export function Header() {
  const { toggleSidebar, isMobile } = useSidebar();
  
  // This is a placeholder. In a real app, role would come from a context or session.
  const [role, setRole] = useState('manager');
  const handleRoleChange = (checked: boolean) => {
    setRole(checked ? 'manager' : 'member');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}

      <div className="flex-1">
        <h1 className="font-headline text-xl font-bold capitalize">
            {role}'s Dashboard
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
            <Label htmlFor="role-switcher" className="text-sm font-medium hidden sm:block">
                Member
            </Label>
            <Switch 
                id="role-switcher" 
                checked={role === 'manager'}
                onCheckedChange={handleRoleChange}
                aria-label="Toggle role between member and manager"
            />
            <Label htmlFor="role-switcher" className="text-sm font-medium hidden sm:block">
                Manager
            </Label>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>No new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserNav />
      </div>
    </header>
  );
}
