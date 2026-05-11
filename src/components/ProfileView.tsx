import { User, MapPin, Calendar, Music, MessageCircle, Heart } from "lucide-react";

export default function ProfileView() {
  return (
    <div className="space-y-10 pb-32">
       {/* Profile Header */}
       <div className="relative h-64 rounded-[3rem] overflow-hidden group">
          <img src="https://api.dicebear.com/7.x/shapes/svg?seed=header" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
          <div className="absolute bottom-8 right-8 flex items-end gap-6">
             <div className="w-32 h-32 rounded-full border-4 border-bg-deep p-1 bg-gradient-to-tr from-amber-500 to-orange-400">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Badr" className="w-full h-full rounded-full border-4 border-bg-deep bg-zinc-900" alt="avatar" />
             </div>
             <div className="flex flex-col gap-1 pb-2">
                <h2 className="text-4xl font-black">بدر بن عبدالمحسن</h2>
                <p className="text-zinc-500 text-sm flex items-center gap-2">
                   <User size={14} />
                   شاعر وباحث في العروض العربي
                </p>
             </div>
          </div>
       </div>

       {/* Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "قصائد", value: "124", icon: <Calendar size={18} /> },
            { label: "ألحان", value: "45", icon: <Music size={18} /> },
            { label: "متابعون", value: "12.5k", icon: <User size={18} /> },
            { label: "إعجابات", value: "85k", icon: <Heart size={18} /> }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
               <div className="text-amber-500 mb-3 opacity-50">{stat.icon}</div>
               <div className="text-2xl font-black text-white">{stat.value}</div>
               <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
            </div>
          ))}
       </div>

       {/* Bio and Info */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-[2.5rem]">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-zinc-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                   النبذة الشخصية
                </h3>
                <p className="text-lg leading-relaxed text-zinc-300 font-serif">
                   باحث وشاعر مهتم بتطوير تقنيات العروض العربي وتوظيف الذكاء الاصطناعي في خدمة الأدب. أؤمن بأن التكنولوجيا هي الجسر القادم لخلود الكلمة العربية.
                </p>
             </div>
             
             <div className="space-y-6">
                <h3 className="text-xl font-black flex items-center gap-3">
                   أحدث الأعمال
                   <span className="text-xs font-bold bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">جديد</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[1,2].map(i => (
                     <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[2rem] hover:border-zinc-700 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                           <div className="text-[10px] text-amber-500 font-black tracking-widest uppercase">شعر نبطي</div>
                           <div className="text-zinc-600 group-hover:text-amber-500 transition-colors"><Music size={16} /></div>
                        </div>
                        <h4 className="text-lg font-bold mb-3">وداع السيف</h4>
                        <p className="text-sm text-zinc-500 line-clamp-2 font-serif mb-4">يا سارق الألوان من غصن النماء ومشتت الأوراق في ريح الفناء...</p>
                        <div className="flex items-center justify-between text-[10px] text-zinc-600 font-bold">
                           <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1"><Heart size={12} /> 1.2k</span>
                              <span className="flex items-center gap-1"><MessageCircle size={12} /> 45</span>
                           </div>
                           <span>قبل يومين</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem]">
                <h3 className="text-sm font-bold mb-6 text-zinc-400">التواجد الرقمي</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-zinc-800/50">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">X</div>
                         <span className="text-sm font-bold">@badr_poetry</span>
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-zinc-800/50">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">I</div>
                         <span className="text-sm font-bold">badr.official</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
