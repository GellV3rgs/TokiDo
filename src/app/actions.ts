"use server";

import { suggestDeadline, SuggestDeadlineInput } from "@/ai/flows/deadline-suggestions";
import { generateTaskInsights, TaskInsightsInput } from "@/ai/flows/task-insights";

export async function getDeadlineSuggestion(input: SuggestDeadlineInput) {
  return await suggestDeadline(input);
}

export async function getTaskInsights(input: TaskInsightsInput) {
  return await generateTaskInsights(input);
}
