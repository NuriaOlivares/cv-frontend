import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { cvApi } from '../api/cvApi';
import Hero from '../components/cv/Hero';
import Summary from '../components/cv/Summary';
import ExperienceSection from '../components/cv/Experiences';
import SkillsSection from '../components/cv/SkillsSection';
import ProjectsSection from '../components/cv/ProjectSection';
import EducationSection from '../components/cv/EducationSection';
import ChatWidget from '../components/cv/ChatWidget';
import ContactSection from '../components/cv/ContactSection';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function CvPage() {
  const { profile, isLoading, error } = useProfile();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !profile) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-red-400">Failed to load profile. Please try again.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm text-text-muted font-mono">nuria.dev</span>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Admin
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="text-text-muted hover:text-text transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => cvApi.downloadCv()}
              className="text-sm bg-primary hover:bg-primary/90 text-text px-4 py-2 rounded-lg transition-colors"
            >
              Download CV
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Hero profile={profile} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Summary summary={profile.summary} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ExperienceSection experiences={profile.experiences} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SkillsSection skills={profile.skills} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProjectsSection projects={profile.projects} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <EducationSection
            education={profile.education}
            certifications={profile.certifications}
            languages={profile.languages}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ContactSection />
        </motion.div>
      </main>

      <ChatWidget />
    </div>
  );
}