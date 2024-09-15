import React from "react"
import { renderHook, act, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRESTQuery, useRESTMutation } from "./use-rest-api"
import { AxiosClient } from "@/lib/axios-client"

jest.mock("@/lib/axios-client")

type MockAxiosClient = {
  [K in keyof AxiosClient]: jest.Mock
}

const mockAxiosClient: MockAxiosClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe("useRESTQuery", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    queryClient.clear()
  })

  it("should make a GET request", async () => {
    const mockResponse = { data: { id: 1, name: "Test" } }
    mockAxiosClient.get.mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useRESTQuery(
          mockAxiosClient as unknown as AxiosClient,
          ["test"],
          "get",
          "/test"
        ),
      { wrapper }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockAxiosClient.get).toHaveBeenCalledWith("/test")
    expect(result.current.data).toEqual(mockResponse)
  })

  it("should handle errors", async () => {
    const mockError = new Error("API Error")
    mockAxiosClient.get.mockRejectedValue(mockError)

    const { result } = renderHook(
      () =>
        useRESTQuery(
          mockAxiosClient as unknown as AxiosClient,
          ["test"],
          "get",
          "/test"
        ),
      { wrapper }
    )

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockAxiosClient.get).toHaveBeenCalledWith("/test")
    expect(result.current.error).toEqual(mockError)
  })
})

describe("useRESTMutation", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    queryClient.clear()
  })

  it("should make a POST request", async () => {
    const mockResponse = { data: { id: 1, name: "Test" } }
    mockAxiosClient.post.mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useRESTMutation(
          mockAxiosClient as unknown as AxiosClient,
          "post",
          "/test"
        ),
      { wrapper }
    )

    await act(async () => {
      await result.current.mutateAsync({ name: "Test" })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockAxiosClient.post).toHaveBeenCalledWith("/test", { name: "Test" })
    expect(result.current.data).toEqual(mockResponse)
  })

  it("should make a PUT request", async () => {
    const mockResponse = { data: { id: 1, name: "Updated Test" } }
    mockAxiosClient.put.mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useRESTMutation(
          mockAxiosClient as unknown as AxiosClient,
          "put",
          "/test/1"
        ),
      { wrapper }
    )

    await act(async () => {
      await result.current.mutateAsync({ name: "Updated Test" })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockAxiosClient.put).toHaveBeenCalledWith("/test/1", {
      name: "Updated Test"
    })
    expect(result.current.data).toEqual(mockResponse)
  })

  it("should make a DELETE request", async () => {
    const mockResponse = { data: { success: true } }
    mockAxiosClient.delete.mockResolvedValue(mockResponse)

    const { result } = renderHook(
      () =>
        useRESTMutation(
          mockAxiosClient as unknown as AxiosClient,
          "delete",
          "/test/1"
        ),
      { wrapper }
    )

    await act(async () => {
      await result.current.mutateAsync({ id: 1 })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockAxiosClient.delete).toHaveBeenCalledWith("/test/1", {
      data: { id: 1 }
    })
    expect(result.current.data).toEqual(mockResponse)
  })

  it("should handle errors", async () => {
    const mockError = new Error("API Error")
    mockAxiosClient.post.mockRejectedValue(mockError)

    const { result } = renderHook(
      () =>
        useRESTMutation(
          mockAxiosClient as unknown as AxiosClient,
          "post",
          "/test"
        ),
      { wrapper }
    )

    await act(async () => {
      try {
        await result.current.mutateAsync({ name: "Test" })
      } catch (error) {
        // Error is expected
      }
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockAxiosClient.post).toHaveBeenCalledWith("/test", { name: "Test" })
    expect(result.current.error).toEqual(mockError)
  })
})
