'use server';

/**
 * @fileOverview A conversational AI chatbot for the Artisan Alley marketplace.
 *
 * - craftBuddy - A function that handles the chatbot conversation.
 * - CraftBuddyInput - The input type for the craftBuddy function.
 * - CraftBuddyOutput - The return type for the craftBuddy function.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/data';
import { z } from 'genkit';

const CraftBuddyInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type CraftBuddyInput = z.infer<typeof CraftBuddyInputSchema>;

const CraftBuddyOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type CraftBuddyOutput = z.infer<typeof CraftBuddyOutputSchema>;

export async function craftBuddy(input: CraftBuddyInput): Promise<CraftBuddyOutput> {
  return craftBuddyFlow(input);
}

const productCatalog = JSON.stringify(
    products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        productType: p.productType,
        price: p.price,
        description: p.description,
        material: p.material,
        region: p.region,
    }))
);

const craftBuddyPrompt = ai.definePrompt({
  name: 'craftBuddyPrompt',
  input: { schema: CraftBuddyInputSchema },
  output: { schema: CraftBuddyOutputSchema },
  prompt: `You are "Craft Buddy," a friendly and knowledgeable AI assistant for the Artisan Alley marketplace. Your goal is to help users discover and learn about handcrafted products.

You have access to the full product catalog:
{{{productCatalog}}}

Your capabilities:
1.  **Suggest Products**: Based on the user's mood (e.g., "something cheerful"), occasion (e.g., "a wedding gift"), or preferences (e.g., "I like woodwork from Rajasthan"), suggest relevant products. Provide the product name and a brief, engaging reason for your suggestion. You can suggest up to 3 products at a time.
2.  **Explain Crafts**: If asked about a craft's history, technique, or cultural significance, provide a concise and interesting explanation (2-3 sentences).
3.  **Guide Buyers**: Help users choose gifts or custom designs by asking clarifying questions and offering thoughtful recommendations.

Keep your responses conversational, friendly, and concise.

User's message: {{{message}}}
`,
});

const craftBuddyFlow = ai.defineFlow(
  {
    name: 'craftBuddyFlow',
    inputSchema: CraftBuddyInputSchema,
    outputSchema: CraftBuddyOutputSchema,
  },
  async input => {
    const { output } = await craftBuddyPrompt({
      ...input,
      productCatalog,
    });
    return output!;
  }
);
