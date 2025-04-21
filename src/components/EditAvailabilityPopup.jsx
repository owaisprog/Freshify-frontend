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
import { useEffect, useState, useCallback, useMemo } from "react";
import { useQueryHook, useDeleteMutation } from "../services/reactQuery";
import { IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditAvailabilityPopup = ({ opened, onClose, onSubmit, setIsLoader }) => {
  const { id, role, location } = JSON.parse(localStorage.getItem("data")) || {};
  const [currentApi, setCurrentApi] = useState("");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  const [deletingSlotId, setDeletingSlotId] = useState(null);
  const { ownerId } = useParams() || {};

  // Memoized role check
  const isBarber = useMemo(() => role === "barber", [role]);

  // Set API endpoint based on role - memoized callback
  const setApiEndpoint = useCallback(() => {
    if (!role) return;
    if (role === "admin") {
      setCurrentApi(`/api/get-barbers-by-location/${location?._id}`);
    } else if (role === "organization_owner") {
      setCurrentApi(`/api/get-users-by-owner/${id}`);
    } else if (isBarber) {
      setSelectedProfessionalId(id);
    } else if (role === "superadmin") {
      setCurrentApi(`/api/get-users-by-owner/${ownerId}`);
    }
    // role === "superadmin"
  }, [role, location, id, isBarber, ownerId]);

  useEffect(() => {
    setApiEndpoint();
  }, [setApiEndpoint]);

  // Fetch professionals list
  const {
    data: professionals = [],
    isLoading: isLoadingProfessionals,
    isError: isErrorProfessionals,
  } = useQueryHook({
    queryKey: ["professionals", role, location?._id],
    endpoint: currentApi,
    staleTime: 15 * 60 * 1000,
    enabled: opened && !isBarber && !!currentApi,
  });

  // Update loader state
  useEffect(() => {
    setIsLoader(isLoadingProfessionals);
  }, [isLoadingProfessionals, setIsLoader]);

  // Memoized professional options
  const professionalOptions = useMemo(() => {
    return professionals.map((pro) => ({
      value: pro._id,
      label: pro.name,
    }));
  }, [professionals]);

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

  // Memoized unavailability slots
  const unavailabilitySlots = useMemo(() => {
    return (
      unavailabilityData.unavailability ||
      unavailabilityData.unavailablePeriods ||
      []
    );
  }, [unavailabilityData]);

  // Delete slot mutation
  const { mutate: deleteSlot } = useDeleteMutation("bookings");

  // Form configuration
  const form = useForm({
    initialValues: {
      professionalId: isBarber ? id : "",
      date: new Date(),
      startTime: "",
      endTime: "",
    },
    validate: {
      professionalId: (value) =>
        !isBarber && !value ? "Select a professional" : null,
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

  // Handle professional change
  const handleProfessionalChange = useCallback(
    (professionalId) => {
      setSelectedProfessionalId(professionalId);
      form.setFieldValue("professionalId", professionalId);
    },
    [form]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (values) => {
      const localDate = new Date(values.date);
      const utcDate = new Date(
        Date.UTC(
          localDate.getFullYear(),
          localDate.getMonth(),
          localDate.getDate()
        )
      );
      const dateIsoString = utcDate.toISOString();

      onSubmit({
        ...values,
        date: dateIsoString,
      });
      onClose();
    },
    [onClose, onSubmit]
  );

  // Handle slot deletion
  const handleDeleteSlot = useCallback(
    (slot) => {
      if (!slot._id) {
        toast.error("Cannot delete slot - missing ID");
        return;
      }

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
            window.location.reload();
          },
          onError: () => {
            toast.error("Failed to delete unavailability slot");
          },
          onSettled: () => {
            setDeletingSlotId(null);
          },
        }
      );
    },
    [deleteSlot, refetchSlots]
  );

  // Reset form when modal closes
  useEffect(() => {
    if (!opened) {
      form.reset();
      if (!isBarber) setSelectedProfessionalId(null);
      setDeletingSlotId(null);
    }
  }, [opened, isBarber]);

  // Render loading state for professionals
  const renderProfessionalSelect = () => {
    if (isLoadingProfessionals) return <Loader size="sm" />;
    if (isErrorProfessionals)
      return <Text c="red">Failed to load professionals</Text>;
    if (professionalOptions.length === 0)
      return <Text>No professionals available</Text>;

    return (
      <Select
        label="Users"
        placeholder="Select User"
        data={professionalOptions}
        value={selectedProfessionalId}
        onChange={handleProfessionalChange}
        mb="md"
        required
        searchable
        nothingFoundMessage="No professionals found"
      />
    );
  };

  // Render unavailability slots table
  const formatTimeForDisplay = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12; // Convert 00 to 12 for midnight (12:00 AM)
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const renderUnavailabilitySlots = () => {
    if (isLoadingSlots) return <Loader size="sm" />;
    if (isErrorSlots)
      return <Text c="red">Failed to load unavailability slots</Text>;
    if (unavailabilitySlots.length === 0)
      return <Text fs="italic">No unavailability slots found</Text>;

    return (
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
              <Table.Td>{new Date(slot.date).toLocaleDateString()}</Table.Td>
              <Table.Td>{formatTimeForDisplay(slot.startTime)}</Table.Td>
              <Table.Td>{formatTimeForDisplay(slot.endTime)}</Table.Td>
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
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Availability"
      size="lg"
      centered
      overlayProps={{ blur: 3 }}
    >
      {!isBarber && professionals.length === 0 ? (
        isLoadingProfessionals ? (
          <Loader className="mx-auto" color="blue" type="bars" />
        ) : (
          <Text align="center">
            No professionals available in your location.
          </Text>
        )
      ) : (
        <>
          {!isBarber && renderProfessionalSelect()}

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
            color="#000000"
            onClick={form.onSubmit(handleSubmit)}
            loading={form.isSubmitting}
          >
            Add Unavailability
          </Button>

          {selectedProfessionalId && (
            <div style={{ marginTop: "2rem" }}>
              <Text size="lg" fw={500} mb="sm">
                Existing Unavailability Slots
              </Text>
              {renderUnavailabilitySlots()}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default EditAvailabilityPopup;
