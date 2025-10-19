import { GroupResponse, GroupsResponse } from "@/types/student";
import instance from "@/api/axios";
import { useQuery } from "react-query";

export const useGetGroups = (id: string, search?: URLSearchParams) => {
  return useQuery<GroupsResponse, Error>({
    queryKey: ["groups", id, search?.toString() ?? ""],
    queryFn: async (): Promise<GroupsResponse> => {
      const { data } = await instance.get<GroupsResponse>(
        `/group?id=${id}${search ? `&${search}` : ""}`
      );
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false
  });
};

export const useGetGroup = (id: string, studentId: string) => {
  return useQuery<GroupResponse, Error>({
    queryKey: ["groups", id],
    queryFn: async (): Promise<GroupResponse> => {
      const { data } = await instance.get<GroupResponse>(
        `/group/${id}?studentId=${studentId}`
      );
      return data;
    },
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
};
