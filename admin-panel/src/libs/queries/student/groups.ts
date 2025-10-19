import { GroupResponse, GroupsResponse } from "@/types/student";
import instance from "@/api/axios";
import { useQuery } from "react-query";

export const useGetGroups = (search?: URLSearchParams) => {
  return useQuery<GroupsResponse, Error>({
    queryKey: ["groups", search?.toString() ?? ""],
    queryFn: async (): Promise<GroupsResponse> => {
      const { data } = await instance.get<GroupsResponse>(
        `student/groups${search ? `?${search}` : ""}`
      );
      return data;
    },
    refetchOnWindowFocus: false
  });
};

export const useGetGroup = (id: string) => {
  return useQuery<GroupResponse, Error>({
    queryKey: ["groups", id],
    queryFn: async (): Promise<GroupResponse> => {
      const { data } = await instance.get<GroupResponse>(`/group/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
};
