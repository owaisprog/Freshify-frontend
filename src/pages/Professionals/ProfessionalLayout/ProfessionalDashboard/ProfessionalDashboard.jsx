import CalendarPage from "../../../../components/CalendarPage";

export default function ProfessionalDashboard({ numberOfMonths = 2 }) {
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <CalendarPage numberOfMonths={numberOfMonths} />
    </main>
  );
}
