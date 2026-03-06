import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { Profile } from '../../types/cv.types';

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-4">
      <h1 className="text-5xl font-bold text-text">{profile.fullName}</h1>
      <p className="text-xl text-primary font-medium">{profile.title}</p>

      <div className="flex flex-wrap gap-4 pt-2">
        {profile.email && (
          <a href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
            <Mail size={16} />
            {profile.email}
          </a>
        )}
        {profile.phone && (
          <a href={`tel:${profile.phone}`}
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
            <Phone size={16} />
            {profile.phone}
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
            <Linkedin size={16} />
            LinkedIn
          </a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
            <Github size={16} />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}