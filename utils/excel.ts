import { IExcelRow } from "@/types/excel";
import * as XLSX from "xlsx";

const getData = (filepath: string): IExcelRow[] => {
  const workbook = XLSX.readFile(filepath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
};

const getColumns = (excelRow: IExcelRow) => {
  return Object.keys(excelRow).map((key) => ({
    accessorKey: key,
    header: key,
  }));
};

const getParsedExcelData = (filepath: string) => {
  const data: IExcelRow[] = getData(filepath);
  const columns = getColumns(data[0]);

  return { data, columns };
};

export { getParsedExcelData };
