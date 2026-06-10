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
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: true,
    staleTime: 2 * 60 * 1000,
  });
