import { LocaleConfig } from "@/components/ui";
import { Stage } from "@/types";
import { CardSim, Code, FileText, Globe } from "lucide-react";

type SubNavigationItem = {
  name: string;
  href: string;
  requiresId?: boolean;
};

export const subNavigations: Record<string, SubNavigationItem[]> = {};

export const booleanArray = [
  {
    name: "yes"
  },
  {
    name: "no"
  }
];

export const georgianMonths = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი"
];

export const getPageInfo = (stage: Stage) => {
  switch (stage) {
    case "login":
      return {
        title: "global.loginTitle",
        subtitle: "global.loginSubtitle"
      };
    case "verify-otp":
      return {
        title: "global.otpTitle",
        subtitle: "global.otpSubtitle"
      };
    case "forgot-password":
      return {
        title: "global.passwordTitle",
        subtitle: "global.passwordSubtitle"
      };
    case "forgot-password-otp":
      return {
        title: "global.resetTitle",
        subtitle: "global.resetSubtitle"
      };
    case "new-password":
      return {
        title: "global.newPasswordTitle",
        subtitle: "global.newPasswordSubtitle"
      };
    default:
      return {
        title: "global.loginTitle",
        subtitle: "global.loginSubtitle"
      };
  }
};

export const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ka", label: "ქართული", flag: "🇬🇪" }
] as LocaleConfig[];

export const platformServices = [
  {
    icon: Code,
    title: "global.liveCodeTitle",
    desc: "global.liveCodeDescription"
  },
  {
    icon: CardSim,
    title: "global.fleshCardTitle",
    desc: "global.fleshCardDescription"
  },
  {
    icon: FileText,
    title: "global.filesTitle",
    desc: "global.filesDescription"
  },
  {
    icon: Globe,
    title: "global.websiteTitle",
    desc: "global.websiteDescription"
  }
  // TODO: Add others
];
