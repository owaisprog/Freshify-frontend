import { Loader } from "@mantine/core";
import PlainsCard from "../../../components/PlainsCard";
import { useQueryHook } from "../../../services/reactQuery";

function OrganizationOwnerPlan() {
  const { data: planData, isLoading: isLoadingPlan } = useQueryHook({
    queryKey: ["plans"],
    endpoint: `/api/subscription-plans`,
    staleTime: 0 * 60 * 1000,
  });

  // Safely access the first plan or use empty object as fallback
  const plan = planData?.data?.[0] || {};
  //consoe.log(plan?.description, plan?.price, plan?.name);
  const plansData = [
    {
      price: plan?.price,
      plainName: plan?.name,
      description: plan?.description,
    },
  ];
  return (
    <div className="min-h-screen w-screen   flex items-center justify-center p-4">
      {isLoadingPlan ? (
        <Loader type="bars" size={"md"} />
      ) : (
        <div className="w-full max-w-md mx-auto   gap-6">
          {plansData?.map((val, index) => (
            <PlainsCard data={val} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrganizationOwnerPlan;
