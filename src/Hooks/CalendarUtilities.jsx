import { useRef } from "react";
import { TimeInput } from "@mantine/dates";
import { ActionIcon } from "@mantine/core";
import { CiClock2 } from "react-icons/ci";

export function Demo() {
  const inputRef = useRef(null);

  const openDropdown = () => {
    if (!inputRef.current) return;

    // Focus first…
    inputRef.current.focus();

    // …then send an ArrowUp key‑down – Mantine treats this as
    // “open list and move to previous option”.
    const e = new KeyboardEvent("keydown", { key: "ArrowUp" });
    inputRef.current.dispatchEvent(e);
  };

  return (
    <TimeInput
      ref={inputRef}
      label="30‑minute intervals"
      step={30} /* 00, 30, 00, 30 … */
      rightSection={
        <ActionIcon variant="subtle" color="gray" onClick={openDropdown}>
          <CiClock2 size={18} />
        </ActionIcon>
      }
    />
  );
}
