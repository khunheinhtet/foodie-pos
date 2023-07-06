import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
interface Props {
  open: boolean;
  title: string;
  callback: () => void;
  setOpen: (value: boolean) => void;
}
const DeleteDialog = ({ open, title, callback, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography> This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={() => {
              callback();
              setOpen(false);
            }}
          >
            comfirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
