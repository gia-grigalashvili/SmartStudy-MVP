import { Express } from "express";
import * as AdminRoutes from "@/routes/admin";
import * as StudentRoutes from "@/routes/student";
import * as TeacherRoutes from "@/routes/teacher";
import router from "@/routes/ai/chat.route";

const adminRouteList = [
  { path: "/auth", router: AdminRoutes.adminAuthRouter },
  {
    path: "/academic-calendar",
    router: AdminRoutes.adminAcademicCalendarRouter,
  },
  { path: "/group", router: AdminRoutes.adminGroupRouter },
  { path: "/student", router: AdminRoutes.adminStudentRouter },
  { path: "/subject", router: AdminRoutes.adminSubjectRouter },
  { path: "/teacher", router: AdminRoutes.adminTeacherRouter },
];

const studentRouteList = [
  { path: "/auth", router: StudentRoutes.studentAuthRouter },
  { path: "/upload", router: StudentRoutes.uploadRouter },
  { path: "/dashboard", router: StudentRoutes.studentDashboardRouter },
  { path: "/groups", router: StudentRoutes.studentGroupRouter },
];

const teacherRouteList = [
  { path: "/auth", router: TeacherRoutes.teacherAuthRouter },
  { path: "/student", router: TeacherRoutes.teacherStudentRouter },
  { path: "/group", router: TeacherRoutes.teacherGroupRouter },
  { path: "/quiz", router: TeacherRoutes.teacherQuizRouter },
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
