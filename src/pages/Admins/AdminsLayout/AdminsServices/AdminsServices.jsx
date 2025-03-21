import { Button, Select, Text, Title, Modal } from "@mantine/core";
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

function AdminsServices() {
  const { location, email, id, createdBy } = JSON.parse(
    localStorage.getItem("data")
  );

  console.log(location, email, id);

  const {
    data: services = [],
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQueryHook({
    queryKey: "services",
    endpoint: `/api/get-service/${location?._id}`,
    staleTime: 0 * 60 * 1000, // 15 minutes cache
  });

  const { mutate: createService, isPending: isLoadCreate } =
    usePostMutation("services");
  const { mutate: updateService, isPending: isLoadUpdate } =
    useUpdateMutation("services");
  const { mutate: deleteService, isPending: isLoadDelete } =
    useDeleteMutation("services");

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [toggleTitle, setToggleTitle] = useState("Add Service");

  const columns = [
    "Services",
    "Location",
    "Price",
    "Duration",
    "Description",
    "Actions",
  ];

  const queryClient = useQueryClient();
  const handleDeleteService = (id) => {
    deleteService(
      { endpoint: `/api/delete-service/${id}` },
      {
        onSuccess: () => {
          const previousServices = queryClient.getQueryData(["services"]) || [];
          const updatedServices = previousServices.filter(
            (service) => service._id !== id
          );
          queryClient.setQueryData(["services"], updatedServices);
          // console.log("Service deleted successfully!");
          toast.success("Service Delete Successfully", {
            position: "top-center",
          });
        },
        onError: (error) => {
          console.error("Error deleting service:", error);
          toast("Error deleting service", { position: "top-center" });
        },
      }
    );
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      locations: [location?._id],
      description: "",
      category: "",
      duration: "",
      price: "",
    },
    validate: {
      name: (value) => (value.trim().length < 1 ? "Name is required" : null),
      // locations: (value) =>
      //   value.length === 0 ? "At least one location is required" : null,
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

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      if (selectedService) {
        updateService(
          {
            endpoint: `/api/update-service/${selectedService._id}`,
            payload: { ...values, createdBy },
          },
          {
            onSuccess: () => {
              toast.success("Update Service Successfully", {
                position: "top-center",
              });
            },
            onError: () => {
              toast.error("Updation Failed Try Again", {
                position: "top-center",
              });
            },
          }
        );
      } else {
        createService(
          {
            endpoint: "/api/create-service",
            payload: { ...values, createdBy },
          },
          {
            onSuccess: () => {
              toast.success("Service Create Successfully", {
                position: "top-center",
              });
            },
            onError: () => {
              toast("Creation Failed Try Again", {
                position: "top-center",
              });
            },
          }
        );
      }
      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 2000);
    } catch (error) {
      toast("Error Creating/Updating service", { position: "top-right" });
      console.error("Error Creating/Updating service", error);
      setLoading(false);
    }
  };

  const data = services?.map((val) => ({
    Services: val.name,
    Duration: val.duration,
    Description: (
      <Text
        fz={"lg"}
        td={"underline"}
        c={"black"} // Set color to black
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
      <div className="flex gap-2.5">
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => {
            setToggleTitle("Update Service");
            setSelectedService(val);
            form.setValues({
              name: val.name,
              category: val.category,
              duration: val.duration,
              price: val.price,
              locations: val.locations.map((loc) => loc?._id),
              description: val.description,
            });
            setOpened(true);
          }}
        >
          <FiUpload size={18} style={{ color: "#427B42" }} />
        </div>

        {/* ✅ Delete Service Button */}
        <BsTrash
          size={18}
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          style={{ cursor: "pointer", color: "#622929" }}
          onClick={() => handleDeleteService(val._id)}
        />
      </div>
    ),
  }));

  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA]   min-h-screen  ">
      <Title
        c={"black"}
        className="lg:!px-6 !px-2 lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500] py-[18px] "
      >
        Services
      </Title>

      <section className="max-w-[1440px] w-full mx-auto p-6 flex flex-col h-full  gap-8">
        <section className=" w-full   grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6  ">
          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#FFE0EB] rounded-3xl">
                {" "}
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
            <Text className="!text-[30px] !font-[600]">$4,790</Text>
          </div>

          <div className="bg-[#FFFFFF]   rounded-[25px] h-[86px] flex px-[11px]  items-center  justify-between  ">
            <div className="flex items-center gap-2">
              <div className="h-[60px] flex items-center justify-center w-[60px] bg-[#E7EDFF] rounded-3xl">
                {" "}
                <img src="/haircutTotalOrdersIcon.png" alt="" />
              </div>
              <Text className="!text-[#000000] !text-[14px] !font-[400]">
                Haircut Total Orders
              </Text>
            </div>
            <Text className="!text-[30px] !font-[600]">1,360</Text>
          </div>
        </section>

        <section className="flex justify-between items-center">
          <Text className="!text-[22px] !font-[700]">All Services</Text>
          <Button
            bg="black"
            radius="md"
            fw={"normal"}
            className="!text-[18px] !px-[40px] !py-[10px]"
            onClick={() => {
              setToggleTitle("Add Service");
              setSelectedService(null);
              form.reset();
              setOpened(true);
            }}
          >
            Add Service
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

        <Popup
          form={form}
          opened={opened}
          setOpened={setOpened}
          handleSubmit={handleSubmit}
          title={toggleTitle}
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

          <Popup.TextArea
            label="Description"
            placeholder="Enter  Description"
            id="description"
          />
          <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
        </Popup>

        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Description"
          centered
        >
          <p>{modalContent}</p>
        </Modal>
      </section>
    </main>
  );
}

export default AdminsServices;
