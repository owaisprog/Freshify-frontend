import {
  Avatar,
  Box,
  Button,
  Modal,
  ScrollArea,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FiTrash, FiUpload } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import Popup from "../../../../components/PopUp";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUpdate,
} from "../../../../services/useApi";

export default function OrganizationOwnerLocations() {
  const { id } = JSON.parse(localStorage.getItem("data"));

  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false); // Controls the popup modal
  const [modalOpen, setModalOpen] = useState(false); // Controls the view modal
  const [modalContent, setModalContent] = useState(""); // Stores address/description
  const [modalTitle, setModalTitle] = useState(""); // Title for the modal
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected location

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("link copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  function DelLocation(id) {
    try {
      apiDelete(`/api/delete-location/${id}`)
        .then(() => {
          setLocations((prevLocations) =>
            prevLocations.filter((location) => location._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error Deleting location:", error);
        });
    } catch (error) {
      console.error("Error Deleting locations:", error);
    }
  }

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiGet(`/api/get-locations-by-owner/${id}`);
        console.log(response);
        setLocations(response);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [id]);

  // Form logic
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      image: "",
      address: "",
      googleLink: "",
      enableCashPayments: false,
      workingHours: "",
      description: "",
    },
    validate: {
      name: (value) => (value.length < 1 ? "Name is required" : null),
      address: (value) => (value.length < 1 ? "Address is required" : null),
      googleLink: (value) =>
        value.length < 1 ? "Google Link is required" : null,
      description: (value) =>
        value.length < 1 ? "Description is required" : null,
      workingHours: (value) =>
        value < 1 ? "Working hours must be a valid number" : null,
    },
  });

  const handleSubmit = async (values) => {
    console.log(values.image, "🤣🤣😂");
    try {
      setLoading(true);

      const payload = {
        name: values.name,
        image: values.image,
        address: values.address,
        googleLink: values.googleLink,
        enableCashPayments: values.enableCashPayments,
        workingHours: values.workingHours,
        description: values.description,
      };

      let response;

      if (selectedLocation) {
        response = await apiUpdate(
          `/api/update-location/${selectedLocation._id}`,
          payload
        );
      } else {
        response = await apiPost("/api/create-location", payload);
      }

      console.log("Response:", response);

      // Fetch updated locations
      const resp = await apiGet(`/api/get-locations-by-owner/${id}`);
      setLocations(resp);

      setOpened(false);
      setSelectedLocation(null);
    } catch (error) {
      console.error("Error Creating/Updating location", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-4 bg-[#F5F7FA]  h-screen">
      <Title
        fz={"h2"}
        px={"lg"}
        py={"sm"}
        c={"dark"}
        bg={"#FFFFFF"}
        fw={"bold"}
      >
        Locations
      </Title>
      <section className="p-6 flex flex-col h-full  gap-10">
        <section className="flex justify-between items-center">
          <Title fz={"h4"} fw={"bold"}>
            All Locations
          </Title>
          <Button
            onClick={() => {
              setSelectedLocation(null);
              form.reset();
              setOpened(true); // Open the add location popup
            }}
            bg="black"
            radius="md"
          >
            Add Location
          </Button>
        </section>

        <ScrollArea
          offsetScrollbars
          className="h-[400px] rounded-lg p-2 shadow-sm"
        >
          <Table.ScrollContainer minWidth={1000}>
            <Box className="flex flex-col gap-4  justify-center items-center">
              {locations?.map((val) => (
                <Box
                  key={val._id}
                  className="grid grid-cols-6 gap-x-2  items-center w-full p-2 rounded-xl border border-gray-200 bg-[#FFFFFF] "
                >
                  <div className="flex items-center gap-3 ">
                    <Avatar size={"lg"} color="blue" radius="lg">
                      <IoLocationSharp size={20} />
                    </Avatar>
                    <div>
                      <Text fz={"sm"} fw={"bold"}>
                        {val.name}
                      </Text>
                      <Text
                        fz={"xs"}
                        td={"underline"}
                        c={"blue"}
                        className="cursor-pointer"
                        onClick={() => {
                          setModalTitle("Address");
                          setModalContent(val.address);
                          setModalOpen(true); // Open view modal
                        }}
                      >
                        View Address
                      </Text>
                    </div>
                  </div>
                  <div className="text-center">
                    <Text fz={"sm"} fw={"bold"}>
                      Google Places
                    </Text>
                    <Text
                      fz={"xs"}
                      td={"underline"}
                      c={"blue"}
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(val.googleLink)}
                    >
                      Copy Link
                    </Text>
                  </div>
                  <div>
                    <Text fz={"sm"} fw={"bold"}>
                      On-site Payments
                    </Text>
                    <Text fz={"xs"}>
                      {val.enableCashPayments ? "Yes" : "No"}
                    </Text>
                  </div>
                  <div>
                    <Text fz={"sm"} fw={"bold"}>
                      Working Hours
                    </Text>
                    <Text fz={"xs"}>{val.workingHours} Hours</Text>
                  </div>
                  <div>
                    <Text fz={"sm"} fw={"bold"}>
                      Description
                    </Text>
                    <Text
                      fz={"xs"}
                      td={"underline"}
                      c={"blue"}
                      className="cursor-pointer"
                      onClick={() => {
                        setModalTitle("Description");
                        setModalContent(val.description);
                        setModalOpen(true); // Open view modal
                      }}
                    >
                      View Description
                    </Text>
                  </div>
                  <div className="flex h-fit justify-end gap-2 rounded-xl">
                    <button
                      className="bg-[#E7FFEB] rounded p-2 cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(val);
                        form.setValues({
                          name: val.name,
                          image: val.image,
                          address: val.address,
                          googleLink: val.googleLink,
                          enableCashPayments: val.enableCashPayments,
                          workingHours: val.workingHours,
                          description: val.description,
                        });
                        setOpened(true); // Open edit popup
                      }}
                    >
                      <FiUpload size={18} style={{ color: "#427B42" }} />
                    </button>

                    <button
                      className="bg-[#FFE0EB] rounded p-2 cursor-pointer"
                      onClick={() => DelLocation(val._id)}
                    >
                      <FiTrash size={18} style={{ color: "#622929" }} />
                    </button>
                  </div>
                </Box>
              ))}
            </Box>
          </Table.ScrollContainer>
        </ScrollArea>

        {/* Popup for Adding/Editing Locations */}
        <Popup
          form={form}
          opened={opened}
          setOpened={setOpened}
          handleSubmit={handleSubmit}
        >
          <Popup.TextInputField
            label="Location Name"
            placeholder="Enter Location Name"
            id="name"
          />
          <Popup.TextInputField
            label="Address"
            placeholder="Enter Address"
            id="address"
          />
          <Popup.TextInputField
            label="Google Link"
            placeholder="Enter Google Link"
            id="googleLink"
          />
          <Popup.Input
            label="Working Hours"
            type="number"
            placeholder="Enter Working Hours"
            id="workingHours"
          />
          <Popup.FileInputField
            label="Upload Image"
            placeholder="Select an image"
            filetype="image/*"
            id="image" // ✅ Ensure this matches the form field
          />
          <Popup.TextArea
            label="Description"
            placeholder="Enter Location Description"
            id="description"
          />
          <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
        </Popup>

        {/* Modal for Address & Description */}
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          centered
        >
          <p>{modalContent}</p>
        </Modal>
      </section>
    </main>
  );
}
