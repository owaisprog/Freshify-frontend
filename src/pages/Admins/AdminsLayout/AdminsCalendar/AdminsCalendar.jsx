import CalendarPage from "../../../../components/CalendarPage";
import { useQueryHook } from "../../../../services/reactQuery";

export default function AdminsCalendar() {
  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <CalendarPage numberOfMonths={bookingTime.bookingWindowMonths} />;
    </main>
  );
}
