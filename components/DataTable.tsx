"use client";
import { MaterialReactTable } from "material-react-table";
import { DataTableProps } from "@/types/excel";

export default function DataTable({
  data,
  columns,
  rowCount,
  pagination,
  onPaginationChange,
}: DataTableProps) {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePagination={true}
      manualPagination
      rowCount={rowCount}
      state={{ pagination }}
      onPaginationChange={onPaginationChange}
    />
  );
}
