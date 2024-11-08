// Import libraries
import { Alert, Snackbar } from "@mui/material";

// Import redux
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearToast } from "@/redux/toast/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();

  const { message, show, type } = useAppSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(clearToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={show}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
