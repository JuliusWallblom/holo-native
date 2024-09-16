import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query"
import { AxiosClient } from "@/lib/axios-client"
import { AxiosRequestConfig } from "axios"
import { RESTResponse, RESTError } from "@/types"

export function useRESTQuery<T>(axiosClient: AxiosClient, key: string[], method: "get" | "post" | "put" | "delete", url: string, config?: UseQueryOptions<RESTResponse<T>, RESTError>) {
  return useQuery<RESTResponse<T>, RESTError>({
    queryKey: key,
    queryFn: () => axiosClient[method]<RESTResponse<T>>(url),
    ...config
  })
}

export function useRESTMutation<T, TVariables>(axiosClient: AxiosClient, method: "post" | "put" | "delete", url: string, config?: UseMutationOptions<RESTResponse<T>, RESTError, TVariables>) {
  return useMutation<RESTResponse<T>, RESTError, TVariables>({
    mutationFn: (variables) => {
      if (method === "delete") {
        return axiosClient[method]<RESTResponse<T>>(url, {
          data: variables
        } as AxiosRequestConfig)
      } else {
        return axiosClient[method]<RESTResponse<T>>(url, variables)
      }
    },
    ...config
  })
}
