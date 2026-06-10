import { memo } from "react";
import NavigationLinks from "./NavigationLinks";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <div className={`fixed inset-0 z-50 flex md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop tint wrapper */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Slideout panel container */}
      <div
        className={`relative flex flex-col w-full max-w-xs bg-white dark:bg-slate-800 h-full p-4 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="text-md font-bold">MyApp</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <NavigationLinks onClick={onClose} />
      </div>
    </div>
  );
}
export default memo(MobileSidebar);
