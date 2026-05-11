import { Shield, Users, Activity, CreditCard, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function AdminDashboard() {
  return (
    <div className="space-y-10 pb-32">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black flex items-center justify-center">
             <Shield size={24} />
          </div>
          <div>
             <h1 className="text-3xl font-black">لوحة التحكم الإدارية</h1>
             <p className="text-zinc-500 text-sm tracking-wide">مراقبة النظام، المستخدمين، واستهلاك الذكاء الاصطناعي.</p>
          </div>
       </div>

       {/* Quick Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "إجمالي المستخدمين", value: "4,250", change: "+12%", icon: <Users size={20} /> },
            { label: "استهلاك الـ AI", value: "850k", change: "+5%", icon: <Activity size={20} /> },
            { label: "الإيرادات الشهرية", value: "$12,400", change: "+8%", icon: <CreditCard size={20} /> },
            { label: "بلاغات المحتوى", value: "3", change: "-20%", icon: <AlertCircle size={20} />, color: "text-rose-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] shadow-xl">
               <div className="flex justify-between items-start mb-4">
                  <div className={stat.color || "text-amber-500"}>{stat.icon}</div>
                  <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.change}</div>
               </div>
               <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
               <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
       </div>

       {/* Detailed Tables Area */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-[3rem] p-8">
             <h3 className="text-lg font-black mb-6">أحدث المستخدمين</h3>
             <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-bg-deep/50 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+50}`} alt="avatar" />
                        </div>
                        <div>
                           <div className="text-sm font-bold">مستخدم جديد {i}</div>
                           <div className="text-[10px] text-zinc-500">user${i}@example.com</div>
                        </div>
                     </div>
                     <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">PRO</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-[3rem] p-8">
             <h3 className="text-lg font-black mb-6">توزيع النماذج</h3>
             <div className="space-y-6">
                {[
                  { label: "Gemini 1.5 Pro", value: 45, color: "bg-amber-500" },
                  { label: "Suno AI v3.5", value: 30, color: "bg-blue-500" },
                  { label: "ElevenLabs TTS", value: 25, color: "bg-purple-500" }
                ].map((model, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold">
                        <span>{model.label}</span>
                        <span>{model.value}%</span>
                     </div>
                     <div className="h-2 bg-bg-deep rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", model.color)} style={{ width: `${model.value}%` }}></div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
