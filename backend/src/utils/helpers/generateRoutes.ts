import { Express } from "express";
// import * as AdminRoutes from "@/routes/admin";
import * as StudentRoutes from "@/routes/student";

// const adminRouteList = [];

const studentRouteList = [
  { path: "/upload", router: StudentRoutes.uploadRouter },
];

export const generateRoutes = (app: Express) => {
  const basePath = "/api/v1";
  const adminBasePath = `${basePath}/admin`;

  app.use(adminBasePath);
  app.use(basePath);

  // adminRouteList?.forEach((route) => {
  //   app.use(`${adminBasePath}${route.path}`, route.router);
  // });

  studentRouteList?.forEach((route) => {
    app.use(`${basePath}${route.path}`, route.router);
  });
};
