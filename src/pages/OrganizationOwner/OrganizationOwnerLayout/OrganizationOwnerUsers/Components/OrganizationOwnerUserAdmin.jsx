import { Button, Title, Modal, Text } from "@mantine/core";
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

function OrganizationOwnerUserAdmin({ userdata, isLoading, error }) {
  // Retrieve Owner ID from localStorage
  const { id } = JSON.parse(localStorage.getItem("data"));

  // ✅ Fetch locations
  const { data: ownerLocations = [], error: locationError } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 0 * 60 * 1000,
  });

  // ✅ Fetch services
  const { data: services = [] } = useQueryHook({
    queryKey: "services",
    endpoint: "/api/get-services-by-owner",
    staleTime: 0 * 60 * 1000, // 15 minutes cache
  });

  // ✅ Mutations for CRUD operations
  const { mutate: createUser, isPending: isLoadingCreate } = usePostMutation([
    "users",
    id,
  ]);
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateMutation([
    "users",
    id,
  ]);
  const { mutate: deleteUser } = useDeleteMutation(["users", id]);

  // ✅ State for popup/modal
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggleTitle, setToggleTitle] = useState("Add Admin");

  // ✅ State for services modal
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [servicesModalContent, setServicesModalContent] = useState([]);

  // ✅ Table Columns
  const columns = ["Name", "Location", "Email", " Services", "Actions"];

  // ✅ Delete User
  const handleDeleteUser = (userId) => {
    deleteUser(
      { endpoint: `/api/delete-user/${userId}` },
      {
        onSuccess: () => toast("Success", { position: "top-right" }),
        onError: () => toast("Deletion Error", { position: "top-right" }),
      }
    );
  };

  // ✅ Form Handling using Mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      location: "",
      role: "admin",
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
    const servicesId = services
      ?.filter((val) => values?.services?.includes(val?.name))
      ?.map((val) => val?._id);
    try {
      if (selectedUser) {
        // ✅ Update user
        updateUser({
          endpoint: `/api/update-user/${selectedUser._id}`,
          payload: { ...values, location: locationId, services: servicesId },
        });
      } else {
        // ✅ Create new user
        createUser({
          endpoint: "/api/invite-user",
          payload: { ...values, location: locationId, services: servicesId },
        });
      }
      toast("Success", { position: "top-right" });
      setTimeout(() => {
        setOpened(false);
        setSelectedUser(null);
      }, 2000);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      toast("Something went wrong", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Transform Users into Table Format
  const data = userdata?.map((val) => ({
    Name: val.name,
    Location: val.location?.name || "N/A",
    Email: val.email,
    " Services": (
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
            setToggleTitle("Update Admin");
            setSelectedUser(val);
            form.setValues({
              name: val.name,
              email: val.email,
              location: val.location?.name || "",
              role: val.role,
            });
            setOpened(true);
          }}
        >
          <FiUpload size={18} style={{ color: "#427B42" }} />
        </div>

        {/* ✅ Delete User */}
        <BsTrash
          size={18}
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          style={{ cursor: "pointer", color: "#622929" }}
          onClick={() => handleDeleteUser(val._id)}
        />
      </div>
    ),
  }));

  return (
    <main>
      {/* Table Section */}
      <section>
        <div className="flex justify-between items-end">
          <Title className="!text-[22px] !font-[700]">Admins</Title>
          <Button
            bg="black"
            radius="md"
            fw={"normal"}
            className="!text-[18px] !px-[40px] !py-[10px]"
            onClick={() => {
              setSelectedUser(null);
              form.reset();
              setOpened(true);
              setToggleTitle("Add Admin");
            }}
          >
            Add Admin
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
          label="User Name"
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
        opened={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
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

export default OrganizationOwnerUserAdmin;
