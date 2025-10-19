import { DashboardResponse } from "@/types/student";
import instance from "@/api/axios";
import { useQuery } from "react-query";

export const useGetDashboard = (id: string) => {
  return useQuery<DashboardResponse, Error>({
    queryKey: ["dashboard", id],
    queryFn: async (): Promise<DashboardResponse> => {
      const { data } = await instance.get<DashboardResponse>(
        `/dashboard?id=${id}`
      );
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
};
