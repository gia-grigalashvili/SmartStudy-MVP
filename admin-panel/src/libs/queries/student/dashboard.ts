import { DashboardResponse } from "@/types/student";
import instance from "@/api/axios";
import { useQuery } from "react-query";

export const useGetDashboard = () => {
  return useQuery<DashboardResponse, Error>({
    queryKey: ["dashboard",],
    queryFn: async (): Promise<DashboardResponse> => {
      const { data } = await instance.get<DashboardResponse>(
        "/dashboard"
      );
      return data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
};
