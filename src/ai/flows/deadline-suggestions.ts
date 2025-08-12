'use server';

/**
 * @fileOverview AI-powered deadline suggestion tool.
 *
 * - suggestDeadline - A function that suggests a deadline for a new task based on past performance.
 * - SuggestDeadlineInput - The input type for the suggestDeadline function.
 * - SuggestDeadlineOutput - The return type for the suggestDeadline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDeadlineInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The description of the task for which a deadline is needed.'),
  pastTasks: z
    .array(
      z.object({
        description: z.string().describe('Description of the past task.'),
        timeTakenHours: z
          .number()
          .describe('Time taken to complete the past task, in hours.'),
      })
    )
    .describe(
      'An array of past tasks with their descriptions and time taken to complete.'
    ),
});
export type SuggestDeadlineInput = z.infer<typeof SuggestDeadlineInputSchema>;

const SuggestDeadlineOutputSchema = z.object({
  suggestedDeadlineDays: z
    .number()
    .describe(
      'The suggested deadline for the new task, in number of days, based on past performance on similar tasks.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested deadline, explaining how past performance was analyzed.'
    ),
});
export type SuggestDeadlineOutput = z.infer<typeof SuggestDeadlineOutputSchema>;

export async function suggestDeadline(
  input: SuggestDeadlineInput
): Promise<SuggestDeadlineOutput> {
  return suggestDeadlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDeadlinePrompt',
  input: {schema: SuggestDeadlineInputSchema},
  output: {schema: SuggestDeadlineOutputSchema},
  prompt: `You are an AI assistant that helps users estimate task completion times.

  Analyze the user's past performance on similar tasks to suggest a realistic deadline for a new task.

  Consider the descriptions of past tasks and the time taken to complete them.

  Provide a suggested deadline in number of days and explain your reasoning.

  Here are the past tasks:
  {{#each pastTasks}}
  - Description: {{{description}}}, Time Taken (Hours): {{{timeTakenHours}}}
  {{/each}}

  Here is the new task description:
  {{{taskDescription}}}
  `,
});

const suggestDeadlineFlow = ai.defineFlow(
  {
    name: 'suggestDeadlineFlow',
    inputSchema: SuggestDeadlineInputSchema,
    outputSchema: SuggestDeadlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
