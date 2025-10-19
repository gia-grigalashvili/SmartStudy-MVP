// src/locales/en.ts

export const en = {
  translation: {
    "/": "/",
    ":": ":",
    HH: "HH",
    "HH:mm": "HH:mm",

    // 🧩 Common / Global
    common: {
      yes: "Yes",
      no: "No",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      confirm: "Confirm",
      loading: "Loading...",
      search: "Search",
      clear: "Clear",
      back: "Back",
      next: "Next",
      previous: "Previous",
      save: "Save",
      submit: "Submit",
      edit: "Edit",
      create: "Create",
      delete: "Delete",
      apply: "Apply",
      reset: "Reset",
      upload: "Upload",
      uploading: "Uploading...",
      uploaded: "Uploaded",
      actions: "Actions",
      view: "View",
      details: "Details",
      filter: "Filter",
      filters: "Filters",
      all: "All",
      none: "None",
      more: "More",
      noneFound: "No results",
      notAvailable: "N/A"
    },

    // 🌍 Global
    global: {
      appName: "SmartStudy",
      name: "Smart Study",
      overview: "Overview",
      description: "Description",
      adminPanel: "Admin Panel",
      adminPannel: "Admin Panel",
      language: "Language",
      websiteDescription: "Website description",
      close: "Close",
      platform: "Platform",
      nextSlide: "Next",
      previousSlide: "Previous"
    },

    // 🧭 Navigation
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      settings: "Settings",
      profile: "Profile",
      users: "Users",
      teachers: "Teachers",
      students: "Students",
      logout: "Logout",
      login: "Login",
      register: "Register"
    },

    // 🔐 Auth
    auth: {
      loginTitle: "Login",
      loginSubtitle: "Enter your credentials",
      signIn: "Sign in",
      signOut: "Sign out",
      signUp: "Sign up",
      forgotPassword: "Forgot password?",
      resetPassword: "Reset Password",
      newPassword: "New Password",
      changePassword: "Change Password",
      labels: {
        email: "Email",
        password: "Password",
        otp: "OTP",
        rememberMe: "Remember me"
      },
      errors: {
        emailRequired: "Email is required",
        invalidEmail: "Invalid email",
        invalidOTP: "Invalid OTP",
        onlyDigits: "Only digits are allowed",
        otpRequired: "OTP is required",
        passwordLength: "Password must be between 8 and 100 characters",
        passwordMismatch: "Passwords do not match",
        passwordPattern: "Password does not meet pattern",
        passwordRequired: "Password is required",
        invalidPassword: "Invalid password",
        tooShort: "Value is too short",
        tooLong: "Value is too long"
      },
      forgetPassword: {
        backToLogin: "Back to login",
        email: "Email",
        send: "Send"
      },
      loginForm: {
        email: "Email",
        login: "Login",
        password: "Password",
        remember: "Remember me"
      },
      otpForm: {
        codeSentAt: "Code sent at {{time}}",
        resend: "Resend",
        resendAvialible: "Resend available in {{seconds}}s",
        verify: "Verify"
      }
    },

    // 🧾 Admin menu
    admin: {
      menu: {
        "academic-calendar": "Academic calendar",
        dashboard: "Dashboard",
        groups: "Groups",
        menu: "Menu",
        students: "Students",
        teachers: "Teachers"
      }
    },

    // ✅ Confirm dialogs
    confirmDialog: {
      areYouSure: "Are you sure?",
      cancel: "Cancel",
      confirm: "Confirm",
      confirmAction: "Confirm Action",
      confirmDescription: "Are you sure you want to continue?",
      delete: "Delete",
      deleteDescription: "This action is permanent"
    },

    // 🧮 Data table
    dataTable: {
      actions: "Actions",
      all: "All",
      clear: "Clear",
      clearAll: "Clear all",
      clearFilters: "Clear filters",
      delete: "Delete",
      edit: "Edit",
      filters: "Filters",
      loading: "Loading...",
      max: "Max",
      min: "Min",
      noData: "No data",
      noResults: "No results",
      rowsPerPage: "Rows per page",
      search: "Search",
      select: "Select",
      selectAll: "Select all",
      itemsSelected: "{{count}} selected",
      page: "Page",
      of: "of",
      itemsPerPage: "items per page"
    },

    // 🧰 Form actions
    formActions: {
      cancel: "Cancel",
      close: "Close",
      create: "Create",
      dangerZone: "Danger zone",
      delete: "Delete",
      requiredFields: "Required fields",
      save: "Save",
      saveChanges: "Save changes",
      saving: "Saving..."
    },

    // 🧑‍🏫 Teacher + Student menus
    teacher: {
      menu: {
        dashboard: "Dashboard",
        groups: "Groups",
        menu: "Menu",
        students: "Students"
      },
      groups: {
        errors: {
          codeRequired: "Code is required",
          yearRequired: "Year is required",
          semesterRequired: "Semester is required",
          subjectRequired: "At least one subject is required",
          teacherRequired: "Teacher is required",
          academicCalendarRequired: "Academic calendar is required"
        }
      },
      academicCalendar: {
        errors: {
          yearRequired: "Year is required",
          semesterRequired: "Semester is required",
          startDateRequired: "Start date is required",
          endDateRequired: "End date is required"
        }
      },
      students: {
        errors: {
          emailInvalid: "Invalid email",
          dateOfBirthRequired: "Date of birth is required",
          personalIdLength: "Personal ID must be between 9 and 20 characters",
          classInvalid: "Class must be an integer",
          passwordRequired: "Password is required",
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required"
        }
      },
      teachers: {
        errors: {
          emailInvalid: "Invalid email",
          dateOfBirthRequired: "Date of birth is required",
          personalIdLength: "Personal ID must be between 9 and 20 characters",
          passwordRequired: "Password is required",
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required"
        }
      },
      subjects: {
        errors: {
          codeRequired: "Code is required",
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required"
        }
      }
    },

    student: {
      menu: {
        "ai-assistant": "AI Assistant",
        dashboard: "Dashboard",
        groups: "Groups",
        menu: "Menu",
        tests: "Tests"
      }
    },

    // 🏆 Hero section
    header: {
      logo: "SmartStudy",
      ctaButton: "Join Us"
    },

    hero: {
      badge: "AI-powered platform",
      imageAlt: "Hero image",
      subtitle:
        "SmartStudy combines education and technology to create personalized learning experiences.",
      title: "Smart teaching powered by AI",
      primaryButton: "Get started",
      secondaryButton: "Learn more"
    },

    heroStats: {
      activeUsers: "500K+ active users",
      aiEnhanced: "AI-enhanced"
    },

    // 📚 Features section
    features: {
      sectionTitle: "Key features",
      sectionSubtitle: "Explore what we offer",
      feature1: {
        title: "Smart gradebook",
        description:
          "Manage student results and evaluations with a modern digital gradebook."
      },
      feature2: {
        title: "AI assistance",
        description:
          "Our AI helps identify weak spots and suggests personalized study paths."
      },
      feature3: {
        title: "Global access",
        description:
          "Connect with students and teachers anywhere via cloud platform."
      },
      feature4: {
        title: "Interactive content",
        description:
          "Engage students with interactive and dynamic lessons powered by AI."
      },
      feature5: {
        title: "Smart tutor",
        description:
          "Our AI assistant guides students to reach learning goals effectively."
      }
    },

    // 🧍 Roles
    roles: {
      admin: "Admin",
      teacher: "Teacher",
      student: "Student",
      guest: "Guest"
    },

    // 📥 Upload / media
    upload: {
      chooseFile: "Choose file",
      dropFiles: "Drop files here or click to upload",
      invalidType: "Invalid file type",
      tooLarge: "File is too large"
    },

    mediaUploader: {
      dropOrBrowse: "Drop files here or browse",
      invalidType: "Invalid file type",
      max: "Maximum file size exceeded",
      replace: "Replace",
      tryAgain: "Try again",
      upload: "Upload",
      uploadError: "Upload error",
      uploadImage: "Upload image",
      uploadImageFile: "Upload image file",
      uploading: "Uploading..."
    },

    // 📄 Not found
    notFound: {
      pageNotFound: "Page not found",
      resourceOfGiven: "Resource of given path",
      cannotBeFound: "cannot be found",
      navigateBack: "Navigate back",
      goHome: "Go to home"
    },

    // ⚙️ Settings
    settings: {
      general: "General",
      account: "Account",
      notifications: "Notifications",
      appearance: "Appearance",
      saveSuccess: "Settings saved"
    },

    // 💬 Toast messages
    toast: {
      added: "Added successfully",
      updated: "Updated successfully",
      deleted: "Deleted successfully",
      saved: "Saved successfully",
      failed: "Operation failed",
      success: "Success",
      warning: "Warning",
      info: "Info",
      data: { synced: "Data synchronized" },
      error: "Error",
      network: {
        error: "Please check your internet connection and try again."
      },
      validation: { error: "Validation error" },
      operation: {
        failed: "Operation failed",
        successful: "Operation successful"
      },
      settings: { saved: "Settings saved successfully" }
    },

    // 🧱 UI
    ui: {
      author: "Author",
      created: "Created",
      updated: "Updated",
      metadata: "Metadata",
      languageErrorTooltip: "{{count}} {{error}} in {{language}} {{context}}",
      error: "error",
      errors: "errors",
      hasValidationErrors: "Has validation errors",
      back: "Back",
      next: "Next",
      previous: "Previous",
      save: "Save",
      submit: "Submit",
      edit: "Edit",
      create: "Create",
      cancel: "Cancel",
      apply: "Apply",
      reset: "Reset",
      viewAll: "View all",
      showMore: "Show more",
      showLess: "Show less",
      loadingMore: "Loading more..."
    },

    footer: {
      copyright: "© {{year}} SmartStudy — All rights reserved.",
      description: "SmartStudy — personalized learning with AI."
    }
  }
};

export default en;
