import { useState, useEffect } from "react";
import { 
  Music, 
  Mic2, 
  PenTool, 
  Search, 
  Library, 
  User, 
  Flame, 
  Plus, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Sun
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import PoetryStudio from "./components/PoetryStudio";
import ArudAnalysis from "./components/ArudAnalysis";
import DiscoverFeed from "./components/DiscoverFeed";
import LibraryView from "./components/LibraryView";
import Sidebar from "./components/Sidebar";
import ProfileView from "./components/ProfileView";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [activeTab, setActiveTab] = useState("discover");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(true);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case "discover": return <DiscoverFeed />;
      case "trending": return <DiscoverFeed />; 
      case "studio": return <PoetryStudio />;
      case "analysis": return <ArudAnalysis />;
      case "library": return <LibraryView />;
      case "profile": return <ProfileView />;
      case "admin": return <AdminDashboard />;
      default: return <DiscoverFeed />;
    }
  };

  return (
    <div className={cn(
      "flex h-screen w-full overflow-hidden transition-colors duration-300 font-sans",
      isDarkMode ? "bg-[#050505] text-zinc-100" : "bg-[#f8f9fa] text-gray-900"
    )} dir="rtl">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setDarkMode(!isDarkMode)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden h-full">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-bg-deep/50 backdrop-blur-md">
           <div className="flex items-center gap-4 bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800 w-full max-w-md">
              <Search size={18} className="text-zinc-500" />
              <input 
                type="text" 
                placeholder="ابحث عن قصائد، ألحان، أو شعراء..." 
                className="bg-transparent border-none text-sm w-full outline-none placeholder:text-zinc-600"
              />
           </div>
           
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold">بدر بن عبدالمحسن</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">عضوية بلاتينية</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-[2px]">
                 <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center text-xs font-bold ring-2 ring-bg-deep">
                   BA
                 </div>
              </div>
           </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-6xl mx-auto w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Player Footer */}
        <footer className="h-24 border-t border-zinc-800 bg-black/80 backdrop-blur-xl px-8 flex items-center justify-between z-10">
           <div className="flex items-center gap-4 w-[300px]">
              <div className="w-14 h-14 bg-zinc-800 rounded-lg overflow-hidden relative group cursor-pointer shadow-lg shadow-black/50">
                 <img src="https://api.dicebear.com/7.x/shapes/svg?seed=music" alt="cover" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Music size={20} className="text-white" />
                 </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">وداع السيف</span>
                <span className="text-xs text-zinc-500">بدر بن عبدالمحسن • الحان AI</span>
              </div>
           </div>

           <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
              <div className="flex items-center gap-6 text-zinc-400">
                 <button className="hover:text-white transition-colors"><ChevronRight size={18} /></button>
                 <button className="hover:text-white transition-colors"><ChevronRight size={24} className="rotate-180" /></button>
                 <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-xl shadow-white/10">
                   <ChevronRight fill="black" size={24} className="rotate-180" />
                 </button>
                 <button className="hover:text-white transition-colors"><ChevronLeft size={24} /></button>
                 <button className="hover:text-white transition-colors"><ChevronLeft size={18} /></button>
              </div>
              <div className="w-full flex items-center gap-3">
                 <span className="text-[10px] text-zinc-500 font-mono">01:42</span>
                 <div className="flex-1 h-1 bg-zinc-800 rounded-full relative group cursor-pointer">
                    <div className="h-full bg-amber-500 w-[42%] relative transition-all duration-300">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                 </div>
                 <span className="text-[10px] text-zinc-500 font-mono">03:55</span>
              </div>
           </div>

           <div className="flex items-center justify-end gap-6 w-[300px]">
              <div className="flex items-center gap-3 text-zinc-400">
                 <Mic2 size={18} className="hover:text-white transition-colors" />
                 <div className="w-20 h-1 bg-zinc-800 rounded-full">
                    <div className="h-full bg-zinc-400 w-3/4" />
                 </div>
              </div>
              <button className="p-2 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
           </div>
        </footer>
      </main>
    </div>
  );
}
