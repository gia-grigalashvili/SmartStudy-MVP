export interface CreateAcademicCalendarDTO {
  year: string;
  semester: number;
  startDate: string;
  endDate: string;
}

export interface UpdateAcademicCalendarDTO extends CreateAcademicCalendarDTO {
  id: string;
}
