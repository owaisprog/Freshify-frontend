import { Button, Title } from "@mantine/core";
import { useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "@mantine/form";
import TableCom from "../../../../../components/Table";
import Popup from "../../../../../components/PopUp";
import {
  useDeleteMutation,
  usePostMutation,
  useQueryHook,
  useUpdateMutation,
} from "../../../../../services/reactQuery";

function SuperAdminUserProfessional({ userdata, isLoading, error }) {
  // Retrieve Owner ID from localStorage
  const { id } = JSON.parse(localStorage.getItem("data"));

  // ✅ Fetch locations
  const { data: ownerLocations = [], error: locationError } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 15 * 60 * 1000,
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

  // ✅ Table Columns
  const columns = ["Name", "Location", "Email", "Role", "Actions"];

  // ✅ Delete User
  const handleDeleteUser = (userId) => {
    deleteUser(
      { endpoint: `/api/delete-user/${userId}` },
      {
        onSuccess: () => console.log("User deleted successfully!"),
        onError: (error) => console.error("Error deleting user:", error),
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
      role: "barber",
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

    try {
      if (selectedUser) {
        // ✅ Update user
        updateUser({
          endpoint: `/api/update-user/${selectedUser._id}`,
          payload: { ...values, location: locationId },
        });
      } else {
        // ✅ Create new user
        createUser({
          endpoint: "/api/invite-user",
          payload: { ...values, location: locationId },
        });
      }

      setTimeout(() => {
        setOpened(false);
        setSelectedUser(null);
      }, 2000);
    } catch (error) {
      console.error("Error creating/updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Transform Users into Table Format
  const data = userdata?.map((val) => ({
    Name: val.name,
    Location: val.location?.name || "N/A",
    Email: val.email,
    Role: val.role,
    Actions: (
      <div className="flex gap-2.5">
        {/* ✅ Edit User */}
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => {
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
        <FiTrash
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
          <Title fz={"h4"} fw={"bold"}>
            All Professionals
          </Title>
          <Button
            bg="black"
            radius="md"
            onClick={() => {
              setSelectedUser(null);
              form.reset();
              setOpened(true);
            }}
          >
            Add Professionals
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
        {/* <Popup.Select
          data={[
            { value: "admin", label: "Admin" },
            { value: "barber", label: "Barber" },
          ]}
          label="Role"
          placeholder="Select Role"
          id="role"
        /> */}
        <Popup.SubmitButton
          loading={selectedUser ? isLoadingUpdate : isLoadingCreate}
        >
          {selectedUser ? "Update User" : "Add User"}
        </Popup.SubmitButton>
      </Popup>
    </main>
  );
}

export default SuperAdminUserProfessional;
