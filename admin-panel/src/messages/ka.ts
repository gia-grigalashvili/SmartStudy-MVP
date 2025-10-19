export const ka = {
  translation: {
    global: {
      name: "SmartStudy",
      overview: "მიმოხილვა",
      description: "აღწერა",
      adminPannel: "ადმინისტრატორის პანელი",
      language: "ენა",
      loginTitle: "შესვლა",
      loginSubtitle: "ჩაწერეთ თქვენი მონაცემები",
      otpTitle: "შეიყვანეთ OTP",
      otpSubtitle: "Ჩვენ გამოგიგზავინეთ კოდი",
      passwordTitle: "პაროლის აღდგენა",
      passwordSubtitle: "შეიყვანეთ თქვენი ელექტრონული ფოსტა",
      resetTitle: "პაროლის შეცვლა",
      newPasswordTitle: "ახალი პაროლი",
      newPasswordSubtitle: "შეარჩიეთ ახალი პაროლი",
      websiteDescription: "ვებგვერდის აღწერა"
    },

    dataTable: {
      loading: "ჩატვირთვა...",
      noData: "მონაცემები ვერ მოიძებნა",
      all: "ყველა",
      clear: "გასუფთავება",
      search: "ძებნა"
    },

    admin: {
      menu: {
        dashboard: "დაშბორდი",
        teachers: "მასწავლებლები",
        students: "სტუდენტები"
      },
      groups: {
        errors: {
          codeRequired: "კოდი აუცილებელია",
          yearRequired: "წელი აუცილებელია",
          semesterRequired: "სემესტრი აუცილებელია",
          subjectRequired: "საგანი აუცილებელია",
          teacherRequired: "მასწავლებელი აუცილებელია",
          academicCalendarRequired: "აკადემიური კალენდარი აუცილებელია"
        }
      },
      academicCalendar: {
        errors: {
          yearRequired: "წელი აუცილებელია",
          semesterRequired: "სემესტრი აუცილებელია",
          startDateRequired: "დაწყების თარიღი აუცილებელია",
          endDateRequired: "დასრულების თარიღი აუცილებელია"
        }
      },
      students: {
        errors: {
          emailInvalid: "ელ-ფოსტა არასწორია",
          dateOfBirthRequired: "დაბადების თარიღი აუცილებელია",
          personalIdLength: "პირადი ნომერი უნდა იყოს 9-დან 20 სიმბოლომდე",
          classInvalid: "კლასი უნდა იყოს მთელი რიცხვი",
          passwordRequired: "პაროლი აუცილებელია",
          firstNameRequired: "სახელი აუცილებელია",
          lastNameRequired: "გვარი აუცილებელია"
        }
      },
      teachers: {
        errors: {
          emailInvalid: "ელ-ფოსტა არასწორია",
          dateOfBirthRequired: "დაბადების თარიღი აუცილებელია",
          personalIdLength: "პირადი ნომერი უნდა იყოს 9-დან 20 სიმბოლომდე",
          passwordRequired: "პაროლი აუცილებელია",
          firstNameRequired: "სახელი აუცილებელია",
          lastNameRequired: "გვარი აუცილებელია"
        }
      },
      subjects: {
        errors: {
          codeRequired: "კოდი აუცილებელია",
          firstNameRequired: "სახელი აუცილებელია",
          lastNameRequired: "გვარი აუცილებელია"
        }
      }
    },

    menu: {
      notFound: "არ მოიძებნა",
      dashboard: "დაშბორდი",
      teachers: "მასწავლებლები",
      students: "სტუდენტები"
    },

    headers: {
      areYouSure: "დარწმუნებული ხართ?",
      deleteDescription: "ეს მოქმედება შეუქცევადია.",
      cancel: "გაუქმება",
      delete: "წაშლა"
    },

    confirmDialog: {
      areYouSure: "დარწმუნებული ხართ?",
      confirmAction: "დაადასტურეთ მოქმედება",
      deleteDescription: "ეს ელემენტი მუდმივად წაიშლება."
    },

    toast: {
      saved: "დაინახვა წარმატებით",
      settings: {
        saved: "პარამეტრები წარმატებით შენახულია"
      },
      failed: "ოპერაცია არასრულდა",
      operation: {
        failed: "ოპერაცია წარუმატებელია",
        successful: "ოპერაცია წარმატებულია"
      },
      data: {
        synced: "მონაცემები სინქრონიზებულია"
      },
      error: "შეცდომა",
      network: {
        error: "შეამოწმეთ ინტერნეტის კავშირი და სცადეთ თავიდან."
      },
      validation: {
        error: "ველების სწორი შეყვანა აუცილებელია"
      },
      added: "დამატება წარმატებულია",
      updated: "განახლება წარმატებულია",
      deleted: "წაშლა წარმატებულია",
      warning: "ყურადღება"
    },

    ui: {
      languageErrorTooltip:
        "{{count}} {{error}} ენაზე {{language}} {{context}}",
      error: "შეცდომა",
      errors: "შეცდომები",
      metadata: "მეტამონაცემი",
      hasValidationErrors: "არსებობს ვალიდაციის შეცდომები",
      language: "ენა"
    },

    auth: {
      errors: {
        emailRequired: "ელ‑ფოსტა აუცილებელია",
        invalidEmail: "ელ‑ფოსტა არასწორია",
        onlyDigits: "მხოლოდ ციფრები",
        otpRequired: "OTP უნდა შეიცავდეს 4 ციფრს",
        invalidPassword: "პაროლი არასწორია"
      }
    },

    notFound: {
      resourceOfGiven: "გვერდი მითითებული მისამართზე",
      pageNotFound: "ვერ მოიძებნა",
      cannotBeFound: "ვერ მოიძებნა",
      navigateBack: "უკან დაბრუნება"
    },

    pages: {
      dashboard: "დაშბორდი"
    }
  }
};
