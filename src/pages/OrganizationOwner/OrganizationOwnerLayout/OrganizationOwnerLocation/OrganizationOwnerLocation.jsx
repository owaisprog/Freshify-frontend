import {
  Box,
  Button,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
// import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from "../../../../components/PopUp";
import { useForm } from "@mantine/form";
import { useState } from "react";

import {
  useDeleteMutation,
  usePostMutation,
  useQueryHook,
  useUpdateMutation,
} from "../../../../services/reactQuery";
import { toast } from "react-toastify";

export default function OrganizationOwnerLocations() {
  const { id } = JSON.parse(localStorage.getItem("data"));

  //query logic
  //delete
  const { mutate: deleteLocation } = useDeleteMutation(["locations", id]);

  //mutate
  const { mutate: createLocation } = usePostMutation(["locations", id]);
  const { mutate: updateLocation } = useUpdateMutation(["locations", id]);

  const [toggleTitle, setToggleTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false); // Controls the popup modal
  const [modalOpen, setModalOpen] = useState(false); // Controls the view modal
  const [modalContent, setModalContent] = useState(""); // Stores address/description
  const [modalTitle, setModalTitle] = useState(""); // Title for the modal
  // const [locations, setLocations] = useState([]);
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

  const DelLocation = (delId) => {
    deleteLocation(
      { endpoint: `/api/delete-location/${delId}` },
      {
        onSuccess: () => {
          toast("Success", { position: "top-right" });
        },
        onError: (error) => {
          console.error("Error deleting location:", error);
          toast("Error deleting location", { position: "top-right" });
        },
      }
    );
  };
  console.log(selectedLocation);
  // Fetch locations
  const {
    data: locations = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: `/api/get-locations-by-owner/${id}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

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

  const handleSubmit = (values) => {
    setLoading(true);

    try {
      if (selectedLocation) {
        updateLocation({
          endpoint: `/api/update-location/${selectedLocation._id}`,
          payload: values,
        });
      } else {
        createLocation({
          endpoint: "/api/create-location",
          payload: values,
        });
      }
      toast("Success", { position: "top-right" });
      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 1000);
    } catch (error) {
      console.error("Error Creating/Updating location", error);
      toast("Something went wrong try again", { position: "top-right" });
      setLoading(false);
    }
  };
  // if (isLoading)
  //   return (
  //     <div className="h-screen grid place-content-center">

  //     </div>
  //   );
  console.log(error);
  return (
    <main className="flex flex-col pt-20 lg:pt-0 bg-[#F5F7FA] max-w-[1720px]  min-h-screen">
      <Title
        px={"lg"}
        py={"sm"}
        c={"black"}
        className="!roboto lg:bg-[#FFFFFF]   lg:!text-[32px] !text-[24px] !font-[500]  "
      >
        Locations
      </Title>
      <section className="p-6 flex flex-col h-full  gap-10">
        <section className="flex justify-between items-center">
          <Text className="!text-[22px] !font-[700]">All Locations</Text>
          <Button
            onClick={() => {
              setToggleTitle("Add Location");
              setSelectedLocation(null);
              form.reset();
              setOpened(true); // Open the add location popup
            }}
            bg="black"
            radius="md"
            className="!text-[18px] !px-[40px] !py-[10px]"
          >
            Add Location
          </Button>
        </section>

        <ScrollArea
          offsetScrollbars
          className="h-[500px] min-w-full  rounded-lg p2-2 "
        >
          <Table.ScrollContainer className=" w-full ">
            <Box className="flex flex-col gap-4 p-2  justify-center items-center">
              {isLoading ? (
                <Loader className="mx-auto" color="blue" type="bars" />
              ) : error ? (
                <Paper
                  p={"md"}
                  mt={30}
                  className="!bg-[#F5F7FA]  font-[1.2rem]  "
                >
                  {" "}
                  {error}
                </Paper>
              ) : (
                locations?.map((val) => (
                  <section
                    key={val._id}
                    className=" min-w-[1650px] overflow-auto flex justify-between gap-x-2  items-center  p-2 rounded-xl specialBorder h-[120px]   bg-[#FFFFFF] "
                  >
                    <div className="col-span-2 flex items-center gap-3  ">
                      <div className="h-[100px] flex items-center justify-center w-[100px] bg-[#E7EDFF] rounded-[20px]">
                        {" "}
                        <img
                          className="w-[40.83px] h-[58.33px]"
                          src="/usaLocationIcon.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <Text
                          tt={"capitalize"}
                          className="!text-[22px] !font-[700]"
                        >
                          {val.name}
                        </Text>
                        <Text
                          c={"#718EBF"}
                          className="cursor-pointer !text-[18px] !font-[400] "
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
                    <div className="">
                      <Text
                        tt={"capitalize"}
                        className="!text-[22px] !font-[700]"
                      >
                        Google Places
                      </Text>
                      <Text
                        c={"#718EBF"}
                        className="cursor-pointer !text-[18px] !font-[400] "
                        td={"underline"}
                        onClick={() => copyToClipboard(val.googleLink)}
                      >
                        Copy Link
                      </Text>
                    </div>
                    <div>
                      <Text
                        tt={"capitalize"}
                        className="!text-[22px] !font-[700]"
                      >
                        On-site Payments
                      </Text>
                      <Text
                        c={"#718EBF"}
                        className=" !text-[18px] !font-[400] "
                      >
                        {val.enableCashPayments ? "Yes" : "No"}
                      </Text>
                    </div>
                    <div>
                      <Text
                        tt={"capitalize"}
                        className="!text-[22px] !font-[700]"
                      >
                        Working Hours
                      </Text>
                      <Text
                        c={"#718EBF"}
                        className="cursor-pointer !text-[18px] !font-[400] "
                      >
                        {val.workingHours} Hours
                      </Text>
                    </div>
                    <div>
                      <Text
                        tt={"capitalize"}
                        className="!text-[22px] !font-[700]"
                      >
                        Description
                      </Text>
                      <Text
                        td={"underline"}
                        c={"#718EBF"}
                        className="cursor-pointer !text-[18px] !font-[400] "
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
                        className="bg-[#427B42] rounded p-2 cursor-pointer"
                        onClick={() => {
                          setToggleTitle("Update Location");
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
                        <FiUpload size={18} style={{ color: "white" }} />
                      </button>

                      <button
                        className="bg-[#622929] rounded p-2 cursor-pointer"
                        onClick={() => DelLocation(val._id)}
                      >
                        <BsTrash size={18} style={{ color: "white" }} />
                      </button>
                    </div>
                  </section>
                ))
              )}
            </Box>
          </Table.ScrollContainer>
        </ScrollArea>

        {/* Popup for Adding/Editing Locations */}
        <Popup
          form={form}
          opened={opened}
          setOpened={setOpened}
          handleSubmit={handleSubmit}
          title={toggleTitle}
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
