"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import FileUpload from "../components/FileUpload";
import LoadingPopup from "../components/LoadingPopup";
import { IExcelRow } from "@/types/excel";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async ({
    data: uploadedData,
    columns: cols,
  }: {
    data: IExcelRow[];
    columns: MRT_ColumnDef<IExcelRow>[];
  }) => {
    setIsUploading(true);
    try {
      const response = await axios.post("/api/upload", {
        userId: "guest",
        data: uploadedData,
        columns: cols,
      });

      router.push(`/excel/${response.data.fileId}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <h1 className="text-2xl font-bold mb-4">Excel Processor</h1>
        <FileUpload onUpload={handleFileUpload} />
        {isUploading && <LoadingPopup loadingText="Uploading Excel File..." />}
      </Box>
    </Container>
  );
}
