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
  const notification =
    (role === "admin" || role === "barber") && !isFetechingNotification
      ? notify?.user?.emailNotificationsEnabled
      : notify?.emailNotificationsEnabled;

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
            position: "top-right",
          }),
        onError: () =>
          toast.error("Error Updated Setting", {
            position: "top-right",
          }),
      }
    );
  }

  if (isFetechingNotification)
    return (
      <div className="w-full grid place-content-center">
        <Loader type="bars" color={"black"} />
      </div>
    );
  // value={notify?.emailNotificationsEnabled}
  return (
    <Switch
      sx={{ cursor: "pointer" }}
      onChange={() => handleUpdateNotification(notification)}
      defaultChecked
      checked={notification}
      color="#34C759"
      label="Email Notification Preference"
      size="lg"
      disabled={isUpdatingNotification}
    />
  );
}
