import PlainsCard from "../../../components/PlainsCard";

function OrganizationOwnerPlan() {
  const plansData = [
    { price: 20, plainName: "pro", description: "asdlkjsadlkj" },
    { price: 30, plainName: "premium", description: "213" },
    { price: 10, plainName: "starter", description: "asdsad" },
  ];
  return (
    <div className="min-h-screen w-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plansData?.map((val) => (
          <PlainsCard data={val} key={val?.plainName} />
        ))}
      </div>
    </div>
  );
}

export default OrganizationOwnerPlan;
