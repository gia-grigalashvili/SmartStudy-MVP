import { Icons } from "@/components";
import { toUpperCase } from "@/utils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[24px] pb-[56px]">
        <Icons.NotFound className="h-[152px] w-[152px]" />
        <h2 className="text-[20px] md:text-[26px]">
          {toUpperCase(t("notFound.pageNotFound"))}
        </h2>
        <p className="overflow-hidden text-center">
          {toUpperCase(t("notFound.resourceOfGiven"))}: {location.pathname}{" "}
          {toUpperCase(t("notFound.cannotBeFound"))}
        </p>
        <button onClick={navigateBack}>
          {toUpperCase(t("notFound.navigateBack"))}
        </button>
      </div>
    </div>
  );
};
