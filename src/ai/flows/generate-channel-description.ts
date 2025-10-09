'use server';

/**
 * @fileOverview AI-powered channel description generator.
 *
 * - generateChannelDescription - A function that generates a channel description based on keywords.
 * - GenerateChannelDescriptionInput - The input type for the generateChannelDescription function.
 * - GenerateChannelDescriptionOutput - The return type for the generateChannelDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChannelDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords describing the content creator and their channel.'),
});
export type GenerateChannelDescriptionInput = z.infer<
  typeof GenerateChannelDescriptionInputSchema
>;

const GenerateChannelDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling channel description.'),
});
export type GenerateChannelDescriptionOutput = z.infer<
  typeof GenerateChannelDescriptionOutputSchema
>;

export async function generateChannelDescription(
  input: GenerateChannelDescriptionInput
): Promise<GenerateChannelDescriptionOutput> {
  return generateChannelDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChannelDescriptionPrompt',
  input: {schema: GenerateChannelDescriptionInputSchema},
  output: {schema: GenerateChannelDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing youtube channel descriptions.

  Write a compelling channel description based on the following keywords:

  Keywords: {{{keywords}}}
  `,
});

const generateChannelDescriptionFlow = ai.defineFlow(
  {
    name: 'generateChannelDescriptionFlow',
    inputSchema: GenerateChannelDescriptionInputSchema,
    outputSchema: GenerateChannelDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
