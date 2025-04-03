import { TextInput, Button, Avatar } from "@mantine/core";
import { FaPencilAlt } from "react-icons/fa";
// import { useState } from "react";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useUpdateMutation } from "../services/reactQuery";
import axios from "axios";

export default function ProfileForm() {
  // Get user data from localStorage
  const data = JSON.parse(localStorage.getItem("data")) || {};
  const { name, email, phone, image } = data;

  // Initialize form with user data
  const form = useForm({
    initialValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      image: image || "",
    },
  });

  // Use the update mutation from react-query
  const { mutate: updateProfile, isPending } = useUpdateMutation("profile");

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      updateProfile(
        {
          endpoint: `/api/update-info`, // Adjust the endpoint
          payload: values,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully!");
            // Update localStorage with new data
            localStorage.setItem(
              "data",
              JSON.stringify({ ...data, ...values })
            );
          },
          onError: () => {
            toast.error("Failed to update profile.");
            //console.error("Error updating profile:", error);
          },
        }
      );
    } catch {
      toast.error("Failed to update profile.");
      //console.error("Error updating profile:", error);
    }
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // Cloudinary Upload Preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedUrl = response.data.secure_url;
      form.setFieldValue("image", uploadedUrl); // Update form field with image URL
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image.");
      //console.error("Error uploading file to Cloudinary:", error);
    }
  };

  return (
    <div className="text-white lg:p-6 flex flex-col lg:flex-row items-start justify-center  lg:gap-8 w-full">
      {/* Profile Picture */}
      <div className="relative w-32 h-32">
        <Avatar
          src={form.values.image || "profile.webp"}
          alt="Profile"
          size={110}
          radius="100%"
        />
        <div className="absolute bottom-6 right-2 lg:right-0 bg-black p-2 rounded-full cursor-pointer">
          <label htmlFor="image-upload" className="cursor-pointer">
            <FaPencilAlt size={14} className="text-white" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>
      </div>

      {/* Form Inputs */}
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="text-[18px] text-[#333B69]">Your Name</label>
            <TextInput
              {...form.getInputProps("name")}
              mt="xs"
              radius="md"
              styles={{
                input: {
                  borderColor: "#718EBF",
                  color: "#718EBF",
                },
              }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-[18px] text-[#333B69]">Your Email</label>
            <TextInput
              {...form.getInputProps("email")}
              mt="xs"
              readOnly
              radius="md"
              styles={{
                input: {
                  borderColor: "#718EBF",
                  color: "#718EBF",
                },
              }}
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="lg:w-1/2">
          <label className="text-[18px] text-[#333B69]">Your Phone</label>
          <TextInput
            {...form.getInputProps("phone")}
            mt="xs"
            radius="md"
            styles={{
              input: {
                borderColor: "#718EBF",
                color: "#718EBF",
              },
            }}
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <Button
            type="submit"
            color="black"
            radius="md"
            className="!w-[119px] !text-[18px] !font-[400]"
            loaderProps={{ type: "dots" }}
            loading={isPending}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
