import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertColor } from "@mui/material";

type FeedbackSnackbarProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
};

const FeedbackSnackbar = ({
  open,
  message,
  severity = "error",
  onClose,
}: FeedbackSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackSnackbar;

