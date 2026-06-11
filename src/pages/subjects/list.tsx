import Heading from "@/components/common/Heading";
import { DEPARTMENTS } from "@/constants/Subjects";
import { useAllSubjects } from "@/hooks/useSubjects";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ==========================================
// MOCK DATA (Replaces external API / Refine)
// ==========================================


export default function SubjectListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useAllSubjects(searchQuery, selectedDepartment);

  const subjects = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data) ?? [];
  }, [data]);


  
  return (
    <div className="space-y-6">
      <Heading path={["Subjects"]} />

      {/* ========================================== */}
      {/* INTRO ROW & MANAGEMENT FILTERS             */}
      {/* ========================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">Quick access to essential academic subject metrics, catalogs, and department management utilities.</p>

        {/* Filters Controls Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Field Box */}
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Department Dropdown Filter */}
          <div className="relative min-w-40">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 pr-8 text-sm appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Create Button Element */}
          <Link
            to="/subjects/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-500/10 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Subject
          </Link>
        </div>
      </div>

      {/* ========================================== */}
      {/* CUSTOM DATA TABLE ELEMENT                  */}
      {/* ========================================== */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-900/20 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="px-6 py-3.5 w-25">Code</th>
                <th className="px-6 py-3.5 w-50">Name</th>
                <th className="px-6 py-3.5 w-37.5">Department</th>
                <th className="px-6 py-3.5 w-[320px]">Description</th>
                <th className="px-6 py-3.5 w-30 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm text-slate-700 dark:text-slate-300">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    {/* Column: Code Badge */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/40 dark:border-indigo-900/30">
                        {subject?.code}
                      </span>
                    </td>

                    {/* Column: Subject Name */}
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{subject?.name}</td>

                    {/* Column: Department Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {subject?.departmentName ?? "N/A"}
                      </span>
                    </td>

                    {/* Column: Truncated Description */}
                    <td className="px-6 py-4 max-w-xs md:max-w-sm">
                      <p className="text-slate-500 dark:text-slate-400 truncate line-clamp-2 whitespace-normal leading-relaxed">{subject?.description}</p>
                    </td>

                    {/* Column: Action Row */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/subjects/show/${subject?.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white shadow-sm transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty Dataset Representation State */
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium">No subjects found matching filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex justify-center">
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md">
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
