import { Button, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "@mantine/form";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUpdate,
} from "../../../../../services/useApi";
import TableCom from "../../../../../components/Table";
import Popup from "../../../../../components/PopUp";

function OrganizationOwnerUserProfessional({
  userdata,
  activeTab,
  setAllUsers,
}) {
  console.log(userdata);
  // Retrieve Owner ID from localStorage
  const { id } = JSON.parse(localStorage.getItem("data"));

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]); // Stores location names
  const [ownerLocations, setOwnerLocations] = useState([]); // Stores full location objects
  const [selectedUser, setSelectedUser] = useState(null); // Stores user being edited

  // Define Table Columns
  const columns = ["Name", "Location", "Email", "Role", "Actions"];

  // Delete User Function
  const DelUsers = async (ids) => {
    try {
      await apiDelete(`/api/delete-user/${ids}`);
      const resp = await apiGet(`/api/get-users-by-owner/${id}`);
      setAllUsers(resp);
      setUsers(resp.filter((val) => val.role === activeTab));
    } catch (error) {
      console.error("Error Deleting user:", error);
    }
  };

  // Fetch Users from API
  useEffect(() => {
    setUsers(userdata);
  }, [userdata]);

  // Fetch the organization owner's locations
  useEffect(() => {
    const fetchOwnerLocations = async () => {
      try {
        const locations = await apiGet(`/api/get-locations-by-owner/${id}`);
        setLocations(locations?.map((val) => val?.name)); // Extracting location names
        setOwnerLocations(locations); // Storing full objects
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchOwnerLocations();
  }, [id]);

  // Form Validation
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

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const filterIdLocations = ownerLocations
        ?.filter((val) => values?.location == val?.name)
        ?.map((val) => val?._id);
      console.log(values, filterIdLocations[0], ownerLocations);

      let response;
      if (selectedUser) {
        // If updating an existing user
        response = await apiUpdate(`/api/update-user/${selectedUser._id}`, {
          ...values,
          location: filterIdLocations[0], // Use first location ID
        });
      } else {
        // If creating a new user
        response = await apiPost("/api/invite-user", {
          ...values,
          location: filterIdLocations[0],
        });
      }
      console.log(response);

      const resp = await apiGet(`/api/get-users-by-owner/${id}`);

      setAllUsers(resp);
      setUsers(resp.filter((val) => val.role === activeTab));

      setOpened(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error creating/updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform Users into Table-compatible Data Format
  const data = users?.map((val) => {
    console.log(val.location?.name, "locations");
    return {
      Name: val.name,
      Location: val.location?.name || "N/A",
      Email: val.email,
      Role: val.role,
      Actions: (
        <div className="flex gap-2.5">
          {/* Edit User */}
          <div
            className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
            onClick={() => {
              setSelectedUser(val); // Set selected user for editing
              form.setValues({
                name: val.name,
                email: val.email,
                location: val.location?.name || "",
                role: val.role,
              });
              setOpened(true); // Open popup
            }}
          >
            <FiUpload size={18} style={{ color: "#427B42" }} />
          </div>

          {/* Delete User */}
          <FiTrash
            size={18}
            className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
            style={{ cursor: "pointer", color: "#622929" }}
            onClick={() => DelUsers(val._id)}
          />
        </div>
      ),
    };
  });

  return (
    <main>
      {/* Table Section */}
      <section className="">
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
          <TableCom data={data} columns={columns} />
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
          data={locations}
          label="Select the location"
          placeholder="Select at least one location"
          id="location"
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
        <Popup.SubmitButton loading={loading}>
          {selectedUser ? "Update User" : "Add User"}
        </Popup.SubmitButton>
      </Popup>
    </main>
  );
}

export default OrganizationOwnerUserProfessional;
