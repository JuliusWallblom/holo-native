import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

jest.mock("@apollo/client")
jest.mock("@/constants", () => ({
  APOLLO_CLIENT_ENDPOINT: "https://test-graphql-endpoint.com/graphql"
}))

describe("Apollo Client", () => {
  let apolloClient: ApolloClient<InMemoryCache>

  beforeEach(() => {
    jest.clearAllMocks()
    jest.isolateModules(() => {
      apolloClient = jest.requireActual("./apollo-client").apolloClient
    })
  })

  it("should create an Apollo Client instance", () => {
    expect(apolloClient).toBeInstanceOf(ApolloClient)
  })

  it("should create a httpLink with the correct URI when APOLLO_CLIENT_ENDPOINT is defined", () => {
    expect(createHttpLink).toHaveBeenCalledWith({
      uri: "https://test-graphql-endpoint.com/graphql"
    })
  })

  it("should use InMemoryCache", () => {
    expect(InMemoryCache).toHaveBeenCalled()
  })

  it("should use the created httpLink and InMemoryCache", () => {
    const mockHttpLink = {}
    const mockCache = {}
    ;(createHttpLink as jest.Mock).mockReturnValue(mockHttpLink)
    ;(InMemoryCache as jest.Mock).mockReturnValue(mockCache)

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { apolloClient: freshClient } =
        jest.requireActual("./apollo-client")
      expect(ApolloClient).toHaveBeenCalledWith({
        link: mockHttpLink,
        cache: mockCache
      })
    })
  })

  it("should create a httpLink with fallback URI when APOLLO_CLIENT_ENDPOINT is null", () => {
    jest.mock("@/constants", () => ({
      APOLLO_CLIENT_ENDPOINT: null
    }))

    const mockCreateHttpLink = jest.fn().mockReturnValue({})
    const mockInMemoryCache = jest.fn().mockReturnValue({})
    const mockApolloClient = jest.fn()

    ;(createHttpLink as jest.Mock).mockImplementation(mockCreateHttpLink)
    ;(InMemoryCache as jest.Mock).mockImplementation(mockInMemoryCache)
    ;(ApolloClient as jest.Mock).mockImplementation(mockApolloClient)

    jest.isolateModules(() => {
      jest.requireActual("./apollo-client")
    })

    expect(mockCreateHttpLink).toHaveBeenCalledWith({
      uri: "/graphql"
    })

    expect(mockApolloClient).toHaveBeenCalledWith(
      expect.objectContaining({
        link: expect.anything(),
        cache: expect.any(Object)
      })
    )
  })
})
