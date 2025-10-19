import React from "react";
import axios from "@/api/axios";
import { useTranslation } from "react-i18next";
import { toUpperCase } from "@/utils";
import { GenericEntityForm } from "..";
import {
  GroupFormValues,
  groupSchema
} from "@/validations/admin/group.validations";
import { Group } from "@/types/admin";

export interface GroupFormProps {
  mode: "create" | "edit" | "readonly";
  id?: string | null;
  onSuccessNavigate?: string;
}

const defaultValues: GroupFormValues = {
  academicCalendarId: "",
  code: "",
  semester: 1,
  subjects: [],
  teacherId: "",
  year: ""
};

export const GroupForm: React.FC<GroupFormProps> = ({
  mode,
  id = null,
  onSuccessNavigate = "/administration/groups"
}) => {
  const { t } = useTranslation();

  const mapFetchedToForm = (entity: Group): Partial<GroupFormValues> => {
    if (!entity) return {};
    const { academicCalendarId, code, semester, subjects, teacherId, year } =
      entity;
    const formattedSubjects = subjects.map((subject) => subject.subject.id);
    return {
      academicCalendarId,
      code,
      semester,
      subjects: formattedSubjects,
      teacherId,
      year
    };
  };

  const fetchEntity = async (entityId?: string) => {
    const res = await axios.get(`admin/group/unique/${entityId}`);
    return res.data?.data ?? res.data;
  };

  const createEntity = async (payload: GroupFormValues) => {
    await axios.post("admin/group", payload);
  };

  const updateEntity = async (entityId: string, payload: GroupFormValues) => {
    await axios.put(`admin/group/${entityId}`, payload);
  };

  const deleteEntity = async (entityId: string) => {
    await axios.delete(`admin/group/${entityId}`);
  };

  const left = [
    {
      key: "management",
      title: toUpperCase(t("footer.form.management")),
      fields: [
        {
          kind: "simple" as const,
          name: "code",
          label: toUpperCase(t("admin.groups.code")),
          type: "text" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "year",
          label: toUpperCase(t("admin.groups.year")),
          type: "text" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "semester",
          label: toUpperCase(t("admin.groups.semester")),
          type: "number" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "subjects",
          label: toUpperCase(t("admin.groups.subjects")),
          type: "translated-select" as const,
          props: {
            endpoints: "admin/group/subjects",
            mode: "multiple",
            required: true
          }
        },
        {
          kind: "simple" as const,
          name: "teacherId",
          label: toUpperCase(t("admin.groups.teacher")),
          type: "translated-select" as const,
          props: {
            endpoints: "admin/group/teachers",
            required: true
          }
        },
        {
          kind: "simple" as const,
          name: "academicCalendarId",
          label: toUpperCase(t("admin.groups.academicCalendar")),
          type: "translated-select" as const,
          props: {
            endpoints: "admin/group/academic-calendars",
            required: true
          }
        }
      ]
    }
  ];

  return (
    <GenericEntityForm<GroupFormValues, any>
      resourceName="groups"
      mode={mode}
      id={id ?? undefined}
      schema={groupSchema(t)}
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

export default GroupForm;
