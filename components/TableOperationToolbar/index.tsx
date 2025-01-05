import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Button, Autocomplete, TextField } from "@mui/material";
import { OperationType } from "@/types/operations";
import OperationPreview from "../OperationPreview";
import { examplePreviews, predefinedOperationsOptions } from "./config";
import LoadingPopup from "../LoadingPopup";

const TableOperationsToolbar = () => {
  const router = useRouter();
  const { fileId, filterKey } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleProcessClick = () => {
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    await handleProcess();
    setOpenDialog(false);
  };

  const handleProcess = async () => {
    if (selectedOperation) {
      setLoading(true);
      const operation = predefinedOperationsOptions.find(
        (op) => op.value.id === selectedOperation
      );

      switch (operation?.value.operationName) {
        case "filterRows":
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              filterKey: operation.value.filterKey,
              filterValue: operation.value.filterValue,
              filterOperation: operation.value.filterOperation,
            },
          });
          break;

        case "columnSum":
          await axios.post(`/api/operations/${fileId}`, {
            userId: "guest",
            operationType: OperationType.ADD_COLUMN,
            params: operation.value,
          });
          router.push(`/excel/${fileId}`);
          break;

        case "combineColumns":
          await axios.post(`/api/operations/${fileId}`, {
            userId: "guest",
            operationType: OperationType.COMBINE_COLUMNS,
            params: operation.value,
          });
          router.push(`/excel/${fileId}`);
          break;
      }
      setLoading(false);
    }
  };

  const handleFilterReset = () => {
    router.push(`/excel/${fileId}`);
  };

  return (
    <>
      <Box
        sx={{
          py: 4,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Excel Viewer</h1>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {filterKey && (
            <Button
              variant="text"
              onClick={handleFilterReset}
              disabled={!filterKey}
              color="error"
            >
              Reset Filter
            </Button>
          )}
          <Autocomplete
            options={predefinedOperationsOptions}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} key={option.value.id}>
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Predefined Prompts"
                variant="outlined"
                sx={{ minWidth: 300 }}
              />
            )}
            onChange={(_, newValue) =>
              setSelectedOperation(newValue?.value.id || null)
            }
          />
          <Button
            variant="contained"
            onClick={handleProcessClick}
            disabled={!selectedOperation}
          >
            Process
          </Button>
        </Box>
      </Box>

      <OperationPreview
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleConfirm={handleConfirm}
        selectedOperation={selectedOperation}
        predefinedOperationsOptions={predefinedOperationsOptions}
        examplePreviews={examplePreviews}
      />
      {isLoading && <LoadingPopup loadingText="Processing prompt..." />}
    </>
  );
};

export default TableOperationsToolbar;
