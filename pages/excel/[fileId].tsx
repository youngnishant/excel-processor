import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import axios from "axios";
import DataTable from "@/components/DataTable";
import { IExcelRow } from "@/types/excel";
import LoadingPopup from "@/components/LoadingPopup";

const ExcelViewer = () => {
  const router = useRouter();
  const { fileId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IExcelRow[]>([]);
  const [columns, setColumns] = useState<MRT_ColumnDef<IExcelRow>[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchPaginatedData = async () => {
    if (!fileId) return;
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getData", {
        params: {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          userId: "guest",
          fileId,
        },
      });

      setData(response.data.data);
      setColumns(response.data.columns);
      setTotalRows(response.data.pagination.totalRecords);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fileId) {
      fetchPaginatedData();
    }
  }, [pagination, fileId]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {data.length > 0 && (
          <DataTable
            data={data}
            columns={columns}
            rowCount={totalRows}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        )}
        {isLoading && <LoadingPopup loadingText="Loading Excel File..." />}
      </Box>
    </Container>
  );
};

export default ExcelViewer;
