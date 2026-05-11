import { BookMarked, Music, PenTool, Star, Plus } from "lucide-react";

export default function LibraryView() {
  return (
    <div className="space-y-12 pb-32">
       <div className="max-w-3xl">
          <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 flex items-center gap-1.5 w-fit mb-4">
             <Star size={12} fill="currentColor" />
             أرشيفي الإبداعي
          </div>
          <h1 className="text-3xl font-bold mb-3">دواوينك ومكتبتك الصوتيّة</h1>
          <p className="text-zinc-500 text-lg">جميع قصائدك وألحانك وأعمالك المفضلة في مكان واحد منظم واحترافي يعكس مسيرتك الأدبية.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:bg-zinc-900/60 transition-all cursor-pointer group shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-orange-500/20" />
             <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/5">
                <PenTool size={28} />
             </div>
             <h3 className="text-xl font-black mb-1 text-zinc-100">مسوداتي</h3>
             <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">12 قصيدة غير مكتملة</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:bg-zinc-900/60 transition-all cursor-pointer group shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-blue-500/20" />
             <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/5">
                <Music size={28} />
             </div>
             <h3 className="text-xl font-black mb-1 text-zinc-100">ألحاني</h3>
             <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">5 أعمال غنائية</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:bg-zinc-900/60 transition-all cursor-pointer group shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/20" />
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/5">
                <BookMarked size={28} />
             </div>
             <h3 className="text-xl font-black mb-1 text-zinc-100">محفوظات</h3>
             <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">24 عمل ملهم</p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:bg-zinc-900/60 transition-all cursor-pointer group shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-amber-500/20" />
             <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/5">
                <Star size={28} fill="currentColor" />
             </div>
             <h3 className="text-xl font-black mb-1 text-zinc-100">المفضلة</h3>
             <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">8 قصائد مختارة</p>
          </div>
       </div>

       <div className="mt-12 text-center py-24 border-2 border-dashed border-zinc-800 rounded-[3rem] bg-zinc-900/20 backdrop-blur-sm">
          <div className="text-zinc-800 mb-6 flex justify-center">
             <Music size={80} />
          </div>
          <h3 className="text-zinc-100 text-2xl font-black mb-3">لا توجد أعمال منشورة حالياً</h3>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">ابدأ بإنشاء أول رائعة لك من استوديو الشعر وسوف تظهر هنا برونق خاص.</p>
          <button className="mt-10 px-10 py-4 bg-zinc-100 text-black font-black text-sm rounded-2xl shadow-xl shadow-white/5 hover:bg-white transition-all active:scale-95 flex items-center gap-2 mx-auto">
             <Plus size={20} />
             أطلق عنان إبداعك
          </button>
       </div>
    </div>
  );
}
