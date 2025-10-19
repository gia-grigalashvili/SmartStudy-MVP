import { motion } from "framer-motion";
import { Badge, Button, DataTable } from "@/components/ui";
import { useGetStudents } from "@/libs/queries/admin/students";
import { getPaginationFields, getTranslatedObject, toUpperCase } from "@/utils";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Column } from "@/types/ui";
import { Student } from "@/types/admin/group/Student";

const Students = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filledSearchParams } = getPaginationFields(searchParams);
  const { data, refetch, isFetching } = useGetStudents(filledSearchParams);

  const columns: Column<Student>[] = [
    {
      key: "email",
      label: toUpperCase(t("admin.students.email")),
      render: (item) => item.email,
      sortable: true
    },
    {
      key: "personalId",
      label: toUpperCase(t("admin.students.personalId")),
      render: (item) => item.personalId,
      sortable: true
    },
    {
      key: "class",
      label: toUpperCase(t("admin.students.class")),
      render: (item) => item.class ?? "-",
      sortable: true
    },
    {
      key: "age",
      label: toUpperCase(t("admin.students.age")),
      render: (item) => item.age ?? "-",
      sortable: true
    },
    {
      key: "groups",
      label: toUpperCase(t("admin.students.groupsCount")),
      render: (item) => item.groupEnrollments?.length ?? 0
    },
    {
      key: "createdAt",
      label: toUpperCase(t("admin.students.createdAt")),
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    }
  ];

  return (
    <motion.div
      className="mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-foreground mb-2 text-[20px] font-semibold md:text-3xl">
            {toUpperCase(t("admin.students.management"))}
          </h1>
          <p className="text-muted-foreground">
            {toUpperCase(t("admin.students.managementDescription"))}
          </p>
        </div>
        <Button
          size="lg"
          className="premium-button floating-action flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
          onClick={() => navigate("/administration/students/create")}
        >
          <Plus className="h-5 w-5" />
          {toUpperCase(t("admin.students.addStudent"))}
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        refetch={refetch}
        isLoading={isFetching}
        deleteEndpoint="admin/student"
        total={data?.count}
        editUrl="/administration/students/edit"
        emptyMessage={toUpperCase(t("admin.students.noStudentsFound"))}
        mobileCardRender={(item) => (
          <div>
            <div className="flex flex-col gap-1">
              <div>
                <b>{toUpperCase(t("admin.students.email"))}:</b> {item.email}
              </div>
              <div>
                <b>{toUpperCase(t("admin.students.personalId"))}:</b>{" "}
                {item.personalId}
              </div>
              <div>
                <b>{toUpperCase(t("admin.students.class"))}:</b>{" "}
                {item.class ?? "-"}
              </div>
              <div>
                <b>{toUpperCase(t("admin.students.age"))}:</b> {item.age ?? "-"}
              </div>
              <div>
                <b>{toUpperCase(t("admin.students.groupsCount"))}:</b>{" "}
                {item.groupEnrollments?.length ?? 0}
              </div>
              <div>
                <b>{toUpperCase(t("admin.students.createdAt"))}:</b>{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      />
    </motion.div>
  );
};

export const AdminStudentsNavigationRoute = {
  element: <Students />,
  path: "/students"
};

export default Students;
