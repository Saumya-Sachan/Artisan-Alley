'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized story about a craft.
 *
 * It includes:
 * - `generateCraftStory`: A function that generates a story, fun fact, and cultural background.
 * - `CraftStoryInput`: The input type for the function.
 * - `CraftStoryOutput`: The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CraftStoryInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  artisanName: z.string().describe("The name of the artisan who created the product."),
  category: z.string().describe('The category of the craft (e.g., Pottery, Jewelry).'),
  region: z.string().describe('The region where the craft originates (e.g., Rajasthan, India).'),
});
export type CraftStoryInput = z.infer<typeof CraftStoryInputSchema>;

const CraftStoryOutputSchema = z.object({
  story: z.string().describe("A short, engaging story (2-3 sentences) connecting the product, artisan, and heritage."),
  funFact: z.string().describe("A surprising or interesting fun fact (2-3 sentences) about the craft or materials."),
  culturalBackground: z.string().describe("A brief overview (2-3 sentences) of the craft's cultural significance and history in its region."),
});
export type CraftStoryOutput = z.infer<typeof CraftStoryOutputSchema>;

export async function generateCraftStory(input: CraftStoryInput): Promise<CraftStoryOutput> {
  return generateCraftStoryFlow(input);
}

const craftStoryPrompt = ai.definePrompt({
  name: 'craftStoryPrompt',
  input: { schema: CraftStoryInputSchema },
  output: { schema: CraftStoryOutputSchema },
  prompt: `You are a master storyteller for an artisan marketplace. Based on the product details, generate three distinct pieces of content. Each piece should be concise (2-3 sentences).

Product Name: {{{productName}}}
Artisan: {{{artisanName}}}
Craft: {{{category}}}
Region: {{{region}}}

1.  **Story**: Write a short, personalized story that emotionally connects the {{{productName}}} to the artisan {{{artisanName}}} and the cultural heritage of {{{region}}}. Make it feel personal and authentic.
2.  **Fun Fact**: Provide a surprising and little-known fun fact about the {{{category}}} craft or the materials used.
3.  **Cultural Background**: Briefly explain the historical roots and cultural importance of the {{{category}}} craft in {{{region}}}.
`,
});

const generateCraftStoryFlow = ai.defineFlow(
  {
    name: 'generateCraftStoryFlow',
    inputSchema: CraftStoryInputSchema,
    outputSchema: CraftStoryOutputSchema,
  },
  async input => {
    const { output } = await craftStoryPrompt(input);
    return output!;
  }
);
