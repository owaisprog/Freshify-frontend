import Locations from "../../../../components/Locations";

export default function OrganizationOwnerLocations() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  // endpoint: "/api/create-location",
  // endpoint: "/api/create-location",
  // endpoint: `/api/get-locations-by-owner/${id}`,
  return (
    <Locations
      endpointCreate="/api/create-location"
      endPointGet={`/api/get-locations-by-owner/${id}`}
      id={id}
    />
  );
}
