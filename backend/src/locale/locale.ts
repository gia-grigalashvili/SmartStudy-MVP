export const errorMessages = {
  userNotFound: {
    en: 'User not found',
    ka: 'მომხმარებელი ვერ მოიძებნა'
  },
  invalidCredentials: {
    en: 'Invalid email or password',
    ka: 'არასწორი ელ-ფოსტა ან პაროლი'
  },
  unauthorized: {
    en: 'Authorization failed',
    ka: 'ავტორიზაცია წარუმატებლად დასრულდა'
  },
  forbidden: {
    en: 'Access denied',
    ka: 'წვდომა აკრძალულია'
  },

  studentNotFound: {
    en: 'Student not found',
    ka: 'მოსწავლე ვერ მოიძებნა'
  },
  studentAlreadyExists: {
    en: 'Student already exists',
    ka: 'მოსწავლე უკვე არსებობს'
  },
  invalidStudentData: {
    en: 'Invalid student data',
    ka: 'მოსწავლის მონაცემები არასწორია'
  },

  teacherNotFound: {
    en: 'Teacher not found',
    ka: 'მასწავლებელი ვერ მოიძებნა'
  },
  teacherAlreadyExists: {
    en: 'Teacher already exists',
    ka: 'მასწავლებელი უკვე არსებობს'
  },
  invalidTeacherData: {
    en: 'Invalid teacher data',
    ka: 'მასწავლებლის მონაცემები არასწორია'
  },

  classNotFound: {
    en: 'Class not found',
    ka: 'კლასი ვერ მოიძებნა'
  },
  classAlreadyExists: {
    en: 'Class already exists',
    ka: 'კლასი უკვე არსებობს'
  },
  invalidClassData: {
    en: 'Invalid class data',
    ka: 'კლასის მონაცემები არასწორია'
  },

  subjectNotFound: {
    en: 'Subject not found',
    ka: 'საგანი ვერ მოიძებნა'
  },
  subjectAlreadyExists: {
    en: 'Subject already exists',
    ka: 'საგანი უკვე არსებობს'
  },
  invalidSubjectData: {
    en: 'Invalid subject data',
    ka: 'საგნის მონაცემები არასწორია'
  },

  gradeNotFound: {
    en: 'Grade not found',
    ka: 'შეფასება ვერ მოიძებნა'
  },
  invalidGradeValue: {
    en: 'Invalid grade value',
    ka: 'შეფასების მნიშვნელობა არასწორია'
  },
  gradeAlreadyExists: {
    en: 'Grade already exists for this student and subject',
    ka: 'შეფასება ამ მოსწავლისთვის და საგნისთვის უკვე არსებობს'
  },

  invalidId: {
    en: 'Invalid ID',
    ka: 'არასწორი ID'
  },
  missingRequiredField: {
    en: 'Missing required field',
    ka: 'აუცილებელი ველი ცარიელია'
  },
  invalidRequest: {
    en: 'Invalid request',
    ka: 'არასწორი მოთხოვნა'
  },
  serverError: {
    en: 'Internal server error',
    ka: 'სერვერის შიდა შეცდომა'
  },
  notFound: {
    en: 'Not found',
    ka: 'ვერ მოიძებნა'
  },
  success: {
    en: 'Operation successful',
    ka: 'მოქმედება წარმატებით შესრულდა'
  }
} as const

export type ErrorKey = keyof typeof errorMessages
export type TranslatedMessage = (typeof errorMessages)[ErrorKey]
