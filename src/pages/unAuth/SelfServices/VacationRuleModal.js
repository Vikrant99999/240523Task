import React, { useState, useEffect } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { Typography, Grid, Box, Autocomplete, TextField, Tooltip } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import { CustomButton } from "../../../components/Button";
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { createRule, taskData, updateRule } from "../../../services/api";
import { useMutation, useQuery } from "react-query";
import UserModal from "./UserModal";
import { useSelector } from "react-redux";
import { dateConverter } from "../../../utils/commonService";
import ProgressLoader from "../rosterSettings/Loader";
import { Height } from "@material-ui/icons";
// import

// const task_dummy_data = ["Employee Request", "Self Roster"];

const VacationRuleModal = (props) => {
  const {
    open,
    handleClose,
    setErrorProps,
    user,
    taskDataArr,
    setTaskDataArr,
    getAllProjectRefetch,
    toggleHandler,
    editData,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const actionTypeArr = [{ label: "Forward", id: 1 }];
  console.log(taskDataArr, "taskDataArr");
  const classes = useStyles();
  const [userModaldialog, setUserModaldialog] = useState(false);
  const [startDate, setStartDate] = useState(
    editData === undefined
    ? null
    : new Date(moment(editData?.startDate).format("DD-MMM-YYYY"))
    );
    const [endDate, setEndDate] = useState(
      editData === undefined
      ? null
      : new Date(moment(editData?.endDate).format("DD-MMM-YYYY"))
      );
      const [taskDatalist, setTaskDatalist] = useState([]);
      // const [employeeData, setEmployeeData] = useState();
        const [isLoadingBut, setIsLoadingBut] = useState(false);
        const [actionType, setActionType] = useState(
          // {
            editData == undefined ? null : editData?.actionType
            // ActionTypeArray: actionTypeArr,
            // actionTypeObj: {},
    // actionTypeName: "",
    //}
  );
  //console.log(actionType.actionTypeObj, "actionTypeObj");
  // const handelEmployeechange = (iitem) => {
  //   setEmployeeData(iitem);
  // };
  const[employeeData,setEmployeeData]=useState(editData)
 

  const handelEmployeechange = (iitem) => {
    let e = {
      target: {
        name: "userDto",
        value: iitem,
      },
    };
    console.log(e);
    setEmployeeData(e.target.value);
  };
  

  const { mutate: CreateVactionRuleMutate } = useMutation(createRule, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully added new VactionRule!",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);

      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Unable to create vacation rule",
        type: "error",
      });
      setIsLoadingBut(false);

      toggleHandler(true);
    }
  };
  const saveHandler = () => {
    if (startDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the start  date !",
        type: "error",
      });
      return;
    }
    if (endDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the  end date!",
        type: "error",
      });
      return;
    }
    if (taskDataArr.taskId == "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the task !",
        type: "error",
      });
      return;
    }
    if (actionType == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Action type is required !",
        type: "error",
      });
      return;
    }
    if (employeeData?.userId == undefined) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Employee is required !",
        type: "error",
      });
      return;
    }
    var pdata = {
      userId: commonReducer.userId,
      startDate: moment(startDate).format("DD-MM-YY"),
      endDate: moment(endDate).format("DD-MM-YY"),
      toUserId: employeeData?.userId,
      taskId: taskDataArr.taskId,
      actionType: actionType,
    };
    setIsLoadingBut(true);
    CreateVactionRuleMutate(pdata);
  };

  const { mutate: UpdateVactionRuleMutate } = useMutation(updateRule, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully updated  VactionRule!",
        type: "success",
      });
      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Unable to update vacation rule",
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };
  const updateHandler = () => {
    if (startDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the start  date !",
        type: "error",
      });
      return;
    }
    if (endDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the  end date!",
        type: "error",
      });
      return;
    }

    var pdata = {
      vacationRuleId: editData?.vacationRuleId,
      userId: commonReducer.userId,
      startDate: moment(startDate).format("DD-MM-YY"),
      endDate: moment(endDate).format("DD-MM-YY"),
      toUserId: employeeData?.userId,
      taskId: taskDataArr.taskId,
      actionType: actionType,
    };
    setIsLoadingBut(true);
    UpdateVactionRuleMutate(pdata);
  };
  // console.log(editData,"EDIT DATA ");

  return (
    <Grid>
      <CustomDialog
        dialogTitle="Add Vacation Rule"
        open={props}
        maxWidth="sm"
        handleClose={handleClose}
      >
        <Grid
        >
          <Grid xs="8"
          >
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Start Date</Box>
                </Typography>
              </Grid>
              <Tooltip title={'Select Date'}>
              <Grid xs="8" style={{ marginLeft: "10px" }}>
                <DatePicker
                  selected={startDate}
                  dateFormat="dd-MMM-yyyy"
                  onChange={(date) => setStartDate(date)}
                  />
              </Grid>
                  </Tooltip>
            </Box>
          </Grid>
          <Grid xs="8">
            <Box className={classes.datestyle}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*End Date</Box>
                </Typography>
              </Grid>
              <Tooltip title={'Select Date'}>
              <Grid xs="8" style={{ marginLeft: "10px" }}>
                <DatePicker
                  selected={endDate}
                  dateFormat="dd-MMM-yyyy"
                  onChange={(date) => setEndDate(date)}
                />
              </Grid>
              </Tooltip>
            </Box>
          </Grid>
          <Grid xs="8">
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">Task</Box>
                </Typography>
              </Grid>
              <Grid xs="6">
                <Autocomplete
                  defaultValue={editData?.taskName}
                  id="shift-data"
                  disableClearable
                  options={
                    taskDataArr?.taskArray?.length > 0
                      ? taskDataArr?.taskArray?.map((item) => {
                          return { label: item?.taskName, id: item?.taskId };
                        })
                      : []
                  }
                  // getOptionLabel={label}
                  style={{ marginLeft: "10px" }}
                  onChange={(_event, newData) => {
                    // console.log(newData, "newData");
                    setTaskDataArr({
                      ...taskDataArr,
                      taskObj: newData,
                      taskId: newData.id,
                    });
                  }}
                  renderInput={(params) => <TextField {...params}></TextField>}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid xs="8">
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">Action Type</Box>
                </Typography>
              </Grid>
              <Grid xs="6">
                <Autocomplete
                  id="shift-data"
                  defaultValue={actionType}
                  disableClearable
                  options={actionTypeArr}
                  onChange={(_event, newData) => {
                    console.log(newData.label, "newData");
                    setActionType(newData.label);
                  }}
                  style={{ marginLeft: "10px" }}
                  renderInput={(params) => <TextField {...params}></TextField>}
                />
              </Grid>
            </Box>
          </Grid>
          {startDate != null &&
            endDate != null &&
            taskDataArr.taskId != null &&
            actionType != null && (
              <Grid xs="8">
                <Box className={classes.textField}>
                  <Grid item xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Box textAlign="right">To User</Box>
                    </Typography>
                  </Grid>

                  <Grid xs="8">
                    <CustomTextField
                      type="text"
                      name={"data?.fullName"}
                      value={employeeData?.fullName}
                      
                      onChange={(e) => handelEmployeechange(e)}
                      style={{ marginLeft: "10px" }}
                      endIcon={
                        <SearchIcon
                          onClick={() => {
                            setUserModaldialog(true);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </Grid>
                </Box>
              </Grid>
            )}
          <Grid style={{marginTop:57}}>
            <Box>
              {editData == undefined ? (
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <ProgressLoader isLoading={isLoadingBut} size={25} />
                  <CustomButton
                    btnText="Save"
                    onClick={!isLoadingBut && saveHandler}
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
                  />
                  <CustomButton
                    btnText="Cancel"
                    onClick={handleClose}
                    btnClass={{
                      backgroundColor: "#124590",
                      color: "#fff",
                      marginLeft: "10px",
                    }}
                  />
                </Grid>
              ) : (
                <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                  <ProgressLoader isLoading={isLoadingBut} size={25} />
                  <CustomButton
                    btnText="Save"
                    onClick={!isLoadingBut && updateHandler}
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
                  />

                  <CustomButton
                    btnText="Cancel"
                    onClick={handleClose}
                    btnClass={{
                      backgroundColor: "#124590",
                      color: "#fff",
                      marginLeft: "10px",
                    }}
                  />
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </CustomDialog>
      {userModaldialog && (
        <UserModal
          toggleHandler={setUserModaldialog}
          handelEmployeechange={handelEmployeechange}
          user={user}
          open={userModaldialog}
         

        />
      )}
   </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    // height:'20vh',
    display: "flex",
    alignItems: "center",
    margin: "10px",
  },
  datestyle:{
    height:'9vh',
    display: "flex",
    alignItems: "center",
    margin: "10px",
  },
  placer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export default VacationRuleModal;
