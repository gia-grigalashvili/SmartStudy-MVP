import { useSearchParams } from "react-router-dom";
import { TeacherForm } from "@/components/forms/PageComponents";

const CreateTeacher = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <TeacherForm
      mode="create"
      id={id}
      onSuccessNavigate="/administration/teachers"
    />
  );
};

export const CreateTeacherNavigationRoute = {
  element: <CreateTeacher />,
  path: "/teachers/create"
};

export default CreateTeacher;
