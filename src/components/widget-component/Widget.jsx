import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useQueryHook } from "../../services/reactQuery";
import { toast } from "react-toastify";

export default function Widget() {
  const navigate = useNavigate();
  const { ownerId } = useParams();
  console.log(ownerId);
  const {
    data: owners = [],
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "organization",
    endpoint: `/api/get-organizationowner/${ownerId}`,
    staleTime: 15 * 60 * 1000,
  });
  const { _id, image, name, subscriptionStatus } = owners || {};
  console.log(owners);
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader type="bars" color="black" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load Organization Owners. Please try again later.
      </p>
    );
  }

  return (
    <div className="place-content-center max-h-screen min-h-screen flex justify-center items-center scale-[270%] overscroll-none  overscroll-y-none">
      {/* {owners?.map(({ _id, name, image }) => ( */}
      <div
        key={_id}
        className="flex flex-col min-[350px]:flex-row bg-white max-w-[600px] border border-[#e1e1e1] rounded-3xl overflow-hidden shadow-lg transition-transform duration-200"
      >
        {/* Image This image will display  */}
        <img
          src={
            image ||
            `https://www.bookitlive.net/content/wp-content/uploads/2021/03/How-does-booking-system-work.jpg`
          }
          alt={name}
          className="w-full min-[350px]:w-1/3 object-cover"
        />

        {/* Details */}
        <div className="flex flex-col justify-between p-6 sm:p-8 w-full min-[500px]:w-2/3 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
              {name}
            </h2>
            <p className="mt-2 text-sm text-gray-500">Organization owner</p>
          </div>

          <h2>Locations:</h2>
          <p>
            hdjshjhds jhsdjhsdjhsj sdkjskdjsd skjdskjdksjdksjdk jdskjdksjdksjdk
          </p>
          <button
            onClick={() => {
              if (subscriptionStatus === "paid") {
                navigate(`/booking`, { state: _id });
              } else {
                toast.warn("Please Subscribe", { position: "top-center" });
              }
            }}
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}
