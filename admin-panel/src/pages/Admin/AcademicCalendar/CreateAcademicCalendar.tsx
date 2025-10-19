import { useSearchParams } from "react-router-dom";
import { AcademicCalendarForm } from "@/components/forms/PageComponents";

const CreateAcademicCalendar = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <AcademicCalendarForm
      mode="create"
      id={id}
      onSuccessNavigate="/administration/academic-calendar"
    />
  );
};

export const CreateAcademicCalendarNavigationRoute = {
  element: <CreateAcademicCalendar />,
  path: "/academic-calendar/create"
};

export default CreateAcademicCalendar;
