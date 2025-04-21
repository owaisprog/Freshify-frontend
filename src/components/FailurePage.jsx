import { useParams } from "react-router-dom";

function Failure() {
  const { id } = useParams() || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-gray-200 text-center py-6">
          <h1 className="text-2xl font-bold text-red-500">Payment Failed</h1>
          <p>{id}</p>
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
            Your payment could not be processed at this time. Please try again
            or contact support if the issue persists.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Failure;
