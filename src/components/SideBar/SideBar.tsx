import NavigationLinks from "./NavigationLinks";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header Brand Area */}
      <div className={`flex items-center h-16 px-4 border-b border-slate-100 dark:border-slate-700/50 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-md shadow-indigo-500/20">M</div>
          {!isCollapsed && (
            <span className="text-lg font-bold tracking-tight bg-linear-to-r framer-text from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              MyApp
            </span>
          )}
        </div>

        {/* Collapse Button Control */}
        {!isCollapsed && (
          <button onClick={onToggle} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Collapse Menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M20 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation list Area */}
      <div className="flex-1 py-4 overflow-y-auto px-3">
        <NavigationLinks isCollapsed={isCollapsed} />
      </div>

      {/* Expand trigger when icon-only mode */}
      {isCollapsed && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
          <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Expand Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M4 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
}
