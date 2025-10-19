// src/locales/ka.ts

export const ka = {
  translation: {
    "/": "/",
    ":": ":",
    HH: "HH",
    "HH:mm": "HH:mm",

    // 🧩 Common / Global
    common: {
      yes: "კი",
      no: "არა",
      ok: "კარგი",
      cancel: "გაუქმება",
      close: "დახურვა",
      confirm: "დადასტურება",
      loading: "იტვირთება...",
      search: "ძებნა",
      clear: "გასუფთავება",
      back: "უკან",
      next: "შემდეგი",
      previous: "წინა",
      save: "შენახვა",
      submit: "გაგზავნა",
      edit: "რედაქტირება",
      create: "შექმნა",
      delete: "წაშლა",
      apply: "დამოწმება",
      reset: "გადაყენება",
      upload: "ატვირთვა",
      uploading: "იტვირთება...",
      uploaded: "ატვირთულია",
      actions: "მოქმედებები",
      view: "ნახვა",
      details: "დეტალები",
      filter: "ფილტრი",
      filters: "ფილტრები",
      all: "ყველა",
      none: "არცერთი",
      more: "მეტი",
      noneFound: "შედეგი ვერ მოიძებნა",
      notAvailable: "არ არის ხელმისაწვდომი"
    },

    // 🌍 Global
    global: {
      appName: "SmartStudy",
      name: "SmartStudy",
      overview: "მიმოხილვა",
      description: "აღწერა",
      adminPanel: "ადმინისტრატორის პანელი",
      adminPannel: "ადმინისტრატორის პანელი",
      language: "ენა",
      websiteDescription: "ვებგვერდის აღწერა",
      close: "დახურვა",
      platform: "პლატფორმა",
      nextSlide: "შემდეგი",
      previousSlide: "წინა",
      preferences: ""
    },

    // 🧭 Navigation
    nav: {
      home: "მთავარი",
      dashboard: "დაშბორდი",
      settings: "პარამეტრები",
      profile: "პროფილი",
      users: "მომხმარებლები",
      teachers: "მასწავლებლები",
      students: "სტუდენტები",
      logout: "გამოსვლა",
      login: "შესვლა",
      register: "რეგისტრაცია"
    },

    // 🔐 Auth
    auth: {
      loginTitle: "შესვლა",
      loginSubtitle: "შეიყვანეთ თქვენი მონაცემები",
      signIn: "შესვლა",
      signOut: "გასვლა",
      signUp: "რეგისტრაცია",
      forgotPassword: "პაროლის დავიწყება?",
      resetPassword: "პაროლის გადაყენება",
      newPassword: "ახალი პაროლი",
      changePassword: "პაროლის შეცვლა",
      labels: {
        email: "ელ-ფოსტა",
        password: "პაროლი",
        otp: "OTP",
        rememberMe: "მახსოვს"
      },
      errors: {
        emailRequired: "ელ-ფოსტა აუცილებელია",
        invalidEmail: "ელ-ფოსტა არასწორია",
        invalidOTP: "OTP არასწორია",
        onlyDigits: "მხოლოდ ციფრებია დაშვებული",
        otpRequired: "OTP აუცილებელია",
        passwordLength: "პაროლი უნდა იყოს 8–100 სიმბოლო",
        passwordMismatch: "პაროლები არ ემთხვევა",
        passwordPattern: "პაროლი არ აკმაყოფილებს ფორმატს",
        passwordRequired: "პაროლი აუცილებელია",
        invalidPassword: "პაროლი არასწორია",
        tooShort: "მნიშვნელობა ძალიან მოკლეა",
        tooLong: "მნიშვნელობა ძალიან გრძელია"
      },
      forgetPassword: {
        backToLogin: "უკან შესვლაზე",
        email: "ელ-ფოსტა",
        send: "გაგზავნა"
      },
      loginForm: {
        email: "ელ-ფოსტა",
        login: "შესვლა",
        password: "პაროლი",
        remember: "მახსოვს"
      },
      otpForm: {
        codeSentAt: "კოდი გაგზავნილია {{time}}",
        resend: "ხელახლა გაგზავნა",
        resendAvialible: "ხელახლა ხელმისაწვდომი {{seconds}} წამში",
        verify: "შემოწმება"
      }
    },

    // 🧾 Admin menu
    admin: {
      menu: {
        "academic-calendar": "აკადემიური კალენდარი",
        dashboard: "დაშბორდი",
        groups: "ჯგუფები",
        menu: "მენიუ",
        students: "სტუდენტები",
        teachers: "მასწავლებლები"
      },
      groups: {
        academicCalendar: "",
        addGroup: "",
        code: "",
        management: "",
        managementDescription: "",
        noGroupsFound: "",
        quizzes: "",
        semester: "",
        students: "",
        subjects: "",
        teacher: "",
        viewCalendar: "",
        year: "",
        errors: {
          codeRequired: "კოდი აუცილებელია",
          semesterRequired: "სემესტრი აუცილებელია",
          subjectRequired: "საგანი აუცილებელია",
          teacherRequired: "მასწავლებელი აუცილებელია",
          yearRequired: "წელი აუცილებელია"
        }
      },
      students: {
        addStudent: "",
        age: "",
        class: "",
        createdAt: "",
        dateOfBirth: "",
        email: "",
        groupsCount: "",
        management: "",
        managementDescription: "",
        noStudentsFound: "",
        password: "",
        personalId: "",
        errors: {
          emailInvalid: "ელ-ფოსტა არასწორია"
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
          codeRequired: "კოდი აუცილებელია"
        }
      },
      academicCalendar: {
        errors: {
          yearRequired: "წელი აუცილებელია"
        }
      },
      management: "მართვა",
      managementDescription: "მართეთ ყველა ელემენტი ამ განყოფილებაში.",
      addGroup: "ჯგუფის დამატება",
      addStudent: "სტუდენტის დამატება",
      addTeacher: "მასწავლებლის დამატება",
      addAcademicCalendar: "აკადემიური კალენდრის დამატება",
      noGroupsFound: "ჯგუფები ვერ მოიძებნა.",
      noStudentsFound: "სტუდენტები ვერ მოიძებნა.",
      noTeachersFound: "მასწავლებლები ვერ მოიძებნა.",
      noAcademicCalendarsFound: "აკადემიური კალენდრები ვერ მოიძებნა.",
      code: "კოდი",
      year: "წელი",
      semester: "სემესტრი",
      subjectsLabel: "საგნები",
      teacherLabel: "მასწავლებელი",
      academicCalendarLabel: "აკადემიური კალენდარი",
      studentsLabel: "სტუდენტები",
      quizzes: "ტესტები",
      personalId: "პირადი ნომერი",
      age: "ასაკი",
      class: "კლასი",
      groupsCount: "ჯგუფების რაოდენობა",
      createdAt: "შექმნის თარიღი",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      startDate: "დაწყების თარიღი",
      endDate: "დასრულების თარიღი",
      name: "სახელი",
      viewCalendar: "კალენდრის ნახვა"
    },

    // ✅ Confirm dialogs
    confirmDialog: {
      areYouSure: "დარწმუნებული ხართ?",
      cancel: "გაუქმება",
      confirm: "დადასტურება",
      confirmAction: "დაადასტურეთ მოქმედება",
      confirmDescription: "დარწმუნებული ხართ, რომ გსურთ გაგრძელება?",
      delete: "წაშლა",
      deleteDescription: "ეს ელემენტი მუდმივად წაიშლება."
    },

    // 🧮 Data table
    dataTable: {
      actions: "მოქმედებები",
      all: "ყველა",
      clear: "გასუფთავება",
      clearAll: "გადასუფთავება",
      clearFilters: "ფილტრის გასუფთავება",
      delete: "წაშლა",
      edit: "რედაქტირება",
      filters: "ფილტრები",
      loading: "იტვირთება...",
      max: "მაქს",
      min: "მინ",
      noData: "მონაცემი არ არის",
      noResults: "შედეგი ვერ მოიძებნა",
      rowsPerPage: "ელემენტები გვერდზე",
      search: "ძებნა",
      select: "არჩევა",
      selectAll: "ყველას მონიშვნა",
      itemsSelected: "{{count}} მონიშნულია",
      page: "გვერდი",
      of: "დან",
      itemsPerPage: "ელემენტები გვერდზე"
    },

    formActions: {
      cancel: "გაუქმება",
      close: "დახურვა",
      create: "შექმნა",
      dangerZone: "დამაზიანებელი ზონა",
      delete: "წაშლა",
      requiredFields: "სავალდებულო ველები",
      save: "შენახვა",
      saveChanges: "შენახვა ცვლილებების",
      saving: "იტვირთება..."
    },

    teacher: {
      menu: {
        dashboard: "დაშბორდი",
        groups: "ჯგუფები",
        menu: "მენიუ",
        students: "სტუდენტები"
      }
    },

    student: {
      menu: {
        "ai-assistant": "AI ასისტენტი",
        dashboard: "დაშბორდი",
        groups: "ჯგუფები",
        menu: "მენიუ",
        tests: "ტესტები"
      }
    },

    header: {
      logo: "SmartStudy",
      ctaButton: "შემოგვიერთდით"
    },

    hero: {
      badge: "AI-ის მხარდაჭერით",
      title: "ჭკვიანი სწავლება AI-ის დახმარებით",
      subtitle:
        "SmartStudy აერთიანებს განათლებას და ტექნოლოგიას პერსონალიზებული სწავლებისთვის.",
      primaryButton: "დაიწყეთ",
      secondaryButton: "გაიგე მეტი",
      imageAlt: "ჰერო სურათი"
    },

    heroStats: {
      activeUsers: "500K+ აქტიური მომხმარებელი",
      aiEnhanced: "AI-ით გაუმჯობესებული"
    },

    features: {
      sectionTitle: "ძირითადი ფუნქციები",
      sectionSubtitle: "გაეცანით რაც გთავაზობთ",
      feature1: {
        title: "ჭკვიანი სასკოლო წიგნი",
        description: "მართეთ შედეგები და შეფასებები თანამედროვე ციფრული წიგნით."
      },
      feature2: {
        title: "AI დახმარება",
        description:
          "AI ეხმარება სუსტი მხარეების გამოვლენასა და პერსონალიზაციაში."
      },
      feature3: {
        title: "გლობალური წვდომა",
        description:
          "დაკავშირებთ სტუდენტებსა და მასწავლებლებთან ნებისმიერ ადგილას."
      },
      feature4: {
        title: "ინტერაქტიული კონტენტი",
        description: "ინტერაქტიული და დინამიური გაკვეთილები AI მხარდაჭერით."
      },
      feature5: {
        title: "ჭკვიანი დახმარება",
        description: "AI ასისტენტი უადვილებს სწავლის პროცესს."
      }
    },

    roles: {
      admin: "ადმინი",
      teacher: "მასწავლებელი",
      student: "სტუდენტი",
      guest: "სტუმარი"
    },

    upload: {
      chooseFile: "აირჩიეთ ფაილი",
      dropFiles: "გადააგდეთ ფაილი აქ ან დააწკაპუნეთ ატვირთვისთვის",
      invalidType: "არასწორი ფაილის ტიპი",
      tooLarge: "ფაილი ძალიან დიდია"
    },

    mediaUploader: {
      dropOrBrowse: "გადააგდეთ ფაილი აქ ან მოძებნეთ",
      invalidType: "არასწორი ფაილის ტიპი",
      max: "ფაილის ზომა აღემატება მაქსიმუმს",
      replace: "ჩაანაცვლეთ",
      tryAgain: "ცადეთ ხელახლა",
      upload: "ატვირთვა",
      uploadError: "ატვირთვის შეცდომა",
      uploadImage: "სურათის ატვირთვა",
      uploadImageFile: "სურათის ფაილის ატვირთვა",
      uploading: "იტვირთება..."
    },

    notFound: {
      pageNotFound: "გვერდი ვერ მოიძებნა",
      resourceOfGiven: "რესურსი მითითებული მისამართზე",
      cannotBeFound: "ვერ მოიძებნა",
      navigateBack: "დაბრუნება",
      goHome: "მთავარ გვერდზე დაბრუნება"
    },

    settings: {
      general: "ზოგადი",
      account: "ანგარიში",
      notifications: "შეტყობინებები",
      appearance: "ვიზუალიზაცია",
      saveSuccess: "პარამეტრები შენახულია"
    },

    toast: {
      added: "დამატებულია",
      updated: "განახლებულია",
      deleted: "წაშლილია",
      saved: "წარმატებით შენახულია",
      failed: "ოპერაცია ვერ შესრულდა",
      success: "წარმატება",
      warning: "ყურადღება",
      info: "ინფორმაცია",
      data: { synced: "მონაცემები სინქრონიზირებულია" },
      error: "შეცდომა",
      network: {
        error: "გთხოვთ, შეამოწმეთ ინტერნეტის კავშირი და სცადეთ კვლავ."
      },
      validation: { error: "ვერიფიკაციის შეცდომა" },
      operation: {
        failed: "ოპერაცია წარუმატებელია",
        successful: "ოპერაცია წარმატებულია"
      },
      settings: { saved: "პარამეტრები შენახულია" }
    },

    ui: {
      author: "ავტორი",
      created: "შექმნილია",
      updated: "განახლებულია",
      metadata: "მეტატაი",
      languageErrorTooltip:
        "{{count}} {{error}} ენაში {{language}} {{context}}",
      error: "შეცდომა",
      errors: "შეცდომები",
      hasValidationErrors: "შეიცავს ვალიდაციის შეცდომებს",
      back: "უკან",
      next: "შემდეგი",
      previous: "წინა",
      save: "შენახვა",
      submit: "გაგზავნა",
      edit: "რედაქტირება",
      create: "შექმნა",
      cancel: "გაუქმება",
      apply: "დამოწმება",
      reset: "გადაყენება",
      viewAll: "ყველას ნახვა",
      showMore: "მეტი",
      showLess: "ნაკლები",
      loadingMore: "იტვირთება..."
    },

    footer: {
      copyright: "© {{year}} SmartStudy — ყველა უფლება დაცულია.",
      description: "SmartStudy — პერსონალიზებული სწავლება AI-ით.",
      form: { management: "" }
    },

    filters: {
      apply: "ფილტრის გამოყენება",
      clear: "გასუფთავება",
      multiSelectPlaceholder: "აირჩიეთ..."
    },

    pagination: {
      first: "პირველი",
      last: "ბოლო",
      next: "შემდეგი",
      previous: "წინა",
      page: "გვერდი",
      of: "დან"
    }
  }
};

export default ka;
