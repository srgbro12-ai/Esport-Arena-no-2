'use server';

/**
 * @fileOverview AI-powered video title generator.
 *
 * - generateVideoTitle - A function that generates engaging video titles.
 * - GenerateVideoTitleInput - The input type for the generateVideoTitle function.
 * - GenerateVideoTitleOutput - The return type for the generateVideoTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoTitleInputSchema = z.object({
  videoTopic: z
    .string()
    .describe('The topic of the video.'),
  targetAudience: z.string().describe('The target audience for the video.'),
  keywords: z.string().describe('Relevant keywords for the video.'),
});
export type GenerateVideoTitleInput = z.infer<typeof GenerateVideoTitleInputSchema>;

const GenerateVideoTitleOutputSchema = z.object({
  title: z.string().describe('An engaging video title.'),
});
export type GenerateVideoTitleOutput = z.infer<typeof GenerateVideoTitleOutputSchema>;

export async function generateVideoTitle(input: GenerateVideoTitleInput): Promise<GenerateVideoTitleOutput> {
  return generateVideoTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoTitlePrompt',
  input: {schema: GenerateVideoTitleInputSchema},
  output: {schema: GenerateVideoTitleOutputSchema},
  prompt: `You are an expert in creating engaging video titles that maximize views. Based on the video topic, target audience, and keywords, generate a captivating title.

Video Topic: {{{videoTopic}}}
Target Audience: {{{targetAudience}}}
Keywords: {{{keywords}}}

Title:`, // Removed 'final answer' request.
});

const generateVideoTitleFlow = ai.defineFlow(
  {
    name: 'generateVideoTitleFlow',
    inputSchema: GenerateVideoTitleInputSchema,
    outputSchema: GenerateVideoTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
