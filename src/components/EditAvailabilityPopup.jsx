import { Button, Modal, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import DatePickerCalendar from "./DatePicker";
import TimePicker from "./DayTimePicker";
// import { usePostMutation } from "../services/reactQuery";
// import { TimeInput } from "@mantine/dates";

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
    onSubmit(values);
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

        <DatePickerCalendar
          value={form.values.date}
          onChange={(date) => form.setFieldValue("date", date)}
          mb="md"
        />

        {/* <TimeInput
          label="Start Time"
          value={form.values.startTime}
          onChange={(time) => form.setFieldValue("startTime", time)}
          mb="md"
          required
        />

        <TimeInput
          label="End Time"
          value={form.values.endTime}
          onChange={(time) => form.setFieldValue("endTime", time)}
          mb="md"
          required
        /> */}
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
