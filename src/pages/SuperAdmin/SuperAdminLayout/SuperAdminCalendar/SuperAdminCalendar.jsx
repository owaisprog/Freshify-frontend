import { useLocation } from "react-router-dom";
import CalendarPage from "../../../../components/CalendarPage";
import { useQueryHook } from "../../../../services/reactQuery";

export default function SuperAdminCalendar() {
  const location = useLocation();
  const name = location.state;

  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  return (
    <CalendarPage
      numberOfMonths={bookingTime.bookingWindowMonths}
      mode="superadmin"
      name={name}
    />
  );
}
