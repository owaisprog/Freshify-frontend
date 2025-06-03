import CalendarPage from "../../../../components/CalendarPage";
import { useQueryHook } from "../../../../services/reactQuery";

export default function ProfessionalDashboard() {
  const { organizationOwnerId } = JSON.parse(localStorage.getItem("data"));
  const { data: bookingTime = {} } = useQueryHook({
    queryKey: ["bookingTime"],
    endpoint: `/api/get-months/${organizationOwnerId._id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });
  // const { mutate: updateSeen } = useUpdateMutationPut("seen");
  // useEffect(() => {
  //   updateSeen(
  //     {
  //       endpoint: `/api/is-seen/${id}`,
  //     },
  //     {
  //       onSuccess: () =>
  //         toast.success("Location Created Successfully", {
  //           position: "top-center",
  //         }),
  //       onError: () =>
  //         toast.error("Error While Creating Location", {
  //           position: "top-center",
  //         }),
  //     }
  //   );
  // }, [updateSeen])

  // /is-seen/:id
  return (
    <main className="flex flex-col  lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <CalendarPage
        numberOfMonths={bookingTime.bookingWindowMonths}
        mode="customer"
      />
    </main>
  );
}
