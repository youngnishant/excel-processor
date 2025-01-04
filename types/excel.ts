import { MRT_ColumnDef } from "material-react-table";

export interface IExcelRow {
  [key: string]: string | number | null;
}

export interface IDataTableProps {
  data: IExcelRow[];
  columns: MRT_ColumnDef<IExcelRow>[];
}
