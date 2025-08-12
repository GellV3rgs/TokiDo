import type { Task, TaskStatus } from "@/lib/data";
import { TaskCard } from "./task-card";

type TaskListProps = {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  view: "manager" | "member";
};

const columns: TaskStatus[] = ["To Do", "In Progress", "Done"];

export function TaskList({ tasks, onTaskUpdate, view }: TaskListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((status) => (
        <div key={status} className="space-y-4 rounded-lg bg-card/50 p-4">
          <h3 className="font-headline text-lg font-bold text-center">{status}</h3>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdate={onTaskUpdate}
                />
              ))}
            {tasks.filter((task) => task.status === status).length === 0 && (
                <p className="text-center text-sm text-muted-foreground pt-4">No tasks here.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
