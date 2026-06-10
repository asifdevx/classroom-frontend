import { NAV_ITEMS } from "@/constants/Header";
import { cn } from "@/utils/cn";
import { NavLink } from "react-router-dom";

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

              {item.icon && (
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-105",
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                  )}
                />
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

export default NavigationLinks;