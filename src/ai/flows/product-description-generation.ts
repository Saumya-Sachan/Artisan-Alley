'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions using an AI model.
 *
 * It includes:
 * - `generateProductDescription`:  A function that generates a product description based on the provided input.
 * - `ProductDescriptionInput`: The input type for the `generateProductDescription` function.
 * - `ProductDescriptionOutput`: The output type for the `generateProductDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product (e.g., pottery, jewelry, etc.).'),
  productMaterials: z.string().describe('The materials used to create the product.'),
  productFeatures: z.string().describe('Key features and characteristics of the product.'),
  style: z.string().describe('The style of the product (e.g. minimalist, modern, rustic)'),
  targetAudience: z.string().describe('The target audience for the product (e.g., adults, children, etc.)'),
});
export type ProductDescriptionInput = z.infer<typeof ProductDescriptionInputSchema>;

const ProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and informative product description.'),
});
export type ProductDescriptionOutput = z.infer<typeof ProductDescriptionOutputSchema>;

export async function generateProductDescription(input: ProductDescriptionInput): Promise<ProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const productDescriptionPrompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: {schema: ProductDescriptionInputSchema},
  output: {schema: ProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in crafting compelling product descriptions for an artisan marketplace.

  Based on the following product details, generate a captivating and informative product description that will entice customers to make a purchase.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Product Materials: {{{productMaterials}}}
  Product Features: {{{productFeatures}}}
  Style: {{{style}}}
  Target Audience: {{{targetAudience}}}

  Write a description that is approximately 100-150 words in length.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: ProductDescriptionInputSchema,
    outputSchema: ProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await productDescriptionPrompt(input);
    return output!;
  }
);
