// import React from "react";
// import {
//   createBrowserRouter,
//   Navigate,
//   RouteObject,
//   RouterProvider
// } from "react-router-dom";
// import * as Routes from "./pages";

// type AnyRoute = {
//   path?: string;
//   element?: any;
//   component?: any;
//   [key: string]: any;
// };

// const renderRouteElement = (route: AnyRoute) => {
//   if (React.isValidElement(route.element)) return route.element;
//   if (typeof route.element === "function")
//     return React.createElement(route.element);
//   if (typeof route.component === "function")
//     return React.createElement(route.component);
//   return <></>;
// };

// // const createRoutes = (
// //   routesObj: Record<string, AnyRoute>,
// //   isAuth?: boolean
// // ) => {
// //   if (!routesObj) return [];

// //   return Object.values(routesObj)
// //     .filter((r: any) => r && typeof r === "object" && "path" in r && r.path)
// //     .map((route: any) => ({
// //       ...route,
// //       path: route.path,
// //       element: (
// //         <CustomLayout route={route} path={route.path}>
// //           {isAuth ? (
// //             <AuthWrapper>{renderRouteElement(route)}</AuthWrapper>
// //           ) : (
// //             renderRouteElement(route)
// //           )}
// //         </CustomLayout>
// //       )
// //     }));
// // };

// export const Router = () => {
  
//   const routesWithLayout: RouteObject[] = [
//     // { path: "/", element: <Navigate to="/dashboard" replace /> },
//     // ...createRoutes(Routes),
//     // ...createRoutes(AuthRoutes, true),
//     // {
//     //   path: "*",
//     //   element: (
//     //     <CustomLayout path="*">
//     //       <NotFound />
//     //     </CustomLayout>
//     //   )
//     // }
//   ];

//   const router = createBrowserRouter(routesWithLayout);

//   return <RouterProvider router={router} />;
// };




import React from "react";
import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from "react-router-dom";

const Dashboard = () => <h1 className="text-green-500">Dashboard Page</h1>;
const Profile = () => <h1 className="text-blue-500">Profile Page</h1>;
const Settings = () => <h1 className="text-purple-500">Settings Page</h1>;
const NotFound = () => <h1 className="text-red-500">404 - Page Not Found</h1>;


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 bg-gray-100 min-h-screen">{children}</div>
);


type AppRoute = {
  path: string;
  element: React.ReactNode;
  layout?: React.FC<{ children: React.ReactNode }>;
};

// ცალკე array ყველა route-ისთვის
const routes: AppRoute[] = [
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/dashboard", element: <Dashboard />, layout: MainLayout },
  { path: "/profile", element: <Profile />, layout: MainLayout },
  { path: "/settings", element: <Settings />, layout: MainLayout },
  { path: "*", element: <NotFound />, layout: MainLayout }
];

// Map routes array-ს RouteObject[]-ში
const routeObjects: RouteObject[] = routes.map(({ path, element, layout }) => ({
  path,
  element: layout ? React.createElement(layout, {}, element) : element
}));

export const Router = () => {
  const router = createBrowserRouter(routeObjects);
  return <RouterProvider router={router} />;
};
