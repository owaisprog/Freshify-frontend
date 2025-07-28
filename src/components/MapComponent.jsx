import { useState, useRef, useEffect } from "react";
import { Loader, Modal } from "@mantine/core";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin, ChevronRight } from "lucide-react";

const LocationMapModal = ({ locations }) => {
  const [opened, setOpened] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [map, setMap] = useState(null);
  const locationRefs = useRef([]);
  const modalBodyRef = useRef(null);

  // Extract coordinates from Google Maps links
  const extractCoords = (link) => {
    if (!link) return null;

    try {
      // Try to extract coordinates from standard place link
      const placeMatch = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (placeMatch) {
        return {
          lat: parseFloat(placeMatch[1]),
          lng: parseFloat(placeMatch[2]),
        };
      }

      // Try to extract from search query
      const url = new URL(link);
      const query = url.searchParams.get("query");
      if (query) {
        const coords = query.split(",");
        if (coords.length === 2) {
          return {
            lat: parseFloat(coords[0]),
            lng: parseFloat(coords[1]),
          };
        }
      }

      // Try to extract from directions URL
      const dirMatch = link.match(/dir\/([^/]+\/)?(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (dirMatch) {
        return {
          lat: parseFloat(dirMatch[2]),
          lng: parseFloat(dirMatch[3]),
        };
      }

      return null;
    } catch {
      return null;
    }
  };

  // Get valid locations with coordinates
  const validLocations = locations
    .map((loc) => ({
      ...loc,
      coords: extractCoords(loc.googleLink),
    }))
    .filter((loc) => loc.coords);

  // Calculate center point of all locations
  const calculateCenter = () => {
    if (validLocations.length === 0) return { lat: 0, lng: 0 };

    if (validLocations[selectedLocationIndex]?.coords) {
      return validLocations[selectedLocationIndex].coords;
    }

    const avgLat =
      validLocations.reduce((sum, loc) => sum + loc.coords.lat, 0) /
      validLocations.length;
    const avgLng =
      validLocations.reduce((sum, loc) => sum + loc.coords.lng, 0) /
      validLocations.length;

    return { lat: avgLat, lng: avgLng };
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Handle location selection
  const handleLocationSelect = (index) => {
    setSelectedLocationIndex(index);

    if (validLocations[index]?.coords && map) {
      map.panTo(validLocations[index].coords);
      map.setZoom(15);
    }

    // Scroll to top of modal
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset selected index and center map when modal opens
  useEffect(() => {
    if (opened) {
      setSelectedLocationIndex(0);
      // Small timeout to ensure map is loaded
      setTimeout(() => {
        if (validLocations[0]?.coords && map) {
          map.panTo(validLocations[0].coords);
          map.setZoom(15);
        }
      }, 300);
    }
  }, [opened, map]);

  return (
    <>
      <button
        onClick={() => setOpened(true)}
        className="flex items-center cursor-pointer space-x-2 text-blue-600 hover:text-blue-800"
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          {locations.length} {locations.length === 1 ? "Location" : "Locations"}
        </span>
      </button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Our Locations"
        size="xl"
        radius={"lg"}
        centered
        overlayProps={{
          blur: 2,
        }}
      >
        <div
          className="space-y-4 overflow-y-auto h-[calc(100vh-200px)]"
          ref={modalBodyRef}
        >
          {isLoaded ? (
            <div className="h-96 w-full rounded-lg border border-gray-200 shadow-sm">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={calculateCenter()}
                zoom={validLocations.length > 1 ? 15 : 15}
                onLoad={(map) => {
                  setMap(map);
                  // Center on first location when map loads
                  if (validLocations[0]?.coords) {
                    map.panTo(validLocations[0].coords);
                    map.setZoom(15);
                  }
                }}
              >
                {validLocations.map((location, index) => (
                  <Marker
                    key={index}
                    position={location.coords}
                    title={location.name}
                    icon={{
                      url: `https://maps.google.com/mapfiles/ms/icons/${
                        index === selectedLocationIndex ? "red-dot" : "blue-dot"
                      }.png`,
                    }}
                    onClick={() => handleLocationSelect(index)}
                  />
                ))}
              </GoogleMap>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
              <Loader type="bars" />
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Location Details:</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {locations.map((location, index) => {
                const isValid = validLocations.some(
                  (loc) => loc._id === location._id
                );

                return (
                  <li
                    key={index}
                    ref={(el) => (locationRefs.current[index] = el)}
                    className={`p-3 border rounded-lg transition-all cursor-pointer ${
                      index === selectedLocationIndex
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleLocationSelect(index)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {location.name}
                          {!isValid && (
                            <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                              Map not available
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {location.address}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 ${
                          index === selectedLocationIndex && "text-blue-500"
                        }`}
                      />
                    </div>
                    {location.googleLink && (
                      <a
                        href={location.googleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on Google Maps
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LocationMapModal;
