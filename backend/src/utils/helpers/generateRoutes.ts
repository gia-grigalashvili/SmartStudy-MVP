import { Express } from "express";
import * as AdminRoutes from "@/routes/admin";
import * as StudentRoutes from "@/routes/student";
import * as TeacherRoutes from "@/routes/teacher";

const adminRouteList = [{ path: "/auth", router: AdminRoutes.adminAuthRouter }];

const studentRouteList = [
  { path: "/auth", router: StudentRoutes.studentAuthRouter },
  { path: "/upload", router: StudentRoutes.uploadRouter },
  { path: "/group", router: StudentRoutes.studentGroupRouter },
  { path: "/dashboard", router: StudentRoutes.studentDashboardRouter },
];

const teacherRouteList = [
  { path: "/auth", router: TeacherRoutes.teacherAuthRouter },
  { path: "/student", router: TeacherRoutes.teacherStudentRouter },
  { path: "/group", router: TeacherRoutes.teacherGroupRouter },
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
};
