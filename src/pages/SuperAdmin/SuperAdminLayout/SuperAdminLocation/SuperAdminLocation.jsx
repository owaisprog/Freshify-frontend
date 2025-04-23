import { useParams } from "react-router-dom";
import Locations from "../../../../components/Locations";

export default function SuperAdminLocations() {
  // const { id } = JSON.parse(localStorage.getItem("data"));
  const { ownerId } = useParams();
  // endpoint: `/api/delete-location/${delId}`
  //  endpoint: `/api/update-location/${selectedLocation._id}`
  // endpoint: `/api/get-locations-by-owner/${ownerId}`
  // endpoint: "/api/create-location-by-superadmin",
  return (
    <Locations
      endpointCreate="/api/create-location-by-superadmin"
      endPointGet={`/api/get-locations-by-owner/${ownerId}`}
      id={ownerId}
      mode="superadmin"
    />
  );
}
