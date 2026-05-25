import type { FormData } from '../data/roles';
import { roles, lengths } from '../data/roles';

export function buildSystemPrompt(data: FormData): string {
  const role = roles.find(r => r.id === data.role);
  const roleLabel = role?.label || 'Guest';
  const wordCount = lengths.find(l => l.value === data.length)?.words || 500;
  const occasionLabel = data.occasion === 'rehearsal' ? 'rehearsal dinner' :
    data.occasion === 'engagement' ? 'engagement party' :
    data.occasion === 'anniversary' ? 'anniversary celebration' :
    data.occasion === 'other' ? 'special celebration' : 'wedding reception';

  // Detect how much detail the user provided
  const detailFields = [data.firstMet, data.funniestMemory, data.touchingMemory, data.perfectMatch, data.threeWords];
  const filledDetails = detailFields.filter(f => f && f.trim().length > 0).length;
  const isSparse = filledDetails <= 1;

  let enrichmentGuidance = '';
  if (isSparse) {
    enrichmentGuidance = `
## The speaker provided only minimal personal details — enrich the speech thoughtfully

Since specific stories are scarce, DO the following to make the speech feel full and heartfelt:
- Draw from the ROLE itself — what it MEANS to be a ${roleLabel.toLowerCase()}. For example: a best man speaks to years of friendship and brotherhood; a maid of honor reflects on witnessing the bride's journey to love; a father reflects on watching his child grow up and find their person.
- Use warm, universal-but-specific-feeling observations about love, commitment, and marriage. Avoid clichés — make each sentiment feel like a genuine reflection, not a greeting card.
- Add ONE moment of gentle, self-deprecating humor about being brief or not having the perfect words — this makes the speech feel human and real.
- Reflect on the couple's future together — what their marriage might look and feel like, based on the kind of people they seem to be.
- Use vivid, sensory language: describe the wedding day itself (the light in the room, the smiles, the feeling of everyone gathered). This grounds the speech in the present moment.
- Address ${data.groomName} and ${data.brideName} directly with personal-looking observations about what makes each of them wonderful, inferred naturally from your knowledge of their role and relationship.

The speech should feel like it was written by someone who KNOWS them deeply, even if few specifics were shared. Make every sentence earn its place.

DO NOT:
- Fabricate specific anecdotes (like "that time we went camping")
- Use empty filler like "they're just so great" without saying WHY
- Write a speech shorter than ${wordCount} words — aim for the full length`;
  } else {
    enrichmentGuidance = `
## The speaker provided good personal details — weave them in artfully

- Weave the specific stories and details into the speech naturally — don't just list them one after another
- Use the details as anchors, then expand on what they REVEAL about ${data.groomName} and ${data.brideName}'s character and love
- Surround specific anecdotes with broader reflections that give them meaning
- Balance the provided stories with moments of direct address to the couple`;
  }

  return `You are an expert wedding speech writer with years of experience crafting unforgettable toasts. You write speeches that are authentic, personal, and perfectly balanced — never cheesy, never generic.

## Your Task
Write a ${roleLabel.toLowerCase()} speech for ${data.groomName} and ${data.brideName}'s ${occasionLabel}. This is NOT necessarily a wedding reception — it's a ${occasionLabel}. Adapt the speech accordingly: a rehearsal dinner speech is more intimate and casual, an engagement party speech looks forward to the wedding, an anniversary speech celebrates years together, etc.

## Speaker
Name: ${data.yourName}
Role: ${roleLabel}
${data.relationship ? `Relationship: ${data.relationship}` : ''}
${data.knownYears ? `Known them for: ${data.knownYears}` : ''}

## Speech Requirements
- Length: Approximately ${wordCount} words (do NOT write shorter than this)
- Tone: ${data.tone}
- The speech should sound natural when spoken aloud — like someone genuinely speaking from the heart, not reading a script
- Include an opening (greet the audience, introduce yourself), a body (stories, reflections), and a close (raise a glass, toast to the couple)
- Balance humor and heart — a laugh or two, then genuine emotion
- Write in first person as ${data.yourName}
- Address ${data.groomName} and ${data.brideName} directly at times
- Give the speech a natural rhythm — vary sentence length, use pauses (indicated by line breaks)
- End with a clear, heartfelt toast
${enrichmentGuidance}

## Things to Avoid Mentioning
${data.thingsToAvoid ? `DO NOT mention: ${data.thingsToAvoid}` : 'Nothing specific to avoid.'}

Output ONLY the speech text. No introductions, no commentary, no "here's your speech" — just the speech itself.`;
}

export function buildUserMessage(data: FormData): string {
  const parts: string[] = [];

  if (data.threeWords) {
    parts.push(`Three words that describe ${data.groomName} and ${data.brideName}: ${data.threeWords}`);
  }
  if (data.firstMet) {
    parts.push(`How ${data.yourName} first met the couple (or one of them): ${data.firstMet}`);
  }
  if (data.funniestMemory) {
    parts.push(`Funniest memory together: ${data.funniestMemory}`);
  }
  if (data.touchingMemory) {
    parts.push(`Most touching memory: ${data.touchingMemory}`);
  }
  if (data.perfectMatch) {
    parts.push(`When they knew the couple was perfect for each other: ${data.perfectMatch}`);
  }
  if (data.futureWish) {
    parts.push(`Wish for the couple's future: ${data.futureWish}`);
  }

  const detailCount = parts.length;

  if (parts.length === 0) {
    parts.push(`The speaker hasn't shared specific stories, so I need you to craft a beautiful, fully-fleshed-out speech drawing from universal truths about friendship, love, and marriage — and what it means to be a ${roles.find(r => r.id === data.role)?.label || 'wedding guest'} at this celebration. Make it feel personal, warm, and genuine.`);
  } else if (parts.length <= 2) {
    parts.push(`The speaker shared only a couple of details. Please expand and enrich the speech significantly — use the provided details as anchors and build around them with thoughtful observations about ${data.groomName} and ${data.brideName}, the nature of their relationship, and what makes this wedding day special. Do NOT write a short speech — aim for the full requested length.`);
  }

  return `Number of personal details provided: ${detailCount}.\n\n${parts.join('\n\n')}`;
}
