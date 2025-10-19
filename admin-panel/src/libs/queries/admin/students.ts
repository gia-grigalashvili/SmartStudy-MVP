import { Student } from "@/types/admin/group/Student";
import instance from "@/api/axios";
import { useQuery } from "react-query";

export interface StudentsResponse {
  data: Student[];
  count: number;
}

export interface StudentResponse {
  data: Student;
}

export const useGetStudents = (search?: URLSearchParams) => {
  return useQuery<StudentsResponse, Error>({
    queryKey: ["students", search?.toString() ?? ""],
    queryFn: async (): Promise<StudentsResponse> => {
      const { data } = await instance.get<StudentsResponse>(
        `/admin/student${search ? `?${search}` : ""}`
      );
      return data;
    },
    refetchOnWindowFocus: false
  });
};

export const useGetStudent = (id: string) => {
  return useQuery<StudentResponse, Error>({
    queryKey: ["students", id],
    queryFn: async (): Promise<StudentResponse> => {
      const { data } = await instance.get<StudentResponse>(
        `/admin/student/${id}`
      );
      return data;
    },
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};
