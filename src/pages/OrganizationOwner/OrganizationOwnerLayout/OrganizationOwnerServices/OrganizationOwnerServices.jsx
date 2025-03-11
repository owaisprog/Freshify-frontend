import { Button, Group, Select, Title } from "@mantine/core";
import TabCard from "../../../../components/TabCard";
import { FaChevronDown, FaTools } from "react-icons/fa";
import { TfiUpload } from "react-icons/tfi";
import { useEffect, useState } from "react";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUpdate,
} from "../../../../services/useApi";
import TableCom from "../../../../components/Table";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "@mantine/form";
import Popup from "../../../../components/PopUp";
import { fetchServices } from "./useServices";

function OrganizationOwnerServices() {
  // Retrieve Owner ID from localStorage
  const { id } = JSON.parse(localStorage.getItem("data"));

  // State Management
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]); // Stores services
  const [locations, setLocations] = useState([]); // Stores location names
  const [ownerLocations, setOwnerLocations] = useState([]); // Stores full location objects
  const [selectedService, setSelectedService] = useState(null); // Holds the service being edited

  // Table column headers
  const columns = [
    "Services",
    "Location",
    "Price",
    "Duration",
    "Description",
    "Actions",
  ];

  // Function to delete a service
  function Delservices(id) {
    try {
      apiDelete(`/api/delete-service/${id}`)
        .then(() => {
          setServices((prevServices) =>
            prevServices.filter((service) => service._id !== id)
          );
        })
        .catch((error) => console.error("Error Deleting services:", error));
    } catch (error) {
      console.error("Error Deleting services:", error);
    }
  }

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiGet("/api/get-services-by-owner");
        console.log(response);
        setServices(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Fetch owner locations on component mount
  useEffect(() => {
    const fetchOwnerLocations = async () => {
      try {
        const locations = await apiGet(`/api/get-locations-by-owner/${id}`);
        setLocations(locations?.map((val) => val?.name)); // Extracting location names
        setOwnerLocations(locations); // Storing full objects
        console.log("aasda");
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchOwnerLocations();
  }, [id]);

  // Form validation and handling using Mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      locations: [], // Array of location IDs
      description: "",
      category: "",
      duration: "",
      price: "",
    },
    validate: {
      name: (value) => (value.trim().length < 1 ? "Name is required" : null),
      locations: (value) =>
        value.length === 0 ? "At least one location is required" : null,
      description: (value) =>
        value.trim().length < 10
          ? "Description must be at least 10 characters long"
          : null,
      category: (value) =>
        value.trim().length < 1 ? "Category is required" : null,
      duration: (value) =>
        value === "" ||
        isNaN(value) ||
        value <= 0 ||
        !Number.isInteger(Number(value))
          ? "Duration must be a positive whole number"
          : null,
      price: (value) =>
        value === "" || isNaN(value) || value <= 0
          ? "Price must be a positive number"
          : null,
    },
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Find the correct location IDs from names
      const filterIdLocations = ownerLocations
        ?.filter((val) => values?.locations?.includes(val?.name))
        ?.map((val) => val?._id);

      if (selectedService) {
        // Update existing service (PUT request)
        console.log(values, "😊😊");
        await apiUpdate(`/api/update-service/${selectedService._id}`, {
          ...values,
          locations: filterIdLocations,
        });

        const resp = await fetchServices();
        setServices(resp);
        //       setServices((service) => [
        //         ...service,
        //         { ...data.newService, locations: idTodata },
        //       ]);

        // Update the service in state
        // setServices((prevServices) =>
        //   prevServices.map((service) =>
        //     service._id === selectedService._id
        //       ? response.updatedService
        //       : service
        //   )
        // );
      } else {
        // Create new service (POST request)
        await apiPost("/api/create-service", {
          ...values,
          locations: filterIdLocations,
        });

        // Add the new service to the state
        const resp = await fetchServices();
        console.log(resp);
        setServices(resp);
      }

      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 1000);
    } catch (error) {
      console.log("Error Creating/Updating service", error);
      setLoading(false);
    }
  };

  // Transform services into table-compatible data format
  const data = services?.map((val) => {
    const locationsName = val?.locations?.map((val) => val.name) || [];

    // Extract location names

    return {
      Services: val.name,
      Duration: val.duration,
      Description: val.description,
      Location: (
        <div>
          {/* Dropdown displaying locations without selection */}
          <Select
            placeholder="Available on locations"
            data={locationsName}
            rightSection={
              <FaChevronDown size={11} style={{ color: "#B0B0B0" }} />
            }
            variant="unstyled"
            clearable={false}
            value={null} // Prevents selection
            onChange={() => null} // Stops selection
            styles={{
              input: { fontSize: "13.7px", color: "black" }, // Ensures black text
              rightSection: { marginRight: "4px" }, // Adjust icon spacing
            }}
          />
        </div>
      ),
      Price: val.price,
      Actions: (
        <div className="flex gap-2.5">
          <div
            className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
            onClick={() => {
              setSelectedService(val); // Set selected service for editing
              form.setValues({
                // Prefill form with existing values
                name: val.name,
                category: val.category,
                duration: val.duration,
                price: val.price,
                locations: val.locations.map((loc) => loc.name), // Extract location names
                description: val.description,
              });
              setOpened(true); // Open the popup
            }}
          >
            <FiUpload size={18} style={{ color: "#427B42" }} />
          </div>

          <FiTrash
            size={18}
            className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
            style={{ cursor: "pointer", color: "#622929" }}
            onClick={() => Delservices(val._id)}
          />
        </div>
      ),
    };
  });

  return (
    <main>
      {/* Top Section: Cards */}
      <section className="flex gap-4">
        <TabCard>
          <Group>
            <TabCard.Profile backGround="bg-pink-100">
              <FaTools size={40} color="#FF82AC" />
            </TabCard.Profile>
            <TabCard.TextContent
              title="Most Sales Professional"
              name="Mirza Tayyab Khalid"
            />
          </Group>
          <TabCard.Amount amount="$ 4790" />
        </TabCard>
        <TabCard>
          <Group>
            <TabCard.Profile backGround="bg-[#E7EDFF]">
              <TfiUpload size={40} color="#396AFF" />
            </TabCard.Profile>
            <TabCard.TextContent title="Most Sales Professional" />
          </Group>
          <TabCard.Amount amount="4790" />
        </TabCard>
      </section>

      {/* Services Table */}
      <section className="mt-12">
        <div className="flex justify-between">
          <Title size={20} fw={600}>
            All Services
          </Title>
          <Button
            bg="black"
            radius="md"
            onClick={() => {
              setSelectedService(null); // Reset selectedService (means we are creating a new service)
              form.reset(); // Clear form fields
              setOpened(true); // Open the popup
            }}
          >
            Add Services
          </Button>
        </div>
        <div className="mt-12">
          <TableCom data={data} columns={columns} />
        </div>
      </section>

      {/* Service Creation Popup */}
      <Popup
        form={form}
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
      >
        <Popup.TextInputField
          label="Service Name"
          placeholder="Enter Service name"
          id="name"
        />
        <Popup.TextInputField
          label="Category"
          placeholder="Enter Category"
          id="category"
        />
        <Popup.Input
          label="Duration"
          placeholder="Enter Service Duration in minutes"
          id="duration"
          type="number"
        />
        <Popup.Input
          label="Price"
          placeholder="Enter Service Price in Dollars"
          id="price"
          type="number"
        />
        <Popup.MutltiSelector
          data={locations}
          label="Select the location"
          placeholder="Select at least one location"
          id="locations"
        />
        <Popup.TextArea
          label="Description"
          placeholder="Enter Location Description"
          id="description"
        />
        <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
      </Popup>
    </main>
  );
}

export default OrganizationOwnerServices;
