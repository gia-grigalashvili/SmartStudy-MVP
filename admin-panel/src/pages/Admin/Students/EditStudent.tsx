import { StudentForm } from "@/components/forms/PageComponents";
import { useLocation } from "react-router-dom";

const EditStudent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";

  return (
    <StudentForm
      mode="edit"
      id={id}
      onSuccessNavigate="/administration/students"
    />
  );
};

export const EditStudentNavigationRoute = {
  element: <EditStudent />,
  path: "/students/edit"
};

export default EditStudent;
