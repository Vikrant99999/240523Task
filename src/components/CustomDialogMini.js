import { Box, Container, Dialog, IconButton, Typography } from "@mui/material";
import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    textAlign: "right",
    background: "#124590",
    color: "white",
    // minHeight: "45px",
    position: "relative",
    height: "45px",
    alignItems: "center",
    borderRadius: "0px !important",
  },
  closeButton: {
    position: "absolute !important",
    right: theme.spacing(1),
    top: 0,
    color: "white !important",
    bottom: 0,
  },
  withoutHeading: {
    margin: 0,
    padding: theme.spacing(1),
    textAlign: "right",
    color: "white",
    minHeight: "44px",
  },
  closeButtonWithoutHeading: {
    position: "absolute !important",
    right: theme.spacing(1),
    top: "2px",
    color: "#000 !important",
  },
});

function PaperComponent(prop) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...prop} />
    </Draggable>
  );
}

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return children ? (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
      style={{ cursor: "move" }}
      id="draggable-dialog-title"
    >
      <Typography variant="h6" textAlign="center">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  ) : (
    <MuiDialogTitle
      disableTypography
      className={classes.withoutHeading}
      {...other}
      style={{ cursor: "move" }}
      id="draggable-dialog-title"
    >
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButtonWithoutHeading}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      width: "100%",
      borderRadius: 0,
      boxShadow: "none",
    },
  },
}));

export const CustomDialog = (props) => {
  const classes = useStyles();

  const { maxWidth, dialogTitle, handleClose, open, schedule } = props;
  return (
    <Dialog
      {...props}
      PaperComponent={PaperComponent}
      maxWidth={maxWidth}
      scroll="paper"
      className={classes.root}
      // onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Box style={{ textAlign: "left", fontSize: 16, lineHeight: "20px" }}>
          {dialogTitle}
        </Box>
      </DialogTitle>
      <DialogContent
        style={{
          maxHeight: "500px",
          // overflow: "hidden",
          overflow: "auto",
          scrollbarWidth: "none",
          visibility: "false",
          // visibility: "false",

          // backgroundColor: "red",
        }}
        dividers={true}
      >
        {props.children[0]}
      </DialogContent>
      <DialogActions>{props.children[1]}</DialogActions>
    </Dialog>
  );
};
