import { useLocation, useParams } from "react-router-dom";
import Locations from "../../../../components/Locations";
import { useQueryHook } from "../../../../services/reactQuery";

export default function SuperAdminLocations() {
  // const { id } = JSON.parse(localStorage.getItem("data"));
  const location = useLocation();
  const name = location.state;
  const { ownerId } = useParams();
  // endpoint: `/api/delete-location/${delId}`
  // endpoint: `/api/update-location/${selectedLocation._id}`
  // endpoint: `/api/get-locations-by-owner/${ownerId}`
  // endpoint: "/api/create-location-by-superadmin",
  const queryKey = ["bookingTime"];
  const { data: bookingTime = {} } = useQueryHook({
    queryKey,
    endpoint: `/api/get-months/${ownerId}`,
    staleTime: 0,
  });
  return (
    <Locations
      endpointCreate="/api/create-location-by-superadmin"
      endPointGet={`/api/get-locations-by-owner/${ownerId}`}
      id={ownerId}
      mode="superadmin"
      name={name}
      numberOfMonths={bookingTime?.bookingWindowMonths}
    />
  );
}
