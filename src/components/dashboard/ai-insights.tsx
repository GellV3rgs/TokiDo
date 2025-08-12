"use client";

import { useState, useTransition } from "react";
import { BrainCircuit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getTaskInsights } from "@/app/actions";
import { completedTasks } from "@/lib/data";
import { Skeleton } from "../ui/skeleton";

export function AiInsights() {
  const [insights, setInsights] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateInsights = () => {
    startTransition(async () => {
      try {
        const result = await getTaskInsights({
          completedTasksData: JSON.stringify(completedTasks),
        });
        setInsights(result.insights);
        toast({
          title: "Insights Generated",
          description: "AI analysis is complete.",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate AI insights.",
        });
      }
    });
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">AI-Powered Insights</CardTitle>
            <CardDescription>
              Analyze past performance to optimize future projects.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {insights && !isPending && (
          <div className="prose prose-sm dark:prose-invert rounded-lg border bg-background/50 p-4">
            <p>{insights}</p>
          </div>
        )}
        <Button onClick={handleGenerateInsights} disabled={isPending} className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          {isPending ? "Analyzing..." : "Generate Insights"}
        </Button>
      </CardContent>
    </Card>
  );
}
