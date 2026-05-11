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
  Sun,
  LayoutGrid,
  Shield
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Sidebar({ 
  isOpen, 
  activeTab, 
  setActiveTab, 
  setSidebarOpen,
  isDarkMode,
  toggleDarkMode 
}: SidebarProps) {
  const menuItems = [
    { id: "discover", label: "اكتشف", icon: Search },
    { id: "trending", label: "الترندات", icon: Flame },
    { id: "studio", label: "استوديو الشعر", icon: PenTool },
    { id: "analysis", label: "تحليل العروض", icon: LayoutGrid },
    { id: "library", label: "المكتبة", icon: Library },
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "admin", label: "الإدارة", icon: Shield },
  ];

  return (
    <aside className={cn(
      "h-full z-50 flex flex-col border-l border-border-subtle bg-bg-sidebar transition-all duration-300",
      isOpen ? "w-64" : "w-0 -mr-64 lg:w-20 lg:mr-0"
    )}>
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-6 pt-4">
        <div className={cn("flex items-center gap-3", !isOpen && "lg:hidden")}>
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
            <Music size={24} className="text-amber-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-amber-500">رنين AI</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!isOpen)}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100"
        >
          {isOpen ? <ChevronRight size={20} /> : <Menu size={20} className="hidden lg:block" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6 pt-8">
        <div className="space-y-1">
          <p className={cn("text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 px-3", !isOpen && "lg:hidden")}>
            المساحة الشخصية
          </p>
          {menuItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                activeTab === item.id 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-900/10" 
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <item.icon size={18} className={activeTab === item.id ? "text-amber-500" : ""} />
              <span className={cn("text-sm font-medium", !isOpen && "lg:hidden")}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <p className={cn("text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 px-3", !isOpen && "lg:hidden")}>
            استكشف
          </p>
          {menuItems.slice(3).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                activeTab === item.id 
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-900/10" 
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <item.icon size={18} className={activeTab === item.id ? "text-amber-500" : ""} />
              <span className={cn("text-sm font-medium", !isOpen && "lg:hidden")}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-4 border-t border-border-subtle">
        <div className={cn("bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800", !isOpen && "lg:hidden")}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">الرصيد الذكي</span>
            <span className="text-xs font-bold text-amber-500">840</span>
          </div>
          <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[70%]"></div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
           <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white transition-all"
           >
             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
             <span className={cn("text-sm font-medium", !isOpen && "lg:hidden")}>
               المظهر
             </span>
           </button>
           <button 
             onClick={() => setActiveTab("studio")}
             className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all active:scale-95"
           >
             <Plus size={18} />
             <span className={cn("text-sm", !isOpen && "lg:hidden")}>إنشاء جديد</span>
           </button>
        </div>
      </div>
    </aside>
  );
}
