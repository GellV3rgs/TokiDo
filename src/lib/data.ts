export type TaskStatus = "To Do" | "In Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedTo: string;
  deadline?: Date;
};

export type User = {
    id: string;
    name: string;
    avatarUrl: string;
}

export const users: User[] = [
    { id: 'user-1', name: 'Alex Doe', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'user-2', name: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 'user-3', name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
];

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design Homepage UI",
    description: "Create a modern and responsive design for the main landing page.",
    status: "In Progress",
    assignedTo: "Alex Doe",
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
  {
    id: "task-2",
    title: "Develop Authentication Flow",
    description: "Implement user sign-up and sign-in using NextAuth.",
    status: "To Do",
    assignedTo: "Jane Smith",
    deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
  },
  {
    id: "task-3",
    title: "Setup Database Schema",
    description: "Define and create the initial database schema using Prisma.",
    status: "To Do",
    assignedTo: "Jane Smith",
  },
  {
    id: "task-4",
    title: "Write API documentation",
    description: "Document all public API endpoints using Swagger.",
    status: "Done",
    assignedTo: "Sam Wilson",
    deadline: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "task-5",
    title: "Team Onboarding Session",
    status: "Done",
    assignedTo: "Alex Doe",
    deadline: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
   {
    id: "task-6",
    title: "Fix Login Page CSS",
    description: "The forgot password link is misaligned on mobile.",
    status: "In Progress",
    assignedTo: "Sam Wilson",
    deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];


// Data for AI Deadline Suggestions
export const pastTasks = [
  { description: "Design a simple logo", timeTakenHours: 4 },
  { description: "Create a full brand identity guide", timeTakenHours: 24 },
  { description: "Design a single promotional banner", timeTakenHours: 3 },
  { description: "Design UI for a 5-page marketing website", timeTakenHours: 40 },
  { description: "Create wireframes for a mobile app", timeTakenHours: 32 },
];


// Data for AI Insights
export const completedTasks = [
    { 
        description: "Develop user authentication feature", 
        assignedTo: "Jane Smith", 
        timeTakenHours: 40,
        deadlineMet: true,
    },
    { 
        description: "Write API documentation", 
        assignedTo: "Sam Wilson",
        timeTakenHours: 18,
        deadlineMet: true,
    },
     { 
        description: "Design marketing banners", 
        assignedTo: "Alex Doe",
        timeTakenHours: 12,
        deadlineMet: false, // Took longer than expected
    },
    { 
        description: "Initial server setup and deployment",
        assignedTo: "Jane Smith",
        timeTakenHours: 25,
        deadlineMet: true,
    },
];
