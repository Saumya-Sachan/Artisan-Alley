"use client";

import { useEffect, useState } from 'react';
import type { Artisan, Product } from '@/lib/types';
import { generateCraftStory, type CraftStoryOutput } from '@/ai/flows/generate-craft-story';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useLanguage } from '@/hooks/use-language';

type StoryType = 'story' | 'funFact' | 'culturalBackground';

export function CraftStory({ product, artisan }: { product: Product, artisan: Artisan }) {
  const { translate } = useLanguage();
  const [storyContent, setStoryContent] = useState<CraftStoryOutput | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryType>('story');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      setIsLoading(true);
      try {
        const content = await generateCraftStory({
          productName: product.name,
          artisanName: artisan.name,
          category: product.category,
          region: product.region,
        });
        setStoryContent(content);
      } catch (error) {
        console.error("Failed to generate craft story:", error);
        // You could set a fallback story here if needed
      } finally {
        setIsLoading(false);
      }
    }
    fetchStory();
  }, [product, artisan]);

  const displayedContent = storyContent ? storyContent[selectedStory] : '';

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
          </div>
           <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!storyContent) {
    return null; // Don't render anything if the story fails to load
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-center gap-2">
          <Button
            variant={selectedStory === 'story' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setSelectedStory('story')}
          >
            {translate('Story')}
          </Button>
          <Button
            variant={selectedStory === 'funFact' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setSelectedStory('funFact')}
          >
            {translate('Fun Fact')}
          </Button>
          <Button
            variant={selectedStory === 'culturalBackground' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setSelectedStory('culturalBackground')}
          >
            {translate('Culture')}
          </Button>
        </div>
        <p className="text-center text-muted-foreground italic">
          {translate(displayedContent)}
        </p>
      </CardContent>
    </Card>
  );
}