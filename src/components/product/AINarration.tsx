"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Volume2, Loader } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { formatPrice } from '@/lib/utils';

export function AINarration({ product }: { product: Product }) {
  const { translate } = useLanguage();
  const [isNarrationEnabled, setIsNarrationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const narrationText = useMemo(() => {
    return `
      Product: ${translate(product.name)}.
      Price: ${formatPrice(product.price)}.
      Description: ${translate(product.description)}.
      Making Process: ${translate(product.makingProcess)}.
    `;
  }, [product, translate]);

  const handleNarration = async () => {
    if (!isNarrationEnabled) return;
    
    setIsLoading(true);
    setAudioSrc(null);

    try {
      const { audioDataUri } = await textToSpeech({ text: narrationText });
      setAudioSrc(audioDataUri);
    } catch (error) {
      console.error("Failed to generate narration:", error);
      toast({
        variant: "destructive",
        title: translate("Narration Failed"),
        description: translate("Could not generate audio at this time. Please try again later."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border bg-secondary/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="narration-mode"
            checked={isNarrationEnabled}
            onCheckedChange={setIsNarrationEnabled}
          />
          <Label htmlFor="narration-mode">{translate('AI Narration Mode')}</Label>
        </div>
        
        {isNarrationEnabled && (
          <Button onClick={handleNarration} disabled={isLoading} size="sm">
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Volume2 className="mr-2 h-4 w-4" />
            )}
            {translate('Narrate Description')}
          </Button>
        )}
      </div>

      {audioSrc && isNarrationEnabled && (
        <div className="mt-4">
          <audio controls autoPlay src={audioSrc} className="w-full">
            {translate('Your browser does not support the audio element.')}
          </audio>
        </div>
      )}
    </div>
  );
}
