import { useState, useCallback } from 'react';
import type { FormData } from '../data/roles';

function generateMockSpeech(data: FormData): string {
  const firstMetPart = data.firstMet
    ? `\n\nI'll never forget how we first met. ${data.firstMet.trim().replace(/\.$/, '')}.`
    : '';

  const funnyPart = data.funniestMemory
    ? `\n\nAnd I have to share this — ${data.funniestMemory.trim().replace(/\.$/, '')}.`
    : '';

  const touchingPart = data.touchingMemory
    ? `\n\nBut beyond the laughs, ${data.touchingMemory.trim().replace(/\.$/, '')}.`
    : '';

  const threeWordsPart = data.threeWords
    ? ` They're ${data.threeWords.trim().replace(/\.$/, '')} — and it shows in everything they do.`
    : '';

  const perfectMatchPart = data.perfectMatch
    ? `\n\n${data.perfectMatch.trim().replace(/\.$/, '')} — and in that moment, I knew.`
    : '';

  const wishPart = data.futureWish
    ? ` ${data.futureWish.trim().replace(/\.$/, '')}`
    : ' May your love grow stronger with every passing day, and may you always find joy in the little things.';

  const speeches: Record<string, string> = {
    'best-man': `Good evening everyone! For those who don't know me, I'm ${data.yourName || 'the best man'}, and I've had the privilege of knowing ${data.groomName || 'the groom'} for many years.${firstMetPart}

When ${data.groomName || 'he'} first told me about ${data.brideName || 'the bride'}, I could tell something was different. He had this look — the kind that says "I've found the one."${threeWordsPart}${funnyPart}${touchingPart}${perfectMatchPart}

${data.groomName || 'He'}, you've been an incredible friend — through good times and bad, through questionable fashion choices and even more questionable karaoke performances. ${data.brideName || 'She'} makes you a better person, and for that, we're all grateful.

${data.brideName || 'Bride'}, welcome to the family. You've not only captured his heart — you've somehow made him punctual. That alone deserves a standing ovation.

So please raise your glasses. To ${data.groomName || 'the groom'} and ${data.brideName || 'the bride'} —${wishPart} Cheers!`,

    'maid-of-honor': `Good evening, everyone. I'm ${data.yourName || 'the maid of honor'}, and I am so honored to stand beside ${data.brideName || 'my best friend'} on the most beautiful day of her life.${firstMetPart}

${data.brideName || 'She'} and I have been through everything together — the awkward teenage years, the triumphs, the heartbreaks, and the moments of pure joy. But nothing compares to watching her find true love with ${data.groomName || 'the groom'}.${threeWordsPart}${funnyPart}${touchingPart}${perfectMatchPart}

${data.brideName || 'Bride'}, you've always been the person who lights up every room. And ${data.groomName || 'Groom'}, thank you for recognizing that light and nurturing it. The way you look at her — that's the kind of love we all hope to find.

To the happy couple —${wishPart} I love you both. Cheers!`,

    'father-of-bride': `Good evening. As ${data.brideName || 'my daughter'}\'s father, I've been dreading and looking forward to this day in equal measure.

Dreading it because it meant letting go of my little girl. Looking forward to it because I knew she had found someone truly special in ${data.groomName || 'the groom'}.${firstMetPart}${threeWordsPart}${funnyPart}${touchingPart}${perfectMatchPart}

${data.brideName || 'Sweetheart'}, from the moment you were born, you filled our lives with joy. Watching you grow into the remarkable woman you are today has been the greatest privilege of my life. And ${data.groomName || 'son'}, from the first time you joined us for dinner, I knew. The respect you showed our family, the way you made her smile — it was everything a father could hope for.

So here's to ${data.brideName || 'my daughter'} and ${data.groomName || 'my new son'}.${wishPart} Cheers!`,

    'groom': `Wow. Standing here, looking at all of you, looking at ${data.brideName || 'my beautiful bride'} — I've never felt more grateful in my entire life.

First, I want to thank both of our families. Your love, support, and occasional unsolicited advice have shaped us into the people we are today. We wouldn't be here without you.${firstMetPart}${threeWordsPart}${touchingPart}${perfectMatchPart}

To my parents — thank you for teaching me what love looks like. Not just in words, but in everyday actions. I see now that real love is in the small things: the morning coffee, the listening ear, the forgiveness after arguments.

And to you, ${data.brideName || 'my love'}. I knew from the moment I met you that my life was about to change. You challenge me, you inspire me, and you make even ordinary Tuesday afternoons feel special. I promise to spend the rest of my life${wishPart} I love you. Cheers!`,

    'bride': `Good evening, my beautiful friends and family. Looking around this room, my heart is so full.

Thank you to my parents for your endless love, for teaching me what strength and grace look like, and for always believing in my dreams. Thank you to ${data.groomName || 'the groom'}\'s family for raising such an incredible man and for welcoming me so warmly into your lives.${firstMetPart}${threeWordsPart}${touchingPart}${perfectMatchPart}

And ${data.groomName || 'my love'}. From our first date to this moment, you've shown me what it means to be truly loved. You're my best friend, my biggest supporter, and my favorite person to do absolutely nothing with. I cannot wait to build our life together — the adventures, the quiet mornings, the challenges we'll face side by side.

To a lifetime of love, laughter, and growing old together.${wishPart} Cheers!`,
  };

  const baseSpeech = speeches[data.role] || `Good evening everyone. I'm ${data.yourName || 'a guest'}, and I'm honored to say a few words about ${data.groomName || 'the groom'} and ${data.brideName || 'the bride'}.${firstMetPart}

${data.groomName || 'He'} and ${data.brideName || 'she'} are two of the most wonderful people I know. Watching their love story unfold has been a privilege.${threeWordsPart}${funnyPart}${touchingPart}${perfectMatchPart}

To the happy couple —${wishPart} Cheers!`;

  return baseSpeech.trim();
}

import { buildSystemPrompt, buildUserMessage } from './buildPrompt';

async function callDeepSeek(data: FormData): Promise<string> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('API key not configured. Using demo mode. Set VITE_DEEPSEEK_API_KEY in .env');

  const systemPrompt = buildSystemPrompt(data);
  const userMessage = buildUserMessage(data);

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 1200,
      temperature: 0.85,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`DeepSeek API error (${response.status}): ${err}`);
  }

  const json = await response.json();
  const speech = json.choices?.[0]?.message?.content;
  if (!speech) throw new Error('Empty response from DeepSeek API');
  return speech.trim();
}

export function useSpeechGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSpeech = useCallback(async (data: FormData) => {
    setIsGenerating(true);
    setGeneratedSpeech(null);
    setError(null);

    try {
      const speech = await callDeepSeek(data);
      setGeneratedSpeech(speech);
      setIsGenerating(false);
      return speech;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      console.error('Speech generation error:', msg);
      setError(msg);
      // Fall back to mock on any error
      const speech = generateMockSpeech(data);
      setGeneratedSpeech(speech);
      setIsGenerating(false);
      return '';
    }
  }, []);

  const regenerateSpeech = useCallback(async (data: FormData) => {
    return generateSpeech(data);
  }, [generateSpeech]);

  return {
    isGenerating,
    generatedSpeech,
    error,
    generateSpeech,
    regenerateSpeech,
  };
}
