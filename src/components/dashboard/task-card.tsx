"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/data";
import { users } from "@/lib/data";
import { Calendar, MoreVertical, CheckCircle, Clock, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";

type TaskCardProps = {
  task: Task;
  onTaskUpdate: (task: Task) => void;
};

const statusConfig: Record<TaskStatus, { color: string; icon: React.ElementType }> = {
  "To Do": { color: "bg-gray-400", icon: PlayCircle },
  "In Progress": { color: "bg-blue-500", icon: Clock },
  "Done": { color: "bg-green-500", icon: CheckCircle },
};

export function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  const assignedUser = users.find(u => u.name === task.assignedTo);

  const handleStatusChange = (newStatus: TaskStatus) => {
    onTaskUpdate({ ...task, status: newStatus });
  };

  const { icon: StatusIcon, color } = statusConfig[task.status];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-lg">{task.title}</CardTitle>
                <CardDescription className="line-clamp-2">{task.description}</CardDescription>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleStatusChange("To Do")}>To Do</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("In Progress")}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("Done")}>Done</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StatusIcon className={cn("h-4 w-4", color.replace('bg-', 'text-'))} />
            <Badge
                className={cn("text-white", color)}
            >
                {task.status}
            </Badge>
            {task.deadline && (
                <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(task.deadline, 'MMM dd')}</span>
                </div>
            )}
        </div>
        
        <div className="flex items-center gap-2">
          {assignedUser && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={assignedUser.avatarUrl} alt={assignedUser.name} />
              <AvatarFallback>{assignedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
