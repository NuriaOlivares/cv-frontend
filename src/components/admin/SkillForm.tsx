import { useState } from 'react';
import type { Skill, SkillCategory } from '../../types/cv.types';
import { cvApi } from '../../api/cvApi';

interface Props {
  initial?: Skill | null;
  onSaved: () => void;
  onCancel: () => void;
}

const CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: 'LANGUAGES', label: 'Programming Languages' },
  { value: 'FRAMEWORKS_AND_APIS', label: 'Frameworks & APIs' },
  { value: 'CLOUD_AND_DEVOPS', label: 'Cloud & DevOps' },
  { value: 'DATABASES', label: 'Databases' },
  { value: 'TESTING_AND_QUALITY', label: 'Testing & Quality' },
  { value: 'PRACTICES_AND_METHODOLOGIES', label: 'Practices & Methodologies' },
];

export default function SkillForm({ initial, onSaved, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    category: initial?.category ?? 'LANGUAGES' as SkillCategory,
    categoryDisplayName: initial?.categoryDisplayName ?? 'Programming Languages',
    displayOrder: initial?.displayOrder ?? 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (value: SkillCategory) => {
    const found = CATEGORIES.find((c) => c.value === value);
    setForm({ ...form, category: value, categoryDisplayName: found?.label ?? '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (initial?.id) {
        await cvApi.updateSkill(initial.id, form);
      } else {
        await cvApi.createSkill(form);
      }
      onSaved();
    } catch {
      alert('Failed to save skill.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-white">{initial ? 'Edit' : 'Add'} Skill</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Java, React, AWS..."
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => handleCategoryChange(e.target.value as SkillCategory)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Display Order</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) })}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
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