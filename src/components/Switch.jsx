import { Switch } from "@mantine/core";
import { useQueryHook, useUpdateMutation } from "../services/reactQuery";
import { toast } from "react-toastify";

export function SwitchCom() {
  const { id } = JSON.parse(localStorage.getItem("data"));
  // /users
  const { data: notify, isLoading: isFetechingNotification } = useQueryHook({
    queryKey: "email-notification",
    endpoint: `/api/users/${id}/email-preferences`,
    staleTime: 0 * 60 * 1000,
  });

  console.log(notify, "....notify");
  //
  const { mutate: updateLocation } = useUpdateMutation("email-notification");
  function handleUpdateNotification() {
    updateLocation(
      {
        endpoint: `/api/users/${{}}/email-preferences`,
        payload: [],
      },
      {
        onSuccess: () =>
          toast.success("Notifications Setting Successfully", {
            position: "top-center",
          }),
        onError: () =>
          toast.error("Error Updated Setting", {
            position: "top-center",
          }),
      }
    );
  }

  return (
    <Switch
      defaultChecked
      color="#34C759"
      label="Email Notification Preference"
      size="lg"
    />
  );
}
