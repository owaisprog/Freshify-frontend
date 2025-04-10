import { Button, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import DatePickerCalendar from "./DatePicker";
import TimePicker from "./DayTimePicker";

const EditAvailabilityPopup = ({
  opened,
  onClose,
  onSubmit,
  professionals,
}) => {
  const form = useForm({
    initialValues: {
      professionalId: "",
      date: new Date(),
      startTime: "",
      endTime: "",
    },
    validate: {
      professionalId: (value) => (!value ? "Select a professional" : null),
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
    // 1) Convert the chosen date to a local Date object
    const localDate = new Date(values.date);

    // 2) Extract just the YYYY, MM, DD for UTC midnight
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );

    // 3) Convert to ISO so your backend sees the correct calendar day in UTC
    const dateIsoString = utcDate.toISOString();

    // 4) Prepare final payload
    const finalValues = {
      ...values,
      date: dateIsoString, // "2025-04-10T00:00:00.000Z" example
    };

    // Send it off
    onSubmit(finalValues);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Availability"
      size="lg"
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
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

        {/* Make sure DatePickerCalendar is a fully controlled component! */}
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
    </Modal>
  );
};

export default EditAvailabilityPopup;
