import { useSearchParams } from "react-router-dom";
import { StudentForm } from "@/components/forms/PageComponents";

const CreateStudent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <StudentForm
      mode="create"
      id={id}
      onSuccessNavigate="/administration/students"
    />
  );
};

export const CreateStudentNavigationRoute = {
  element: <CreateStudent />,
  path: "/students/create"
};

export default CreateStudent;
