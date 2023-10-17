import React, { useState } from "react";
import SelectSearch from "../roaster/spotroster/SelectSearch";
import { makeStyles } from "@material-ui/styles";
import { CustomDialog } from "../../../components/CustomDialog";
import { CustomButton } from "../../../components/Button";
import { Grid, Typography } from "@material-ui/core";
import ProgressLoader from "./Loader";

const DeleteWorkDurationModal = (props) => {
  const classes = useStyles();

  const {
    toggleHandler,
    deleteWorkDurationData,
    workDurationName,
    isLoadingBut,
    openDelete,
    setOpenDelete,
    deleteWorkPlanValue,
    setIsLoadingBut,
  } = props;
  // const [isLoadingBut, setIsLoadingBut] = useState(false);

  //   window.alert(workDurationName);
  const handleClose1 = () => {
    if (openDelete) {
      setOpenDelete(false);
    }
    toggleHandler(false);
  };
  // const data = {
  //   classes,
  //   customDialogProps: {
  //     maxWidth: "sm",
  //     dialogTitle: "Delete",
  //     open: "true",
  //     handleClose: handleClose1,
  //   },
  //   customButtonProps: {
  //     btnText: "Delete",
  //     variant: "contained",
  //     btnClass: {
  //       backgroundColor: "#124590",
  //       color: "#fff",
  //       fontSize: "12px",
  //     },
  //     onClick: deleteWorkDurationData,
  //   },
  // };
  const customDialogProps = {
    maxWidth: "sm",
    dialogTitle: "Delete",
    open: "true",
    handleClose: { handleClose1 },
  };
  const customButtonProps = {
    btnText: "Ok",
    variant: "contained",
    btnClass: {
      backgroundColor: "#124590",
      color: "#fff",
      fontSize: "12px",
    },
  };

  const customButtonProps1 = {
    btnText: "Cancel",
    variant: "contained",
  };
  return (
    <>
      <CustomDialog {...customDialogProps} handleClose={handleClose1}>
        <Grid>
          {openDelete ? (
            <Typography>Are you sure want to delete ?</Typography>
          ) : (
            <Typography>
              Are you sure want to delete {workDurationName} ?
            </Typography>
          )}
        </Grid>
        <Grid className={classes.selectbutton}>
          <ProgressLoader isLoading={isLoadingBut} size={25} />

          <CustomButton
            {...customButtonProps}
            btnClass={
              isLoadingBut
                ? {
                    backgroundColor: "white",
                    color: "grey",
                    border: "solid 1px grey",
                    marginLeft: "10px",
                  }
                : {
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginLeft: "10px",
                  }
            }
            onClick={openDelete ? deleteWorkPlanValue : deleteWorkDurationData}
          />
          <CustomButton
            {...customButtonProps1}
            btnClass={
              isLoadingBut
                ? {
                    backgroundColor: "white",
                    color: "grey",
                    border: "solid 1px grey",
                    marginLeft: "10px",
                  }
                : {
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginLeft: "10px",
                  }
            }
            onClick={!isLoadingBut && handleClose1}
          />
        </Grid>
      </CustomDialog>
    </>
  );
};

export default DeleteWorkDurationModal;

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
