import { MRT_ColumnDef } from "material-react-table";
import { IExcelRow } from "./excel";

export interface IExcelDataState {
  data: IExcelRow[];
  columns: MRT_ColumnDef<IExcelRow>[];
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}
