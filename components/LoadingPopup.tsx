import { CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';

export default function LoadingPopup({loadingText}: {loadingText?: string}) {
  return (
    <Dialog open={true}>
      <DialogContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 4 }}>
        <CircularProgress />
        <Typography>{loadingText}</Typography>
      </DialogContent>
    </Dialog>
  );
}
