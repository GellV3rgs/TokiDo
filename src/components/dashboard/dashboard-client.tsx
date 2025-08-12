"use client";

import { useState } from "react";
import type { Task } from "@/lib/data";
import { initialTasks } from "@/lib/data";
import { ManagerView } from "@/components/dashboard/manager-view";
import { MemberView } from "@/components/dashboard/member-view";

export type Role = "manager" | "member";

export function DashboardClient() {
  const [role, setRole] = useState<Role>("manager");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskCreate = (newTask: Omit<Task, 'id'>) => {
    setTasks(prevTasks => [
        ...prevTasks,
        {
            ...newTask,
            id: `task-${prevTasks.length + 1}`
        }
    ]);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const props = {
    tasks,
    handleTaskCreate,
    handleTaskUpdate,
    role, // Pass the role for context
    setRole, // Pass the setter to the header
  };

  // In a real app, you might have different layouts or components per role.
  // Here we conditionally render the main view component.
  return (
    <div className="space-y-8">
      {role === "manager" ? <ManagerView {...props} /> : <MemberView {...props} />}
    </div>
  );
}
