import { roles } from '../data/roles';

interface Props {
  selectedRole: string;
  onSelect: (roleId: string) => void;
}

export default function RoleSelector({ selectedRole, onSelect }: Props) {
  return (
    <section id="roles" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
          Choose Your Role
        </h2>
        <p className="text-lg text-charcoal-light max-w-xl mx-auto">
          Who are you toasting? Pick your role and we'll tailor the perfect speech.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => {
                onSelect(role.id);
                setTimeout(() => {
                  document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className={`group relative p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-champagne text-white shadow-lg shadow-champagne/25 -translate-y-0.5'
                  : 'bg-white hover:bg-blush/30 hover:-translate-y-0.5 border border-blush-dark/20 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                isSelected ? 'bg-white/20' : 'bg-blush'
              }`}>
                <role.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-champagne'}`} />
              </div>
              <h3 className={`text-lg font-bold font-heading mb-1 ${isSelected ? 'text-white' : 'text-charcoal'}`}>
                {role.label}
              </h3>
              <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/80' : 'text-charcoal-light'}`}>
                {role.description}
              </p>
              {isSelected && (
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
