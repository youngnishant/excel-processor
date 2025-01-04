import { IExcelRow } from "@/types/excel";
import * as XLSX from "xlsx";

const getData = (
  excelBinaryData: string | ArrayBuffer | null | undefined
): IExcelRow[] => {
  const workbook = XLSX.read(excelBinaryData, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
};

const getColumns = (excelRow: IExcelRow) => {
  return Object.keys(excelRow).map((key) => ({
    accessorKey: key,
    header: key,
  }));
};

const getParsedExcelData = (
  excelBinaryData: string | ArrayBuffer | null | undefined
) => {
  const data: IExcelRow[] = getData(excelBinaryData);
  const columns = getColumns(data[0]);

  return { data, columns };
};

export { getParsedExcelData };
