import CalendarPage from "../../../../components/CalendarPage";
import { useQueryHook } from "../../../../services/reactQuery";

export default function OrganizationOwnerCalendar() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months/${id}`,
    staleTime: 5 * 60 * 1000, // Cache for 15 minutes
  });

  return (
    // <CalendarPage
    //   numberOfMonths={bookingTime?.bookingWindowMonths}
    //   resecduleTimeLimit={bookingTime?.timeRestrictionHours}
    // />
    <h1>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
      nobis qui asperiores numquam! Sunt veniam explicabo repellat magni libero
      nemo!
    </h1>
  );
}
