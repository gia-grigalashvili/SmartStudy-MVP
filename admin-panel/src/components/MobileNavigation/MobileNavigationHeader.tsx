import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, SheetHeader } from "../ui";
import { useAuthStore } from "@/store";
import { getTranslatedObject, toUpperCase } from "@/utils";

export const MobileNavigationHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, userType } = useAuthStore();

  const translations = getTranslatedObject(
    currentUser?.translations,
    i18n.language
  );
  const userName = `${translations?.firstName} ${translations?.lastName}`;

  return (
    <SheetHeader className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {toUpperCase(
              `${translations?.firstName?.[0] ?? "D"}${
                translations?.lastName?.[0] ?? "R"
              }`
            )}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-muted-foreground text-sm">
            {toUpperCase(t(`sidebar.${userType ?? "user"}`))}
          </p>
        </div>
      </div>
    </SheetHeader>
  );
};
