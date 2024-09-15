import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
query GetAllCustomers {
  customers {
    id
    fullName
    email
  }
}
`