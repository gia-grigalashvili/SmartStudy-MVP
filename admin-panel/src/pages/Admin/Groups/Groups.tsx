import { motion } from "framer-motion";
import { Badge, Button, DataTable } from "@/components/ui";
import { useGetGroups } from "@/libs/queries/admin";
import { getPaginationFields, getTranslatedObject, toUpperCase } from "@/utils";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Column } from "@/types/ui";
import { Group } from "@/types/admin";

const Groups = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filledSearchParams } = getPaginationFields(searchParams);
  const { data, refetch, isFetching } = useGetGroups(filledSearchParams);

  const columns: Column<Group>[] = [
    {
      key: "code",
      label: toUpperCase(t("admin.groups.code")),
      render: (item) => item.code,
      sortable: true
    },
    {
      key: "semester",
      label: toUpperCase(t("admin.groups.semester")),
      sortable: true,
      render: (item) => (
        <Badge variant="default" className="px-3 py-1">
          {item.semester}
        </Badge>
      )
    },
    {
      key: "year",
      label: toUpperCase(t("admin.groups.year")),
      render: (item) => item.year,
      sortable: true
    },
    {
      key: "subjects",
      label: toUpperCase(t("admin.groups.subjects")),
      render: (item) =>
        item.subjects
          .map(
            (gs) =>
              getTranslatedObject(gs.subject.translations, i18n.language)
                ?.name || gs.subject.code
          )
          .join(", ")
    },
    {
      key: "students",
      label: toUpperCase(t("admin.groups.students")),
      render: (item) => item.enrollments?.length ?? 0
    },
    {
      key: "quizzes",
      label: toUpperCase(t("admin.groups.quizzes")),
      render: (item) => item.quizzes?.length ?? 0
    },
    {
      key: "teacher",
      label: toUpperCase(t("admin.groups.teacher")),
      render: (item) =>
        getTranslatedObject(item.teacher.translations, i18n.language)
          ?.firstName +
        " " +
        getTranslatedObject(item.teacher.translations, i18n.language)?.lastName
    },
    {
      key: "calendar",
      label: toUpperCase(t("admin.groups.academicCalendar")),
      render: (item) =>
        item.academicCalendar ? (
          <Button
            size="sm"
            onClick={() => navigate(`/academic-calendar?groupId=${item.id}`)}
          >
            {toUpperCase(t("admin.groups.viewCalendar"))}
          </Button>
        ) : (
          "-"
        )
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
            {toUpperCase(t("admin.groups.management"))}
          </h1>
          <p className="text-muted-foreground">
            {toUpperCase(t("admin.groups.managementDescription"))}
          </p>
        </div>
        <Button
          size="lg"
          className="premium-button floating-action flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
          onClick={() => navigate("/landing/groups/create")}
        >
          <Plus className="h-5 w-5" />
          {toUpperCase(t("admin.groups.addGroup"))}
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        refetch={refetch}
        isLoading={isFetching}
        deleteEndpoint="group"
        total={data?.count}
        editUrl="/landing/groups/edit"
        emptyMessage={toUpperCase(t("admin.groups.noGroupsFound"))}
        mobileCardRender={(item) => (
          <div>
            <div className="flex flex-col gap-1">
              <div>
                <b>{toUpperCase(t("admin.groups.code"))}:</b> {item.code}
              </div>
              <div>
                <b>{toUpperCase(t("admin.groups.subjects"))}:</b>{" "}
                {item.subjects
                  .map(
                    (gs) =>
                      getTranslatedObject(
                        gs.subject.translations,
                        i18n.language
                      )?.name || gs.subject.code
                  )
                  .join(", ")}
              </div>
              <div>
                <b>{toUpperCase(t("admin.groups.students"))}:</b>{" "}
                {item.enrollments?.length ?? 0}
              </div>
              <div>
                <b>{toUpperCase(t("admin.groups.quizzes"))}:</b>{" "}
                {item.quizzes?.length ?? 0}
              </div>
              <div>
                <b>{toUpperCase(t("admin.groups.teacher"))}:</b>{" "}
                {getTranslatedObject(item.teacher.translations, i18n.language)
                  ?.firstName +
                  " " +
                  getTranslatedObject(item.teacher.translations, i18n.language)
                    ?.lastName}
              </div>
              <div>
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/admin/academic-calendar?groupId=${item.id}`)
                  }
                >
                  {toUpperCase(t("admin.groups.viewCalendar"))}
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </motion.div>
  );
};

export const GroupsNavigationRoute = {
  element: <Groups />,
  path: "/groups"
};

export default Groups;
