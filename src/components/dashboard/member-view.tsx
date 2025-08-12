import type { Role } from "./dashboard-client";
import type { Task } from "@/lib/data";
import { TaskList } from "./task-list";
import { TimeLogger } from "./time-logger";

interface MemberViewProps {
  tasks: Task[];
  role: Role;
  handleTaskUpdate: (task: Task) => void;
}

export function MemberView({ tasks, handleTaskUpdate }: MemberViewProps) {
  // In a real app, we'd filter for tasks assigned to the current user.
  const memberTasks = tasks.filter(task => task.assignedTo === 'Alex Doe');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
         <h2 className="font-headline text-3xl font-bold">My Tasks</h2>
        <TaskList tasks={memberTasks} onTaskUpdate={handleTaskUpdate} view="member" />
      </div>
      <div className="lg:col-span-1 space-y-8">
        <h2 className="font-headline text-3xl font-bold">Time Tracking</h2>
        <TimeLogger />
      </div>
    </div>
  );
}
