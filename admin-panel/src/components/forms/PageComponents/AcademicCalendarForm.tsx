import React from "react";
import axios from "@/api/axios";
import { useTranslation } from "react-i18next";
import { toUpperCase } from "@/utils";
import { GenericEntityForm } from "..";
import {
  AcademicCalendarFormValues,
  academicCalendarSchema
} from "@/validations/admin/academic-calendar.validations";
import { AcademicCalendar } from "@/types/admin";

export interface AcademicCalendarFormProps {
  mode: "create" | "edit" | "readonly";
  id?: string | null;
  onSuccessNavigate?: string;
}

const defaultValues: AcademicCalendarFormValues = {
  semester: 1,
  year: "",
  endDate: "",
  startDate: ""
};

export const AcademicCalendarForm: React.FC<AcademicCalendarFormProps> = ({
  mode,
  id = null,
  onSuccessNavigate = "/administration/academicCalendars"
}) => {
  const { t } = useTranslation();

  const mapFetchedToForm = (
    entity: AcademicCalendar
  ): Partial<AcademicCalendarFormValues> => {
    if (!entity) return {};
    const { semester, year, endDate, startDate } = entity;
    return {
      semester,
      year,
      startDate: startDate ? startDate.slice(0, 10) : "",
      endDate: endDate ? endDate.slice(0, 10) : ""
    };
  };

  const fetchEntity = async (entityId?: string) => {
    const res = await axios.get(`admin/academic-calendar/${entityId}`);
    return res.data?.data ?? res.data;
  };

  const createEntity = async (payload: AcademicCalendarFormValues) => {
    await axios.post("admin/academic-calendar", payload);
  };

  const updateEntity = async (
    entityId: string,
    payload: AcademicCalendarFormValues
  ) => {
    await axios.put(`admin/academic-calendar/${entityId}`, payload);
  };

  const deleteEntity = async (entityId: string) => {
    await axios.delete(`admin/academic-calendar/${entityId}`);
  };

  const left = [
    {
      key: "management",
      title: toUpperCase(t("footer.form.management")),
      fields: [
        {
          kind: "simple" as const,
          name: "year",
          label: toUpperCase(t("admin.academicCalendars.year")),
          type: "text" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "semester",
          label: toUpperCase(t("admin.academicCalendars.semester")),
          type: "number" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "startDate",
          label: toUpperCase(t("admin.students.startDate")),
          type: "datePicker" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "endDate",
          label: toUpperCase(t("admin.students.endDate")),
          type: "datePicker" as const,
          props: { required: true }
        }
      ]
    }
  ];

  return (
    <GenericEntityForm<AcademicCalendarFormValues, any>
      resourceName="academicCalendars"
      mode={mode}
      id={id ?? undefined}
      schema={academicCalendarSchema(t)}
      defaultValues={defaultValues}
      fetchEntity={fetchEntity}
      createEntity={createEntity}
      updateEntity={updateEntity}
      deleteEntity={deleteEntity}
      sections={{ left: left, right: [] }}
      onSuccessNavigate={onSuccessNavigate}
      mapFetchedToForm={mapFetchedToForm}
      renderFooter={() => null}
    />
  );
};

export default AcademicCalendarForm;
