import { cn } from "@/utils/cn";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  path: string[];
  title?:string
};

const Heading = ({ path, title }: Props) => {
  return (
    <div>
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 flex-wrap">
        <Link to="/">
          <Home className="hover:text-indigo-600 transition-colors" />
        </Link>

        {path.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight />
            <span className={cn("text-slate-600 text-lg", { "text-slate-600": i === path.length - 1 })}>{item}</span>
          </span>
        ))}
      </nav>

      <h1 className="text-2xl font-bold text-slate-900">{title ? title : path[path.length - 1]}</h1>
    </div>
  );
};

export default Heading;
