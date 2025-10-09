'use server';

/**
 * @fileOverview A video summarization AI agent.
 *
 * - summarizeVideoContent - A function that handles the video summarization process.
 * - SummarizeVideoContentInput - The input type for the summarizeVideoContent function.
 * - SummarizeVideoContentOutput - The return type for the summarizeVideoContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVideoContentInputSchema = z.object({
  videoTranscript: z
    .string()
    .describe(
      'The transcript of the video content to be summarized.'
    ),
});
export type SummarizeVideoContentInput = z.infer<typeof SummarizeVideoContentInputSchema>;

const SummarizeVideoContentOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the video content.'),
});
export type SummarizeVideoContentOutput = z.infer<typeof SummarizeVideoContentOutputSchema>;

export async function summarizeVideoContent(input: SummarizeVideoContentInput): Promise<SummarizeVideoContentOutput> {
  return summarizeVideoContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeVideoContentPrompt',
  input: {schema: SummarizeVideoContentInputSchema},
  output: {schema: SummarizeVideoContentOutputSchema},
  prompt: `You are an expert summarizer, skilled at creating concise and informative summaries of video content.

  Please provide a summary of the following video transcript:

  Transcript: {{{videoTranscript}}}

  Summary: `,
});

const summarizeVideoContentFlow = ai.defineFlow(
  {
    name: 'summarizeVideoContentFlow',
    inputSchema: SummarizeVideoContentInputSchema,
    outputSchema: SummarizeVideoContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
