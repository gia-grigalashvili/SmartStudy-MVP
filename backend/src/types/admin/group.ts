export interface CreateGroupDTO {
  code: string;
  semester: number;
  teacherId: string;
  subjects: string[];
  year: string;
  academicCalendarId: string;
}

export interface UpdateGroupDTO extends CreateGroupDTO {
  id: string;
}
