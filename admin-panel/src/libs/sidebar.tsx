import { useAuthStore } from "@/store";
import { NavItem, SidebarItem } from "@/types";
import { toUpperCase } from "@/utils";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Globe,
  User,
  Menu,
  FolderTree
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const useMenuItems = (): SidebarItem[] => {
  const { userType } = useAuthStore();
  const { t } = useTranslation();
  if (!userType) return [];

  const items = {
    administration: [
      {
        key: "dashboard",
        href: "administration/dashboard",
        icon: <Home className="h-5 w-5" />,
        label: toUpperCase(t("admin.menu.dashboard"))
      },
      {
        key: "teachers",
        href: "administration/teachers",
        icon: <Users className="h-5 w-5" />,
        label: toUpperCase(t("admin.menu.teachers"))
      },
      {
        key: "students",
        href: "administration/students",
        icon: <User className="h-5 w-5" />,
        label: toUpperCase(t("admin.menu.students"))
      },
      {
        key: "groups",
        href: "administration/groups",
        icon: <FolderTree className="h-5 w-5" />,
        label: toUpperCase(t("admin.menu.groups"))
      },
      {
        key: "academic-calendar",
        href: "administration/academic-calendar",
        icon: <Calendar className="h-5 w-5" />,
        label: toUpperCase(t("admin.menu.academic-calendar"))
      }
    ],
    student: [
      {
        key: "dashboard",
        href: "student/dashboard",
        icon: <Home className="h-5 w-5" />,
        label: toUpperCase(t("student.menu.dashboard"))
      },
      {
        key: "ai-assistant",
        href: "student/ai-assistant",
        icon: <Globe className="h-5 w-5" />,
        label: toUpperCase(t("student.menu.ai-assistant"))
      },
      {
        key: "groups",
        href: "student/groups",
        icon: <FolderTree className="h-5 w-5" />,
        label: toUpperCase(t("student.menu.groups"))
      },
      {
        key: "tests",
        href: "student/tests",
        icon: <FileText className="h-5 w-5" />,
        label: toUpperCase(t("student.menu.tests"))
      }
    ],
    teacher: [
      {
        key: "dashboard",
        href: "teacher/dashboard",
        icon: <Home className="h-5 w-5" />,
        label: toUpperCase(t("teacher.menu.dashboard"))
      },
      {
        key: "groups",
        href: "teacher/groups",
        icon: <FolderTree className="h-5 w-5" />,
        label: toUpperCase(t("teacher.menu.groups"))
      },
      {
        key: "students",
        href: "teacher/students",
        icon: <Users className="h-5 w-5" />,
        label: toUpperCase(t("teacher.menu.students"))
      }
    ]
  };

  return items[userType] || [];
};

export const usePrimaryNavItems = (): NavItem[] => {
  const { userType } = useAuthStore();
  const { t } = useTranslation();
  if (!userType) return [];

  const items = {
    administration: [
      {
        key: "dashboard",
        href: "dashboard",
        icon: <Home />,
        label: toUpperCase(t("admin.menu.dashboard"))
      },
      {
        key: "teachers",
        href: "teachers",
        icon: <Users />,
        label: toUpperCase(t("admin.menu.teachers"))
      },
      {
        key: "menu",
        icon: <Menu />,
        label: toUpperCase(t("admin.menu.menu")),
        action: "openMenu"
      }
    ],
    student: [
      {
        key: "dashboard",
        href: "dashboard",
        icon: <Home />,
        label: toUpperCase(t("student.menu.dashboard"))
      },
      {
        key: "ai-assistant",
        href: "ai-assistant",
        icon: <Globe />,
        label: toUpperCase(t("student.menu.ai-assistant"))
      },
      {
        key: "menu",
        icon: <Menu />,
        label: toUpperCase(t("student.menu.menu")),
        action: "openMenu"
      }
    ],
    teacher: [
      {
        key: "dashboard",
        href: "dashboard",
        icon: <Home />,
        label: toUpperCase(t("teacher.menu.dashboard"))
      },
      {
        key: "groups",
        href: "groups",
        icon: <FolderTree />,
        label: toUpperCase(t("teacher.menu.groups"))
      },
      {
        key: "menu",
        icon: <Menu />,
        label: toUpperCase(t("teacher.menu.menu")),
        action: "openMenu"
      }
    ]
  };
  return items[userType] || [];
};
