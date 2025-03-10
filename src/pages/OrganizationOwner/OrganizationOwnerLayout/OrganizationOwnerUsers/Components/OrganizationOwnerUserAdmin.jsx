// import { Button, Title } from "@mantine/core";

// import { useEffect, useState } from "react";

// import { FiTrash, FiUpload } from "react-icons/fi";
// import { useForm } from "@mantine/form";
// import { apiDelete, apiGet, apiPost } from "../../../../services/useApi";
// import TableCom from "../../../../components/Table";
// import Popup from "../../../../components/PopUp";

// function OrganizationOwnerUserAdmin() {
//   // Retrieve Owner ID from localStorage
//   const { id } = JSON.parse(localStorage.getItem("data"));

//   const [opened, setOpened] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [locations, setLocations] = useState([]); // Stores location names
//   const [ownerLocations, setOwnerLocations] = useState([]); // Stores full location objects

//   // Define Table Columns
//   const columns = ["Name", "Location", "Email", "Services", "Actions"];

//   // Delete User Function
//   const DelUsers = async (id) => {
//     try {
//       await apiDelete(`/api/delete-user/${id}`);
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//     } catch (error) {
//       console.error("Error Deleting user:", error);
//     }
//   };

//   // Fetch Users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await apiGet("/api/get-users");
//         setUsers(response);
//       } catch (error) {
//         console.error("Error fetching Users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   //get the user location
//   useEffect(() => {
//     const fetchOwnerLocations = async () => {
//       try {
//         const locations = await apiGet(`/api/get-locations-by-owner/${id}`);
//         setLocations(locations?.map((val) => val?.name)); // Extracting location names
//         setOwnerLocations(locations); // Storing full objects
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };
//     fetchOwnerLocations();
//   }, [id]);

//   // Form Validation
//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: {
//       name: "",
//       email: "",
//       location: "67bec75edcda4c9fd910dcf9",
//       role: "admin",
//     },
//     validate: {
//       name: (value) => (value.trim().length < 1 ? "Name is required" : null),
//       email: (value) =>
//         /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
//       location: (value) =>
//         value.trim().length < 1 ? "Location is required" : null,
//     },
//   });

//   // Handle Form Submit
//   const handleSubmit = async (values) => {
//     const filterIdLocations = ownerLocations
//       ?.filter((val) => values?.locations?.includes(val?.name))
//       ?.map((val) => val?._id);

//     try {
//       setLoading(true);
//       const data = await apiPost("/api/invite-user", {
//         ...values,
//         locations: filterIdLocations,
//       });
//       setOpened(false);
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//     setLoading(false);
//   };

//   // Transform services into table-compatible data format
//   const data = services?.map((val) => {
//     const locationsName = val?.locations?.map((val) => val.name) || [];

//     // Extract location names

//     return {
//       Services: val.name,
//       Duration: val.duration,
//       Description: val.description,
//       Location: (
//         <div>
//           {/* Dropdown displaying locations without selection */}
//           <Select
//             placeholder="Available on locations"
//             data={locationsName}
//             rightSection={
//               <FaChevronDown size={11} style={{ color: "#B0B0B0" }} />
//             }
//             variant="unstyled"
//             clearable={false}
//             value={null} // Prevents selection
//             onChange={() => null} // Stops selection
//             styles={{
//               input: { fontSize: "13.7px", color: "black" }, // Ensures black text
//               rightSection: { marginRight: "4px" }, // Adjust icon spacing
//             }}
//           />
//         </div>
//       ),
//       Price: val.price,
//       Actions: (
//         <div className="flex gap-2.5">
//           <div
//             className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
//             onClick={() => {
//               setSelectedService(val); // Set selected service for editing
//               form.setValues({
//                 // Prefill form with existing values
//                 name: val.name,
//                 category: val.category,
//                 duration: val.duration,
//                 price: val.price,
//                 locations: val.locations.map((loc) => loc.name), // Extract location names
//                 description: val.description,
//               });
//               setOpened(true); // Open the popup
//             }}
//           >
//             <FiUpload size={18} style={{ color: "#427B42" }} />
//           </div>

//           <FiTrash
//             size={18}
//             className="flex items-center justify-center p-[6px] rounded bg-[#FFE0EB] cursor-pointer w-[30px] h-[30px]"
//             style={{ cursor: "pointer", color: "#622929" }}
//             onClick={() => DelUsers(val._id)}
//           />
//         </div>
//       ),
//     };
//   });

//   return (
//     <main>
//       {/* Cards Section */}

//       {/* Table Section */}
//       <section className="mt-12">
//         <div className="flex justify-between">
//           <Title size={20} fw={600}>
//             All Users
//           </Title>
//           <Button bg="black" radius="md" onClick={() => setOpened(true)}>
//             Add User
//           </Button>
//         </div>
//         <div className="mt-12">
//           <TableCom data={data} columns={columns} />
//         </div>
//       </section>

//       {/* Add User Popup */}
//       <Popup
//         form={form}
//         opened={opened}
//         setOpened={setOpened}
//         handleSubmit={handleSubmit}
//       >
//         <Popup.TextInputField
//           label="User Name"
//           placeholder="Enter User Name"
//           id="name"
//         />
//         <Popup.TextInputField
//           label="Email"
//           placeholder="Enter Email"
//           id="email"
//         />
//         <Popup.MutltiSelector
//           data={locations}
//           label="Select the location"
//           placeholder="Select at least one location"
//           id="locations"
//         />

//         <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
//       </Popup>
//     </main>
//   );
// }

// export default OrganizationOwnerUserAdmin;
