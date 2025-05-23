import {
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Switch,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteMutation,
  usePostMutation,
  useQueryHook,
  useUpdateMutation,
} from "../services/reactQuery";
import Popup from "./PopUp";
import TimePicker from "./DayTimePicker";
import { useNavigate } from "react-router-dom";
import { addDays, format, endOfMonth, startOfMonth } from "date-fns";

export default function Locations({
  endpointCreate,
  endPointGet,
  id,
  mode = "organization_owner",
  name = "",
  numberOfMonths = 1,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const totalWeeks = numberOfMonths * 5; // 5 weeks per month for consistency

  const { mutate: deleteLocation } = useDeleteMutation(["locations", id]);
  const { mutate: createLocation } = usePostMutation(["locations", id]);
  const { mutate: updateLocation } = useUpdateMutation(["locations", id]);

  const [toggleTitle, setToggleTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [workingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  const [workingHoursData, setWorkingHoursData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("1");

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const {
    data: locations = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: ["locations", id],
    endpoint: endPointGet,
    staleTime: 0 * 60 * 1000,
  });

  const DelLocation = (delId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setIsDeleting(delId);
      deleteLocation(
        { endpoint: `/api/delete-location/${delId}` },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["locations", id] });
            window.location.reload();
            toast.success("Location Deleted Successfully", {
              position: "top-center",
            });
          },
          onError: () => {
            setIsDeleting(null);
            toast.error("Error deleting location", { position: "top-center" });
          },
        }
      );
    }
  };

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const generateDefaultWorkingHours = () => {
    const workingHours = [];
    for (let week = 1; week <= totalWeeks; week++) {
      daysOfWeek.forEach((day) => {
        workingHours.push({
          week,
          day,
          start: "08:00",
          end: "18:00",
          closed: false,
        });
      });
    }
    return workingHours;
  };

  const openWorkingHoursModal = (location) => {
    setSelectedLocation(location);
    const defaultWorkingHours = generateDefaultWorkingHours();
    let updatedWorkingHours = [];

    if (location.workingHours && Array.isArray(location.workingHours)) {
      updatedWorkingHours = defaultWorkingHours.map((defaultEntry) => {
        const existingEntry = location.workingHours.find(
          (item) =>
            item.week === defaultEntry.week && item.day === defaultEntry.day
        );
        return existingEntry || { ...defaultEntry, _id: undefined };
      });
    } else {
      updatedWorkingHours = [...defaultWorkingHours];
    }

    setWorkingHoursData(updatedWorkingHours);
    setSelectedWeek("1");
    setWorkingHoursModalOpen(true);
  };

  const handleTimeChange = (day, field, value) => {
    setWorkingHoursData((prev) =>
      prev.map((item) =>
        item.day === day && item.week === parseInt(selectedWeek)
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleDayToggle = (day, closed) => {
    setWorkingHoursData((prev) => {
      const existingEntry = prev.find(
        (item) => item.day === day && item.week === parseInt(selectedWeek)
      );
      if (existingEntry) {
        return prev.map((item) =>
          item.day === day && item.week === parseInt(selectedWeek)
            ? { ...item, closed }
            : item
        );
      }
      const newEntry = {
        week: parseInt(selectedWeek),
        day,
        start: "08:00",
        end: "18:00",
        closed,
      };
      return [...prev, newEntry];
    });
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      image: "",
      address: "",
      googleLink: "",
      enableCashPayments: "false",
      startTime: "08:00",
      endTime: "18:00",
      description: "",
    },
    validate: {
      name: (value) =>
        value.trim() === "" ? "Location name is required" : null,
      address: (value) => (value.trim() === "" ? "Address is required" : null),
      googleLink: (value) =>
        value && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value)
          ? "Invalid Google link"
          : null,
      enableCashPayments: (value) =>
        value !== "true" && value !== "false"
          ? "Must be 'true' or 'false'"
          : null,
      startTime: (value) =>
        !value || value === "" ? "Start time is required" : null,
      endTime: (value, values) =>
        !value || value === ""
          ? "End time is required"
          : value <= values.startTime
            ? "End time must be after start time"
            : null,
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    let payload = {
      ...values,
      enableCashPayments: values.enableCashPayments === "true",
    };

    try {
      if (selectedLocation) {
        updateLocation(
          {
            endpoint: `/api/update-location/${selectedLocation._id}`,
            payload: payload,
          },
          {
            onSuccess: () =>
              toast.success("Location Updated Successfully", {
                position: "top-center",
              }),
            onError: () =>
              toast.error("Error Updated Location", { position: "top-center" }),
          }
        );
      } else {
        const workingHoursCreate = generateDefaultWorkingHours();
        if (mode === "superadmin") {
          payload = { ...payload, organizationOwnerId: id };
        }
        payload = { ...payload, workingHours: workingHoursCreate };
        createLocation(
          {
            endpoint: endpointCreate,
            payload: payload,
          },
          {
            onSuccess: () =>
              toast.success("Location Created Successfully", {
                position: "top-center",
              }),
            onError: () =>
              toast.error("Error While Creating Location", {
                position: "top-center",
              }),
          }
        );
      }

      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error("Error Creating/Updating location", error);
    }
  };

  return (
    <main className="grid grid-cols-1 gap-y-5 w-full pt-20 lg:pt-0 p-6 lg:p-0">
      <Title
        mb={"lg"}
        c={"black"}
        className="lg:!px-6 !flex !items-center gap-4 lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        {mode === "superadmin" ? (
          <IoArrowBackCircle
            className="cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              navigate("/SuperAdminOrganization");
            }}
          />
        ) : null}
        {mode === "superadmin" ? `${name} ` : null}
        Locations
      </Title>
      <section className="max-w-[1440px] mx-auto w-full -mt-10 lg:mt-0 px-2 flex justify-between items-center">
        <Text className="!text-[18px]  lg:!text-[22px] !font-[700]">
          All Locations
        </Text>
        <Button
          onClick={() => {
            setLoading(true);
            setToggleTitle("Add Location");
            setSelectedLocation(null);
            form.reset();
            setOpened(true);
            setLoading(false);
          }}
          loading={loading}
          loaderProps={{ type: "bars" }}
          bg="black"
          radius="md"
          className="!text-[18px] !px-[40px] !font-[400] !py-[10px]"
        >
          Add Location
        </Button>
      </section>
      <section className="max-w-[1440px] mx-auto w-full">
        <Table.ScrollContainer minWidth={950}>
          <Box className="flex flex-col gap-4 p-2 justify-center items-center">
            {isLoading ? (
              <Loader className="mx-auto" color="blue" type="bars" />
            ) : error ? (
              <Paper p={"md"} mt={30} className="!bg-[#F5F7FA] font-[1.2rem]">
                {error}
              </Paper>
            ) : (
              locations?.map((val, index) => (
                <section
                  key={val._id}
                  className="min-w-full grid grid-cols-7 justify-between gap-x-2 items-center p-2 rounded-xl specialBorder min-h-[120px] bg-[#FFFFFF]"
                >
                  <div className="col-span-2 flex gap-3">
                    {index % 3 === 0 ? (
                      <div className="min-h-[100px] flex items-center justify-center min-w-[100px] bg-[#E7EDFF] rounded-[20px]">
                        <img
                          className="w-[40.83px] h-[58.33px]"
                          src="/usaLocationIcon.png"
                          alt=""
                        />
                      </div>
                    ) : index % 3 === 1 ? (
                      <div className="min-h-[100px] flex items-center justify-center min-w-[100px] bg-[#FFE7E7] rounded-[20px]">
                        <img
                          className="w-[40.83px] h-[58.33px]"
                          src="/canadaLocationIcon.png"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="min-h-[100px] flex items-center justify-center min-w-[100px] bg-[#E7FFEB] rounded-[20px]">
                        <img
                          className="w-[40.83px] h-[58.33px]"
                          src="/australiaLocationIcon.png"
                          alt=""
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <Text
                        tt={"capitalize"}
                        className="!text-[22px] !font-[700]"
                      >
                        {val.name}
                      </Text>
                      <Text
                        c={"#718EBF"}
                        className="!cursor-pointer !underline !text-[18px] !font-[400]"
                        onClick={() => {
                          setModalTitle("Address");
                          setModalContent(val.address);
                          setModalOpen(true);
                        }}
                      >
                        View Address
                      </Text>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Text
                      tt={"capitalize"}
                      className="!text-[22px] !font-[700]"
                    >
                      Google Places
                    </Text>
                    <Text
                      c={"#718EBF"}
                      className="cursor-pointer !text-[18px] !font-[400]"
                      td={"underline"}
                      onClick={() => copyToClipboard(val.googleLink)}
                    >
                      Copy Link
                    </Text>
                  </div>
                  <div className="col-span-1">
                    <Text
                      tt={"capitalize"}
                      className="!text-[22px] !font-[700]"
                    >
                      On-site Payments
                    </Text>
                    <Text c={"#718EBF"} className="!text-[18px] !font-[400]">
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
                      className="cursor-pointer !underline !text-[18px] !font-[400]"
                      onClick={() => openWorkingHoursModal(val)}
                    >
                      Edit
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
                      className="cursor-pointer !text-[18px] !font-[400]"
                      onClick={() => {
                        setModalTitle("Description");
                        setModalContent(val.description);
                        setModalOpen(true);
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
                          enableCashPayments: val.enableCashPayments.toString(),
                          workingHours: val.workingHours,
                          description: val.description,
                        });
                        setOpened(true);
                      }}
                    >
                      <FiUpload size={18} style={{ color: "white" }} />
                    </button>
                    <button
                      className="bg-[#622929] rounded p-2 cursor-pointer"
                      onClick={() => DelLocation(val._id)}
                    >
                      {isDeleting === val._id ? (
                        <Loader color="#FFFFFF" size="xs" type="dots" />
                      ) : (
                        <BsTrash size={18} style={{ color: "white" }} />
                      )}
                    </button>
                  </div>
                </section>
              ))
            )}
          </Box>
        </Table.ScrollContainer>
      </section>
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
        <Popup.FileInputField
          label="Upload Image"
          placeholder="Select an image"
          filetype="image/*"
          id="image"
        />
        {selectedLocation ? (
          ""
        ) : (
          <>
            <TimePicker
              label="Opening Time (All Days)"
              value={form.values.startTime}
              onChange={(value) => form.setFieldValue("startTime", value)}
            />
            <TimePicker
              label="Closing Time (All Days)"
              value={form.values.endTime}
              onChange={(value) => form.setFieldValue("endTime", value)}
            />
          </>
        )}
        <Popup.SingleSelector
          id="enableCashPayments"
          label="Enable Cash Payment"
          placeholder="Select an option"
          data={[
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ]}
        />
        <Popup.TextArea
          label="Description"
          placeholder="Enter Location Description"
          id="description"
        />
        <Popup.SubmitButton loading={loading}>Submit</Popup.SubmitButton>
      </Popup>
      <Modal
        closeOnClickOutside={false}
        padding={"xl"}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        classNames={{ title: "!text-xl !font-bold" }}
        centered
        radius={"lg"}
        overlayProps={{
          backgroundOpacity: 0.8,
          blur: 3,
        }}
      >
        <p>{modalContent}</p>
      </Modal>
      <Modal
        radius={"lg"}
        padding={"xl"}
        opened={workingHoursModalOpen}
        onClose={() => setWorkingHoursModalOpen(false)}
        title="Edit Working Hours"
        classNames={{ title: "!text-xl !font-bold" }}
        centered
        closeOnClickOutside={false}
        overlayProps={{
          backgroundOpacity: 0.8,
          blur: 3,
        }}
        size="xl"
      >
        <div className="space-y-4">
          <Select
            label="Select Week"
            placeholder="Pick a week"
            data={Array.from({ length: totalWeeks }, (_, i) => {
              const weekNumber = i + 1;
              const weeksPerMonth = 5;
              const monthOffset = Math.floor((weekNumber - 1) / weeksPerMonth);
              const weekInMonth = ((weekNumber - 1) % weeksPerMonth) + 1;

              const currentMonth = new Date().getMonth();
              const currentYear = new Date().getFullYear();
              const monthIndex = (currentMonth + monthOffset) % 12;
              const yearOffset = Math.floor((currentMonth + monthOffset) / 12);
              const monthStart = startOfMonth(
                new Date(currentYear + yearOffset, monthIndex, 1)
              );

              let weekStart;
              if (weekInMonth <= 4) {
                // Weeks 1–4: 7 days each (days 1–28)
                weekStart = addDays(monthStart, (weekInMonth - 1) * 7);
              } else {
                // Week 5: Starts on day 29, covers remaining days
                weekStart = new Date(
                  monthStart.getFullYear(),
                  monthStart.getMonth(),
                  29
                );
              }

              const monthEnd = endOfMonth(monthStart);
              if (weekStart > monthEnd) {
                weekStart = monthEnd; // Cap at month end
              }

              const formattedDate = format(weekStart, "MMMM d, yyyy");

              return {
                value: `${weekNumber}`,
                label: `Week ${weekNumber} (${formattedDate})`,
              };
            })}
            value={selectedWeek}
            onChange={setSelectedWeek}
            className="mb-4"
          />
          {daysOfWeek.map((day) => {
            const dayData = workingHoursData.find(
              (item) => item.day === day && item.week === parseInt(selectedWeek)
            ) || {
              day,
              week: parseInt(selectedWeek),
              start: "08:00",
              end: "18:00",
              closed: false,
            };

            return (
              <div key={`${day}-${selectedWeek}`} className="border-b pb-4">
                <Flex justify="space-between" align="center" mb="sm">
                  <Text tt="capitalize" fw={500} fz={"h3"}>
                    {day}
                  </Text>
                  <Switch
                    size="lg"
                    color="#34C759"
                    checked={!dayData.closed}
                    onChange={(e) =>
                      handleDayToggle(day, !e.currentTarget.checked)
                    }
                    label={dayData.closed ? "Closed" : "Open"}
                  />
                </Flex>
                {!dayData.closed && (
                  <Flex gap="md" align="center">
                    <TimePicker
                      label="Opening Time"
                      value={dayData.start}
                      onChange={(value) =>
                        handleTimeChange(day, "start", value)
                      }
                    />
                    <TimePicker
                      label="Closing Time"
                      value={dayData.end}
                      onChange={(value) => handleTimeChange(day, "end", value)}
                    />
                  </Flex>
                )}
              </div>
            );
          })}
        </div>
        <Group justify="flex-end" mt="md">
          <Button
            variant="filled"
            bg={"dark"}
            radius={"md"}
            onClick={async () => {
              if (selectedLocation) {
                setLoading(true);
                try {
                  const completeWorkingHours =
                    generateDefaultWorkingHours().map((defaultEntry) => {
                      const existingEntry = workingHoursData.find(
                        (item) =>
                          item.week === defaultEntry.week &&
                          item.day === defaultEntry.day
                      );
                      return (
                        existingEntry || { ...defaultEntry, _id: undefined }
                      );
                    });

                  await updateLocation({
                    endpoint: `/api/update-location/${selectedLocation._id}`,
                    payload: {
                      workingHours: completeWorkingHours,
                    },
                  });
                  toast.success("Working Hours Updated Successfully", {
                    position: "top-center",
                  });
                  setWorkingHoursModalOpen(false);
                } catch {
                  toast.error("Error Updating Working Hours", {
                    position: "top-center",
                  });
                } finally {
                  setLoading(false);
                }
              }
            }}
            loading={loading}
          >
            Save Hours
          </Button>
        </Group>
      </Modal>
    </main>
  );
}
