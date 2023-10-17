import React, { useState, useEffect } from "react";
import SelectSearch from "./SelectSearch";
import { makeStyles } from "@material-ui/styles";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomButton } from "../../../../components/Button";
import ProgressLoader from "../../rosterSettings/Loader";
import { Grid, Typography, Box } from "@material-ui/core";
import DatePicker from "react-datepicker";
import { CustomTextField } from "../../../../components/TextField";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { useSelector } from "react-redux";
import moment from "moment";

const DeleteModal = (props) => {
  const classes = useStyles();

  const {
    setStatus1,
    DeletePersonData,
    isLoadingBut,
    oriPagedata,
    checked,
    setSnakeBarProps,
    setIsLoading,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  console.log(commonReducer?.startDate, commonReducer?.endDate, "startDate");

  const [filterByViewBy, setFilter] = useState([
    { id: 1, label: " ", value: " " },
    { id: 2, label: "Data Entry", value: "Data Entry" },
    { id: 3, label: "Duty Change", value: "Duty Change" },
    {
      id: 4,
      label: "Not return back after leave",
      value: "Not return back after leave",
    },
    {
      id: 5,
      label: "Other",
      value: "Other",
    },
  ]);
  const [reason, setViewBy] = useState(filterByViewBy[0]);
  const [fromdate, setfromdate] = useState(moment(commonReducer?.startDate, "DD-MM-YYYY").toDate());
  const [todate, settodate] = useState(moment(commonReducer?.endDate, "DD-MM-YYYY").toDate());
  const [comment, setComment] = useState("");

  // useEffect(() => {
  //   let dateString = commonReducer?.startDate;

  //   let momentObj = moment(dateString, "DD-MM-YYYY");
  //   let dateObj = momentObj.toDate();
  //   setfromdate(dateObj);
  // }, [commonReducer?.startDate]);

  // useEffect(() => {
  //   if (commonReducer.startDate || commonReducer.endDate) {
  //     setfromdate(new Date(commonReducer.startDate));
  //     settodate(new Date(commonReducer?.endDate));
  //   }
  // }, [commonReducer.startDate, commonReducer.endDate]);

  //   window.alert(workDurationName);

  // useEffect(() => {
  //   let date1 = new Date(commonReducer?.startDate);
  //   setfromdate(date1);
  //   date1 = new Date(commonReducer?.endDate);
  //   settodate(date1);
  // }, []);

  const handleClose1 = () => {
    setStatus1(0);
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
  const deletePerson = () => {
    let pid = [];
    for (
      let i = 0;
      i < oriPagedata?.personRosterData?.["Employee"].length;
      i++
    ) {
      if (checked[i] == true) {
        pid.push(oriPagedata?.personRosterData?.["Employee"][i].personId);
      }
    }

    if (fromdate == "" || todate == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Enter the Date!",
        type: "error",
      });
      return;
    } else if (reason?.value == " " && comment == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Select a Reason or Enter a comment!",
        type: "error",
      });
      return;
    }
    let pdata = {};
    pdata = {
      userId: commonReducer?.userId,
      comments: comment,
      fromDate: moment(fromdate).format("DD-MMM-YYYY"),
      personIds: pid,
      reason: reason?.value,
      toDate: moment(todate).format("DD-MMM-YYYY"),
    };
    console.log(pdata, "pdata");
    setIsLoading(true);
    DeletePersonData(pdata);
  };
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
  const startFromDateChange = (effectiveDatevalue) => {
    // seteffectiveDate(effectiveDatevalue);
    setfromdate(effectiveDatevalue);
    // validateTimeCard(effectiveDatevalue);
  };
  const startToChange = (effectiveDatevalue) => {
    // seteffectiveDate(effectiveDatevalue);
    settodate(effectiveDatevalue);
    // validateTimeCard(effectiveDatevalue);
  };

  return (
    <>
      <CustomDialog {...customDialogProps} handleClose={handleClose1}>
        <Grid
          style={{
            height: "300px",
          }}
        >
          <Grid style={{ margin: "5px 0" }}>
            <Typography>Are you sure want to delete ?</Typography>
          </Grid>
          <Grid>
            <Grid
              container
              xs="12"
              style={{
                alignItems: "center",
                margin: "15px 0",
              }}
            >
              <Grid item xs="3">
                <Box textAlign="right">
                  <Typography className={classes.typo}>From</Typography>
                </Box>
              </Grid>
              <Grid item xs="6" style={{ marginLeft: "10px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={fromdate}
                  onChange={startFromDateChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              xs="12"
              style={{ margin: "15px 0", alignItems: "center" }}
            >
              <Grid item xs="3">
                <Box textAlign="right">
                  <Typography className={classes.typo}>To</Typography>
                </Box>
              </Grid>
              <Grid item xs="6" style={{ marginLeft: "10px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={todate}
                  onChange={startToChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              xs="12"
              style={{ margin: "15px 0", alignItems: "center" }}
            >
              <Grid item xs="3">
                <Box textAlign="right">
                  <Typography className={classes.typo}>Reason</Typography>
                </Box>
              </Grid>
              <Grid item xs="6" style={{ marginLeft: "10px" }}>
                <CustomAutoComplete
                  id="Reason"
                  required
                  options={filterByViewBy}
                  getoptionlabelkey="label"
                  selectedvalue={reason}
                  className={classes.filterData}
                  onChange={(_event, newData) => {
                    setViewBy(newData);
                    if (
                      newData.label != " " &&
                      filterByViewBy[0].label == " "
                    ) {
                      let arr = [...filterByViewBy];
                      arr.shift();
                      setFilter(arr);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              xs="12"
              style={{ margin: "15px 0", alignItems: "center" }}
            >
              <Grid item xs="3">
                <Box textAlign="right">
                  <Typography className={classes.typo}>Comments</Typography>
                </Box>
              </Grid>
              <Grid item xs="6" style={{ marginLeft: "10px" }}>
                <CustomTextField
                  //   key="comments"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  // type="text"
                />
              </Grid>
            </Grid>
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
              onClick={deletePerson}
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
        </Grid>
      </CustomDialog>
    </>
  );
};

export default DeleteModal;

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
  mainrow: {
    display: "flex",
    flexDirection: "row",
    margin: "15px",
  },
  typo: {
    width: "100px",
    textAlign: "end",
    alignSelf: "center",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "1px !important",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    alignItems: "center"
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));