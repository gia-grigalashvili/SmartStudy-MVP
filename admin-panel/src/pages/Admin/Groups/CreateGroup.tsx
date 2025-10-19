import { useSearchParams } from "react-router-dom";
import { GroupForm } from "@/components/forms/PageComponents";

const CreateGroup = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <GroupForm
      mode="create"
      id={id}
      onSuccessNavigate="/administration/groups"
    />
  );
};

export const CreateGroupsNavigationRoute = {
  element: <CreateGroup />,
  path: "/groups/create"
};

export default CreateGroup;
