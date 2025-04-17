import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPost, apiUpdate, apiUpdatePut } from "./useApi";

export const useQueryHook = ({
  queryKey,
  endpoint,
  enabled = true,
  staleTime = 0 * 60 * 1000,
}) => {
  const { data, error, refetch, isLoading, isSuccess } = useQuery({
    queryKey: [queryKey], // ✅ Dynamic key
    queryFn: async () => {
      const response = await apiGet(endpoint);
      return response;
    },
    staleTime, // ✅ Custom stale time (default 5 mins)
    retry: false,
    enabled,
  });
  return { data, error, refetch, isLoading, isSuccess };
};

export const usePostMutation = (queryKey) => {
  const queryClient = useQueryClient();

  const { mutate, error, data, isPending, isSuccess } = useMutation({
    mutationFn: async ({ endpoint, payload }) => apiPost(endpoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]); // ✅ Auto-refetch after mutation
    },
    onError: (err) => {
      //console.log(err);
    },
  });
  return {
    mutate,
    error,
    isPending,
    isSuccess,
    data,
  };
};
export const useUpdateMutation = (queryKey) => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ endpoint, payload }) => apiUpdate(endpoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]); // ✅ Auto-refetch after mutation
    },
  });
  return { mutate, error, isPending, isSuccess };
};
export const useUpdateMutationPut = (queryKey) => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ endpoint, payload }) =>
      apiUpdatePut(endpoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]); // ✅ Auto-refetch after mutation
    },
  });
  return { mutate, error, isPending, isSuccess };
};

export const useDeleteMutation = (queryKey) => {
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: async ({ endpoint }) => apiDelete(endpoint),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]); // ✅ Auto-refetch after mutation
    },
  });
  return { mutate, error, isPending, isSuccess };
};
