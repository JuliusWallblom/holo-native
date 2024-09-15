import { APOLLO_CLIENT_ENDPOINT } from "@/constants"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const link = createHttpLink({
  uri: APOLLO_CLIENT_ENDPOINT ?? "/graphql",
})

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
