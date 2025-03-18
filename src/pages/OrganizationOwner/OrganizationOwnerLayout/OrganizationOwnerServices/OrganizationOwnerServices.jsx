import { Button, Select, Text, Title } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useState } from "react";
import TableCom from "../../../../components/Table";
import { useForm } from "@mantine/form";
import Popup from "../../../../components/PopUp";
import {
  useDeleteMutation,
  usePostMutation,
  useQueryHook,
  useUpdateMutation,
} from "../../../../services/reactQuery";
import { useQueryClient } from "@tanstack/react-query";

function OrganizationOwnerServices() {
  // ✅ Retrieve Owner ID from localStorage
  const { id } = JSON.parse(localStorage.getItem("data"));

  // ✅ Fetch services using React Query
  const {
    data: services = [],
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQueryHook({
    queryKey: "services",
    endpoint: "/api/get-services-by-owner",
    staleTime: 0 * 60 * 1000, // 15 minutes cache
  });

  // ✅ Fetch owner locations using React Query
  const {
    data: ownerLocations = [],
    // isLoading: isLocationsLoading,
    error: locationsError,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // 15 minutes cache
  });

  // ✅ Extract location names
  const locationNames = ownerLocations.map((val) => val?.name) || [];
  // ✅ Initialize Mutations for CRUD Operations
  const { mutate: createService, isPending: isLoadCreate } =
    usePostMutation("services");
  const { mutate: updateService, isPending: isLoadUpdate } =
    useUpdateMutation("services");
  const { mutate: deleteService, isPending: isLoadDelete } =
    useDeleteMutation("services");

  // ✅ State Management
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Holds the service being edited

  // ✅ Table Headers
  const columns = [
    "Services",
    "Location",
    "Price",
    "Duration",
    "Description",
    "Actions",
  ];

  // ✅ Delete Service
  const queryClient = useQueryClient();
  const handleDeleteService = (id) => {
    deleteService(
      { endpoint: `/api/delete-service/${id}` },
      {
        onSuccess: () => {
          // ✅ Get current list of services
          const previousServices = queryClient.getQueryData(["services"]) || [];

          // ✅ Filter out the deleted service
          const updatedServices = previousServices.filter(
            (service) => service._id !== id
          );

          // ✅ Set the new list in cache
          queryClient.setQueryData(["services"], updatedServices);

          console.log("Service deleted successfully!");
        },
        onError: (error) => {
          console.error("Error deleting service:", error);
        },
      }
    );
  };

  // ✅ Form Validation & Handling using Mantine
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

  // ✅ Handle Form Submission (Create/Update Service)
  const handleSubmit = (values) => {
    setLoading(true);

    // ✅ Convert Location Names to IDs
    const filterIdLocations = ownerLocations
      ?.filter((val) => values?.locations?.includes(val?.name))
      ?.map((val) => val?._id);

    try {
      if (selectedService) {
        // ✅ Update existing service
        updateService({
          endpoint: `/api/update-service/${selectedService._id}`,
          payload: { ...values, locations: filterIdLocations },
        });
      } else {
        // ✅ Create new service
        createService({
          endpoint: "/api/create-service",
          payload: { ...values, locations: filterIdLocations },
        });
      }

      // ✅ Close Modal & Stop Loading
      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 2000);
    } catch (error) {
      console.error("Error Creating/Updating service", error);
      setLoading(false);
    }
  };

  // ✅ Transform services into table-compatible format
  const data = services?.map((val) => ({
    Services: val.name,
    Duration: val.duration,
    Description: val.description,
    Location: (
      <Select
        placeholder="Available on locations"
        data={val?.locations?.map((loc) => loc.name) || []}
        rightSection={<FaChevronDown size={11} style={{ color: "#B0B0B0" }} />}
        variant="unstyled"
        clearable={false}
        value={null} // Prevents selection
        onChange={() => null} // Stops selection
        styles={{
          input: { fontSize: "13.7px", color: "black" }, // Ensures black text
          rightSection: { marginRight: "4px" }, // Adjust icon spacing
        }}
      />
    ),
    Price: val.price,
    Actions: (
      <div className="flex gap-2.5">
        {/* ✅ Edit Service Button */}
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => {
            setSelectedService(val); // Set selected service for editing
            form.setValues({
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

        {/* ✅ Delete Service Button */}
        <FiTrash
          size={18}
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          style={{ cursor: "pointer", color: "#622929" }}
          onClick={() => handleDeleteService(val._id)}
        />
      </div>
    ),
  }));
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] max-w-[1720px]  min-h-screen">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Services
      </Title>

      <section className=" p-6 flex flex-col h-full  gap-8">
        {/* First Section  */}
        <section className=" w-full   grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6  ">
          {/* Most Sold Service Section */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFE0EB] rounded-3xl">
                {" "}
                <img src="/mostSoldServiceIcons.png" alt="" />
              </div>
              <div>
                <Text className="!text-[#333B69] !text-[14px] !font-[400]">
                  Most Sold Service
                </Text>

                <Text className="!text-[14px] !font-[400]">Haircut</Text>
              </div>
            </div>
            <Text className="!text-[30px] !font-[600]">$4,790</Text>
          </div>

          {/* Haircut Total Orders Section  */}
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#E7EDFF] rounded-3xl">
                {" "}
                <img src="/haircutTotalOrdersIcon.png" alt="" />
              </div>

              <Text className="!text-[#333B69] !text-[14px] !font-[400]">
                Haircut Total Orders
              </Text>
            </div>
            <Text className="!text-[30px] !font-[600]">1,360</Text>
          </div>
        </section>

        {/* Services Table */}

        <section className="flex justify-between items-center">
          <Text className="!text-[22px] !font-[700]">All Services</Text>
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
        </section>

        <TableCom
          data={data}
          error={servicesError}
          columns={columns}
          isLoading={
            isServicesLoading || isLoadCreate || isLoadUpdate || isLoadDelete
          }
        />

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
            data={locationNames}
            label="Select the location"
            placeholder="Select at least one location"
            id="locations"
            error={locationsError}
          />
          <Popup.TextArea
            label="Description"
            placeholder="Enter Location Description"
            id="description"
          />
          <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
        </Popup>
      </section>
    </main>
  );
}

export default OrganizationOwnerServices;
