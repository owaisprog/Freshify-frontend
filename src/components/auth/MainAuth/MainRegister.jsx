import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import freshifyImage from "../../../assets/freshifyImage.png";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { registerUser } from "../../../services/AuthServices";

export default function MainRegister() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      role: role,
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.trim().length > 2
          ? null
          : "Full Name must be at least 3 characters",
      phone: (value) =>
        /^\+?\d{10,15}$/.test(value) ? null : "Invalid phone number",
      password: (value) => {
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)
        ) {
          return "Password must be at least 8 characters and include:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character (!@#$%^&*)";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      //register
      const userData = await registerUser(values, role);
      // //console.log(userData);
      // //console.log(userData.newUser);
      // Simulate API call
      toast(userData.message, { position: "top-center" });
      setTimeout(() => {
        setLoading(false);
        navigate("/VerifyEmail", {
          state: { userEmail: values.email },
        });
      }, 1500);
    } catch (error) {
      toast(error, { position: "top-center" });
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col  lg:grid h-screen  mx-auto  lg:grid-cols-2 lg:gap-x-4  lg:gap-y-0    px-3 lg:px-0">
      {/* This image will be visible on large devices  */}
      <section className=" hidden rounded-tr-xl rounded-br-xl bg-[#040707] lg:flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* This image will be visible on Mobile devices  */}
      <section className=" lg:hidden h-[80px]    overflow-hidden bg-[#040707] flex items-center justify-center rounded-bl-xl rounded-br-xl">
        <div className="h-[80px] w-full sm:w-[60%]  ">
          <Image
            className="h-full w-full object-contain"
            src={freshifyImage}
            alt="Freshify Logo"
          />
        </div>
      </section>

      {/* Right Section - Form */}
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
            Signup
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            Already have an account?{" "}
            <Link
              to={`/Login?role=${role}`}
              className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              Login
            </Link>
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

          <div className="flex flex-col gap-[10px]">
            <span className=" !font-[400] !text-[18px] !text-[#000000]">
              Password
            </span>
            <PasswordInput
              radius={"md"}
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            fullWidth
            bg={"black"}
            c={"white"}
            radius={"md"}
            className="!text-[18px] !font-[400]"
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            Signup
          </Button>
        </form>
      </section>
    </main>
  );
}
