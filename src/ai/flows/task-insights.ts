'use server';

/**
 * @fileOverview An AI-powered tool to analyze past project data and generate insights for more efficient project planning and task assignments.
 *
 * - generateTaskInsights - A function that handles the generation of task insights.
 * - TaskInsightsInput - The input type for the generateTaskInsights function.
 * - TaskInsightsOutput - The return type for the generateTaskInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskInsightsInputSchema = z.object({
  completedTasksData: z.string().describe('JSON string containing data of completed tasks, including completion times, resource allocation, task descriptions, and assigned personnel.'),
});
export type TaskInsightsInput = z.infer<typeof TaskInsightsInputSchema>;

const TaskInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights and recommendations for optimizing project planning and task assignments, including potential deadline adjustments for similar tasks in the future.'),
});
export type TaskInsightsOutput = z.infer<typeof TaskInsightsOutputSchema>;

export async function generateTaskInsights(input: TaskInsightsInput): Promise<TaskInsightsOutput> {
  return taskInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taskInsightsPrompt',
  input: {schema: TaskInsightsInputSchema},
  output: {schema: TaskInsightsOutputSchema},
  prompt: `You are an AI assistant designed to analyze past project data and generate insights for more efficient project planning and task assignments.

  Analyze the following data from completed tasks:
  {{completedTasksData}}

  Based on this data, provide actionable insights and recommendations for optimizing project planning, task assignments, and potential deadline adjustments for future projects. Focus on identifying patterns and suggesting improvements to enhance team productivity and resource utilization. The output should be easily understandable and actionable for project managers.
  Limit to no more than 300 words.
  `,
});

const taskInsightsFlow = ai.defineFlow(
  {
    name: 'taskInsightsFlow',
    inputSchema: TaskInsightsInputSchema,
    outputSchema: TaskInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
