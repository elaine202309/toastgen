import { tones } from '../data/roles';

interface Props {
  selectedTone: string;
  onSelect: (toneId: string) => void;
}

export default function ToneSelector({ selectedTone, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => {
        const isSelected = selectedTone === tone.id;
        return (
          <button
            key={tone.id}
            type="button"
            onClick={() => onSelect(tone.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              isSelected
                ? 'bg-champagne text-white shadow-md'
                : 'bg-white border border-charcoal/10 text-charcoal-light hover:border-champagne/50 hover:bg-blush/20'
            }`}
          >
            <tone.icon className="w-3.5 h-3.5" />
            {tone.label}
          </button>
        );
      })}
    </div>
  );
}
