import { Heart, Users, User, Crown, Sparkles, Smile, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Role {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  defaultTone: string;
}

export const roles: Role[] = [
  {
    id: 'best-man',
    label: 'Best Man',
    icon: Crown,
    description: 'The groom\'s right hand. Bring the humor and heartfelt memories.',
    defaultTone: 'balanced',
  },
  {
    id: 'maid-of-honor',
    label: 'Maid of Honor',
    icon: Sparkles,
    description: 'The bride\'s closest confidante. Share love, laughter, and tears of joy.',
    defaultTone: 'heartfelt',
  },
  {
    id: 'father-of-bride',
    label: 'Father of the Bride',
    icon: Heart,
    description: 'A proud moment. Welcome a new son and reminisce about your daughter.',
    defaultTone: 'heartfelt',
  },
  {
    id: 'mother-of-groom',
    label: 'Mother of the Groom',
    icon: Heart,
    description: 'Celebrate your son and welcome your new daughter-in-law.',
    defaultTone: 'heartfelt',
  },
  {
    id: 'groom',
    label: 'Groom',
    icon: User,
    description: 'Express your love and gratitude to everyone who made this day possible.',
    defaultTone: 'balanced',
  },
  {
    id: 'bride',
    label: 'Bride',
    icon: Sparkles,
    description: 'Share your love story and thank those who supported your journey.',
    defaultTone: 'balanced',
  },
  {
    id: 'sibling',
    label: 'Sibling',
    icon: Users,
    description: 'Childhood memories meet grown-up love. Funny, warm, and personal.',
    defaultTone: 'humorous',
  },
  {
    id: 'friend',
    label: 'Friend / Relative',
    icon: Smile,
    description: 'A wonderful perspective — share how you watched their love grow.',
    defaultTone: 'balanced',
  },
];

export const occasions = [
  { id: 'wedding', label: 'Wedding Reception', description: 'The main celebration with all guests' },
  { id: 'rehearsal', label: 'Rehearsal Dinner', description: 'The intimate dinner the night before' },
  { id: 'engagement', label: 'Engagement Party', description: 'Celebrating the proposal and upcoming marriage' },
  { id: 'anniversary', label: 'Anniversary', description: 'Honoring years of marriage' },
  { id: 'other', label: 'Other Celebration', description: 'Any heartfelt occasion worth a toast' },
];

export const tones = [
  { id: 'heartfelt', label: 'Heartfelt', icon: Heart },
  { id: 'humorous', label: 'Humorous', icon: Smile },
  { id: 'balanced', label: 'Balanced', icon: Star },
  { id: 'formal', label: 'Formal', icon: Crown },
  { id: 'casual', label: 'Casual', icon: User },
] as const;

export const lengths = [
  { value: 'short', label: 'Short (~3 min)', words: 350 },
  { value: 'medium', label: 'Medium (~4 min)', words: 500 },
  { value: 'long', label: 'Long (~5 min)', words: 650 },
];

export interface FormData {
  role: string;
  occasion: string;
  groomName: string;
  brideName: string;
  yourName: string;
  tone: string;
  relationship: string;
  knownYears: string;
  threeWords: string;
  firstMet: string;
  funniestMemory: string;
  touchingMemory: string;
  perfectMatch: string;
  futureWish: string;
  thingsToAvoid: string;
  length: string;
}

export const relationships = [
  "Friend of the groom",
  "Friend of the bride",
  "Family of the groom",
  "Family of the bride",
  "Colleague",
  "Childhood friend",
  "College friend",
  "Other",
];

export const knownYearsOptions = [
  "Less than 1 year",
  "1-3 years",
  "3-10 years",
  "10+ years",
];
