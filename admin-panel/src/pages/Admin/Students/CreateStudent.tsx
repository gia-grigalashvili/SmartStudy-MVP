import { useSearchParams } from "react-router-dom";
import { GroupForm } from "@/components/forms/PageComponents";

const CreateGroup = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <GroupForm
      mode="create"
      id={id}
      onSuccessNavigate="/administration/student"
    />
  );
};

export const CreateStudentNavigationRoute = {
  element: <CreateGroup />,
  path: "/student/create"
};

export default CreateGroup;
