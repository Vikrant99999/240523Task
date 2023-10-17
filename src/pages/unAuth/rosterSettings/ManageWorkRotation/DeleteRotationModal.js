import { Grid, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";

const DeleteRotationModal = (props) => {
  const { toggleHandler, deleteWorkRotationValue } = props;
  const handleClose = () => {
    toggleHandler(false);
  };

  return (
    <CustomDialog
      maxWidth="s"
      dialogTitle="Confirm Delete"
      open="true"
      handleClose={handleClose}
    >
      <Grid>
        <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
          Are you sure you want to delete?
        </Typography>
      </Grid>
      <Grid
        style={{
          display: "flex ",
          justifyContent: "flex-end ",
          marginTop: "10px",
        }}
      >
        <CustomButton
          btnText="Ok"
          btnClass={{ backgroundColor: "#124590", color: "#fff" }}
          onClick={deleteWorkRotationValue}
        />
        <CustomButton
          btnText="Cancel"
          btnClass={{
            backgroundColor: "#124590",
            color: "#fff",
            marginLeft: "5px",
          }}
          onClick={handleClose}
        />
      </Grid>
    </CustomDialog>
  );
};

export default DeleteRotationModal;
