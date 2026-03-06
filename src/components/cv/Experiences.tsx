import type { Experience } from '../../types/cv.types';

const formatDate = (date?: string) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences?.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
        <span className="w-8 h-px bg-primary inline-block" />
        Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-4 border-l border-border">
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <div>
                <h3 className="font-semibold text-text">{exp.role}</h3>
                <p className="text-primary text-sm">{exp.company}</p>
              </div>
              <span className="text-gray-500 text-sm whitespace-nowrap">
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <p className="text-text-muted text-sm leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}