import { PlusCircle } from "lucide-react";
import type { Role } from "./dashboard-client";
import type { Task } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AiInsights } from "./ai-insights";
import { CreateTaskDialog } from "./create-task-dialog";
import { TaskList } from "./task-list";

interface ManagerViewProps {
  tasks: Task[];
  role: Role;
  handleTaskCreate: (task: Omit<Task, 'id'>) => void;
  handleTaskUpdate: (task: Task) => void;
}

export function ManagerView({ tasks, handleTaskCreate, handleTaskUpdate }: ManagerViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-3xl font-bold">All Tasks</h2>
          <CreateTaskDialog onTaskCreate={handleTaskCreate}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </CreateTaskDialog>
        </div>
        <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} view="manager" />
      </div>

      <div className="lg:col-span-1 space-y-8">
        <h2 className="font-headline text-3xl font-bold">Productivity Tools</h2>
        <AiInsights />
      </div>
    </div>
  );
}
