import Locations from "../../../../components/Locations";
import { useQueryHook } from "../../../../services/reactQuery";

export default function OrganizationOwnerLocations() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  // endpoint: "/api/create-location",
  // endpoint: "/api/create-location",
  // endpoint: `/api/get-locations-by-owner/${id}`,
  const queryKey = ["bookingTime"];
  const { data: bookingTime = {} } = useQueryHook({
    queryKey,
    endpoint: `/api/get-months/${id}`,
    staleTime: 0,
  });
  return (
    <Locations
      endpointCreate="/api/create-location"
      endPointGet={`/api/get-locations-by-owner/${id}`}
      id={id}
      numberOfMonths={bookingTime?.bookingWindowMonths}
    />
  );
}
