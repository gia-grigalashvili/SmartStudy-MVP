import { motion } from "framer-motion";
import { Badge, Button, DataTable } from "@/components/ui";
import { useGetAcademicCalendars } from "@/libs/queries/admin";
import { getPaginationFields, toUpperCase } from "@/utils";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Column } from "@/types/ui";
import { AcademicCalendar } from "@/types/admin";
import dayjs from "dayjs";

const AcademicCalendars = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { filledSearchParams } = getPaginationFields(searchParams);
  const { data, refetch, isFetching } =
    useGetAcademicCalendars(filledSearchParams);

  const columns: Column<AcademicCalendar>[] = [
    {
      key: "year",
      label: toUpperCase(t("admin.academicCalendars.year")),
      render: (item) => item.year,
      sortable: true
    },
    {
      key: "semester",
      label: toUpperCase(t("admin.academicCalendars.semester")),
      sortable: true,
      render: (item) => (
        <Badge variant="default" className="px-3 py-1">
          {item.semester}
        </Badge>
      )
    },
    {
      key: "startDate",
      label: toUpperCase(t("admin.academicCalendars.startDate")),
      render: (item) => <>{dayjs(item.startDate)}</>,
      sortable: true
    },
    {
      key: "endDate",
      label: toUpperCase(t("admin.academicCalendars.endDate")),
      render: (item) => <>{dayjs(item.endDate)}</>,
      sortable: true
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
            {toUpperCase(t("admin.academicCalendars.management"))}
          </h1>
          <p className="text-muted-foreground">
            {toUpperCase(t("admin.academicCalendars.managementDescription"))}
          </p>
        </div>
        <Button
          size="lg"
          className="premium-button floating-action flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
          onClick={() => navigate("/administration/academicCalendars/create")}
        >
          <Plus className="h-5 w-5" />
          {toUpperCase(t("admin.academicCalendars.addAcademicCalendar"))}
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        refetch={refetch}
        isLoading={isFetching}
        deleteEndpoint="admin/academicCalendar"
        total={data?.count}
        editUrl="/administration/academicCalendars/edit"
        emptyMessage={toUpperCase(
          t("admin.academicCalendars.noAcademicCalendarsFound")
        )}
        mobileCardRender={(item) => (
          <div className="bg-background rounded-lg border p-4 shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-lg font-semibold">
                {item.year} {toUpperCase(t("admin.academicCalendars.semester"))}
                : {item.semester}
              </div>
              <div className="text-muted-foreground text-sm">
                <b>{toUpperCase(t("admin.academicCalendars.startDate"))}:</b>{" "}
                {dayjs(item.startDate).format("YYYY-MM-DD")}
              </div>
              <div className="text-muted-foreground text-sm">
                <b>{toUpperCase(t("admin.academicCalendars.endDate"))}:</b>{" "}
                {dayjs(item.endDate).format("YYYY-MM-DD")}
              </div>

              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/administration/academicCalendars/edit?id=${item.id}`
                    )
                  }
                >
                  {toUpperCase(t("formActions.edit"))}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    navigate(
                      `/administration/academicCalendars/delete?id=${item.id}`
                    )
                  }
                >
                  {toUpperCase(t("formActions.delete"))}
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </motion.div>
  );
};

export const AcademicCalendarsNavigationRoute = {
  element: <AcademicCalendars />,
  path: "/academic-calendar"
};

export default AcademicCalendars;
