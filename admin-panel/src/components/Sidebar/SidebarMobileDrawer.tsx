import React from "react";
import { Button, Sheet, SheetContent } from "../ui";
import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { SidebarItem } from "@/types";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/libs";

const normalize = (p?: string) => (p ? p.replace(/^\/|\/$/g, "") : "");
const pathMatches = (current: string, candidate?: string) =>
  !!candidate && (current === candidate || current.startsWith(candidate + "/"));

interface SidebarMobileDrawerProps {
  setMobileDrawer: Dispatch<
    SetStateAction<{
      open: boolean;
      item: SidebarItem | null;
    }>
  >;
  mobileDrawer: {
    open: boolean;
    item: SidebarItem | null;
  };
  onPageChange: (href: string | undefined) => void;
}

export const SidebarMobileDrawer: React.FC<SidebarMobileDrawerProps> = ({
  setMobileDrawer,
  mobileDrawer,
  onPageChange
}) => {
  const location = useLocation();
  const current = normalize(location.pathname);

  return (
    <Sheet
      open={mobileDrawer.open}
      onOpenChange={(open) => setMobileDrawer({ open, item: null })}
    >
      <SheetContent side="left" className="sidebar-drawer-mobile w-full p-0">
        <motion.div
          className="bg-sidebar border-sidebar-border flex items-center justify-between border-b p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileDrawer({ open: false, item: null })}
                className="h-8 w-8 rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <div className="flex items-center gap-2">
              {mobileDrawer.item?.icon}
              <h2 className="text-lg font-semibold text-white">
                {mobileDrawer.item?.label}
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="sidebar-drawer-content p-3">
          {mobileDrawer.item?.children?.map((child, index) => {
            const childPath = normalize(child.href);
            const active = pathMatches(current, childPath);

            return (
              <motion.div
                key={child.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  key={child.key}
                  variant="ghost"
                  className={cn(
                    "mb-2 h-12 w-full justify-start gap-3 rounded-lg text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white",
                    active ? "bg-white/10 text-white" : ""
                  )}
                  onClick={() => {
                    onPageChange(child.href);
                    setMobileDrawer({ open: false, item: null });
                  }}
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    {child.icon}
                  </div>
                  <span className="font-medium">{child.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
