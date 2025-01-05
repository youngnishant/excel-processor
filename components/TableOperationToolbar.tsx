import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Autocomplete, TextField } from "@mui/material";

const TableOperationsToolbar = () => {
  const router = useRouter();
  const [selectedOperation, setSelectedOperation] = useState<number | null>(
    null
  );

  const predefinedOperationsOptions = [
    {
      label: "Add Column: Total",
      value: {
        id: 1,
        operationName: "columnSum",
        operationType: "sum",
        columns: ["Price", "Tax"],
      },
    },
    {
      label: "Filter: Price > 127000",
      value: {
        id: 2,
        operationName: "filterRows",
        filterKey: "Price",
        filterValue: 127000,
        filterOperation: "gt",
      },
    },
    {
      label: "Filter rows where Tax > 32",
      value: {
        id: 3,
        operationName: "filterRows",
        filterKey: "Tax",
        filterValue: 32,
        filterOperation: "gt",
      },
    },
    {
      label: "Combine First and last name Columns into Full Name",
      value: {
        id: 4,
        operationName: "combineColumns",
        column1: "First Name",
        column2: "Last Name",
        newColumn: "Full Name",
      },
    },
  ];

  const handleProcess = async () => {
    if (selectedOperation) {
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
          await fetch("/api/operations/column", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(operation.value),
          });
          break;

        case "combineColumns":
          await fetch("/api/operations/combine", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(operation.value),
          });
          break;
      }
    }
  };

  return (
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
          onClick={handleProcess}
          disabled={!selectedOperation}
        >
          Process
        </Button>
      </Box>
    </Box>
  );
};

export default TableOperationsToolbar;
