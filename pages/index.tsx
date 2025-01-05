import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, Box } from "@mui/material";
import FileUpload from "../components/FileUpload";
import LoadingPopup from "../components/LoadingPopup";

const Home = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (acceptedFiles: File[]) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("userId", "guest");

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push(`/excel/${response.data.fileId}`);
    } catch (error) {
      console.error("Error uploading file:", error);
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
};

export default Home;
