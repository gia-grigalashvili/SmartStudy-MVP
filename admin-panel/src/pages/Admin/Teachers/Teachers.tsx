import { motion } from "framer-motion";
import { Button, DataTable } from "@/components/ui";
import { getPaginationFields, getTranslatedObject, toUpperCase } from "@/utils";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Column } from "@/types/ui";
import { useGetTeachers } from "@/libs/queries/admin";
import { Teacher } from "@/types/admin";

const Teachers = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filledSearchParams } = getPaginationFields(searchParams);
  const { data, refetch, isFetching } = useGetTeachers(filledSearchParams);

  const columns: Column<Teacher>[] = [
    {
      key: "email",
      label: toUpperCase(t("admin.teachers.email")),
      render: (item) => item.email,
      sortable: true
    },
    {
      key: "name",
      label: toUpperCase(t("admin.teachers.name")),
      render: (item) => {
        const tr = getTranslatedObject(item.translations, i18n.language);
        return tr.fullName ?? `${tr.firstName} ${tr.lastName}`;
      }
    },
    {
      key: "personalId",
      label: toUpperCase(t("admin.teachers.personalId")),
      render: (item) => item.personalId,
      sortable: true
    },
    {
      key: "age",
      label: toUpperCase(t("admin.teachers.age")),
      render: (item) => item.age ?? "-",
      sortable: true
    },
    {
      key: "groups",
      label: toUpperCase(t("admin.teachers.groupsCount")),
      render: (item) => item.groups?.length ?? 0
    },
    {
      key: "createdAt",
      label: toUpperCase(t("admin.teachers.createdAt")),
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
            {toUpperCase(t("admin.teachers.management"))}
          </h1>
          <p className="text-muted-foreground">
            {toUpperCase(t("admin.teachers.managementDescription"))}
          </p>
        </div>
        <Button
          size="lg"
          className="premium-button floating-action flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
          onClick={() => navigate("/administration/teachers/create")}
        >
          <Plus className="h-5 w-5" />
          {toUpperCase(t("admin.teachers.addTeacher"))}
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        refetch={refetch}
        isLoading={isFetching}
        deleteEndpoint="admin/teacher"
        total={data?.count}
        editUrl="/administration/teachers/edit"
        emptyMessage={toUpperCase(t("admin.teachers.noTeachersFound"))}
        mobileCardRender={(item) => {
          const tr = getTranslatedObject(item.translations, i18n.language);
          return (
            <div className="bg-background rounded-lg border p-4 shadow-sm">
              <div className="flex flex-col gap-2">
                <div className="text-primary text-lg font-semibold">
                  {tr.fullName ?? `${tr.firstName} ${tr.lastName}`}
                </div>
                <div className="text-muted-foreground text-sm">
                  <b>{toUpperCase(t("admin.teachers.email"))}:</b> {item.email}
                </div>
                <div className="text-muted-foreground text-sm">
                  <b>{toUpperCase(t("admin.teachers.personalId"))}:</b>{" "}
                  {item.personalId}
                </div>
                <div className="text-muted-foreground text-sm">
                  <b>{toUpperCase(t("admin.teachers.age"))}:</b>{" "}
                  {item.age ?? "-"}
                </div>
                <div className="text-muted-foreground text-sm">
                  <b>{toUpperCase(t("admin.teachers.groupsCount"))}:</b>{" "}
                  {item.groups?.length ?? 0}
                </div>
                <div className="text-muted-foreground text-sm">
                  <b>{toUpperCase(t("admin.teachers.createdAt"))}:</b>{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        }}
      />
    </motion.div>
  );
};

export const AdminTeachersNavigationRoute = {
  element: <Teachers />,
  path: "/teachers"
};

export default Teachers;
