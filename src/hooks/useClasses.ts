import API from "@/utils/API";
import { useInfiniteQuery } from "@tanstack/react-query";




export const useGetClasses = (search: string, subjectId: string, teacherId: string) =>
  useInfiniteQuery({
    queryKey: ["classes", search, subjectId, teacherId],

    queryFn: async ({ pageParam }) => {
      const res = await API.get("/classes", {
        params: {
          search,
          subjectId,
          teacherId,
          page: pageParam,
          limit: 10,
        },
      });
         
      return res.data;
      
    },
    getNextPageParam:(lastPage)=>{
  const currentPage = lastPage.pagination.page;
  const totalPages = lastPage.pagination.totalPages;

  return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled:true
  });