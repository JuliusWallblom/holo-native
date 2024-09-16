import { AxiosClient } from "@/lib/axios-client"
import axios, { AxiosInstance } from "axios"
import "@testing-library/jest-dom"

jest.mock("axios")

const mockAxiosInstance = {
  request: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
}

describe("AxiosClient", () => {
  let axiosClient: AxiosClient
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    jest.resetAllMocks()
    jest.mocked(axios.create).mockReturnValue(mockAxiosInstance as unknown as AxiosInstance)
    axiosClient = new AxiosClient("/api/test/")

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  describe("constructor and interceptors", () => {
    it("should handle errors with no message in interceptor", () => {
      const interceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1]
      const errorWithoutMessage = new Error()
      errorWithoutMessage.message = "" // Explicitly set an empty message

      expect(() => interceptor(errorWithoutMessage)).rejects.toThrow("An unknown error occurred")
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it("should create an axios instance with correct config", () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: "/api/test/",
        timeout: expect.any(Number),
        headers: {
          "Content-Type": "application/json"
        }
      })
    })

    it("should pass through successful responses in interceptor", () => {
      const interceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][0]
      const mockResponse = { data: { success: true } }
      expect(interceptor(mockResponse)).toBe(mockResponse)
    })

    it("should setup response interceptor", () => {
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled()
    })

    it("should handle error with no response or request", () => {
      const interceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1]
      const error = new Error("Test error")
      expect(() => interceptor(error)).rejects.toThrow("Test error")
    })

    it("should handle different types of errors in interceptor", () => {
      const interceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1]

      // Test server error with message
      const serverError = {
        response: { status: 500, data: { message: "Server Error" } }
      }
      expect(() => interceptor(serverError)).rejects.toThrow("Server Error")

      // Test server error without message
      const serverErrorNoMessage = {
        response: { status: 404, data: "Not Found" }
      }
      expect(() => interceptor(serverErrorNoMessage)).rejects.toThrow("Not Found")

      // Test server error with no data
      const serverErrorNoData = { response: { status: 500 } }
      expect(() => interceptor(serverErrorNoData)).rejects.toThrow("Server error: 500")

      // Test network error
      const networkError = { request: {} }
      expect(() => interceptor(networkError)).rejects.toThrow("No response received from the server")

      // Test unknown error
      const unknownError = new Error("Unknown")
      expect(() => interceptor(unknownError)).rejects.toThrow("Unknown")
    })
  })

  describe("request methods", () => {
    it("should make a GET request", async () => {
      const mockResponse = { data: { key: 1, value: 2 } }
      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const result = await axiosClient.get("get?key=1&value=2")
      expect(result).toEqual({ key: 1, value: 2 })

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "get",
        url: "get?key=1&value=2"
      })
    })

    it("should make a POST request with default parameters", async () => {
      const mockResponse = { result: "success" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.post<{ result: string }>("test-url")

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "post",
        url: "test-url",
        data: {}
      })
    })

    it("should make a POST request with custom data and config", async () => {
      const mockData = { key: "value" }
      const mockConfig = { headers: { "Custom-Header": "Test" } }
      const mockResponse = { result: "success" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.post<{ result: string }>("test-url", mockData, mockConfig)

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "post",
        url: "test-url",
        data: mockData,
        headers: { "Custom-Header": "Test" }
      })
    })

    it("should make a PUT request with default parameters", async () => {
      const mockResponse = { result: "updated" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.put<{ result: string }>("test-url")

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "put",
        url: "test-url",
        data: {}
      })
    })

    it("should make a PUT request with custom data and config", async () => {
      const mockData = { key: "value" }
      const mockConfig = { headers: { "Custom-Header": "Test" } }
      const mockResponse = { result: "updated" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.put<{ result: string }>("test-url", mockData, mockConfig)

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "put",
        url: "test-url",
        data: mockData,
        headers: { "Custom-Header": "Test" }
      })
    })

    it("should make a DELETE request with default parameters", async () => {
      const mockResponse = { result: "deleted" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.delete<{ result: string }>("test-url")

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "delete",
        url: "test-url"
      })
    })

    it("should make a DELETE request with custom config", async () => {
      const mockConfig = { headers: { "Custom-Header": "Test" } }
      const mockResponse = { result: "deleted" }
      mockAxiosInstance.request.mockResolvedValue({ data: mockResponse })

      const result = await axiosClient.delete<{ result: string }>("test-url", mockConfig)

      expect(result).toEqual(mockResponse)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: "delete",
        url: "test-url",
        headers: { "Custom-Header": "Test" }
      })
    })

    it("should handle errors in request method", async () => {
      const networkError = new Error("Network Error")
      mockAxiosInstance.request.mockRejectedValue(networkError)

      await expect(axiosClient.get("get")).rejects.toThrow("Network Error")
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe("error handling", () => {
    it("should handle server errors", async () => {
      const errorResponse = {
        response: {
          status: 500,
          data: { message: "Internal Server Error" }
        }
      }
      mockAxiosInstance.request.mockRejectedValue(errorResponse)

      await expect(axiosClient.get("get")).rejects.toThrow()
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it("should handle network errors", async () => {
      const errorResponse = {
        request: {},
        message: "Network Error"
      }
      mockAxiosInstance.request.mockRejectedValue(errorResponse)

      await expect(axiosClient.get("get")).rejects.toThrow("Network Error")
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    it("should handle unknown errors", async () => {
      const errorResponse = new Error("Unknown error")
      mockAxiosInstance.request.mockRejectedValue(errorResponse)

      await expect(axiosClient.get("get")).rejects.toThrow("Unknown error")
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })
})
