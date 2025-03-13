import { TextInput, Button, Avatar } from "@mantine/core";
import { FaPencilAlt } from "react-icons/fa";

export default function ProfileForm() {
  const { name, email } = JSON.parse(localStorage.getItem("data")) || {};
  console.log(name, email);
  return (
    <div className=" text-white p-6 flex flex-col lg:flex-row items-start justify-center gap-8 w-full ">
      {/* Profile Picture */}
      <div className="relative w-32 h-32">
        <Avatar
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          size={110}
          radius="100%"
        />
        <div className="absolute bottom-6  right-2 lg:right-0 bg-black p-2 rounded-full cursor-pointer ">
          <FaPencilAlt size={14} className="text-white" />
        </div>
      </div>

      {/* Form Inputs */}
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="text-[18px]  text-[#333B69]">Your Name</label>
            <TextInput
              defaultValue={name}
              mt="xs"
              radius="md"
              styles={{
                input: {
                  borderColor: "#718EBF", // Border color
                  color: "#718EBF", // Text color
                },
              }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-[18px]  text-[#333B69]">Your Email</label>
            <TextInput
              defaultValue={email}
              mt="xs"
              radius="md"
              styles={{
                input: {
                  borderColor: "#718EBF", // Border color
                  color: "#718EBF", // Text color
                },
              }}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="lg:w-1/2">
          <label className="text-[18px]  text-[#333B69]">Your Phone</label>
          <TextInput
            defaultValue="03365502772"
            mt="xs"
            radius="md"
            styles={{
              input: {
                borderColor: "#718EBF", // Border color
                color: "#718EBF", // Text color
              },
            }}
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <Button color="dark" radius="md">
            View List
          </Button>
        </div>
      </div>
    </div>
  );
}
