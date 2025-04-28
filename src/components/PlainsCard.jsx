import { usePostMutation } from "../services/reactQuery";

function PlainsCard({ data }) {
  const { mutate: selectPlan } = usePostMutation("plan");
  function handleSubscribe(data) {
    console.log(data);
    selectPlan(
      {
        endpoint: `/api/subscribe`,
        payload: { plan: data.plainName },
      },
      {
        onSuccess: (redirect) => {
          console.log(redirect);
          window.location.href = redirect.url;
        },
        onError: () => {},
      }
    );
    // /api/subscribe
  }
  return (
    <div className="flex flex-col bg-white rounded-3xl h-full">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg capitalize font-medium tracking-tighter text-gray-600 lg:text-3xl">
              {data?.plainName}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{data?.description}</p>
          </div>
          <div className="mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                ${data?.price}
              </span>
              <span className="text-base font-medium text-gray-500"> /mo </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8 mt-auto">
        <button
          onClick={() => handleSubscribe(data)}
          className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default PlainsCard;
