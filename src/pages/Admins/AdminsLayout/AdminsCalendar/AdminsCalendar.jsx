import CalendarPage from "../../../../components/CalendarPage";

export default function AdminsCalendar({ numberOfMonths = 3 }) {
  return (
    <main className="flex flex-col  lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <CalendarPage numberOfMonths={numberOfMonths} />;
    </main>
  );
}
