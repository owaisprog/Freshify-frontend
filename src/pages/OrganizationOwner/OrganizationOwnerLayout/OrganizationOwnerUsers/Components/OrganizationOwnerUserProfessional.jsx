import { Button, Title } from "@mantine/core";

import { useState } from "react";

import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { apiDelete, apiPost } from "../../../../services/useApi";
import TableCom from "../../../../components/Table";
import Popup from "../../../../components/PopUp";

function OrganizationOwnerUserProfessional() {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Define Table Columns
  const columns = ["Name", "Location", "Email", "Services", "Actions"];

  // Delete User Function
  const DelUsers = async (id) => {
    try {
      await apiDelete(`/api/delete-user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error Deleting user:", error);
    }
  };

  // Fetch Users from API

  // Form Validation
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      location: "",
      services: [],
    },
    validate: {
      name: (value) => (value.trim().length < 1 ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      location: (value) =>
        value.trim().length < 1 ? "Location is required" : null,
      services: (value) =>
        value.length === 0 ? "At least one service is required" : null,
    },
  });

  // Handle Form Submit
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await apiPost("/api/create-user", values);
      setUsers((prevUsers) => [...prevUsers, data]);
      setOpened(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    setLoading(false);
  };

  // Map Users Data for Table (Adjusting for Provided Structure)
  const data = users?.map((user) => ({
    Name: user.name,
    Location: user.location?.name || "N/A",
    Email: user.email,
    Services: user.services?.map((service) => service.name).join(", ") || "N/A",
    Actions: (
      <div className="flex gap-2.5">
        {/* Upload Icon */}
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => console.log("Upload user:", user._id)}
        >
          <FiUpload size={18} style={{ color: "#427B42" }} />
        </div>

        {/* Delete Icon */}
        <div
          className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
          onClick={() => DelUsers(user._id)}
        >
          <FiTrash size={18} style={{ color: "#622929" }} />
        </div>
      </div>
    ),
  }));

  return (
    <main>
      {/* Cards Section */}

      {/* Table Section */}
      <section className="mt-12">
        <div className="flex justify-between">
          <Title size={20} fw={600}>
            All Users
          </Title>
          <Button bg="black" radius="md" onClick={() => setOpened(true)}>
            Add User
          </Button>
        </div>
        <div className="mt-12">
          <TableCom data={data} columns={columns} />
        </div>
      </section>

      {/* Add User Popup */}
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
        <Popup.TextInputField
          label="Location"
          placeholder="Enter Location"
          id="location"
        />
        <Popup.TextArea
          label="Services"
          placeholder="Enter Services (comma-separated)"
          id="services"
        />
        <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
      </Popup>
    </main>
  );
}

export default OrganizationOwnerUserProfessional;
