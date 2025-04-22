import { useParams } from "react-router-dom";

function SuccessPage() {
  const { id } = useParams() || {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-gray-200 text-center py-6">
          <h1 className="text-2xl font-bold text-teal-500">Thank You</h1>
          <p className="text-sm text-gray-700">user@gs.com</p>
          <p>{id}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
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
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">
            Successful Payment
          </h2>
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
