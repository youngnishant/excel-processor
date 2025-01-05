import { IExcelRow } from "@/types/excel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PreviewTable from "./previewTable";

const OperationPreview = ({
  openDialog,
  setOpenDialog,
  handleConfirm,
  selectedOperation,
  predefinedOperationsOptions,
  examplePreviews,
}: any) => {
  const getTableData = (time: "before" | "after"): IExcelRow[] => {
    const opName = predefinedOperationsOptions.find(
      (op) => op.value.id === selectedOperation
    )?.value.operationName;
    if (opName && opName in examplePreviews) {
      const data =
        examplePreviews[opName as keyof typeof examplePreviews][time];
      return data as IExcelRow[];
    }

    return [];
  };

  const getTableLabel = () => {
    if (!selectedOperation) return;

    const opName = predefinedOperationsOptions.find(
      (op) => op.value.id === selectedOperation
    )?.label;
    if (opName) {
      return opName;
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Preview Changes</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          {getTableLabel()}
        </Typography>

        {selectedOperation && (
          <Box sx={{ mt: 2 }}>
            <PreviewTable data={getTableData("before")} title="Before" />
            <PreviewTable data={getTableData("after")} title="After" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default OperationPreview;
