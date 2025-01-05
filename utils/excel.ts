import { IExcelRow } from "@/types/excel";
import * as XLSX from "xlsx";

const getData = (filepath: string): IExcelRow[] => {
  const workbook = XLSX.readFile(filepath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
};

const getColumns = (excelRow: IExcelRow) => {
  delete excelRow.rowNumber;

  return Object.keys(excelRow).map((key) => ({
    accessorKey: key,
    header: key,
  }));
};

export { getData, getColumns };
