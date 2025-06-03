import { Loader, Switch } from "@mantine/core";
import { useQueryHook, useUpdateMutation } from "../services/reactQuery";
import { toast } from "react-toastify";

export function SwitchCom() {
  const { id, role } = JSON.parse(localStorage.getItem("data"));

  let endpoint =
    role === "admin" || role === "barber"
      ? `/api/users/${id}/email-preferences`
      : `/api/email-preferences`;

  const { data: notify, isLoading: isFetechingNotification } = useQueryHook({
    queryKey: "email-notification",
    endpoint,
    staleTime: 0 * 60 * 1000,
  });

  console.log(notify, "....notify");
  //
  const { mutate: updateLocation, isPending: isUpdatingNotification } =
    useUpdateMutation("email-notification");
  function handleUpdateNotification(currentState) {
    updateLocation(
      {
        endpoint,
        payload: { enabled: !currentState },
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

  if (isFetechingNotification) return <Loader type="bars" c={"black"} />;
  // value={notify?.emailNotificationsEnabled}
  return (
    <Switch
      onChange={() =>
        handleUpdateNotification(notify?.emailNotificationsEnabled)
      }
      defaultChecked
      checked={notify?.emailNotificationsEnabled}
      color="#34C759"
      label="Email Notification Preference"
      size="lg"
      disabled={isUpdatingNotification}
    />
  );
}
