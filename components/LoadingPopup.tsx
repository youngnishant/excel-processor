import {
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

const LoadingPopup = ({ loadingText }: { loadingText?: string }) => {
  return (
    <Dialog open={true}>
      <DialogContent
        sx={{ display: "flex", alignItems: "center", gap: 2, p: 4 }}
      >
        <CircularProgress />
        <Typography>{loadingText}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingPopup;
