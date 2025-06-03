import { Button, Title, Modal, Text, Loader } from "@mantine/core";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useForm } from "@mantine/form";
import TableCom from "../../../../../components/Table";
import Popup from "../../../../../components/PopUp";
import {
  useDeleteMutation,
  usePostMutation,
  useQueryHook,
  useUpdateMutation,
} from "../../../../../services/reactQuery";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function SuperAdminUserProfessional({ userdata, isLoading, error }) {
  // Retrieve Owner ID from localStorage
  // const { id } = JSON.parse(localStorage.getItem("data"));
  const { ownerId } = useParams();

  // ✅ Fetch locations
  const { data: ownerLocations = [], error: locationError } = useQueryHook({
    queryKey: ["locations", ownerId],
    endpoint: `/api/get-locations-by-owner/${ownerId}`,
    staleTime: 15 * 60 * 1000,
  });

  // ✅ Fetch services
  const { data: services = [] } = useQueryHook({
    queryKey: "services",
    endpoint: `/api/get-services-by-owner/${ownerId}`,
    staleTime: 15 * 60 * 1000, // 15 minutes cache
  });

  // ✅ Mutations for CRUD operations
  const { mutate: createUser, isPending: isLoadingCreate } = usePostMutation([
    "users",
    ownerId,
  ]);
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateMutation([
    "users",
    ownerId,
  ]);
  const { mutate: deleteUser } = useDeleteMutation(["users", ownerId]);

  const [isDeleting, setIsDeleting] = useState(null); // Track deleting state
  // ✅ State for popup/modal
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggleTitle, setToggleTitle] = useState("");

  // ✅ State for services modal
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [servicesModalContent, setServicesModalContent] = useState([]);

  // ✅ Table Columns
  const columns = ["Name", "Location", "Email", "Services", "Actions"];

  // ✅ Delete User
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      setIsDeleting(userId);
      deleteUser(
        { endpoint: `/api/delete-user/${userId}` },
        {
          onSuccess: () =>
            toast.success("Deletion Successfull", { position: "top-center" }),
          onError: () => {
            setIsDeleting(null);
            toast.error("Deletion Failed Try Again", {
              position: "top-center",
            });
          },
        }
      );
    }
  };

  // ✅ Form Handling using Mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      location: "",
      role: "barber",
      services: [],
    },
    validate: {
      name: (value) => (value.trim().length < 1 ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      location: (value) =>
        value.trim().length < 1 ? "Location is required" : null,
    },
  });

  // ✅ Handle Form Submission (Create/Update)
  const handleSubmit = async (values) => {
    setLoading(true);

    // ✅ Find location ID based on selected location name
    const locationId = ownerLocations.find(
      (loc) => loc.name === values.location
    )?._id;

    // ✅ Find service IDs based on selected service names
    const servicesId = services
      ?.filter((val) => values?.services?.includes(val?.name))
      ?.map((val) => val?._id);

    try {
      if (selectedUser) {
        // ✅ Update user
        updateUser(
          {
            endpoint: `/api/update-user/${selectedUser._id}`,
            payload: { ...values, location: locationId, services: servicesId },
          },
          {
            onSuccess: () =>
              toast.success("Updated Successfull", { position: "top-center" }),
            onError: () =>
              toast.error("Updation Failed Try Again", {
                position: "top-center",
              }),
          }
        );
      } else {
        // ✅ Create new user
        createUser(
          {
            endpoint: "/api/invite-user-by-superadmin",
            payload: {
              ...values,
              location: locationId,
              services: servicesId,
              organizationOwnerId: ownerId,
            },
          },
          {
            onSuccess: () =>
              toast.success(
                "Created Successfull Check Email for Invitaion Link",
                { position: "top-center" }
              ),
            onError: () =>
              toast.error("Invitaion Failed Try Again", {
                position: "top-center",
              }),
          }
        );
      }

      setTimeout(() => {
        setOpened(false);
        setSelectedUser(null);
      }, 2000);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      toast.error("Someting went wrong try again ", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Transform Users into Table Format
  const data = userdata?.map((val) => ({
    Name: val.name,
    Location: val.location?.name || "N/A",
    Email: val.email,
    Services: (
      <Text
        fz={"lg"}
        td={"underline"}
        c={"black"} // Set color to black
        className="cursor-pointer"
        onClick={() => {
          setServicesModalContent(val.services); // Set services for the modal
          setServicesModalOpen(true); // Open the modal
        }}
      >
        View Services
      </Text>
    ),
    Actions: (
      <div className="flex gap-2.5">
        {/* ✅ Edit User */}
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => {
            setToggleTitle("Update Professional");
            setSelectedUser(val);
            form.setValues({
              name: val.name,
              email: val.email,
              location: val.location?.name || "",
              role: val.role,
              services: val.services?.map((service) => service.name) || [], // Set selected services
            });
            setOpened(true);
          }}
        >
          <FiUpload size={18} style={{ color: "#427B42" }} />
        </div>

        {/* ✅ Delete User */}

        <button
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => handleDeleteUser(val._id)}
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
    <main>
      {/* Table Section */}
      <section>
        <div className="flex justify-between items-end">
          <Title className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700]">
            Professionals
          </Title>
          <Button
            bg="black"
            radius="md"
            className="!text-[18px]  !font-[400] lg:!px-[40px] lg:!py-[10px]"
            loading={loading}
            loaderProps={{ type: "bars" }}
            onClick={() => {
              setLoading(true);
              setToggleTitle("Add Professional");
              setSelectedUser(null);
              form.reset();
              setOpened(true);
              setLoading(false);
            }}
          >
            Add Professional
          </Button>
        </div>
        <div className="mt-3">
          <TableCom
            data={data}
            isLoading={isLoading}
            error={error}
            columns={columns}
          />
        </div>
      </section>

      {/* Add/Edit User Popup */}
      <Popup
        form={form}
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        title={toggleTitle}
      >
        <Popup.TextInputField
          label="Full Name"
          placeholder="Enter User Name"
          id="name"
        />
        <Popup.TextInputField
          label="Email"
          placeholder="Enter Email"
          id="email"
        />
        <Popup.SingleSelector
          data={ownerLocations.map((loc) => loc.name)}
          label="Select the location"
          placeholder="Select at least one location"
          id="location"
          error={locationError}
        />
        <Popup.MutltiSelector
          data={services.map((serve) => serve.name)}
          label="Select the Services"
          placeholder="Select at least one Service"
          id="services"
        />
        <Popup.SubmitButton
          loading={selectedUser ? isLoadingUpdate : isLoadingCreate}
        >
          {selectedUser ? "Update User" : "Add User"}
        </Popup.SubmitButton>
      </Popup>

      {/* Services Modal */}
      <Modal
        closeOnClickOutside={false}
        opened={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        classNames={{ title: "!text-xl !font-bold" }}
        title="Services"
        centered
      >
        <div>
          {servicesModalContent.map((service, index) => (
            <div key={index} className="mb-2">
              <Text>{service.name}</Text>
            </div>
          ))}
        </div>
      </Modal>
    </main>
  );
}

export default SuperAdminUserProfessional;
