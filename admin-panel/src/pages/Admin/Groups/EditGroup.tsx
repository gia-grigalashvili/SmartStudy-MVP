import { GroupForm } from "@/components/forms/PageComponents";
import { useLocation } from "react-router-dom";

const EditGroup = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";

  return (
    <GroupForm mode="edit" id={id} onSuccessNavigate="/administration/groups" />
  );
};

export const EditGroupNavigationRoute = {
  element: <EditGroup />,
  path: "/groups/edit"
};

export default EditGroup;
