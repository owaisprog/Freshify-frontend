import { Button, Modal, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import DatePickerCalendar from "./DatePicker";
import TimePicker from "./DayTimePicker";
import { useEffect, useState } from "react";
import { useQueryHook } from "../services/reactQuery";

const EditAvailabilityPopup = ({ opened, onClose, onSubmit }) => {
  const { id, role, location } = JSON.parse(localStorage.getItem("data")) || {};
  const [currentApi, setCurrentApi] = useState("");
  useEffect(() => {
    if (!role) return;
    else if (role === "admin")
      setCurrentApi(`/api/get-barbers-by-location/${location?._id}`);
    else if (role === "superadmin" || role === "organization_owner")
      setCurrentApi(`/api/get-users-by-owner/${id}`);
    else if (role === "barber") setCurrentApi("");
  }, [role, location]);

  // console.log(location?._id, currentApi);
  const {
    data: professionals = [],
    isLoading,
    isError,
  } = useQueryHook({
    queryKey: ["users", location?.id], // ✅ Cache users by owner ID
    endpoint: currentApi,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
    enabled: opened && role !== "barber",
  });
  console.log(professionals);

  const form = useForm({
    initialValues: {
      professionalId: role === "barber" ? id : "", // Set default to barber's own ID if role is barber
      date: new Date(),
      startTime: "",
      endTime: "",
    },
    validate: {
      professionalId: (value) =>
        role !== "barber" && !value ? "Select a professional" : null,
      date: (value) => (!value ? "Select a date" : null),
      startTime: (value) => (!value ? "Enter start time" : null),
      endTime: (value) => {
        if (!value) return "Enter end time";
        if (form.values.startTime && value <= form.values.startTime) {
          return "End time must be after start time";
        }
        return null;
      },
    },
  });

  const handleSubmit = (values) => {
    const localDate = new Date(values.date);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );
    const dateIsoString = utcDate.toISOString();

    const finalValues = {
      ...values,
      date: dateIsoString,
    };

    onSubmit(finalValues);
    onClose();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset({
        professionalId: role === "barber" ? id : "",
        date: new Date(),
        startTime: "",
        endTime: "",
      });
    }
  }, [opened, role, id]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Availability"
      size="lg"
      centered
    >
      {role !== "barber" && isLoading ? (
        <div>Loading professionals...</div>
      ) : role !== "barber" && isError ? (
        <Text c="red">Failed to load professionals</Text>
      ) : role !== "barber" && professionals.length === 0 ? (
        <Text>No professionals available</Text>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {role !== "barber" && (
            <Select
              label="Professional"
              placeholder="Select professional"
              data={professionals.map((pro) => ({
                value: pro._id,
                label: pro.name,
              }))}
              {...form.getInputProps("professionalId")}
              mb="md"
              required
            />
          )}

          <DatePickerCalendar
            value={form.values.date}
            onChange={(date) => form.setFieldValue("date", date)}
            mb="md"
          />

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

          <Button type="submit" fullWidth>
            Save Availability
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default EditAvailabilityPopup;
