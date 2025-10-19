import React from "react";
import axios from "@/api/axios";
import { useTranslation } from "react-i18next";
import { toUpperCase } from "@/utils";
import { GenericEntityForm } from "..";
import {
  StudentFormValues,
  studentSchema
} from "@/validations/admin/student.validation";
import { Student } from "@/types/admin";

export interface StudentFormProps {
  mode: "create" | "edit" | "readonly";
  id?: string | null;
  onSuccessNavigate?: string;
}

const defaultValues: StudentFormValues = {
  dateOfBirth: "",
  email: "",
  password: "",
  personalId: "",
  translations: {
    en: { firstName: "", lastName: "", fullName: "" },
    ka: { firstName: "", lastName: "", fullName: "" }
  },
  class: 0
};

export const StudentForm: React.FC<StudentFormProps> = ({
  mode,
  id = null,
  onSuccessNavigate = "/administration/students"
}) => {
  const { t } = useTranslation();

  const mapFetchedToForm = (entity: Student): Partial<StudentFormValues> => {
    if (!entity) return {};
    const { dateOfBirth, email, personalId } = entity;
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
    const res = await axios.get(`admin/student/${entityId}`);
    return res.data?.data ?? res.data;
  };

  const createEntity = async (payload: StudentFormValues) => {
    await axios.post("admin/student", payload);
  };

  const updateEntity = async (entityId: string, payload: StudentFormValues) => {
    await axios.put(`admin/student/${entityId}`, payload);
  };

  const deleteEntity = async (entityId: string) => {
    await axios.delete(`admin/student/${entityId}`);
  };

  const rightSection = [
    {
      key: "management",
      title: toUpperCase(t("footer.form.management")),
      fields: [
        {
          kind: "simple" as const,
          name: "email",
          label: toUpperCase(t("admin.students.email")),
          type: "email" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "personalId",
          label: toUpperCase(t("admin.students.personalId")),
          type: "text" as const,
          props: { required: true }
        },
        {
          kind: "simple" as const,
          name: "dateOfBirth",
          label: toUpperCase(t("admin.students.dateOfBirth")),
          type: "text" as const,
          props: { required: true }
        }
      ]
    }
  ];

  return (
    <GenericEntityForm<StudentFormValues, any>
      resourceName="students"
      mode={mode}
      id={id ?? undefined}
      schema={studentSchema(t)}
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
    />
  );
};

export default StudentForm;
