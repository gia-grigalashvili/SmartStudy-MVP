/* eslint-disable prefer-const */
import React from "react";
import axios from "@/api/axios";
import { useTranslation } from "react-i18next";
import { toUpperCase } from "@/utils";
import { GenericEntityForm } from "..";
import {
  TeacherFormValues,
  teacherSchema
} from "@/validations/admin/teacher.validation";
import { Teacher } from "@/types/admin";

export interface TeacherFormProps {
  mode: "create" | "edit" | "readonly";
  id?: string | null;
  onSuccessNavigate?: string;
}

const defaultValues: TeacherFormValues = {
  dateOfBirth: "",
  email: "",
  password: "",
  personalId: "",
  translations: {
    en: { firstName: "", lastName: "", fullName: "" },
    ka: { firstName: "", lastName: "", fullName: "" }
  }
};

export const TeacherForm: React.FC<TeacherFormProps> = ({
  mode,
  id = null,
  onSuccessNavigate = "/administration/teachers"
}) => {
  const { t } = useTranslation();

  const mapFetchedToForm = (entity: Teacher): Partial<TeacherFormValues> => {
    if (!entity) return {};
    let { dateOfBirth, email, personalId } = entity;
    if (dateOfBirth && dateOfBirth.length > 10) {
      dateOfBirth = dateOfBirth.slice(0, 10);
    }
    const translations = entity.translations ?? [];
    const en = translations.find((tr) => tr.language?.code === "en");
    const ka = translations.find((tr) => tr.language?.code === "ka");

    return {
      dateOfBirth,
      email,
      personalId,
      translations: {
        en: {
          firstName: en?.firstName ?? "",
          lastName: en?.lastName ?? "",
          fullName: en?.fullName ?? ""
        },
        ka: {
          firstName: ka?.firstName ?? "",
          lastName: ka?.lastName ?? "",
          fullName: ka?.fullName ?? ""
        }
      }
    };
  };

  const fetchEntity = async (entityId?: string) => {
    const res = await axios.get(`admin/teacher/${entityId}`);
    return res.data?.data ?? res.data;
  };

  const createEntity = async (payload: TeacherFormValues) => {
    const sendPayload = {
      ...payload,
      dateOfBirth: payload.dateOfBirth
        ? new Date(payload.dateOfBirth).toISOString()
        : null
    };
    await axios.post("admin/teacher", sendPayload);
  };

  const updateEntity = async (entityId: string, payload: TeacherFormValues) => {
    const sendPayload = {
      ...payload,
      dateOfBirth: payload.dateOfBirth
        ? new Date(payload.dateOfBirth).toISOString()
        : null
    };
    await axios.put(`admin/teacher/${entityId}`, sendPayload);
  };

  const deleteEntity = async (entityId: string) => {
    await axios.delete(`admin/teacher/${entityId}`);
  };

  const rightSection = [
    {
      key: "management",
      title: toUpperCase(t("footer.form.management")),
      fields: [
        {
          kind: "simple" as const,
          name: "email",
          label: toUpperCase(t("admin.teachers.email")),
          type: "email" as const,
          props: { required: true }
        },
        ...(mode === "create"
          ? [
              {
                kind: "simple" as const,
                name: "password",
                label: toUpperCase(t("admin.teachers.password")),
                type: "text" as const,
                props: { required: true }
              }
            ]
          : []),
        {
          kind: "simple" as const,
          name: "personalId",
          label: toUpperCase(t("admin.teachers.personalId")),
          type: "text" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "dateOfBirth",
          label: toUpperCase(t("admin.teachers.dateOfBirth")),
          type: "datePicker" as const,
          props: { required: true }
        }
      ]
    }
  ];

  return (
    <GenericEntityForm<TeacherFormValues, any>
      resourceName="teachers"
      mode={mode}
      id={id ?? undefined}
      schema={teacherSchema(t, mode === "edit")}
      defaultValues={defaultValues}
      fetchEntity={fetchEntity}
      createEntity={createEntity}
      updateEntity={updateEntity}
      deleteEntity={deleteEntity}
      translationFields={
        [
          {
            name: "firstName",
            label: toUpperCase(t("contact.form.firstName")),
            fullWidth: true,
            required: true
          },
          {
            name: "lastName",
            label: toUpperCase(t("contact.form.lastName")),
            fullWidth: true,
            required: true
          },
          {
            name: "fullName",
            label: toUpperCase(t("contact.form.fullName")),
            fullWidth: true,
            required: true
          }
        ] as const
      }
      sections={{ left: [], right: rightSection }}
      onSuccessNavigate={onSuccessNavigate}
      mapFetchedToForm={mapFetchedToForm}
      renderFooter={() => null}
      key={mode + String(id)}
    />
  );
};

export default TeacherForm;
