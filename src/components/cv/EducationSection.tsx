import type { Education, Certification, Language } from '../../types/cv.types';

const formatDate = (date?: string) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

interface Props {
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

export default function EducationSection({ education, certifications, languages }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">

      {education?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium text-text text-sm">{edu.degree}</h3>
                <p className="text-primary text-sm">{edu.institution}</p>
                <p className="text-gray-500 text-xs">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </p>
                {edu.description && (
                  <p className="text-text-muted text-xs mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {certifications?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-text text-sm font-medium">{cert.name}</p>
                  {cert.issuer && <p className="text-gray-500 text-xs">{cert.issuer}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-text text-sm">{lang.name}</span>
                  <span className="text-gray-500 text-xs">{lang.levelDisplayName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}