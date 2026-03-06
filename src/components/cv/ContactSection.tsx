import { useState } from "react"
import { motion } from 'framer-motion';
import { CheckCircle, Send } from "lucide-react";
import { cvApi } from "../../api/cvApi";

export default function ContactSection() {
    const [form, setForm] = useState({name: '', email: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await cvApi.contactForm(form);
            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
        } catch {
            setError('Failed to send message. Please try again or email me directly.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section>
            <h2 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-primary inline-block" />
                Get in Touch
            </h2>
            {success ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-center gap-3"
                >
                    <CheckCircle className="text-green-400" size={20} />
                    <div>
                    <p className="text-text font-medium">Message sent!</p>
                    <p className="text-text-muted text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
      
                <div>
                  <label className="block text-xs text-text-muted mb-1">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="I'd like to discuss..."
                    required
                  />
                </div>
      
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
      
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-text px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
        </section>
    )
}
