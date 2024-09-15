import { Customer } from "@/app/modules/customers/types"
import { Table } from "@/components/core"
import { useQuery } from "@apollo/client"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { Text } from "react-native"
import { GET_CUSTOMERS } from "@/app/modules/customers/graphql/queries"

export function CustomersTable() {
  const { loading, error, data } = useQuery<{ customers: Customer[] }>(GET_CUSTOMERS)

  const columns: ColumnDef<Customer>[] = useMemo(() => [
    {
      accessorKey: "fullName",
      header: () => <Text>Full Name</Text>,
      cell: ({ row }) => <Text>{row.getValue<string>("fullName")}</Text>
    }
  ], [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <Table data={data?.customers || []} columns={columns} />
  )
}