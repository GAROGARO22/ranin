import { useState } from "react";
import { 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Maximize2,
  RefreshCw,
  LayoutGrid
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { orchestrator } from "../lib/ai-orchestrator";

export default function ArudAnalysis() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeArud = async () => {
    if (!text) return;
    setIsAnalyzing(true);
    try {
      const prompt = `قم بتحليل هذا البيت الشعري عروضياً بالتفصيل:
        "${text}"
        أريدك أن تعيد لي النتيجة بتنسيق JSON يحتوي على:
        - meterName: اسم البحر
        - tafeela: قائمة التفعيلات
        - scansion: التقطيع (مثال: //0//0)
        - errors: قائمة الكسور العروضية إن وجدت مع اقتراحات للتصحيح.`;
      
      const responseText = await orchestrator.generateJSON(prompt, {
        systemInstruction: "أنت خبير عروض متمكن."
      });
      
      const data = JSON.parse(responseText || "{}");
      setResult(data);
    } catch (error) {
       console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const autoFix = async (suggestion: string) => {
     setText(suggestion);
     analyzeArud();
  };

  return (
    <div className="space-y-10 pb-32">
       <div className="max-w-3xl">
          <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 flex items-center gap-1.5 w-fit mb-4">
             <Zap size={12} />
             الذكاء العروضي
          </div>
          <h1 className="text-3xl font-bold mb-3">تشريح موازين الشعر</h1>
          <p className="text-zinc-500">قم بتقطيع القصائد عروضياً، اكتشاف البحر، ومعالجة الكسور العروضية بدقة فائقة باستخدام محرك رنين الذكي.</p>
       </div>

       <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
          <div className="mb-6">
             <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">أدخل البيت الشعري للتحليل</label>
             <div className="relative">
                <input 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="مثال: الخيل والليل والبيداء تعرفني..."
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-6 text-2xl text-center outline-none focus:border-amber-500/50 transition-all font-serif text-amber-100"
                  dir="rtl"
                />
                {isAnalyzing && (
                   <div className="absolute left-6 top-1/2 -translate-y-1/2">
                      <RefreshCw className="animate-spin text-amber-500" size={24} />
                   </div>
                )}
             </div>
          </div>

          <button 
            onClick={analyzeArud}
            disabled={isAnalyzing || !text}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
             <Zap size={20} fill="currentColor" />
             بدأ التحليل العروضي الذكي
          </button>
       </div>

       {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
             {/* البحر */}
             <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                   <LayoutGrid size={24} />
                </div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">البحر الشعري</div>
                <div className="text-2xl font-bold text-white tracking-tight">{result.meterName}</div>
             </div>

             {/* التفعيلات */}
             <div className="md:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      تشريح تفعيلات البيت
                   </h3>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                   {result.tafeela?.map((t: string, i: number) => (
                      <div key={i} className="flex flex-col items-center min-w-[100px]">
                         <div className="w-full px-5 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 font-bold text-lg text-center shadow-inner">
                            {t}
                         </div>
                         <div className="mt-2 text-[10px] font-mono text-zinc-600 tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full border border-white/5">
                            {result.scansion?.split(" ")[i] || "//0//0"}
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* الكسور والتحسينات */}
             <div className="md:col-span-3 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 shadow-xl">
                <h3 className="text-sm font-bold mb-8 flex items-center gap-2">
                   <AlertTriangle size={18} className="text-amber-500" />
                   الكسور العروضية والاقتراحات الآلية
                </h3>
                
                {result.errors && result.errors.length > 0 ? (
                   <div className="space-y-4">
                      {result.errors.map((err: any, i: number) => (
                         <div key={i} className="flex items-start gap-5 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-1 h-full bg-amber-500/20" />
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex-shrink-0 flex items-center justify-center text-amber-500 border border-amber-500/20">
                               <Info size={24} />
                            </div>
                            <div className="flex-1">
                               <div className="font-bold text-amber-500 mb-2 text-lg">{err.type}</div>
                               <p className="text-sm text-zinc-400 mb-5 leading-relaxed">{err.suggestion}</p>
                               <button 
                                 onClick={() => autoFix(err.suggestion)}
                                 className="text-[10px] px-6 py-2 bg-zinc-100 text-black font-black rounded-full uppercase tracking-widest transition-all hover:bg-white shadow-lg shadow-white/5"
                               >
                                 تطبيق الإصلاح التلقائي
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/5 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/10 ring-8 ring-emerald-500/5">
                         <CheckCircle size={40} />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-emerald-400">البيت موزون تماماً</h4>
                      <p className="text-sm text-zinc-500 max-w-sm">تم التحقق من السلامة العروضية للجرس الموسيقي بنجاح ولا توجد أي انحرافات في تفعيلات البحر المكتشف.</p>
                   </div>
                )}
             </div>
          </motion.div>
       )}
    </div>
  );
}
