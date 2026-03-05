import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types/cv.types';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  if (!projects?.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="w-8 h-px bg-primary inline-block" />
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white">{project.name}</h3>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors">
                    <Github size={16} />
                  </a>
                )}
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">{project.description}</p>
            {project.techStack && (
              <div className="flex flex-wrap gap-1">
                {project.techStack.split(',').map((tech) => (
                  <span key={tech}
                    className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}