"use client";
import { MaterialReactTable } from "material-react-table";
import { IDataTableProps } from "@/types/excel";


export default function DataTable({ data, columns }: IDataTableProps) {
  return <MaterialReactTable columns={columns} data={data} />;
}
