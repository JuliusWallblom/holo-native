import { Table } from "@/components/core"
import { ColumnDef } from "@tanstack/react-table"
import { Customer } from "@/app/modules/customers/types"

export function CustomersTable() {
      const data: Customer[] = [
        {
            name: "hey"
        },
        {
            name: "hey2"
        },
        {
            name: "hey3"
        }
      ]
    
      const columns: ColumnDef<Customer>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => row.getValue<string>("name")
        }
      ]

    return (
        <Table data={data} columns={columns} />
    )
}