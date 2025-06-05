import { Button, NumberInput, Loader, Title } from "@mantine/core";
import {
  useQueryHook,
  useUpdateMutationPut,
} from "../../../../services/reactQuery";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { useEffect } from "react"; // Import useEffect

function SuperAdminPlan() {
  const { data: planData, isLoading: isLoadingPlan } = useQueryHook({
    queryKey: ["plans"],
    endpoint: `/api/subscription-plans`,
    staleTime: 0 * 60 * 1000,
  });

  // Safely access the first plan or use empty object as fallback
  const plan = planData?.data?.[0] || {};

  const { mutate: updatePrice, isPending: isLoadingUpdate } =
    useUpdateMutationPut(["plans"]);

  const form = useForm({
    initialValues: {
      price: 0, // Initialize with 0 or any default value
    },
  });

  // Update form values when plan data loads
  useEffect(() => {
    if (plan?.price !== undefined) {
      form.setFieldValue("price", plan.price);
    }
  }, [plan?.price]); // Run this effect whenever plan.price changes

  const handleSubmit = (values) => {
    if (!plan._id) {
      toast.error("Plan ID is missing", { position: "top-right" });
      return;
    }

    updatePrice(
      {
        endpoint: `/api/subscription-plans/${plan._id}`,
        payload: values,
      },
      {
        onSuccess: () => {
          toast.success("Price updated successfully", {
            position: "top-right",
          });
        },
        onError: () => {
          toast.error("Failed to update price", { position: "top-right" });
        },
      }
    );
  };

  return (
    <main className="pt-20 grid grid-cols-1   lg:pt-0 lg:gap-6  p-6 lg:p-0">
      <Title
        mb={"lg"}
        c={"black"}
        className="lg:!px-6 !hidden lg:!block   lg:bg-[#FFFFFF] lg:!text-[32px] !text-[24px] !font-[500] py-[18px] !rounded-[16px]"
      >
        Plans
      </Title>

      {isLoadingPlan ? (
        <section className="flex max-w-[1440px] mx-auto items-center justify-center ">
          <Loader size="md" color="dark" type="bars" />
        </section>
      ) : (
        <section className="grid max-w-[1440px] mx-auto w-full grid-cols-1 gap-y-5 mt-6 lg:mt-0">
          <div className="flex max-w-md mx-auto w-full flex-col bg-white rounded-3xl h-full">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                  <div>
                    <h2 className="text-lg capitalize font-medium tracking-tighter text-black lg:text-3xl">
                      {plan?.plainName || "Plan"} Membership
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {plan?.description || "No description available"}
                    </p>
                  </div>
                  <div className="mt-6">
                    <NumberInput
                      label="Price"
                      placeholder="Enter new price"
                      min={0}
                      precision={2}
                      {...form.getInputProps("price")}
                      mb="md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex px-6 pb-8 sm:px-8 mt-auto">
                <Button
                  loading={isLoadingUpdate}
                  loaderProps={{ type: "bars" }}
                  type="submit"
                  color="#040707"
                  radius="md"
                  fullWidth
                  disabled={!plan._id}
                >
                  Update Price
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

export default SuperAdminPlan;
