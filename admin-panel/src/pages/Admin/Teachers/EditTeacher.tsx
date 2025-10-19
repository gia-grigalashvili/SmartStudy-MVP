import { TeacherForm } from "@/components/forms/PageComponents";
import { useLocation } from "react-router-dom";

const EditTeacher = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";

  return (
    <TeacherForm
      mode="edit"
      id={id}
      onSuccessNavigate="/administration/teachers"
    />
  );
};

export const EditTeacherNavigationRoute = {
  element: <EditTeacher />,
  path: "/teachers/edit"
};

export default EditTeacher;
