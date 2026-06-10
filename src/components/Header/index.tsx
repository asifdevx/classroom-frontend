import { useTheme } from "@/layout/ThemeProvider";
import { memo, useState } from "react";

interface HeaderProps {
  isCollapsed: boolean;
  onOpenMobileMenu: () => void;
}



// --- Mock Auth Data ---
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",
};

function Header({ onOpenMobileMenu }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-slate-200 dark:border-slate-700/60 transition-colors">
      {/* Mobile left-side content */}
      <div className="flex items-center gap-3">
        <button onClick={onOpenMobileMenu} className="p-2 -ml-2 rounded-lg md:hidden hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-md md:hidden tracking-tight">MyApp</span>
      </div>

      {/* Toolbar Options on Right side */}
      <div className="flex items-center gap-3">
        {/* Modern Theme Toggle switch button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.344l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Modular Profile Action Menu */}
        <UserDropdown />
      </div>
    </header>
  );
}


function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-1 rounded-full md:rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-left">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-sm">
          {MOCK_USER.name.charAt(0)}
        </div>
        <div className="hidden md:block pr-1">
          <p className="text-xs font-semibold leading-tight">{MOCK_USER.name}</p>
          <p className="text-[10px] text-slate-400 leading-none mt-0.5 capitalize">{MOCK_USER.role}</p>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">Account info</p>
              <p className="text-sm font-semibold mt-1 truncate">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-400 truncate mt-0.5">{MOCK_USER.email}</p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                console.log("Logged out cleanly.");
              }}
              className="w-full flex items-center px-3 py-2 mt-1 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout Info
            </button>
          </div>
        </>
      )}
    </div>
  );
}


export default memo(Header);