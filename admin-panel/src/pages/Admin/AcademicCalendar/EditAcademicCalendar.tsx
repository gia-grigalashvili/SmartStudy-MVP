import { AcademicCalendarForm } from "@/components/forms/PageComponents";
import { useLocation } from "react-router-dom";

const EditAcademicCalendar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";

  return (
    <AcademicCalendarForm
      mode="edit"
      id={id}
      onSuccessNavigate="/administration/academic-calendar"
    />
  );
};

export const EditAcademicCalendarNavigationRoute = {
  element: <EditAcademicCalendar />,
  path: "/academic-calendar/edit"
};

export default EditAcademicCalendar;
