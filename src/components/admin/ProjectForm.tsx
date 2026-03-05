import { useState } from 'react';
import type { Project } from '../../types/cv.types';
import { cvApi } from '../../api/cvApi';

interface Props {
  initial?: Project | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    techStack: initial?.techStack ?? '',
    githubUrl: initial?.githubUrl ?? '',
    url: initial?.url ?? '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (initial?.id) {
        await cvApi.updateProject(initial.id, form);
      } else {
        await cvApi.createProject(form);
      }
      onSaved();
    } catch {
      alert('Failed to save project.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white">{initial ? 'Edit' : 'Add'} Project</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Tech Stack (comma separated)</label>
          <input
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            placeholder="Java, Spring Boot, React"
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">GitHub URL</label>
          <input
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Live URL</label>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
          required
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel}
          className="text-sm text-gray-400 hover:text-white border border-border px-4 py-2 rounded-lg transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isLoading}
          className="text-sm bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors">
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}