import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "@/api/axios";
import { useAuthStore } from "@/store";
import { Sidebar } from "./Sidebar";
import { MobileNavigation } from "./MobileNavigation";
import { Shell } from "./Shell";

interface LayoutProps {
  children: React.ReactNode;
  route?: any;
  path?: string;
}

export const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 flex min-h-screen w-full items-center justify-center">
      loading...
    </div>
  );
};

const CustomLayout: React.FC<LayoutProps> = ({ children, route }) => {
  const { isLoggedIn, login, logout, userType } = useAuthStore();

  const { refetch } = useQuery("renew", {
    queryFn: async () => {
      if (!isLoggedIn) {
        return;
      }
      const { data } = await axios.get(`/${userType}//auth/renew`);
      return data;
    },
    onSuccess: (data) => {
      if (data?.data?.user) {
        login({
          data: {
            user: data.data.user,
            userType: data.data.userType
          }
        });
      } else {
        logout();
      }
    },
    onError() {
      logout();
    }
  });

  const [checking, setChecking] = useState(true);
  const [searchParams] = useSearchParams();
  const searchData = searchParams.get("data");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    setChecking(true);
    void refetch()
      .catch((error) => {
        console.error("Error renewing session:", error);
      })
      .finally(() => {
        if (mounted) setChecking(false);
      });
    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    if (searchData) {
      navigate("/", { replace: true });
    }
  }, [searchData, navigate]);

  useEffect(() => {
    if (checking) return;
    if (!route) return;

    const isAuthRoute = Boolean(route.isAuthRoute);
    const isWildcard = route.path === "*";

    if (isWildcard) return;

    if (isAuthRoute && isLoggedIn) {
      if (location.pathname !== `/${userType}/dashboard`) {
        navigate(`/${userType}/dashboard`, { replace: true });
      }
      return;
    }

    if (!isAuthRoute && !isLoggedIn) {
      if (location.pathname !== `/${userType}/login`) {
        navigate(`/${userType}/login`, { replace: true });
      }
      return;
    }
  }, [route, isLoggedIn, checking, location.pathname, navigate]);

  return (
    <div className="flex min-h-screen w-full grow">
      <main className="!text-foreground relative mb-[68px] flex max-w-full flex-1 md:mb-0">
        {/* {isLoggedIn ? ( */}
          <>
            <Sidebar />
            <MobileNavigation />
            <Shell>{checking ? <LoadingScreen /> : children}</Shell>
          </>
        {/* ) : (
          children
        )} */}
      </main>
    </div>
  );
};

export default CustomLayout;
