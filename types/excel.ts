import { MRT_ColumnDef } from "material-react-table";
import { Dispatch, SetStateAction } from "react";

export interface IExcelRow {
  [key: string]: string | number | null;
}

export interface IDataTableProps {
  data: IExcelRow[];
  columns: MRT_ColumnDef<IExcelRow>[];
  rowCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

export interface IPagination {
  pageIndex: number;
  pageSize: number;
}
