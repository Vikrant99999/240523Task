import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer, useState } from "react";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { makeStyles } from "@material-ui/styles";

import OptionRoaster from "./OptionRoaster";
import Option2Roster from "./Option2Roster";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  AssignHeaderContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    color: "#5BB75B",
  },
  cancelIconStyle: {
    color: "#f51414",
  },
  BtnStyleOn: {
    color: "#fff",
    backgroundColor: "#124590",
  },

  BtnStyleOff: {
    color: "#fff",
    backgroundColor: "#dbdbd",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
}));

const AssignRoster = (props) => {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    togglehandler,
    openAnotherShift,
    close,
    data,
    setResult,
    setSnakeBarProps,
  } = props;
  // console.log(commonReducer,'commonReducer')
  const [status, setStatus] = React.useState(1);
  const handleClose = () => {
    if (openAnotherShift) {
      close(false);
    }
    togglehandler(false);
  };
  const btnClick = (e) => {
    setStatus(e);
  };

  return (
    <>
      <CustomDialog
        maxWidth="xl"
        dialogTitle={"Assign"}
        open="true"
        handleClose={handleClose}
      >
        <Grid item xs="12" className={classes.AssignHeaderContent}>
          <Grid>
            <CustomButton
              btnText="Option 1"
              variant="contained"
              onClick={() => btnClick(1)}
              btnClass={
                status == 1
                  ? { backgroundColor: "#124590", color: "#fff" }
                  : { backgroundColor: "#dedede", color: "black" }
              }
              // className={status === 1 ? classes.selectedButton : ""}
            />

            <CustomButton
              btnText="Option 2"
              variant="contained"
              onClick={() => btnClick(2)}
              btnClass={
                status == 2
                  ? { backgroundColor: "#124590", color: "#fff" }
                  : { backgroundColor: "#dedede", color: "black" }
              }
              // className={status === 2 ? classes.selectedButton : ""}
            />
          </Grid>
          <Grid>
            <Typography style={{ color: "red", fontSize: "10px" }}>
              *Overlapped shifts will be replaced.
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          {status === 1 && (
            <OptionRoaster
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose={handleClose}
              setResult={setResult}
              {...props}
            />
          )}
          {status === 2 && (
            <Option2Roster
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose={handleClose}
              {...props}
            />
          )}
        </Grid>
      </CustomDialog>
    </>
  );
};

export default AssignRoster;
