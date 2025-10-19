import instance from "@/api/axios";
import { Teacher } from "@/types/admin";
import { useQuery } from "react-query";

export interface TeachersResponse {
  data: Teacher[];
  count: number;
}

export interface TeacherResponse {
  data: Teacher;
}

export const useGetTeachers = (search?: URLSearchParams) => {
  return useQuery<TeachersResponse, Error>({
    queryKey: ["teachers", search?.toString() ?? ""],
    queryFn: async (): Promise<TeachersResponse> => {
      const { data } = await instance.get<TeachersResponse>(
        `/admin/teacher${search ? `?${search}` : ""}`
      );
      return data;
    },
    refetchOnWindowFocus: false
  });
};

export const useGetTeacher = (id: string) => {
  return useQuery<TeacherResponse, Error>({
    queryKey: ["teachers", id],
    queryFn: async (): Promise<TeacherResponse> => {
      const { data } = await instance.get<TeacherResponse>(
        `/admin/teacher/${id}`
      );
      return data;
    },
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};
