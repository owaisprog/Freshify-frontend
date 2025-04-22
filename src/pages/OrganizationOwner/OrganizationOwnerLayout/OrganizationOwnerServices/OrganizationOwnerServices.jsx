import { Button, Select, Text, Title, Modal, Loader } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
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
import { toast } from "react-toastify";

function OrganizationOwnerServices() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  const queryClient = useQueryClient();

  // State for controlling popups and loading
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [toggleTitle, setToggleTitle] = useState("Add Service");

  const [isDeleting, setIsDeleting] = useState(null); // Track deleting state

  // State to control when to fetch locations
  const [fetchLocations, setFetchLocations] = useState(false);

  // Fetch services (always enabled)
  const {
    data: services = [],
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQueryHook({
    queryKey: "services",
    endpoint: `/api/get-services-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // No cache
  });

  // Fetch locations only when fetchLocations is true
  const {
    data: ownerLocations = [],
    error: locationsError,
    isLoading: isLocationsLoading,
    refetch: refetchLocations,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // No cache
    enabled: fetchLocations, // Only fetch when fetchLocations is true
  });

  const locationNames = ownerLocations.map((val) => val?.name) || [];

  // Mutations for CRUD operations
  const { mutate: createService, isPending: isLoadCreate } =
    usePostMutation("services");
  const { mutate: updateService, isPending: isLoadUpdate } =
    useUpdateMutation("services");
  const { mutate: deleteService, isPending: isLoadDelete } =
    useDeleteMutation("services");

  // Table columns
  const columns = [
    "Services",
    "Location",
    "Price",
    "Duration",
    "Description",
    "Actions",
  ];

  // Handle delete service
  const handleDeleteService = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      setIsDeleting(id);
      deleteService(
        { endpoint: `/api/delete-service/${id}` },
        {
          onSuccess: () => {
            toast("Service Deleted Successfully", { position: "top-center" });
            const previousServices =
              queryClient.getQueryData(["services"]) || [];
            const updatedServices = previousServices.filter(
              (service) => service._id !== id
            );
            queryClient.setQueryData(["services"], updatedServices);
          },
          onError: () => {
            setIsDeleting(null);
            toast("Error deleting service", { position: "top-right" });
          },
        }
      );
    }
  };

  // Form handling using Mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      locations: [],
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
      price: (value) => (value <= 0 ? "Must be a positive number" : null),
    },
  });

  // Handle form submission (create/update service)
  const handleSubmit = (values) => {
    setLoading(true);
    const filterIdLocations = ownerLocations
      ?.filter((val) => values?.locations?.includes(val?.name))
      ?.map((val) => val?._id);

    try {
      if (selectedService) {
        updateService(
          {
            endpoint: `/api/update-service/${selectedService._id}`,
            payload: { ...values, locations: filterIdLocations },
          },
          {
            onSuccess: () =>
              toast.success("Service Updated Successfully", {
                position: "top-center",
              }),
            onError: () =>
              toast.error("Error Updating Service", { position: "top-center" }),
          }
        );
      } else {
        createService(
          {
            endpoint: "/api/create-service",
            payload: { ...values, locations: filterIdLocations },
          },
          {
            onSuccess: () =>
              toast.success("Service Created Successfully", {
                position: "top-center",
              }),
            onError: () =>
              toast.error("Error Creating Service", {
                position: "top-center",
              }),
          }
        );
      }

      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 2000);
    } catch {
      toast("Error Creating/Updating service", { position: "top-right" });
      //console.error("Error Creating/Updating service", error);
      setLoading(false);
    }
  };

  // Handle "Add Service" button click
  const handleAddServiceClick = async () => {
    setLoading(true);
    setSelectedService(null);
    form.reset();
    setToggleTitle("Add Service");

    // Trigger the locations query
    setFetchLocations(true);
    await refetchLocations();

    // Open the popup
    setOpened(true);
    setLoading(false);
  };

  // Transform services data for the table
  const data = services?.map((val) => ({
    Services: val.name,
    Duration: `${val.duration} min`,
    Description: (
      <Text
        fz={"lg"}
        td={"underline"}
        c={"black"}
        className="cursor-pointer"
        onClick={() => {
          setModalContent(val.description);
          setModalOpen(true);
        }}
      >
        View Description
      </Text>
    ),
    Location: (
      <Select
        placeholder="Available on locations"
        data={val?.locations?.map((loc) => loc.name) || []}
        rightSection={<FaChevronDown size={11} style={{ color: "#B0B0B0" }} />}
        variant="unstyled"
        clearable={false}
        value={null}
        onChange={() => null}
        styles={{
          input: { fontSize: "13.7px", color: "black" },
          rightSection: { marginRight: "4px" },
        }}
      />
    ),
    Price: <div>${val.price}</div>,
    Actions: (
      <div className="flex gap-2.5   ">
        <div
          className="flex items-center justify-end p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => {
            setToggleTitle("Update Service");
            setSelectedService(val);
            form.setValues({
              name: val.name,
              category: val.category,
              duration: val.duration,
              price: val.price,
              locations: val.locations.map((loc) => loc.name),
              description: val.description,
            });
            setOpened(true);
          }}
        >
          <FiUpload size={18} style={{ color: "#427B42" }} />
        </div>

        <button
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => handleDeleteService(val._id)}
        >
          {isDeleting === val._id ? (
            <Loader color="red" size="xs" type="dots" />
          ) : (
            <BsTrash size={18} style={{ color: "#622929" }} />
          )}
        </button>
      </div>
    ),
  }));

  return (
    <main className="grid grid-cols-1 gap-y-5  mx-auto w-full pt-20 lg:pt-0  p-6 lg:p-0  ">
      {/* Services title added  On top */}
      <Title
        mb={"lg"}
        c={"black"}
        className="lg:!px-6 !px-2   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Services
      </Title>

      <section className=" -mt-10 lg:mt-0 max-w-[1440px] w-full mx-auto   grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6  ">
        <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
          <div className="flex items-center gap-2">
            <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFE0EB] rounded-3xl">
              <img src="/mostSoldServiceIcons.png" alt="" />
            </div>
            <div>
              <Text className="!text-[#000000] !text-[14px] !font-[400]">
                Most Sold Service
              </Text>
              <Text className="!text-[14px] !text-[#333B69] !font-[400]">
                Haircut
              </Text>
            </div>
          </div>
          <Text className="!text-[22px] lg:!text-[30px] !font-[600]">
            $4,790
          </Text>
        </div>

        <div className="bg-[#FFFFFF] rounded-[25px] h-[86px] flex px-[11px] items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#E7EDFF] rounded-3xl">
              <img src="/haircutTotalOrdersIcon.png" alt="" />
            </div>
            <Text className="!text-[#000000] !text-[14px] !font-[400]">
              Haircut Total Orders
            </Text>
          </div>
          <Text className="!text-[22px] lg:!text-[30px] !font-[600]">
            1,360
          </Text>
        </div>
      </section>

      <section className="flex max-w-[1440px] w-full mx-auto justify-between items-center">
        <Text className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700]">
          All Services
        </Text>
        <Button
          bg="black"
          radius="md"
          fw={"normal"}
          loading={loading}
          loaderProps={{ type: "bars" }}
          className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
          onClick={handleAddServiceClick}
        >
          Add Service
        </Button>
      </section>

      <section className="max-w-[1440px] w-full mx-auto">
        {/* Table */}
        <TableCom
          data={data}
          error={servicesError}
          columns={columns}
          isLoading={
            isServicesLoading || isLoadCreate || isLoadUpdate || isLoadDelete
          }
        />
      </section>

      {/* Add/Edit Service Popup */}
      <Popup
        form={form}
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        title={toggleTitle}
      >
        {isLocationsLoading ? (
          <Loader className="mx-auto" color="blue" type="bars" />
        ) : !selectedService && locationNames.length === 0 ? (
          <Text className="!text-[16px] !font-[400]">
            Please create at least one location.
          </Text>
        ) : (
          <>
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
              description={"Duration will be in minutes"}
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
              placeholder="Enter Description"
              id="description"
            />
            <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
          </>
        )}
      </Popup>

      {/* Description Modal */}
      <Modal
        closeOnClickOutside={false}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Description"
        centered
      >
        <p>{modalContent}</p>
      </Modal>
    </main>
  );
}

export default OrganizationOwnerServices;
