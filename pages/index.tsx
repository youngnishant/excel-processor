"use client";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import FileUpload from "../components/FileUpload";
import DataTable from "../components/DataTable";
import { IExcelRow } from "@/types/excel";

export default function Home() {
  const [data, setData] = useState<IExcelRow[]>([]);
  const [columns, setColumns] = useState<MRT_ColumnDef<IExcelRow>[]>([]);

  const handleFileUpload = ({
    data: uploadedData,
    columns: cols,
  }: {
    data: IExcelRow[];
    columns: MRT_ColumnDef<IExcelRow>[];
  }) => {
    setData(uploadedData);
    setColumns(cols);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <h1 className="text-2xl font-bold mb-4">Excel Processor</h1>
        <FileUpload onUpload={handleFileUpload} />

        {data.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <DataTable data={data} columns={columns} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
