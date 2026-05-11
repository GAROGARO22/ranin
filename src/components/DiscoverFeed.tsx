import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Play,
  Flame,
  Music,
  Plus,
  LayoutGrid
} from "lucide-react";
import { useState, useEffect } from "react";
import { getTrendingPoems, likePoem } from "../lib/social";

export default function DiscoverFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const trending = await getTrendingPoems();
        setPosts(trending);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    await likePoem(postId);
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: [...(p.likes || []), "current_user"] } : p));
  };

  return (
    <div className="space-y-12 pb-32">
       {/* Featured / Stories Area */}
       <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex-shrink-0 w-40 h-56 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-2xl shadow-amber-500/10 active:scale-95 transition-transform">
             <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/20">
                <Plus size={16} className="text-white" />
             </div>
             <div className="relative z-10">
                <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">شارك إبداعك</div>
                <div className="text-sm font-black text-white leading-tight">ماذا يفيض به<br/>خيالك اليوم؟</div>
             </div>
          </div>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex-shrink-0 w-40 h-56 rounded-3xl bg-zinc-900 border border-zinc-800 p-5 flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:border-zinc-700 transition-all active:scale-95">
               <img 
                 src={`https://api.dicebear.com/7.x/shapes/svg?seed=${i+100}`} 
                 className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-500"
                 alt="bg"
               />
               <div className="flex items-center gap-2 relative z-10">
                  <div className="w-9 h-9 rounded-full border-2 border-amber-500 p-[2px] bg-bg-deep shadow-lg">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="avatar" className="rounded-full w-full h-full" />
                  </div>
                  <div className="text-xs font-bold text-zinc-100 truncate">المبدع {i}</div>
               </div>
            </div>
          ))}
       </div>

       {/* Feed Filter */}
       <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4">
          <div className="flex items-center gap-8">
             <button className="text-lg font-black border-b-2 border-amber-500 pb-2 text-zinc-100">لك</button>
             <button className="text-lg font-bold text-zinc-500 hover:text-zinc-100 transition-colors pb-2">المتابَعون</button>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
             <button className="p-2 bg-zinc-800 rounded-lg text-amber-500 shadow-inner"><LayoutGrid size={16} /></button>
             <button className="p-2 text-zinc-500 hover:text-white"><Flame size={16} /></button>
          </div>
       </div>

       {/* Posts Grid/List */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
           <div className="col-span-2 flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : (
           posts.map(post => (
             <div key={post.id} className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:bg-zinc-900/60 transition-all group shadow-xl">
                <div className="p-8">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 to-transparent">
                            <img src={post.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} className="w-full h-full rounded-full border-2 border-zinc-900" alt={post.authorName} />
                         </div>
                         <div>
                            <div className="text-sm font-bold text-zinc-100">{post.authorName || "مبدع مجهول"}</div>
                            <div className="text-[10px] text-amber-500/70 tracking-[0.2em] uppercase font-black">{post.type}</div>
                         </div>
                      </div>
                      <button className="text-zinc-600 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                   </div>

                   <h3 className="text-2xl font-black mb-4 text-zinc-100">{post.title}</h3>
                   <div className="text-xl font-serif leading-[2] text-amber-100/80 mb-8 whitespace-pre-wrap text-center py-6 bg-zinc-950/30 rounded-3xl border border-zinc-800/30">
                      {post.content}
                   </div>

                   {post.audioUrl && (
                     <div className="mb-8 p-5 bg-bg-deep rounded-[1.5rem] border border-zinc-800 flex items-center justify-between group/audio cursor-pointer hover:border-amber-500/30 transition-all shadow-inner">
                        <div className="flex items-center gap-4">
                           <button className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center group-hover/audio:scale-110 transition-all shadow-lg shadow-amber-500/20">
                              <Play fill="currentColor" size={20} className="mr-1 rotate-180" />
                           </button>
                           <div>
                              <div className="text-sm font-bold flex items-center gap-2 text-zinc-100">
                                 <Music size={14} className="text-amber-500" />
                                 نسخة غنائية كاملة
                              </div>
                              <div className="text-[10px] text-zinc-500 font-medium">بصوت رنين AI</div>
                           </div>
                        </div>
                        <div className="flex gap-1 h-3 items-end">
                           <div className="w-1 h-full bg-amber-500/40 rounded-full animate-pulse" />
                           <div className="w-1 h-2/3 bg-amber-500/40 rounded-full animate-pulse delay-75" />
                           <div className="w-1 h-full bg-amber-500/40 rounded-full animate-pulse delay-150" />
                        </div>
                     </div>
                   )}

                   <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                      <div className="flex items-center gap-8">
                         <button 
                           onClick={() => handleLike(post.id)}
                           className="flex items-center gap-2 text-zinc-500 hover:text-rose-500 transition-all group/btn"
                         >
                            <div className="p-2 rounded-full group-hover/btn:bg-rose-500/10 transition-colors">
                               <Heart size={20} className={cn("group-hover/btn:fill-rose-500", post.likes?.length > 0 && "fill-rose-500 text-rose-500")} />
                            </div>
                            <span className="text-xs font-bold font-mono tracking-tighter">{post.likes?.length || 0}</span>
                         </button>
                         <button className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-all group/btn">
                            <div className="p-2 rounded-full group-hover/btn:bg-amber-500/10 transition-colors">
                               <MessageCircle size={20} />
                            </div>
                            <span className="text-xs font-bold font-mono tracking-tighter">{post.comments?.length || 0}</span>
                         </button>
                      </div>
                      <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
                         <Share2 size={20} />
                      </button>
                   </div>
                </div>
             </div>
           ))
        )}
       </div>
    </div>
  );
}
