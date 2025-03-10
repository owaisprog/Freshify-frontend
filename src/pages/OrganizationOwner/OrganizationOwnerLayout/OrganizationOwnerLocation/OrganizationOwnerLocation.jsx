import { Box, Button, Modal, Title } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from "../../../../components/PopUp";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUpdate,
} from "../../../../services/useApi";
import TimePicker from "../../../../components/DayTimePicker";

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
      image: "https://cloudinary.com/sampleimage.jpg",
      address: "",
      googleLink: "",
      enableCashPayments: false,
      workingHours: {
        Monday: "4pm-4pm",
      },
      description: "",
    },
    validate: {
      name: (value) => (value.length < 1 ? "Name is required" : null),
      address: (value) => (value.length < 1 ? "Address is required" : null),
      googleLink: (value) =>
        value.length < 1 ? "Google Link is required" : null,
      description: (value) =>
        value.length < 1 ? "Description is required" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name,
        image: "https://cloudinary.com/sampleimage.jpg",
        address: values.address,
        googleLink: values.googleLink,
        enableCashPayments: values.enableCashPayments,
        workingHours: {
          Monday: "9AM - 9PM",
        },
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
    <main className="flex flex-col  min-h-screen overflow-hidden">
      <Box className="flex justify-between">
        <Title order={5}>All Locations</Title>
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
      </Box>

      <Box className="flex flex-col gap-10 mt-6 justify-center items-center">
        {locations?.map((val) => (
          <Box
            key={val._id}
            className="flex justify-evenly shadow-2xl p-4 rounded-[8px] items-center w-full"
          >
            <div className="flex gap-3">
              <div className="bg-amber-300 grid place-content-center w-14 h-14 rounded-2xl">
                <IoLocationSharp color="red" size={40} />
              </div>
              <div>
                <Title order={5}>{val.name}</Title>
                <h4
                  className="underline cursor-pointer text-blue-600"
                  onClick={() => {
                    setModalTitle("Address");
                    setModalContent(val.address);
                    setModalOpen(true); // Open view modal
                  }}
                >
                  View Address
                </h4>
              </div>
            </div>
            <div>
              <Title order={5}>Google Places</Title>
              <h4
                className="underline cursor-pointer text-blue-600"
                onClick={() => copyToClipboard(val.googleLink)}
              >
                Copy Link
              </h4>
            </div>
            <div>
              <Title order={5}>On-site Payments</Title>
              <h4 className="underline">
                {val.enableCashPayments ? "Yes" : "No"}
              </h4>
            </div>
            <div>
              <Title order={5}>Description</Title>
              <h4
                className="underline cursor-pointer text-blue-600"
                onClick={() => {
                  setModalTitle("Description");
                  setModalContent(val.description);
                  setModalOpen(true); // Open view modal
                }}
              >
                View Description
              </h4>
            </div>
            <div className="flex gap-2 rounded-xl">
              <button
                className="bg-green-700 p-2"
                onClick={() => {
                  setSelectedLocation(val);
                  form.setValues({
                    name: val.name,
                    image: val.image,
                    address: val.address,
                    googleLink: val.googleLink,
                    enableCashPayments: val.enableCashPayments,
                    workingHours: val.workingHours || { Monday: "9AM - 9PM" },
                    description: val.description,
                  });
                  setOpened(true); // Open edit popup
                }}
              >
                <FiUpload color="white" />
              </button>

              <button
                className="bg-red-700 p-2"
                onClick={() => DelLocation(val._id)}
              >
                <RiDeleteBin6Line color="white" />
              </button>
            </div>
          </Box>
        ))}
      </Box>

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
    </main>
  );
}
