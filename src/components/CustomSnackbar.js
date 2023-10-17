import Snackbar from "@mui/material/Snackbar";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomSnackbar = (props) => {
  console.log("props", props);
  const { snackbarFlag, msz, type, setSnakeBarProps, details, onClosed } =
    props;
  const [open, setOpen] = React.useState(snackbarFlag);

  const handleClose = (event, reason) => {
    setSnakeBarProps && setSnakeBarProps({});
    if (reason === "clickaway") {
      return;
    }
    if (onClosed) {
      onClosed();
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      // autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Typography>{msz}</Typography>
        {details?.map((value) => (
          <Typography style={{ fontSize: "15px" }}>{value}</Typography>
        ))}
      </Alert>
    </Snackbar>
  );
};
