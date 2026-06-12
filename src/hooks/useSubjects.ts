import API from "@/utils/API";
import { useInfiniteQuery } from "@tanstack/react-query";

// Hook to fetch all subjects with infinite scrolling
export const useAllSubjects = (search: string, department: string) =>
  useInfiniteQuery({
    queryKey: ["subjects", search, department],

    queryFn: async ({ pageParam }) => {
      const res = await API.get("/subjects", {
        params: {
          search,
          department,
          page: pageParam,
          limit: 10,
        },
      });
      return res.data;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = lastPage.pagination.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: true,
    staleTime: 2 * 60 * 1000,
  });
