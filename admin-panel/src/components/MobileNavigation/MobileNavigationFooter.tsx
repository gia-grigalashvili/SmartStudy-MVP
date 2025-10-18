import { useTranslation } from "react-i18next";
import { Button } from "../ui";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store";
import { toUpperCase } from "@/utils";

export const MobileNavigationFooter: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  return (
    <div className="pb-8">
      <Button
        variant="outline"
        className="h-12 w-full justify-start gap-3 rounded-xl border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        onClick={() => logout()}
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">
          {toUpperCase(t("sidebar.logout", "Logout"))}
        </span>
      </Button>
    </div>
  );
};
