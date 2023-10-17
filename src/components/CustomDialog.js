import { Box, Grid, Dialog, IconButton, Typography } from "@mui/material";
import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import ProgressLoader from "../pages/layout/Loader";
import { CustomButton } from "../components/Button";

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
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "20px",
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

const DialogActions = withStyles(styles)((props) => {
  const { onSave, onCancel, isSaving, classes } = props;
  return (
    <Grid className={classes.selectButton}>
      <Box style={{ marginTop: "15px", marginRight: 10 }}>
        <ProgressLoader isSaving={isSaving} size={20} />
      </Box>
      {onSave && (
        <CustomButton
          btnText="Save"
          btnClass={{
            backgroundColor: "#124590",
            color: "#fff",
            margin: "10px 3px",
          }}
          onClick={onSave}
        />
      )}
      {onCancel && (
        <CustomButton
          btnText="Cancel"
          btnClass={{
            backgroundColor: "#124590",
            color: "#fff",
            margin: "10px 3px",
          }}
          onClick={onCancel}
        />
      )}
    </Grid>
  );
});

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

  const {
    fullScreen,
    maxWidth,
    dialogTitle,
    handleClose,
    open,
    actions,
    isLoading,
  } = props;
  return (
    <Dialog
      {...props}
      PaperComponent={PaperComponent}
      fullScreen={fullScreen}
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
        // style={}
        style={{ maxHeight: "80vh", overflow: "auto" }}
        dividers={true}
      >
        {isLoading ? (
          <Box style={{ marginTop: "10px", minHeight: 100 }}>
            <ProgressLoader isLoading={isLoading} size={25} />
          </Box>
        ) : (
          props.children
        )}
      </DialogContent>
      {actions && !isLoading && (
        <DialogActions
          id="customized-dialog-actions"
          isSaving={actions.isSaving}
          onSave={actions.onSave}
          onCancel={actions.onCancel}
        />
      )}
    </Dialog>
  );
};
