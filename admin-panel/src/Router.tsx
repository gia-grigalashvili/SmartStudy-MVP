import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import * as Routes from "./pages";

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

// const createRoutes = (
//   routesObj: Record<string, AnyRoute>,
//   isAuth?: boolean
// ) => {
//   if (!routesObj) return [];

//   return Object.values(routesObj)
//     .filter((r: any) => r && typeof r === "object" && "path" in r && r.path)
//     .map((route: any) => ({
//       ...route,
//       path: route.path,
//       element: (
//         <CustomLayout route={route} path={route.path}>
//           {isAuth ? (
//             <AuthWrapper>{renderRouteElement(route)}</AuthWrapper>
//           ) : (
//             renderRouteElement(route)
//           )}
//         </CustomLayout>
//       )
//     }));
// };

export const Router = () => {
  
  const routesWithLayout = [
    // { path: "/", element: <Navigate to="/dashboard" replace /> },
    // ...createRoutes(Routes),
    // ...createRoutes(AuthRoutes, true),
    // {
    //   path: "*",
    //   element: (
    //     <CustomLayout path="*">
    //       <NotFound />
    //     </CustomLayout>
    //   )
    // }
  ];

  const router = createBrowserRouter(routesWithLayout);

  return <RouterProvider router={router} />;
};
