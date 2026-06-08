import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

// --- Mock Auth Data ---
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",
};

// --- Navigation Config ---
const NAV_ITEMS = [
  {
    to: "/",
    label: "Home",
    icon: (className: string) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (className: string) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Mobile Drawer Navigation */}
      <MobileSidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      {/* Desktop Persistent Sidebar */}
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Main Content Page Shell */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        <Header isCollapsed={isCollapsed} onOpenMobileMenu={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 1. DESKTOP SIDEBAR
// ==========================================
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
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
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r framer-text from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
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

// ==========================================
// 2. MOBILE SIDEBAR OVERLAY (DRAWER)
// ==========================================
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

// ==========================================
// 3. MAIN APP HEADER
// ==========================================
interface HeaderProps {
  isCollapsed: boolean;
  onOpenMobileMenu: () => void;
}

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

// ==========================================
// 4. USER UTILITY DROPDOWN
// ==========================================
function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-1 rounded-full md:rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-left">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-sm">
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

// ==========================================
// 5. NAIVGATION LINKS PROVIDER
// ==========================================
interface NavLinksProps {
  isCollapsed?: boolean;
  onClick?: () => void;
}

function NavigationLinks({ isCollapsed = false, onClick }: NavLinksProps) {
  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClick}
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group duration-150 relative
            ${
              isActive
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm shadow-indigo-500/5"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 hover:text-slate-900 dark:hover:text-slate-100"
            }
            ${isCollapsed ? "justify-center" : ""}
          `}
          title={isCollapsed ? item.label : undefined}
        >
          {({ isActive }) => (
            <>
              {/* Dynamic active line border indicator */}
              {isActive && !isCollapsed && <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-md" />}

              {/* Icon Renderer */}
              {item.icon(
                `w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                }`,
              )}

              {/* Text Link Label */}
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
