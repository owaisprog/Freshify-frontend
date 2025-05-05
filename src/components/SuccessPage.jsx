import { useSearchParams } from "react-router-dom";
import { useQueryHook } from "../services/reactQuery";
import { BackgroundImage, Container, Loader, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage({ id, key, endpoint, navigateURL }) {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get(id);
  const navigate = useNavigate();

  const { data: success, isSuccess } = useQueryHook({
    queryKey: key,
    endpoint: `${endpoint}=${sessionId}`,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  useEffect(() => {
    const paid = "paid";
    if (navigateURL === "/OrganizationOwnerDashboard") {
      localStorage.setItem("subscriptionStatus", JSON.stringify(paid));
    }

    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate(navigateURL); // Redirect to login page after 10 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSuccess, navigateURL, navigate]);

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
              <h1 className="text-2xl font-bold text-black">Thank You</h1>
            </div>

            <div className="flex flex-col  items-center justify-center py-10">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                {isSuccess ? (
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
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <Loader color="white" type="bars" />
                )}
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-800">
                Successful Payment
              </h2>
              {isSuccess && (
                <p className="text-sm text-gray-500 mt-2">
                  You will be redirected to login in 10 seconds...
                </p>
              )}
            </div>

            <div className="bg-gray-200 text-center py-6">
              <p className="text-sm text-black">
                You have been successfully charged for this transaction.
              </p>
            </div>
          </div>
        </Container>
      </BackgroundImage>
    </main>
  );
}

export default SuccessPage;
