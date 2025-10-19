import instance from "@/api/axios";
import {
  AcademicCalendarResponse,
  AcademicCalendarsResponse
} from "@/types/admin";
import { useQuery } from "react-query";

export const useGetAcademicCalendars = (search?: URLSearchParams) => {
  return useQuery<AcademicCalendarsResponse, Error>({
    queryKey: ["academicCalendars", search?.toString() ?? ""],
    queryFn: async (): Promise<AcademicCalendarsResponse> => {
      const { data } = await instance.get<AcademicCalendarsResponse>(
        `/admin/academic-calendar${search ? `?${search}` : ""}`
      );
      return data;
    },
    refetchOnWindowFocus: false
  });
};

export const useGetAcademicCalendar = (id: string) => {
  return useQuery<AcademicCalendarResponse, Error>({
    queryKey: ["academicCalendars", id],
    queryFn: async (): Promise<AcademicCalendarResponse> => {
      const { data } = await instance.get<AcademicCalendarResponse>(
        `/academic-calendar/${id}`
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
