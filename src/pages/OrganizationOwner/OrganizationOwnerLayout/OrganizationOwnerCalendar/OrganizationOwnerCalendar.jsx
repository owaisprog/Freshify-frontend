import CalendarPage from "../../../../components/CalendarPage";
import { useQueryHook } from "../../../../services/reactQuery";

export default function OrganizationOwnerCalendar() {
  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months`,
    staleTime: 5 * 60 * 1000, // Cache for 15 minutes
  });

  return (
    <CalendarPage
      numberOfMonths={bookingTime?.bookingWindowMonths}
      resecduleTimeLimit={bookingTime?.timeRestrictionHours}
    />
  );
}
