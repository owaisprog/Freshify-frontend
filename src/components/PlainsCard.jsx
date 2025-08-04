import { Button } from "@mantine/core";
import { usePostMutation } from "../services/reactQuery";

function PlainsCard({ data }) {
  const { mutate: selectPlan, isPending } = usePostMutation("plan");
  function handleSubscribe(data) {
    //consoe.log(data);
    selectPlan(
      {
        endpoint: `/api/subscribe`,
        payload: { plan: data.plainName },
      },
      {
        onSuccess: (redirect) => {
          //consoe.log(redirect);
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
              {data?.plainName} Membership
            </h2>
            <p className="mt-2 text-sm text-gray-500">{data?.description}</p>
          </div>
          <div className="mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                &euro; {data?.price}
              </span>
              <span className="text-base font-medium text-gray-500">
                {" "}
                /month{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8 mt-auto">
        <Button
          onClick={() => handleSubscribe(data)}
          color="dark"
          loading={isPending}
          loaderProps={{ type: "bars" }}
          radius={"xl"}
          fullWidth
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default PlainsCard;
