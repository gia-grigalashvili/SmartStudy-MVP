import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { toUpperCase } from "@/utils";
import { LanguageChanger, ThemeSwitcher } from "../ui";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSidebarStore } from "@/store";

export const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const { t } = useTranslation();
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const name = currentPath.length > 2 ? currentPath[2] : currentPath[1];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;

      if (mobile && !collapsed) {
        toggleCollapsed();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    //
  }, [collapsed]);

  return (
    <motion.div
      className="bg-background page-transition-container"
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.header
        className="bg-background border-border sticky top-0 z-30 flex h-16 items-center border-b px-4 backdrop-blur-sm md:px-6 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <motion.div
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <div>
              <h1 className="text-foreground line-clamp-1 text-[14px] font-semibold md:text-[16px]">
                {toUpperCase(t(`menu.${name}`, t("menu.notFound")))}
              </h1>
              <div className="text-muted-foreground text-xs">
                {toUpperCase(t("global.adminPannel"))}
              </div>
            </div>
          </motion.div>

          <LanguageChanger />
          <ThemeSwitcher />
        </div>
      </motion.header>
    </motion.div>
  );
};
