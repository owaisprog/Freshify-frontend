import { BackgroundImage, Container, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Failure() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/owner-plans"); // Redirect to login page after 10 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer
  });
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
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="bg-gray-200 text-center py-6">
              <h1 className="text-2xl font-bold text-black">Payment Failed</h1>
            </div>
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-800">
                Transaction Unsuccessful
              </h2>
            </div>
            <div className="bg-gray-200 text-center py-4 px-6">
              <p className="text-sm text-red-500">
                Your payment could not be processed at this time. Please try
                again or contact support if the issue persists.
              </p>
            </div>
          </div>
        </Container>
      </BackgroundImage>
    </main>
  );
}

export default Failure;
