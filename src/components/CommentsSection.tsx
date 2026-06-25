import { useState } from 'react';
import { MessageCircle, Lock, Send, Trash2, User } from 'lucide-react';
import type { Comment } from '../lib/supabase';

const PASSWORD = 'streetboys2026';

interface CommentsSectionProps {
  items: Comment[];
  onAdd: (name: string, comment: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function avatarColor(name: string) {
  const colors = ['bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function CommentsSection({ items, onAdd, onDelete }: CommentsSectionProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== PASSWORD) {
      setError('Incorrect password. Please enter the correct password to post.');
      return;
    }
    if (!name.trim() || !comment.trim()) return;
    setLoading(true);
    await onAdd(name.trim(), comment.trim());
    setName('');
    setComment('');
    setPassword('');
    setLoading(false);
  }

  return (
    <section id="comments" className="py-16 px-4 sm:px-6 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.07),transparent_70%)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full mb-3 border border-sky-500/20">
            <span className="text-xs text-sky-400 tracking-widest uppercase font-medium">Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Comments &amp; <span className="text-sky-400">Wishes</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">Share your festival wishes with the group!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass rounded-2xl p-6 border border-sky-500/20 animate-slide-in-up h-fit">
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <MessageCircle size={18} className="text-sky-400" />
              Post a Comment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Your Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your wishes, greetings or message..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Lock size={11} /> Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter group password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 pr-16 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {loading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>

          {/* Comments list */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 border border-white/10 text-center text-slate-500 text-sm">
                <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
                Be the first to leave a comment!
              </div>
            ) : (
              items.map((c) => (
                <div key={c.id} className="glass rounded-2xl p-4 border border-white/8 animate-fade-in group">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full ${avatarColor(c.name)} flex items-center justify-center flex-shrink-0 text-white text-sm font-bold`}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-slate-600">{timeAgo(c.created_at)}</span>
                          {confirmDelete === c.id ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => { onDelete(c.id); setConfirmDelete(null); }} className="text-rose-400 text-xs">Del</button>
                              <span className="text-slate-600 text-xs">/</span>
                              <button onClick={() => setConfirmDelete(null)} className="text-slate-500 text-xs">No</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(c.id)}
                              className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 transition-all"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed break-words">{c.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
