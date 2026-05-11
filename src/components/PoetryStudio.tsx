import { useState, useRef } from "react";
import Markdown from "react-markdown";
import { 
  Wand2, 
  CheckCircle2, 
  Music, 
  Save, 
  Share2, 
  Sparkles,
  History,
  Languages,
  BookMarked
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { orchestrator } from "../lib/ai-orchestrator";
import { postPoem } from "../lib/social";

const POETRY_TYPES = [
  { id: "fusha", label: "فصحى" },
  { id: "nabati", label: "نبطي" },
  { id: "ghinai", label: "غنائي" },
  { id: "tafeela", label: "تفعيلة" },
  { id: "zawamil", label: "زوامل" },
  { id: "yemeni", label: "يمني" },
  { id: "khaleeji", label: "خليجي" },
];

export default function PoetryStudio() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [poetryType, setPoetryType] = useState("fusha");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      await postPoem({ title: title || "بدون عنوان", content, type: poetryType });
      alert("تم حفظ القصيدة ونشرها بنجاح!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };


  const generatePoem = async () => {
    setIsGenerating(true);
    try {
      const prompt = `أكتب قصيدة عربية من نوع ${poetryType} بعنوان "${title || "عنوان تلقائي"}" حول موضوع الشوق والحنين. 
      يجب أن تلتزم بقواعد العروض والقافية بدقة.`;
      
      const text = await orchestrator.generateText(prompt, {
        systemInstruction: "أنت شاعر عربي كبير ومتمكن في جميع فنون الشعر والبحور."
      });
      
      setContent(text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const completePoem = async () => {
    if (!content) return;
    setIsGenerating(true);
    try {
      const prompt = `أكمل هذه الأبيات بنفس الوزن والقافية والأسلوب: \n${content}`;
      const text = await orchestrator.generateText(prompt, {
        systemInstruction: "أنت مساعد ذكي متخصص في إكمال القصائد العربية الموزونة."
      });
      setAiSuggestion(text);
    } catch (error) {
       console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestRhyme = async () => {
    if (!content) return;
    setIsGenerating(true);
    try {
      const prompt = `اقترح قوافٍ مناسبة للبيت الأخير في هذه القصيدة: \n${content}`;
      const text = await orchestrator.generateText(prompt, {
        systemInstruction: "أنت قاموس قوافي ذكي."
      });
      setAiSuggestion(`القوافي المقترحة:\n${text}`);
    } catch (error) {
       console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const convertDialect = async (target: string) => {
    if (!content) return;
    setIsGenerating(true);
    try {
      const prompt = `حول هذه القصيدة إلى اللهجة ${target} مع الحفاظ على الوزن والقافية قدر الإمكان: \n${content}`;
      const text = await orchestrator.generateText(prompt, {
        systemInstruction: "أنت خبير في اللهجات العربية والشعر الشعبي."
      });
      setContent(text);
    } catch (error) {
       console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 flex items-center gap-1.5 backdrop-blur-sm">
               <Sparkles size={12} />
               استوديو رنين الإبداعي
             </div>
           </div>
           <h1 className="text-4xl font-bold tracking-tight mb-2">استكشف آفاق خيالك</h1>
           <p className="text-zinc-500 text-sm">اكتب، حلل، ولحن عملك القادم بدعم من نماذج المتنبي AI والذكاء اللغوي.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm font-medium transition-all">
             <History size={16} />
             <span>المسودات</span>
           </button>
           <button 
             onClick={handleSave}
             disabled={isSaving || !content}
             className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-black rounded-xl text-sm font-black shadow-lg shadow-amber-500/10 hover:bg-amber-400 transition-all shadow-amber-500/20 active:scale-95 disabled:opacity-50"
           >
             <Save size={16} />
             <span>{isSaving ? "جاري الحفظ..." : "حفظ العمل"}</span>
           </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Side */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8 shadow-2xl backdrop-blur-sm flex flex-col">
             <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold">نمط: {POETRY_TYPES.find(t => t.id === poetryType)?.label || "فصحى"}</span>
                  <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold">بحر: {title ? "تحليلي" : "تلقائي"}</span>
                </div>
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="ادخل عنوان العمل هنا..."
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="bg-transparent border-none outline-none text-sm font-bold text-zinc-100 text-left placeholder:text-zinc-700"
                   />
                </div>
             </div>

             <textarea 
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="اكتب أبياتك هنا... أو ابدأ بالتوليد السحري"
               className="w-full flex-1 min-h-[400px] bg-transparent border-none outline-none resize-none text-4xl leading-[1.8] text-center font-serif text-amber-100/90 placeholder:text-zinc-800"
               dir="rtl"
             />

             <div className="h-px w-24 bg-zinc-800 mx-auto my-8"></div>
             
             <div className="mt-auto flex flex-wrap justify-center gap-4 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50 backdrop-blur-md">
                <button 
                  onClick={suggestRhyme}
                  disabled={isGenerating || !content}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  <Wand2 size={18} />
                  اقتراح القافية
                </button>
                <button 
                  onClick={() => convertDialect("النبطية")}
                  disabled={isGenerating || !content}
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700 disabled:opacity-50"
                >
                  <Languages size={18} />
                  تحويل اللهجة
                </button>
                <button 
                  onClick={() => orchestrator.generateAudio(content)}
                  disabled={isGenerating || !content}
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700 disabled:opacity-50"
                >
                  <Music size={18} />
                  تحويل لغناء
                </button>
             </div>
          </div>

          {/* AI Suggestion Box */}
          <AnimatePresence>
            {aiSuggestion && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-3">
                   <Sparkles className="text-orange-500/30" size={40} />
                </div>
                <h4 className="text-orange-400 text-sm font-bold mb-3 flex items-center gap-2">
                  <Wand2 size={14} />
                  اقتراح رنين
                </h4>
                <div className="text-lg leading-relaxed text-white/80 mb-4 markdown-body font-serif">
                  <Markdown>{aiSuggestion}</Markdown>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setContent(prev => prev + "\n" + aiSuggestion);
                      setAiSuggestion(null);
                    }}
                    className="px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-colors"
                  >
                    إضافة للقصيدة
                  </button>
                  <button 
                    onClick={() => setAiSuggestion(null)}
                    className="px-4 py-1.5 bg-white/5 text-white/50 text-xs font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    تجاهل
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tools Side */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900/60 rounded-3xl border border-zinc-800 p-6 flex flex-col shadow-xl">
             <h3 className="text-sm font-bold mb-6 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-amber-500"></div> 
               أوركسترا الذكاء الاصطناعي
             </h3>
             <div className="space-y-4 flex-1">
                <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/50">
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">نموذج الإبداع</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-md flex items-center justify-center text-purple-400 text-[10px] font-bold">G</div>
                      <span className="text-sm font-bold">Gemini 1.5 Pro</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-600 rotate-90" />
                  </div>
                </div>

                <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/50">
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">نموذج التلحين</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center text-blue-400 text-[10px] font-bold">S</div>
                      <span className="text-sm font-bold">Suno AI v3.5</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-600 rotate-90" />
                  </div>
                </div>

                <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/50">
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">نمط الكتابة</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {POETRY_TYPES.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setPoetryType(type.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs transition-all",
                          poetryType === type.id 
                            ? "bg-amber-500 text-black font-bold" 
                            : "bg-zinc-800 text-zinc-500 hover:text-white"
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20">
                  <h4 className="text-xs font-bold text-amber-500 mb-4 tracking-wide">تحليل العروض التفاعلي</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">تفعيلة الصدر:</span>
                      <span className="font-mono text-zinc-100 bg-black/30 px-2 py-0.5 rounded tracking-tighter">//o/o - //o/o</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">حالة القافية:</span>
                      <span className="text-emerald-500 font-bold">سليمة</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">الجرس الموسيقي:</span>
                      <span className="text-amber-500 font-black">طربي عالي</span>
                    </div>
                  </div>
                </div>
             </div>
             
             <button 
               onClick={generatePoem}
               disabled={isGenerating}
               className="w-full py-3.5 bg-zinc-100 text-black font-black text-sm rounded-2xl mt-8 hover:bg-white transition-colors disabled:opacity-50"
             >
               {isGenerating ? "جاري التوليد..." : "توليد العمل الكامل"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
