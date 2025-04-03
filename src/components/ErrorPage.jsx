import { BackgroundImage, Button, Overlay, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function ErrorPage({
  errorCode = "404",
  title = "Page Not Found",
  message = "Sorry, we couldn’t find the page you’re looking for.",
}) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(-1);
  };

  return (
    <main className="h-screen w-full">
      <BackgroundImage
        src="/src/assets/freshifyImage.png"
        className="h-full w-full"
        radius="xs"
      >
        {/* Overlay with lower z-index */}
        <Overlay
          color="#000"
          backgroundOpacity={0.7}
          blur={15}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1, // Lower than text container
          }}
        />

        {/* Text content with higher z-index */}
        <Container
          style={{ zIndex: 2 }} // Higher than overlay
          className="h-full flex flex-col justify-center items-center text-center relative"
          size="xl"
        >
          <p className="text-9xl font-bold text-white mb-4">{errorCode}</p>
          <h1 className="text-4xl font-semibold text-white mb-6">{title}</h1>
          <p className="text-xl text-white mb-8 max-w-2xl px-4">{message}</p>
          <Button
            leftSection={<GoArrowLeft stroke={2} size={20} color="black" />}
            variant="white"
            size="md"
            className="mt-4"
            c={"dark"}
            onClick={navigateHome}
          >
            Go Back Home
          </Button>
        </Container>
      </BackgroundImage>
    </main>
  );
}
