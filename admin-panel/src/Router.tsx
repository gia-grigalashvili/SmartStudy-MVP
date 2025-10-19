import React, { useEffect } from "react";
import {
  createBrowserRouter,
  useNavigate,
  RouterProvider
} from "react-router-dom";
import * as AdminRoutes from "./pages/Admin";
import * as StudentRoutes from "./pages/Student";
import * as TeacherRoutes from "./pages/Teacher";
import * as AuthRoutes from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { AuthWrapper } from "./components/auth";
import CustomLayout from "./components/Layout";
import Main from "./pages/Main";
import { useAuthStore } from "@/store";
import Landing from "./pages/Landing/Landing";

type AnyRoute = {
  path?: string;
  element?: any;
  component?: any;
  [key: string]: any;
};

const renderRouteElement = (route: AnyRoute) => {
  if (React.isValidElement(route.element)) return route.element;
  if (typeof route.element === "function")
    return React.createElement(route.element);
  if (typeof route.component === "function")
    return React.createElement(route.component);
  return <></>;
};

const createRoutes = (
  routesObj: Record<string, AnyRoute>,
  isAuth?: boolean,
  basePath?: string
) => {
  if (!routesObj) return [];

  return Object.values(routesObj)
    .filter((r: any) => r && typeof r === "object" && "path" in r && r.path)
    .map((route: any) => ({
      ...route,
      path: basePath ? `${basePath}${route.path}` : route.path,
      element: (
        <CustomLayout route={route} path={route.path}>
          {isAuth ? (
            <AuthWrapper>{renderRouteElement(route)}</AuthWrapper>
          ) : (
            renderRouteElement(route)
          )}
        </CustomLayout>
      )
    }));
};

const MainRedirect: React.FC = () => {
  const { isLoggedIn, userType } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn && userType) {
      navigate(`/${userType}`, { replace: true });
    }
  }, [isLoggedIn, userType, navigate]);
  return <Main />;
};

export const Router = () => {
  const routesWithLayout = [
    ...createRoutes(AdminRoutes, false, "/administration"),
    ...createRoutes(StudentRoutes, false, "/student"),
    ...createRoutes(TeacherRoutes, false, "/teacher"),
    ...createRoutes(AuthRoutes, true),
    {
      path: "/cms",
      element: <MainRedirect />
    },
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

  const router = createBrowserRouter(routesWithLayout);

  return <RouterProvider router={router} />;
};
