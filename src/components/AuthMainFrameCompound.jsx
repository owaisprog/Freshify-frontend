// import freshifyImage from "../../assets/freshifyImage.png";
// import {
//   Image,
//   Paper,
//   Box,
//   Text,
//   Button,
//   Stack,
//   TextInput,
//   PinInput,
// } from "@mantine/core";

// // Main Frame
// function AuthMainFrameCompound({ children, handleSubmit, form }) {
//   return (
//     <main className="grid h-[100dvh] max-w-[1440px] grid-cols-2 bg-[#F5F7FA] py-1">
//       {/* Left Image Section */}
//       <section className="rounded-tr-xl rounded-br-xl bg-black flex items-center justify-center">
//         <Image
//           radius="md"
//           height={"full"}
//           src={freshifyImage}
//           fallbackSrc="https://placehold.co/600x400?text=Placeholder"
//         />
//       </section>

//       {/* Right Form Section */}
//       <section className="flex items-center justify-center">
//         <form onSubmit={form?.onSubmit(handleSubmit)}>
//           <Paper
//             bg={"white"}
//             shadow="md"
//             className="h-[400px] flex flex-col gap-10 p-8 w-[595px]"
//             radius={"md"}
//           >
//             {children}
//           </Paper>
//         </form>
//       </section>
//     </main>
//   );
// }

// // Heading Box with Flexible Link
// function HeadingBox({ heading, text, linkText, link }) {
//   return (
//     <Box>
//       <Text size="30px" fw={600} c={"black"} ta={"center"}>
//         {heading}
//       </Text>
//       {text && (
//         <Text c="dimmed" size="sm" ta="center" mt={15}>
//           {text}
//           {link && linkText && (
//             <a
//               href={link}
//               className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
//             >
//               {linkText}
//             </a>
//           )}
//         </Text>
//       )}
//     </Box>
//   );
// }

// // Button Box with `onClick` Prop
// function ButtonBox({ text, linkText, link, loading, hideText, onClick }) {
//   return (
//     <Box>
//       <Button
//         fullWidth
//         type="submit"
//         bg={"black"}
//         c={"white"}
//         loading={loading}
//         loaderProps={{ type: "dots" }}
//         onClick={onClick} // ✅ Now supports onClick
//       >
//         {text}
//       </Button>

//       {!hideText && link && linkText && (
//         <Text c="dimmed" size="xs" ta="right" mt={15}>
//           <a
//             href={link}
//             className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
//           >
//             {linkText}
//           </a>
//         </Text>
//       )}
//     </Box>
//   );
// }

// // Stack Component
// function MainStack({ children }) {
//   return (
//     <Stack
//       bg="var(--mantine-color-body)"
//       align="stretch"
//       justify="center"
//       gap="xs"
//     >
//       {children}
//     </Stack>
//   );
// }

// // Text Field Component (Integrated with Form)
// function TextField({ placeholder, label, name, form }) {
//   return (
//     <TextInput
//       radius={"md"}
//       label={label}
//       placeholder={placeholder}
//       {...form.getInputProps(name)}
//     />
//   );
// }

// // PIN Input Field
// function PinField({ setPin, pin }) {
//   return (
//     <div className="flex items-center justify-center">
//       <PinInput
//         autoFocus
//         size="lg"
//         placeholder="-"
//         type="number"
//         length={4}
//         value={pin}
//         onChange={setPin}
//       />
//     </div>
//   );
// }

// // Attaching to MainStack for Easier Usage
// MainStack.TextField = TextField;
// MainStack.PinField = PinField;

// AuthMainFrameCompound.HeadingBox = HeadingBox;
// AuthMainFrameCompound.ButtonBox = ButtonBox;
// AuthMainFrameCompound.MainStack = MainStack;

// export default AuthMainFrameCompound;
import freshifyImage from "../../assets/freshifyImage.png";
import {
  Image,
  Paper,
  Box,
  Text,
  Button,
  Stack,
  TextInput,
  PinInput,
} from "@mantine/core";

// Main Frame
function AuthMainFrameCompound({ children, handleSubmit, form }) {
  return (
    <main className="grid h-[100dvh] max-w-[1440px] grid-cols-2 bg-[#F5F7FA] py-1">
      {/* Left Image Section */}
      <section className="rounded-tr-xl rounded-br-xl bg-black flex items-center justify-center">
        <Image
          radius="md"
          height={"full"}
          src={freshifyImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </section>

      {/* Right Form Section */}
      <section className="flex items-center justify-center">
        <form onSubmit={form?.onSubmit(handleSubmit)}>
          <Paper
            bg={"white"}
            shadow="md"
            radius="md"
            className="h-[400px] w-[595px] p-8 flex flex-col gap-10"
          >
            {/* ✅ Wrapped children inside a div for proper flex behavior */}
            <div className="flex flex-col gap-10">{children}</div>
          </Paper>
        </form>
      </section>
    </main>
  );
}

// Heading Box with Flexible Link
function HeadingBox({ heading, text, linkText, link }) {
  return (
    <Box>
      <Text size="30px" fw={600} c={"black"} ta={"center"}>
        {heading}
      </Text>
      {text && (
        <Text c="dimmed" size="sm" ta="center" mt={15}>
          {text}
          {link && linkText && (
            <a
              href={link}
              className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
            >
              {linkText}
            </a>
          )}
        </Text>
      )}
    </Box>
  );
}

// Button Box with `onClick` Prop
function ButtonBox({ text, linkText, link, loading, hideText, onClick }) {
  return (
    <Box>
      <Button
        fullWidth
        type="submit"
        bg={"black"}
        c={"white"}
        radius={"md"}
        loading={loading}
        loaderProps={{ type: "dots" }}
        onClick={onClick} // ✅ Now supports onClick
      >
        {text}
      </Button>

      {!hideText && link && linkText && (
        <Text c="dimmed" size="xs" ta="right" mt={15}>
          <a
            href={link}
            className="text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-300"
          >
            {linkText}
          </a>
        </Text>
      )}
    </Box>
  );
}

// Stack Component
function MainStack({ children }) {
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="xs"
    >
      {children}
    </Stack>
  );
}

// Text Field Component (Integrated with Form)
function TextField({ placeholder, label, name, form }) {
  return (
    <TextInput
      radius={"md"}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(name)}
    />
  );
}

// PIN Input Field
function PinField({ setPin, pin }) {
  return (
    <div className="flex items-center justify-center">
      <PinInput
        autoFocus
        size="lg"
        placeholder="-"
        type="number"
        length={4}
        value={pin}
        onChange={setPin}
      />
    </div>
  );
}

// Attaching to MainStack for Easier Usage
MainStack.TextField = TextField;
MainStack.PinField = PinField;

AuthMainFrameCompound.HeadingBox = HeadingBox;
AuthMainFrameCompound.ButtonBox = ButtonBox;
AuthMainFrameCompound.MainStack = MainStack;

export default AuthMainFrameCompound;
