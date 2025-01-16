import apiClient from "@/config/axios/client.instance";
import { client_url } from "@/config/urls";
import { UserResponse } from "@/types/auth/user";
import { useQuery } from "@tanstack/react-query";

export const authApi = {
  retrieveUser: () => apiClient.get<UserResponse>(client_url.me),
};
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authApi.retrieveUser().then((res) => res.data),
    retry: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
