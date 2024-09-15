import { TableProps } from '@/components/core/table/types';
import {
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable
} from '@tanstack/react-table';
import { FlatList, Text, View } from 'react-native';

export function Table<T extends object>({ data, columns }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderRow = ({ item }: { item: Row<T> }) => (
    <View style={{ flexDirection: 'row' }}>
      {item.getVisibleCells().map((cell) => (
        <View key={cell.id} style={{ flex: 1, padding: 10 }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </View>
      ))}
    </View>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
        {table.getFlatHeaders().map((header) => (
          <View key={header.id} style={{ flex: 1, padding: 10 }}>
            <Text>{header.column.columnDef.header as string}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={table.getRowModel().rows}
        renderItem={renderRow}
      />
    </View>
  );
}