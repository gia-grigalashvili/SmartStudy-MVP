import React from "react";
import {
  createBrowserRouter,
  // Navigate,
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

export const Router = () => {
  const routesWithLayout = [
    ...createRoutes(AdminRoutes, false, "/admin"),
    ...createRoutes(StudentRoutes, false, "/student"),
    ...createRoutes(TeacherRoutes, false, "/teacher"),
    ...createRoutes(AuthRoutes, true),
    {
      path: "/",
      element: (
        <CustomLayout path="/">
          <Main />
        </CustomLayout>
      )
    },
    {
      path: "*",
      element: (
        <CustomLayout path="*">
          <NotFound />
        </CustomLayout>
      )
    }
  ];

  const router = createBrowserRouter(routesWithLayout);

  return <RouterProvider router={router} />;
};
