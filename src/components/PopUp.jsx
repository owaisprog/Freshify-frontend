import {
  Button,
  Paper,
  TextInput,
  Stack,
  Textarea,
  Group,
  Modal,
  FileInput,
  Checkbox,
  MultiSelect,
  Select,
} from "@mantine/core";
import { createContext, useContext } from "react";
import { FiUpload } from "react-icons/fi";

// Popup Component (Parent Component)
const PopupContext = createContext();

const Popup = ({
  opened,
  setOpened,
  handleSubmit,
  children,
  form,
  title = "Add New Location",
}) => {
  // Access form from context

  return (
    <PopupContext.Provider value={form}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        centered
        size="xl"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper bg={"white"} shadow="md" className="p-8" radius={"md"}>
            <Stack spacing="md">{children}</Stack>
          </Paper>
        </form>
      </Modal>
    </PopupContext.Provider>
  );
};

function Input({ label, placeholder, id, type = "text" }) {
  const form = usePopupForm();

  // Handle checkbox separately
  if (type === "checkbox") {
    return (
      <Checkbox
        color="black"
        label={label}
        onChange={(event) =>
          form.setFieldValue(id, event.currentTarget.checked)
        }
      />
    );
  }

  // Handle all other inputs
  return (
    <TextInput
      type={type}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(id)}
    />
  );
}

function TextInputField({ label, placeholder, id }) {
  const form = usePopupForm();
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(id)}
    />
  );
}

function TextArea({ label, placeholder, id }) {
  const form = usePopupForm();
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(id)}
    />
  );
}

function SubmitButton({ loading, children }) {
  return (
    <Group position="right" mt="xl">
      <Button
        fullWidth
        type="submit"
        bg={"black"}
        c={"white"}
        loading={loading}
        loaderProps={{ type: "dots" }}
      >
        {children}
      </Button>
    </Group>
  );
}

function FileInputField({ label, placeholder, filetype }) {
  const icon = <FiUpload size={18} />;

  return (
    <>
      <FileInput
        rightSection={icon}
        label={label}
        placeholder={placeholder}
        rightSectionPointerEvents="none"
        mt="md"
        accept={filetype}
      />
    </>
  );
}

function MutltiSelector({ data, label, placeholder, id }) {
  const form = usePopupForm();
  console.log(data, label, placeholder, id);
  return (
    <MultiSelect
      checkIconPosition="right"
      data={Array.isArray(data) ? data : []}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(id)}
    />
  );
}

function SingleSelector({ data, label, placeholder, id }) {
  const form = usePopupForm();

  return (
    <Select
      data={Array.isArray(data) ? data : []}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(id)}
    />
  );
}

//eslint ignore
export function usePopupForm() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupForm must be used within a PopupProvider");
  }
  return context;
}

Popup.Input = Input;
Popup.TextInputField = TextInputField;
Popup.FileInputField = FileInputField;
Popup.TextArea = TextArea;
Popup.MutltiSelector = MutltiSelector;
Popup.SingleSelector = SingleSelector;
Popup.SubmitButton = SubmitButton;

export default Popup;
