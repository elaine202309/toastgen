import { useState, useCallback } from 'react';
import type { FormData } from '../data/roles';
import { buildSystemPrompt, buildUserMessage } from './buildPrompt';

async function callDeepSeek(data: FormData): Promise<{ speech: string; creditsRemaining: number }> {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const token = localStorage.getItem('toastgen_token');
  const systemPrompt = buildSystemPrompt(data);
  const userMessage = buildUserMessage(data);

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${apiUrl}/api/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 1200,
      temperature: 0.85,
      role: data.role,
      occasion: data.occasion,
      tone: data.tone,
      names: `${data.groomName} & ${data.brideName}`,
      length: data.length,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `API error (${response.status})`);
  }

  const json = await response.json();
  if (json.error) throw new Error(json.error);
  const speech = json.choices?.[0]?.message?.content;
  if (!speech) throw new Error('Empty response from API');
  return { speech: speech.trim(), creditsRemaining: json.credits_remaining ?? 0 };
}

export function useSpeechGenerator(onCreditsUsed?: (remaining: number) => void) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSpeech = useCallback(async (data: FormData) => {
    setIsGenerating(true);
    setGeneratedSpeech(null);
    setError(null);

    try {
      const result = await callDeepSeek(data);
      setGeneratedSpeech(result.speech);
      onCreditsUsed?.(result.creditsRemaining);
      setIsGenerating(false);
      return result.speech;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg);
      setIsGenerating(false);
      return '';
    }
  }, [onCreditsUsed]);

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
