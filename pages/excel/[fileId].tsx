import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";
import axios from "axios";
import DataTable from "@/components/DataTable";
import LoadingPopup from "@/components/LoadingPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  setExcelData,
  setExcelDataColumns,
  setTotalRecordsCount,
} from "@/store/reducers/excelSlice";
import { RootState } from "@/store/store";

const ExcelViewer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, columns, totalCount } = useSelector(
    (state: RootState) => state.excel
  );

  const { fileId, filterKey, filterValue, filterOperation } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchData = async (
    page: number,
    limit: number,
    updatePagination = false
  ) => {
    if (!fileId) return;
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/data",
        {},
        {
          params: {
            page,
            limit,
            userId: "guest",
            fileId,
            filterKey,
            filterValue,
            filterOperation,
          },
        }
      );

      if (updatePagination) {
        setPagination({ pageIndex: page, pageSize: limit });
      }

      dispatch(setExcelData(response.data.data));
      dispatch(setExcelDataColumns(response.data.columns));
      dispatch(
        setTotalRecordsCount(response.data.pagination.totalRecordsCount)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  useEffect(() => {
    fetchData(0, 10, true);
  }, [fileId, filterKey, filterValue, filterOperation]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {!isLoading && data.length > 0 && (
          <DataTable
            data={data}
            columns={columns}
            rowCount={totalCount}
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
