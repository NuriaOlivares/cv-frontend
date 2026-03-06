import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import { cvApi } from '../api/cvApi';
import type { Experience, Project, Skill } from '../types/cv.types';
import ExperienceForm from '../components/admin/ExperienceForm';
import ProjectForm from '../components/admin/ProjectForm';
import SkillForm from '../components/admin/SkillForm';

type Tab = 'experiences' | 'projects' | 'skills';

export default function AdminPage() {
  const { profile, isLoading, refetch } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('experiences');
  const [editingItem, setEditingItem] = useState<Experience | Project | Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDelete = async (type: Tab, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      if (type === 'experiences') await cvApi.deleteExperience(id);
      if (type === 'projects') await cvApi.deleteProject(id);
      if (type === 'skills') await cvApi.deleteSkill(id);
      await refetch();
    } catch {
      alert('Failed to delete item.');
    }
  };

  const handleSaved = async () => {
    setShowForm(false);
    setEditingItem(null);
    await refetch();
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'experiences', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
  ];

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to CV
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text">Admin Panel</h1>
          <p className="text-text-muted mt-1">Manage your CV content</p>
        </div>

        <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowForm(false); setEditingItem(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-text'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingItem(null); }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-text px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-6"
          >
            <Plus size={16} />
            Add {activeTab === 'experiences' ? 'Experience' : activeTab === 'projects' ? 'Project' : 'Skill'}
          </button>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {activeTab === 'experiences' && (
              <ExperienceForm
                initial={editingItem as Experience}
                onSaved={handleSaved}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectForm
                initial={editingItem as Project}
                onSaved={handleSaved}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
              />
            )}
            {activeTab === 'skills' && (
              <SkillForm
                initial={editingItem as Skill}
                onSaved={handleSaved}
                onCancel={() => { setShowForm(false); setEditingItem(null); }}
              />
            )}
          </motion.div>
        )}

        <div className="space-y-3">
          {activeTab === 'experiences' && profile?.experiences.map((exp) => (
            <div key={exp.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-text">{exp.role}</p>
                <p className="text-primary text-sm">{exp.company}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingItem(exp); setShowForm(true); }}
                  className="text-xs text-text-muted hover:text-text border border-border hover:border-white px-3 py-1 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete('experiences', exp.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300 px-3 py-1 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'projects' && profile?.projects.map((proj) => (
            <div key={proj.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-text">{proj.name}</p>
                <p className="text-text-muted text-sm line-clamp-1">{proj.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingItem(proj); setShowForm(true); }}
                  className="text-xs text-text-muted hover:text-text border border-border hover:border-white px-3 py-1 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete('projects', proj.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300 px-3 py-1 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'skills' && profile?.skills.map((skill) => (
            <div key={skill.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-text">{skill.name}</p>
                <p className="text-text-muted text-sm">{skill.categoryDisplayName}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingItem(skill); setShowForm(true); }}
                  className="text-xs text-text-muted hover:text-text border border-border hover:border-white px-3 py-1 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete('skills', skill.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300 px-3 py-1 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}