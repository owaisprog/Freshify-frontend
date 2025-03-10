import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";

export default function TimePicker({ label }) {
  const ref = useRef(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      {/* <CiClock2 /> */}
    </ActionIcon>
  );

  return <TimeInput label={label} ref={ref} rightSection={pickerControl} />;
}
