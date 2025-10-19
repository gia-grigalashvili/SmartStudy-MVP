export interface CreateGroupDTO {
  code: string;
  semester: number;
  academicYearId: string;
  teacherId: string;
  subjects: string[];
  academicCalendarId?: string;
}

export interface UpdateGroupDTO extends CreateGroupDTO {
  id: string;
}
