import { Express } from "express";
import * as AdminRoutes from "@/routes/admin";
import * as StudentRoutes from "@/routes/student";
import * as TeacherRoutes from "@/routes/teacher";
import router from "@/routes/ai/chat.route";

const adminRouteList = [{ path: "/auth", router: AdminRoutes.adminAuthRouter }];

const studentRouteList = [
  { path: "/auth", router: StudentRoutes.studentAuthRouter },
  { path: "/upload", router: StudentRoutes.uploadRouter },
  { path: "/dashboard", router: StudentRoutes.studentDashboardRouter },
  { path: "/groups", router: StudentRoutes.studentGroupRouter },
];

const teacherRouteList = [
  { path: "/auth", router: TeacherRoutes.teacherAuthRouter },
];

export const generateRoutes = (app: Express) => {
  const basePath = "/api/v1";
  const adminBasePath = `${basePath}/admin`;
  const studentBasePath = `${basePath}/student`;
  const teacherBasePath = `${basePath}/teacher`;

  adminRouteList?.forEach((route) => {
    app.use(`${adminBasePath}${route.path}`, route.router);
  });

  studentRouteList?.forEach((route) => {
    app.use(`${studentBasePath}${route.path}`, route.router);
  });

  teacherRouteList?.forEach((route) => {
    app.use(`${teacherBasePath}${route.path}`, route.router);
  });

  app.use("/api/ai", router)
};
