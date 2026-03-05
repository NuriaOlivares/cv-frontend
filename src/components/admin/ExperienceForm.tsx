import { useState } from 'react';
import type { Experience } from '../../types/cv.types';
import { cvApi } from '../../api/cvApi';

interface Props {
  initial?: Experience | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ExperienceForm({ initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState({
    role: initial?.role ?? '',
    company: initial?.company ?? '',
    description: initial?.description ?? '',
    startDate: initial?.startDate ?? '',
    endDate: initial?.endDate ?? '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (initial?.id) {
        await cvApi.updateExperience(initial.id, form);
      } else {
        await cvApi.createExperience(form);
      }
      onSaved();
    } catch {
      alert('Failed to save experience.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white">{initial ? 'Edit' : 'Add'} Experience</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Role *</label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company *</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Start Date *</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">End Date (leave empty if current)</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
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