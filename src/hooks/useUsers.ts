import { UserRole } from "@/types";
import API from "@/utils/API";
import { useQuery } from "@tanstack/react-query";



export const useUsersDetails = (search: string, role: UserRole) =>
  useQuery({
    queryKey: ["users", search, role],
    queryFn:async ()=>{
        const {data} = await API.get("/users", { params: { search, role } })
        return data;
    },
    staleTime:1*60*1000,
    enabled:true
  });