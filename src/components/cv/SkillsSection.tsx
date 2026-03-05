import type { Skill, SkillCategory } from '../../types/cv.types';

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  if (!skills?.length) return null;
  
  const grouped = skills.reduce((acc, skill) => {
    const key = skill.category;
    if (!acc[key]) acc[key] = { displayName: skill.categoryDisplayName, skills: [] };
    acc[key].skills.push(skill);
    return acc;
  }, {} as Record<SkillCategory, { displayName: string; skills: Skill[] }>);

  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-8 h-px bg-primary inline-block" />
        Skills
      </h2>

      <div className="space-y-4">
        {Object.entries(grouped).map(([, { displayName, skills }]) => (
          <div key={displayName}>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{displayName}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-surface border border-border text-gray-300 text-sm px-3 py-1 rounded-full hover:border-primary hover:text-white transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}