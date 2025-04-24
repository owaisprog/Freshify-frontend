import { useSearchParams } from "react-router-dom";
import { useQueryHook } from "../services/reactQuery";
import { Loader } from "@mantine/core";
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
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate(navigateURL); // Redirect to login page after 10 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSuccess, navigateURL, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-gray-200 text-center py-6">
          <h1 className="text-2xl font-bold text-teal-500">Thank You</h1>
          <p className="text-sm text-gray-700">user@gs.com</p>
          <p></p>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
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
        <div className="bg-gray-200 text-center py-4 px-6">
          <p className="text-sm text-teal-500">
            You have been successfully charged for this transaction. A receipt
            for this purchase has been sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
