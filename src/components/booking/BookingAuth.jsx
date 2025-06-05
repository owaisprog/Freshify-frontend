import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useBookingContext } from "./BookingContext";
import { toast } from "react-toastify";
import { usePostMutation } from "../../services/reactQuery";
import { useNavigate } from "react-router-dom";

export default function BookingAuth() {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBookingContext();

  const { mutate: checkUser, isPending } = usePostMutation(
    "check-user-authorize"
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      phone: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.trim().length > 2
          ? null
          : "Full Name must be at least 3 characters",
      phone: (value) =>
        /^\+?\d{10,15}$/.test(value) ? null : "Invalid phone number",
    },
  });

  const handleSubmit = async (values) => {
    checkUser(
      {
        endpoint: `/api/check-customer-exists`,
        payload: {
          email: values.email,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          if (!data?.exists) {
            localStorage.removeItem("data");
            localStorage.removeItem("token");
            updateBookingData({ userDetails: values, proceedToPay: true });
            toast.success("Proceed to Checkout", { position: "top-right" });
          } else {
            toast.success("Please Login First", { position: "top-right" });
            navigate("/Login?role=customer");
          }
        },
        onError: () =>
          toast.error("Error While Creating Payment", {
            position: "top-right",
          }),
      }
    );
  };

  return (
    <section className="h-full  flex items-center  justify-center">
      <form
        className="w-full flex flex-col max-w-[547px]  bg-[#FFFFFF] rounded-[25px] gap-[10px] p-[20px]"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        {/* Title & Login Link */}
        <Text
          ta={"center"}
          className="!text-[28px] !font-[400] lg:!text-[32px] lg:!font-[500]"
        >
          Enter Your Details
        </Text>
        {/* Input Fields */}
        <div className="flex flex-col gap-[10px]">
          <span className=" !font-[400] !text-[18px] !text-[#000000]">
            Email Address
          </span>
          <TextInput
            radius={"md"}
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className=" !font-[400] !text-[18px] !text-[#000000]">
            Full Name
          </span>
          <TextInput
            radius={"md"}
            placeholder="Enter your full name"
            {...form.getInputProps("name")}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className=" !font-[400] !text-[18px] !text-[#000000]">
            Phone Number
          </span>
          <TextInput
            radius={"md"}
            placeholder="Enter your phone number"
            {...form.getInputProps("phone")}
          />
        </div>
        {/* Confirm Booking Button */}
        {!bookingData.proceedToPay && (
          <Button
            type="submit"
            fullWidth
            bg={"black"}
            loading={isPending}
            disabled={bookingData.proceedToPay}
            c={"white"}
            radius={"md"}
            className="!text-[18px] !font-[400]"
            loaderProps={{ type: "dots" }}
          >
            Confirm Booking
          </Button>
        )}{" "}
      </form>
    </section>
  );
}
