import {
  Button,
  Modal,
  Select,
  Text,
  Table,
  ActionIcon,
  Loader,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DatePickerCalendar from "./DatePicker";
import TimePicker from "./DayTimePicker";
import { useEffect, useState } from "react";
import { useQueryHook, useDeleteMutation } from "../services/reactQuery";
import { IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";

const EditAvailabilityPopup = ({ opened, onClose, onSubmit }) => {
  const { id, role, location } = JSON.parse(localStorage.getItem("data")) || {};
  const [currentApi, setCurrentApi] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [deletingSlotId, setDeletingSlotId] = useState(null);

  // Set API endpoint based on role
  useEffect(() => {
    if (!role) return;
    if (role === "admin") {
      setCurrentApi(`/api/get-barbers-by-location/${location?._id}`);
    } else if (role === "superadmin" || role === "organization_owner") {
      setCurrentApi(`/api/get-users-by-owner/${id}`);
    } else if (role === "barber") {
      setSelectedProfessionalId(id);
    }
  }, [role, location, id]);

  // Fetch professionals list
  const {
    data: professionals = [],
    isLoading: isLoadingProfessionals,
    isError: isErrorProfessionals,
  } = useQueryHook({
    queryKey: ["professionals", role, location?._id],
    endpoint: currentApi,
    staleTime: 15 * 60 * 1000,
    enabled: opened && role !== "barber" && !!currentApi,
  });

  // Fetch unavailability slots
  const {
    data: unavailabilityData = {},
    isLoading: isLoadingSlots,
    isError: isErrorSlots,
    refetch: refetchSlots,
  } = useQueryHook({
    queryKey: ["unavailability", selectedProfessionalId],
    endpoint: selectedProfessionalId
      ? `/api/get-unavailability/${selectedProfessionalId}`
      : null,
    enabled: opened && !!selectedProfessionalId,
  });

  const unavailabilitySlots =
    unavailabilityData.unavailability ||
    unavailabilityData.unavailablePeriods ||
    [];

  // Delete slot mutation
  const { mutate: deleteSlot } = useDeleteMutation("bookings");

  const form = useForm({
    initialValues: {
      professionalId: role === "barber" ? id : "",
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

  const handleProfessionalChange = (professionalId) => {
    setSelectedProfessionalId(professionalId);
    form.setFieldValue("professionalId", professionalId);
  };

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

  const handleDeleteSlot = (slot) => {
    if (!slot._id) {
      toast.error("Cannot delete slot - missing ID");
      return;
    }

    // Use window.confirm for deletion confirmation
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this unavailability slot?"
    );
    if (!isConfirmed) return;

    setDeletingSlotId(slot._id);

    deleteSlot(
      {
        endpoint: `/api/delete-unavailability/${slot._id}`,
      },
      {
        onSuccess: () => {
          toast.success("Unavailability slot deleted successfully");
          refetchSlots();
        },
        onError: () => {
          toast.error("Failed to delete unavailability slot");
        },
        onSettled: () => {
          setDeletingSlotId(null);
        },
      }
    );
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset();
      if (role !== "barber") setSelectedProfessionalId(null);
      setDeletingSlotId(null);
    }
  }, [opened, role]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Availability"
      size="lg"
      centered
      overlayProps={{ blur: 3 }}
    >
      {/* Professionals dropdown for non-barbers */}
      {role !== "barber" && (
        <>
          {isLoadingProfessionals ? (
            <Loader size="sm" />
          ) : isErrorProfessionals ? (
            <Text c="red">Failed to load professionals</Text>
          ) : professionals.length === 0 ? (
            <Text>No professionals available</Text>
          ) : (
            <Select
              label="Professional"
              placeholder="Select professional"
              data={professionals.map((pro) => ({
                value: pro._id,
                label: pro.name,
              }))}
              value={selectedProfessionalId}
              onChange={handleProfessionalChange}
              mb="md"
              required
              searchable
              nothingFoundMessage="No professionals found"
            />
          )}
        </>
      )}

      {/* Date and Time Pickers */}
      <DatePickerCalendar
        value={form.values.date}
        onChange={(date) => form.setFieldValue("date", date)}
        mb="md"
      />

      <TimePicker
        label="Start Time"
        value={form.values.startTime}
        onChange={(value) => form.setFieldValue("startTime", value)}
        mb="md"
      />

      <TimePicker
        label="End Time"
        value={form.values.endTime}
        onChange={(value) => form.setFieldValue("endTime", value)}
        mb="md"
      />

      <Button
        type="submit"
        fullWidth
        mt="md"
        onClick={form.onSubmit(handleSubmit)}
        loading={form.isSubmitting}
      >
        Add Unavailability
      </Button>

      {/* Existing Unavailability Slots */}
      {selectedProfessionalId && (
        <div style={{ marginTop: "2rem" }}>
          <Text size="lg" fw={500} mb="sm">
            Existing Unavailability Slots
          </Text>

          {isLoadingSlots ? (
            <Loader size="sm" />
          ) : isErrorSlots ? (
            <Text c="red">Failed to load unavailability slots</Text>
          ) : unavailabilitySlots.length === 0 ? (
            <Text fs="italic">No unavailability slots found</Text>
          ) : (
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Start Time</Table.Th>
                  <Table.Th>End Time</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {unavailabilitySlots.map((slot) => (
                  <Table.Tr key={slot._id}>
                    <Table.Td>
                      {new Date(slot.date).toLocaleDateString()}
                    </Table.Td>
                    <Table.Td>{slot.startTime}</Table.Td>
                    <Table.Td>{slot.endTime}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        {deletingSlotId === slot._id ? (
                          <Loader size="xs" />
                        ) : (
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => handleDeleteSlot(slot)}
                          >
                            <IoTrash size={16} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </div>
      )}
    </Modal>
  );
};

export default EditAvailabilityPopup;
