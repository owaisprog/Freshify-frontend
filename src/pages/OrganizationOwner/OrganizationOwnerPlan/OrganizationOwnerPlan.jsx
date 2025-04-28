import PlainsCard from "../../../components/PlainsCard";

function OrganizationOwnerPlan() {
  const plansData = [
    {
      price: 20,
      plainName: "freshify",
      description: "Description will provide here...",
    },
  ];
  return (
    <div className="min-h-screen w-screen   flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto   gap-6">
        {plansData?.map((val) => (
          <PlainsCard data={val} key={val?.plainName} />
        ))}
      </div>
    </div>
  );
}

export default OrganizationOwnerPlan;
