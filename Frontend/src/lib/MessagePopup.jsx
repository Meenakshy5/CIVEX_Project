import { Snackbar, Slide } from "@mui/material"; // Removed extra space
import { Alert } from "@mui/material"; // Updated to MUI v5 (use @mui/material instead of @material-ui/lab)


const MessagePopup = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
  return (
    <Snackbar open={props.open} onClose={handleClose} autoHideDuration={2000}>
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MessagePopup;
