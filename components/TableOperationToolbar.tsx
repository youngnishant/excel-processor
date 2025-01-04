import { useState } from "react";
import { Box, Button, Autocomplete, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MergeIcon from "@mui/icons-material/Merge";

const TableOperationsToolbar = () => {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null
  );

  const predefinedOperationsOptions = [
    {
      label: "Add Column: Total",
      operationName: "addColumn",
    },
    {
      label: "Filter: Price > 100",
      operationName: "filterRows",
    },
    {
      label: "Filter rows where Income > 5000",
      operationName: "filterRows",
    },
    {
      label: "Combine First and last name Columns",
      operationName: "combineFirstnameAndLastnameColumns",
    },
  ];

  const handleProcess = () => {
    if (selectedOperation) {
      console.log("Processing operation:", selectedOperation);
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
          renderOption={(props, option) => <li {...props}>{option.label}</li>}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Predefined Prompts"
              variant="outlined"
              sx={{ minWidth: 300 }}
            />
          )}
          onChange={(_, newValue) =>
            setSelectedOperation(newValue?.operationName || null)
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
