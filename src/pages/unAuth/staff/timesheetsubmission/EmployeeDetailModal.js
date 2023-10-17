import { Box, Grid, Stack, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { useMutation, useQuery } from "react-query";
import {
  deletePersonTimesheet,
  GetAllTimesheetMaster,
  getJobs,
  getPayCodes,
  payrollTtimehseetById,
  savePersonTimesheet,
} from "../../../../services/api";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/core";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import moment from "moment";
import { timesheetTableHeader, _formatTimeHour } from "../../../contants";
import { CustomButton } from "../../../../components/Button";
import { LocalFireDepartment } from "@mui/icons-material";
import Loader from "../shared/Loader";

export const EmployeeDetailModal = (props) => {
  const classes = useStyles();
  const {
    togglerHandler,
    setSnakeBarProps,
    dateConverter,
    refetchPersonTimesheet,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const [expandFlag, setExpandFlag] = useState(false);
  const [expandPanel, setExpandPanel] = useState(null);
  const [pageArr, setPageArr] = useState([]);
  const [shiftDetailArr, setShiftDetailArr] = useState([]);
  const [enableFlag, setEnableFlag] = useState(true);
  const [blurFlag, setBlurFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [paycodeArr, setPaycodeArr] = useState([]);
  const [deptpartmentJobArr, setDeptpartmentJobArr] = useState([]);
  const [paycodeEnableFlag, setPaycodeEnableFlag] = useState(true);
  const [newStateData, setNewStateData] = useState([]);
  const [validations, setValidations] = useState([]);
  const handleValidations = (value) => {
    setValidations(value);
  };

  const [timeSheetMasterEnableFlag, setTimeSheetMasterEnableFlag] =
    useState(true);
  const [payCodes, setPayCodes] = useState({});
  const handlePayCodes = (value) => {
    setPayCodes(value);
  };
  const [totalHours, setTotalHours] = useState(0);
  const saveTotalHours = (value) => {
    setTotalHours(value);
  };

  const [isLoading1, setLoading1] = useState(true);
  const handleLoading1 = (value) => {
    setLoading1(value);
  };
  console.log("isLoading1", isLoading1);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const handleDeleteFlag = (value) => {
    setDeleteFlag(value);
  };
  const handleSaveFlag = (value) => {
    setSaveFlag(value);
  };
  const resetFlags = () => {
    handleDeleteFlag(false);
    handleSaveFlag(false);
  };
  const [errorMsg, setErrorMsg] = useState([]);

  const resetErrorMsg = () => {
    setErrorMsg([]);
  };
  const handleErrorMsg = (value) => {
    setErrorMsg(value);
  };

  const handleNewStateData = (value) => {
    setNewStateData(value);
  };

  const handleClose = () => {
    togglerHandler(false);
    //  after closing the modal PersonTimesheet is fetching once again
    refetchPersonTimesheet();
  };
  const { data: stateData } = useQuery(
    ["EmployeeDetailModal"],
    () =>
      payrollTtimehseetById({
        personId: commonReducer.selectedEmployeeId.personId,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
      }),
    { enabled: enableFlag, retry: false }
  );

  const { mutate: savePersonTimesheetMutate } = useMutation(
    savePersonTimesheet,
    {
      onSuccess: (data, context, variables) =>
        savePersonTimesheetSuccess(data, context, variables),
      onError: (data, context, variables) =>
        savePersonTimesheetError(data, context, variables),
    }
  );

  const savePersonTimesheetSuccess = (data) => {
    setEnableFlag(true);
    handleErrorMsg((previous) =>
      previous.concat({ msg: `Record(s) Saved`, type: "success" })
    );
    handleSaveFlag(true);
  };

  const savePersonTimesheetError = (data) => {
    setEnableFlag(true);
    handleErrorMsg((previous) =>
      previous.concat({ msg: `Record(s) Saved Failed`, type: "error" })
    );
    handleSaveFlag(true);
  };

  const { mutate: deletePersonTimesheetMutate } = useMutation(
    deletePersonTimesheet,
    {
      onSuccess: (data, context, variables) =>
        deletePersonTimesheetSuccess(data, context, variables),
      onError: (data, context, variables) =>
        deletePersonTimesheetError(data, context, variables),
    }
  );

  const deletePersonTimesheetSuccess = (data) => {
    setEnableFlag(true);

    handleErrorMsg((previous) =>
      previous.concat({ msg: `Record(s) Deleted`, type: "success" })
    );
    handleDeleteFlag(true);
  };

  const deletePersonTimesheetError = (data) => {
    setEnableFlag(true);

    handleErrorMsg((previous) =>
      previous.concat({ msg: `Record(s) Delete Failed`, type: "error" })
    );
    handleDeleteFlag(true);
  };
  const getNewStateData = () => {
    var newStateData = {};
    var startDate = moment(dateConverter(commonReducer.startDate));
    var endDate = commonReducer.endDate;
    //   Generating proper dates based on startDate and endDate
    while (true) {
      newStateData[startDate.format("DD-MMM-YYYY")] = {
        date: startDate.format("DD-MMM-YYYY"),
        shiftDetails: [],
        shiftTiming: null,
        totalHours: 0,
      };
      if (startDate.format("DD-MM-YYYY") === endDate) {
        break;
      }
      startDate = startDate.add(1, "day");
    }

    stateData?.data?.data.map((value, index) => {
      var key = value.date;
      if (key in newStateData) {
        newStateData[key].shiftDetails = [
          ...newStateData[key]?.shiftDetails,
          ...value.shiftDetails,
        ];
        newStateData[key].totalHours = newStateData[key].shiftDetails
          .reduce((sum, item) => (sum += parseFloat(item.hours)), 0)
          .toFixed(2);
        newStateData[key].shiftDetails = newStateData[key].shiftDetails.map(
          (childElement) => {
            var element = {};
            element = {
              startTime: childElement.startTime
                ? moment(childElement.startTime).format("hh:mm A")
                : "",
              endTime: childElement.endTime
                ? moment(childElement.endTime).format("hh:mm A")
                : "",
              date: newStateData[key].date,
              hours: parseFloat(parseFloat(childElement.hours).toFixed(2)),
              previousHours: parseFloat(
                parseFloat(childElement.hours).toFixed(2)
              ),
            };
            return {
              ...childElement,
              ...element,
              isDeleted: false,
              isSaved: false,
            };
          }
        );
        newStateData[key].shiftTiming = value.shiftTiming;
      }
    });

    return Object.values(newStateData);
  };
  useEffect(() => {
    if (stateData) {
      setTimeout(() => {
        var newState = getNewStateData();
        handleNewStateData(newState);
        var newPayCodes = {};
        var sum = 0;
        newState.map((parent_value) => {
          parent_value.shiftDetails.map((child_value) => {
            if (child_value.timeSheetId) {
              sum += child_value.hours;
              if (child_value.payCodeName in newPayCodes) {
                newPayCodes[child_value.payCodeName] += child_value.hours;
              } else {
                newPayCodes[child_value.payCodeName] = child_value.hours;
              }
            }
          });
        });
        handlePayCodes(newPayCodes);
        saveTotalHours(parseFloat(sum).toFixed(2));
      }, 500);
    }
    // else {
    // console.log("statedata", stateData);
    // if(stateData===undefined){
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "Error",
    //     details: ["Some Technical Error."],
    //     type: "error",
    //   });
    // }
    // }
    handleLoading1(false);
    setEnableFlag(false);
  }, [stateData]);

  const { data: timesheetMAsterData } = useQuery(
    ["geAllTimesheetMasterData"],
    () =>
      GetAllTimesheetMaster({
        userId: commonReducer.userId,
        profileId: commonReducer.selectedProjectObjTeam?.profileId
          ? commonReducer.selectedProjectObjTeam.profileId
          : "",
      }),
    { enabled: timeSheetMasterEnableFlag, retry: false }
  );

  useEffect(() => {
    if (timesheetMAsterData) {
      // console.log("timesheetMasterData", timesheetMAsterData);
      setTimeSheetMasterEnableFlag(false);
      var { departments, paycodes } = timesheetMAsterData?.data?.data;
      setDeptpartmentJobArr(
        departments.map((option) => ({
          ...option,
          value: option.name,
          label: option.name,
        }))
      );
      setPaycodeArr(
        paycodes.map((option) => ({
          ...option,
          value: option.name,
          label: option.name,
        }))
      );
    }
  }, [timesheetMAsterData]);

  const getJobArr = (depId) => {
    var localArr =
      deptpartmentJobArr.length > 0
        ? deptpartmentJobArr.filter((option) => option.id == depId)
        : [];
    return localArr.length > 0
      ? localArr[0].jobs.map((option) => ({
          ...option,
          value: option.jobTitle,
          label: option.jobTitle,
        }))
      : [];
  };

  const getTotalHourByRow = (parentIndex) => {
    var count = 0;
    newStateData[parentIndex]?.shiftDetails
      .filter((item) => item.isSaved === false && item.isDeleted === false)
      .map((item) => (count += parseFloat(item.hours)));
    return count;
  };
  const getTotalHour = () => {
    var count = 0;
    newStateData.map((event) => {
      event?.shiftDetails
        .filter((item) => !item.isDeleted)
        .map((item) => (count += parseFloat(item.hours)));
    });
    return count;
  };
  const getLapsedHours = () => {
    var count = 0;
    shiftDetailArr.map(
      (item) =>
        (count += item.payCode == "Lapse Hours" ? parseFloat(item.hours) : 0)
    );
    return count;
  };
  const getRegularHours = () => {
    var count = 0;
    shiftDetailArr.map(
      (item) =>
        (count += item.payCode == "Regular Hours" ? parseFloat(item.hours) : 0)
    );
    return count;
  };
  const getProjectHours = () => {
    var count = 0;
    shiftDetailArr.map(
      (item) =>
        (count += item.payCode == "Project Hours" ? parseFloat(item.hours) : 0)
    );
    return count;
  };
  const transformTime = (str) => {
    return moment(str, "LT").format("hh:mm A");
  };

  const setInputValue = (parentIndex, childIndex, value, type, key) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];
    var updatedchild = {};
    var childElement = { ...localShiftDetailArr[childIndex] };

    if (key == "hours") {
      updatedchild = {
        ...childElement,
        [key]:
          type == "onChange"
            ? value
            : _formatTimeHour(value).formattedValue.includes("-")
            ? timeDiff(_formatTimeHour(value).formattedValue)
            : _formatTimeHour(value).formattedValue,
        startTime:
          type == "onChange"
            ? ""
            : _formatTimeHour(value).formattedValue.includes("-")
            ? transformTime(_formatTimeHour(value).formattedValue.split("-")[0])
            : "",
        endTime:
          type == "onChange"
            ? ""
            : _formatTimeHour(value).formattedValue.includes("-")
            ? transformTime(_formatTimeHour(value).formattedValue.split("-")[1])
            : "",
      };
    } else {
      updatedchild = {
        ...childElement,
        [key]: value,
      };
      if (key === "departmentId") {
        updatedchild = {
          ...updatedchild,
          jobId: "",
        };
      }
    }

    if (
      ["departmentId", "jobId", "payCodeName"].includes(key) ||
      (["hours", "comment"].includes(key) && ["onBlur"].includes(type))
    ) {
      updatedchild = {
        ...updatedchild,
        isSaved: true,
      };
      if (key === "hours") {
        updatedchild = {
          ...updatedchild,
          previousHours: updatedchild.hours,
        };
      }
    }
    // console.log("udpatedChild", updatedchild);
    localShiftDetailArr[childIndex] = updatedchild;
    localNewStateData[parentIndex].shiftDetails = [...localShiftDetailArr];
    handleNewStateData(localNewStateData);
  };

  const timeDiff = (value) => {
    var startTime = moment(value.split("-")[0], "HH:mm a");
    var endTime = moment(value.split("-")[1], "HH:mm a");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = duration.asHours();
    var minutes = duration.asMinutes() - hours * 60;
    return parseFloat(hours + "." + minutes).toFixed(2);
  };

  const addRecord = (parentIndex) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];
    var departmentId = ""; //deptpartmentJobArr.length>0?deptpartmentJobArr[0].id:''

    var pdata = {
      payCode: "",
      comment: null,
      projectId: "",
      expenditureId: "",
      taskId: "",
      hours: "",
      startTime: "",
      endTime: "",
      jobId: "",
      departmentId: departmentId,
      date: localNewStateData[parentIndex].date,
      previousHours: 0,
      isReadOnly: "N",
      isDeleted: false,
      isSaved: true,
    };
    localShiftDetailArr.push(pdata);
    localNewStateData[parentIndex].shiftDetails = localShiftDetailArr;
    handleNewStateData(localNewStateData);
  };

  const copyRecord = (parentIndex, childIndex) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];

    var pdata = {
      ...localShiftDetailArr[childIndex],
      date: localNewStateData[parentIndex].date,
      hours: "",
      startTime: "",
      endTime: "",
      previousHours: 0,
      isReadOnly: "N",
      isDeleted: false,
      isSaved: true,
      comment: "",
    };
    delete pdata.timeSheetId;
    console.log(
      "before push:",
      localShiftDetailArr,
      "childIndex :",
      childIndex
    );
    localShiftDetailArr.unshift(pdata);
    console.log("after push:", localShiftDetailArr, "childIndex :", childIndex);
    localNewStateData[parentIndex].shiftDetails = localShiftDetailArr;
    handleNewStateData(localNewStateData);
  };

  const removeRecord = (parentIndex, childIndex) => {
    var localNewStateData = [...newStateData];
    var localShiftDetailArr = [...localNewStateData[parentIndex].shiftDetails];
    localShiftDetailArr[childIndex].isDeleted = true;
    // removing specific hours on deletion

    var sum = localShiftDetailArr
      .filter((item) => !item.isDeleted)
      .reduce((sum, item) => sum + item.hours, 0);

    localNewStateData[parentIndex].totalHours = parseFloat(sum).toFixed(2);
    localNewStateData[parentIndex].shiftDetails = localShiftDetailArr;
    handleNewStateData(localNewStateData);
  };

  const setDropdownValue = (key, value, arr) => {
    var localArr = arr.filter((option) => option[key] == value);
    return localArr.length > 0 ? localArr[0] : {};
  };

  const setJobArrDropdownValue = (key, jobId, depId) => {
    var localArr =
      deptpartmentJobArr.length > 0
        ? deptpartmentJobArr.filter((option) => option.id == depId)
        : [];
    var localJobArr =
      localArr.length > 0
        ? localArr[0].jobs.filter((jobOption) => jobOption.id == jobId)
        : [];

    return localJobArr.length > 0
      ? {
          ...localJobArr[0],
          value: localJobArr[0].jobTitle,
          label: localJobArr[0].jobTitle,
        }
      : [];
  };

  useEffect(() => {
    if (isLoading1 && deleteFlag && saveFlag) {
      const isError =
        errorMsg.filter((item) => item.type === "error").length > 0;
      setSnakeBarProps({
        snackbarFlag: true,
        msz: isError ? "Error" : "Information",
        details: errorMsg.map((item) => item.msg),
        type: isError ? "error" : "info",
      });
      resetFlags();
      resetErrorMsg();
      handleValidations([]);
      handleLoading1(false);
    }
  }, [deleteFlag, saveFlag]);

  useEffect(() => {
    if (validations.length) {
      var missingFields = {};
      validations.map((item) => {
        item.msg.map((fieldName) => {
          missingFields[fieldName] = "";
        });
      });
      var list = Object.keys(missingFields);
      if (list.length > 1) {
        list[list.length - 1] =
          " and " + list[list.length - 1] + " are required";
      } else {
        list[list.length - 1] = list[list.length - 1] + " is required";
      }
      // console.log("missing fields", missingFields);
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Error",
        details: [list.toString()],
        type: "error",
      });
    }
  }, [validations]);

  const saveAllPayroll = async () => {
    if (!isLoading1) {
      var deletedArr = [];
      var savedArr = [];
      var validationArr = [];
      newStateData.map((parent, parentIndex) => {
        parent.shiftDetails.map((item, childIndex) => {
          if (item.isSaved && !item.isDeleted) {
            var msg = [];
            if (item.hours === "") {
              msg.push("Hours");
            }
            if (item.departmentId === "") {
              msg.push("Department");
            }
            if (item.jobId === "") {
              msg.push("Job");
            }
            if (msg.length) {
              validationArr.push({
                parentIndex: parentIndex,
                childIndex: childIndex,
                msg: msg,
              });
            }
          }
        });
      });

      var errorFields = 0;
      var errorMessage = [];
      newStateData.map((parent, parentIndex) => {
        errorFields += parseInt(
          parent.shiftDetails.filter((item, childIndex) => {
            var result = _formatTimeHour(item.hours).errorMsz != "";
            if (result) {
              errorMessage.push(_formatTimeHour(item.hours).errorMsz);
            }
            return result;
          }).length
        );
      });
      if (errorFields) {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "Information",
          details: [errorMessage[0]],
          type: "error",
        });
      } else {
        if (validationArr.length === 0) {
          newStateData.map((parent) => {
            parent.shiftDetails.map((item) => {
              if (item.isDeleted && item.timeSheetId) {
                deletedArr.push(item.timeSheetId);
              }
              if (!item.isDeleted && item.isSaved) {
                savedArr.push(payloadObj(item));
              }
            });
          });

          if (!deletedArr.length && !savedArr.length) {
            setSnakeBarProps({
              snackbarFlag: true,
              msz: "Information",
              details: ["Nothing to save or delete"],
              type: "info",
            });
          } else if (deletedArr.length > 0 && savedArr.length > 0) {
            handleLoading1(true);
            deletePersonTimesheetMutate(deletedArr);
            savePersonTimesheetMutate(savedArr);
          } else if (savedArr.length > 0 && deletedArr.length === 0) {
            handleLoading1(true);
            handleDeleteFlag(true);
            savePersonTimesheetMutate(savedArr);
          } else if (deletedArr.length > 0 && savedArr.length === 0) {
            handleLoading1(true);
            handleSaveFlag(true);
            deletePersonTimesheetMutate(deletedArr);
          }
          // console.log("SaveAllPayroll", deletedArr, savedArr);
        } else {
          handleValidations(validationArr);
        }
      }
    }
  };

  const payloadObj = (item) => {
    var payload = {
      effectiveDate: item.date,
      userId: commonReducer.userId,
      regularHours: item.hours,
      personId: commonReducer.selectedEmployeeId.personId,
      departmentId: item.departmentId,
      jobId: item.jobId,
      paycodeId: paycodeArr.filter(
        (jobOption) => jobOption.name == item.payCodeName
      )[0]?.id,
      paycodeName: item.payCodeName,
      isTime: !item.startTime == "",
      isHours: item.startTime == "",
      startTime: item.startTime,
      endTime: item.endTime,
      hoursValue: item.hours,
      comment: item.comment,
    };
    if (item?.timeSheetId) {
      payload = { ...payload, timeSheetId: item.timeSheetId };
    }
    return payload;
  };
  const removeFullYear = (value) => {
    return value.substr(0, value.lastIndexOf("-"));
  };
  const formattedTime = (value) => {
    if (value.includes("AM")) {
      return value.replace("AM", "a");
    }
    if (value.includes("PM")) {
      return value.replace("PM", "p");
    }
  };
  // console.log("newStateDAta", newStateData);
  return (
    <CustomDialog
      maxWidth="lg"
      dialogTitle={`Timesheet of ${
        commonReducer.selectedEmployeeId.fullName
      } from ${dateConverter(commonReducer.startDate)} To ${dateConverter(
        commonReducer.endDate
      )}`}
      open="true"
      handleClose={handleClose}
    >
      <Box>
        <Grid container className={classes.maincontainer}>
          <Grid container item xs="6" className={classes.innercontainer}>
            <Box className={classes.cursor_manage}>
              <Typography className={classes.totalhourstext}>
                Total Hours&nbsp;&nbsp;
                <Typography
                  component="span"
                  className={classes.gettotalhourstext}
                >
                  {parseFloat(totalHours)}
                </Typography>
              </Typography>
            </Box>
            {/* <Box className={classes.cursor_manage}>
                        <Typography className={classes.text}>Lapsed Hours&nbsp;&nbsp;
                            <Typography component="span" className={classes.gettext}>{getLapsedHours()}</Typography>
                        </Typography>
                    </Box>
                    <Box className={classes.cursor_manage}>
                        <Typography className={classes.text}>Regular Hours&nbsp;&nbsp;
                            <Typography component="span" className={classes.gettext}>{getRegularHours()}</Typography>
                        </Typography>
                    </Box>
                    <Box className={classes.cursor_manage}>
                        <Typography className={classes.text}>Project Hours&nbsp;&nbsp;
                            <Typography component="span" className={classes.gettext}>{getProjectHours()}</Typography>
                        </Typography>
                    </Box> */}
          </Grid>
          <Grid
            item
            xs="6"
            textAlign="right"
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems:'baseline'
            }}            
          >
            <Typography sx={{ color: "#0a8a4b", fontSize: "14px" }} mx={1}>
              Schedule
            </Typography>
            <Typography sx={{ color: "#c11414", fontSize: "14px" }} mx={2}>
              Actual
            </Typography>
            {!expandFlag ? (
              <Typography
                onClick={() => {
                  setExpandFlag(!expandFlag);
                  setExpandPanel(null);
                }}
                className={classes.cursor_manage}
              >
                Expand All
              </Typography>
            ) : (
              <Typography
                onClick={() => {
                  setExpandFlag(!expandFlag);
                  setExpandPanel(null);
                }}
                className={classes.cursor_manage}
              >
                Collapse All
              </Typography>
            )}
          </Grid>
        </Grid>
        <Stack flexDirection="row" rowGap={1} my={2}>
          <Grid item xs={1.5}>
            <Stack flexDirection={"row"} alignItems="start" columnGap={2}>
              <CustomButton
                btnText="Save"
                variant="contained"
                disabled={isLoading1}
                onClick={saveAllPayroll}
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  fontSize: "12px",
                  cursor: isLoading1 ? "not-allowed" : "pointer",
                }}
              />
              {isLoading1 && <Loader isLoading={isLoading1} />}
            </Stack>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            gap={1}
            justifyContent={
              Object.keys(payCodes).length > 6 ? "flex-start" : "flex-end"
            }
          >
            {Object.keys(payCodes).map((value, payCodeIndex) => {
              return (
                <Stack
                  flexDirection="row"
                  columnGap={1}
                  key={payCodeIndex}
                  alignItems="center"
                >
                  <Typography className={classes.paycodeKey}>
                    {value}
                  </Typography>
                  <Typography className={classes.paycodeValue}>
                    {parseFloat(parseFloat(payCodes[value]).toFixed(2))}
                  </Typography>
                </Stack>
              );
            })}
          </Grid>
        </Stack>
        <Grid container item className={classes.currentdatacontainer} py={1}>
          <Grid
            item
            container
            xs="2"
            md={2}
            className={classes.innercurrentdatacontainer}
          ></Grid>
          <Grid item xs="10" md={10} py={1}>
            <Grid container item xs="12">
              {timesheetTableHeader.length > 0 &&
                timesheetTableHeader.map((item) => {
                  return (
                    <Grid item xs={item.width}>
                      <Grid item xs="11" style={item?.style}>
                        <Box textAlign="right">
                          <Typography className={classes.arraycontainerdata}>
                            {item.mappedKey}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        <Box className="timesheet-table">
          {newStateData.length > 0 ? (
            newStateData.map((event, parentIndex) => {
              return (
                <Accordion
                  expanded={
                    expandFlag
                      ? true
                      : expandPanel == null
                      ? false
                      : expandPanel == `Panel${parentIndex}`
                  }
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={() => {
                          setExpandFlag(false);
                          setExpandPanel(`Panel${parentIndex}`);
                        }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ marginTop: "4px" }}
                  >
                    <Grid
                      container
                      className={classes.currentdatacontainer}
                      style={{ margin: "10px 0px" }}
                    >
                      <Grid
                        item
                        xs="2"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Box className={classes.eventdatebox}>
                          <Typography className={classes.eventdate}>
                            {removeFullYear(event.date)} (
                            {moment(event.date).format("ddd")})
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs="10"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box title="Add Timesheet">
                          <AddCircleOutlineIcon
                            fontSize="small"
                            className={classes.marginRight}
                            onClick={() => {
                              if (!expandFlag) {
                                setExpandPanel(`Panel${parentIndex}`);
                              }
                              addRecord(parentIndex);
                            }}
                          />
                        </Box>
                        <Box
                          textAlign="right"
                          className={classes.eventshiftDetailsbox}
                        >
                          <Typography className={classes.eventshiftdetailText}>
                            {parseFloat(event.totalHours)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      item
                      className={classes.currentdatacontainer}
                    >
                      {event?.shiftDetails.filter((item) => !item.isDeleted)
                        ?.length == 0 ? (
                        <Grid item xs="12" style={{ backgroundColor: "white" }}>
                          <Grid item xs="12" className={classes.commonpadding}>
                            <Box textAlign={"center"}>
                              <Typography className={classes.payCode}>
                                No Data Found
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      ) : (
                        <>
                          <Grid
                            item
                            container
                            xs="2"
                            md={2}
                            style={{ backgroundColor: "white" }}
                            className={classes.innercurrentdatabackground}
                          >
                            <Grid item xs="10">
                              <Grid
                                item
                                xs="12"
                                className={classes.eventdatepadding}
                              ></Grid>
                              <Typography className={classes.shiftTimingactual}>
                                {event.shiftTiming?.actual}
                              </Typography>
                              <Typography
                                className={classes.shiftTimingschedule}
                              >
                                {event.shiftTiming?.schedule}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs="10"
                            md={10}
                            style={{
                              backgroundColor: "white",
                              padding: "10px 0px 10px 0px",
                            }}
                          >
                            {/* {console.log('shiftDetailArr', shiftDetailArr)} */}
                            <Grid container item xs="12" rowGap={1}>
                              {event?.shiftDetails.length > 0 &&
                                event?.shiftDetails.map((item, _childIndex) => {
                                  return (
                                    <>
                                      {!item.isDeleted && (
                                        <Grid
                                          container
                                          alignItems="center"
                                          className={
                                            validations.filter(
                                              (item_1) =>
                                                item_1.parentIndex ===
                                                  parentIndex &&
                                                item_1.childIndex ===
                                                  _childIndex
                                            ).length === 1
                                              ? classes.rowHighlight
                                              : ""
                                          }
                                        >
                                          <Grid
                                            item
                                            xs="1"
                                            className={classes.commonpadding}
                                          >
                                            <Box display="flex">
                                              <Box title="Remove Timesheet">
                                                <RemoveCircleIcon
                                                  fontSize="small"
                                                  className={
                                                    classes.marginRight
                                                  }
                                                  onClick={() => {
                                                    removeRecord(
                                                      parentIndex,
                                                      _childIndex
                                                    );
                                                  }}
                                                />
                                              </Box>

                                              <Box title="Copy Timesheet">
                                                <ContentCopyIcon
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  fontSize="small"
                                                  onClick={() => {
                                                    copyRecord(
                                                      parentIndex,
                                                      _childIndex
                                                    );
                                                  }}
                                                />
                                              </Box>
                                            </Box>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="2.1"
                                            className={classes.commonpadding}
                                          >
                                            <Grid item xs="11">
                                              {
                                                // item.isReadOnly == "Y" ?
                                                //     <Box textAlign="right" className={classes.eventhoursbox}>
                                                //         <Typography className={classes.payCode}>{item.hours}</Typography>
                                                //     </Box>
                                                // :
                                                <CustomTextField
                                                  type="text"
                                                  disabled={
                                                    item.isReadOnly == "Y"
                                                  }
                                                  value={
                                                    item.startTime == ""
                                                      ? item.hours
                                                      : `${formattedTime(
                                                          item.startTime
                                                        )} - ${formattedTime(
                                                          item.endTime
                                                        )}`
                                                  }
                                                  onChange={(e) => {
                                                    setUpdateFlag(true);
                                                    setBlurFlag(false);
                                                    setInputValue(
                                                      parentIndex,
                                                      _childIndex,
                                                      e.target.value,
                                                      "onChange",
                                                      "hours"
                                                    );
                                                  }}
                                                  onBlur={(e) => {
                                                    if (updateFlag) {
                                                      setBlurFlag(true);
                                                      setInputValue(
                                                        parentIndex,
                                                        _childIndex,
                                                        e.target.value,
                                                        "onBlur",
                                                        "hours"
                                                      );
                                                      setTimeout(() => {
                                                        setUpdateFlag(false);
                                                      }, 200);
                                                    }
                                                  }}
                                                  required={true}
                                                  error={
                                                    blurFlag &&
                                                    _formatTimeHour(item.hours)
                                                      .errorMsz != ""
                                                  }
                                                  // errorMsz={blurFlag && _formatTimeHour(item.hours).errorMsz}
                                                />
                                              }
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="2"
                                            className={classes.commonpadding}
                                          >
                                            <Grid item xs="11">
                                              {/* {console.log('deptpartmentJobArr', deptpartmentJobArr)} */}
                                              {
                                                // item.isReadOnly == "Y" ?
                                                // <Box textAlign="left" className={classes.getAllProjectDataArrparent}>
                                                //     <Typography
                                                //         title={readOnlyDepartName(item?.departmentId)}

                                                //         className={classes.payCode}>
                                                //         {readOnlyDepartName(item?.departmentId)}
                                                //     </Typography>
                                                // </Box>
                                                // :
                                                <CustomAutoComplete
                                                  id="Department"
                                                  required
                                                  disabled={
                                                    item.isReadOnly == "Y"
                                                  }
                                                  options={deptpartmentJobArr}
                                                  getoptionlabelkey="label"
                                                  selectedvalue={setDropdownValue(
                                                    "id",
                                                    item.departmentId,
                                                    deptpartmentJobArr
                                                  )}
                                                  onChange={(e, value) => {
                                                    setInputValue(
                                                      parentIndex,
                                                      _childIndex,
                                                      value.id,
                                                      "onChange",
                                                      "departmentId"
                                                    );
                                                  }}
                                                />
                                              }
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="1.7"
                                            className={classes.commonpadding}
                                          >
                                            <Grid item xs="11">
                                              {
                                                // item.isReadOnly == "Y" ?
                                                //     <Box textAlign="left" className={classes.getAllTaskDataArrparent}>
                                                //         <Typography
                                                //             title={readOnlyJobName(item?.jobId, item.jobArr)}
                                                //             className={classes.payCode}>{
                                                //                 readOnlyJobName(item?.jobId, item.jobArr)}
                                                //         </Typography>
                                                //     </Box>
                                                // :
                                                <CustomAutoComplete
                                                  id="job"
                                                  required
                                                  disabled={
                                                    item.isReadOnly == "Y"
                                                  }
                                                  options={getJobArr(
                                                    item.departmentId
                                                  )}
                                                  getoptionlabelkey="label"
                                                  selectedvalue={setJobArrDropdownValue(
                                                    "id",
                                                    item.jobId,
                                                    item.departmentId
                                                  )}
                                                  onChange={(e, value) => {
                                                    setInputValue(
                                                      parentIndex,
                                                      _childIndex,
                                                      value.id,
                                                      "onChange",
                                                      "jobId"
                                                    );
                                                  }}
                                                />
                                              }
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="1.7"
                                            className={classes.commonpadding}
                                          >
                                            <Grid item xs="11">
                                              {
                                                // item.isReadOnly == "Y" ?
                                                //     <Box textAlign="left" className={classes.payCodebox}>
                                                //         <Typography className={classes.payCode}>{item.payCodeName}</Typography>
                                                //     </Box>
                                                //     :
                                                <CustomAutoComplete
                                                  id="PayCode"
                                                  required
                                                  disabled={
                                                    item.isReadOnly == "Y"
                                                  }
                                                  options={paycodeArr}
                                                  getoptionlabelkey="label"
                                                  selectedvalue={setDropdownValue(
                                                    "name",
                                                    item.payCodeName,
                                                    paycodeArr
                                                  )}
                                                  onChange={(e, value) => {
                                                    setInputValue(
                                                      parentIndex,
                                                      _childIndex,
                                                      value.name,
                                                      "onChange",
                                                      "payCodeName"
                                                    );
                                                  }}
                                                />
                                              }
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="1.6"
                                            className={classes.commonpadding}
                                          >
                                            {
                                              // item.isReadOnly == "Y" ?
                                              //     <Box textAlign="left" className={classes.commentbox}>
                                              //         <Typography title={item.comment} className={classes.comment}>{item.comment}</Typography>
                                              //     </Box>
                                              //     :
                                              <CustomTextField
                                                type="text"
                                                value={item.comment}
                                                disabled={
                                                  item.isReadOnly == "Y"
                                                }
                                                onChange={(e) => {
                                                  setUpdateFlag(true);
                                                  setBlurFlag(false);
                                                  setInputValue(
                                                    parentIndex,
                                                    _childIndex,
                                                    e.target.value,
                                                    "onChange",
                                                    "comment"
                                                  );
                                                }}
                                                onBlur={(e) => {
                                                  if (updateFlag) {
                                                    setBlurFlag(true);
                                                    setInputValue(
                                                      parentIndex,
                                                      _childIndex,
                                                      e.target.value,
                                                      "onBlur",
                                                      "comment"
                                                    );
                                                    setTimeout(() => {
                                                      setUpdateFlag(false);
                                                    }, 200);
                                                  }
                                                }}
                                              />
                                            }
                                          </Grid>
                                          <Grid
                                            item
                                            xs="1"
                                            className={classes.commonpadding}
                                          >
                                            {item.isSaved ? (
                                              <Box
                                                className={classes.saveIcon}
                                                title="Save Timesheet"
                                              >
                                                <SaveIcon
                                                  fontSize="medium"
                                                  color="blue"
                                                  onClick={saveAllPayroll}
                                                />
                                              </Box>
                                            ) : null}
                                          </Grid>
                                          <Grid
                                            item
                                            xs="0.6"
                                            className={classes.commonpadding}
                                            style={{ textAlign: "right" }}
                                          >
                                            <Typography>
                                              {item.previousHours}
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs="11"
                                            className={classes.commonpadding}
                                            ml={"90px"}
                                          >
                                            {/* {console.log('_formatTimeHour', _formatTimeHour(item.hours))} */}
                                            {blurFlag &&
                                              _formatTimeHour(item.hours)
                                                .errorMsz != "" && (
                                                <Typography
                                                  style={{
                                                    color: "#d32f2f",
                                                    fontSize: 12,
                                                  }}
                                                >
                                                  <Box>
                                                    {
                                                      _formatTimeHour(
                                                        item.hours
                                                      ).errorMsz
                                                    }
                                                  </Box>
                                                </Typography>
                                              )}
                                          </Grid>
                                        </Grid>
                                      )}
                                    </>
                                  );
                                })}
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <Box width={1} textAlign="center" my={2} mt={4}>
              <Loader isLoading={true} size={50} />
            </Box>
          )}
        </Box>
      </Box>
    </CustomDialog>
  );
};

const useStyles = makeStyles(() => ({
  maincontainer: {
    backgroundColor: "#EEEEEE !important",
  },
  innercontainer: {
    display: "flex !important",
    justifyContent: "space-between !important",
    padding: "10px !important",
  },
  totalhourstext: {
    fontSize: "14px !important",
  },
  gettotalhourstext: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  text: {
    fontSize: "14px !important",
    textAlign: "center !important",
  },
  gettext: {
    fontWeight: "bold !important",
    textAlign: "center !important",
    fontSize: "16px !important",
  },
  innerContainer2: {
    justifyContent: "flex-end !important",
  },
  wrapdata: {
    backgroundColor: "#EBF3FF !important",
    padding: "12px 10px !important",
    margin: "10px 0px 0 !important",
  },
  wrapdatainner: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
  },
  wrappadding: {
    padding: "0px 0px 0px 12px  !important",
  },
  commonpadding: {
    padding: "5px 5px 0px 0px !important",
  },
  saveIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#145c9e",
    cursor: "pointer",
  },
  rowHighlight: {
    backgroundColor: "antiquewhite",
  },
  marginRight: {
    marginRight: "5px",
    color: "red",
    cursor: "pointer",
  },
  arraycontainer: {
    justifyContent: "center !important",
  },
  paycodeKey: {
    textAlign: "left !important",
    fontSize: "14px !important",
    color: "#000000 !important",
    fontWeight: "bold !important",
  },
  paycodeValue: {
    textAlign: "left !important",
    fontSize: "14px !important",
    color: "#000000 !important",
  },
  arraycontainerdata: {
    textAlign: "left !important",
    fontSize: "14px !important",
    color: "#000000 !important",
    fontWeight: "bold !important",
  },
  currentdatacontainer: {
    backgroundColor: "#EBF3FF !important",
    padding: "0px !important",
    margin: "0!important",
  },
  innercurrentdatacontainer: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
  },
  innercurrentdatabackground: {
    justifyContent: "space-between !important",
    alignItems: "center !important",
    backgroundColor: "white !important",
    paddingLeft: "10px !important",
  },
  shiftTimingactual: {
    color: "#107C41 !important",
    fontSize: "14px !important",
  },
  shiftTimingschedule: {
    color: "#D90000 !important",
    fontSize: "14px !important",
  },
  eventdatepadding: {
    padding: "px 0px 6px 0px !important",
  },
  eventdatebox: {
    // backgroundColor: "#fff !important",
    // borderColor: "#124590 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  eventdate: {
    color: "#124590 !important",
    paddingLeft: "10px !important",
  },
  eventhoursbox: {
    //   backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  eventhours: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
  },
  getAllProjectDataArrparent: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,

    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  getAllProjectDataEllipses: {
    textOverflow: "ellipsis !important",
    whiteSpace: "nowrap !important",
    overflow: "hidden !important",
  },
  getAllProjectDataArrchild: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
  },

  getAllTaskDataArrparent: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  getAllTaskDataArrchild: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    whiteSpace: "nowrap !important",
  },
  payCodebox: {
    // backgroundColor: "#fff !important",
    // padding: "2px 5px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  payCode: {
    textOverflow: "ellipsis !important",
    whiteSpace: "nowrap !important",
    overflow: "hidden !important",
    color: "#000 !important",
    fontSize: "14px !important",
    lineHeight: "28px !important",
    marginRight: "10px !important",
    "& p": {
      fontSize: "14px !important",
    },
  },
  commentbox: {
    // backgroundColor: "#fff !important",
    // padding: "2px 15px !important",
    minHeight: 34,
    // borderColor: "#E3E3E3 !important",
    // borderWidth: 1,
    // borderStyle: "solid !important"
  },
  comment: {
    color: "#000 !important",
    fontSize: 14,
    lineHeight: "28px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    whiteSpace: "nowrap !important",
  },
  eventshiftDetailsbox: {
    // padding: "2px 0px !important",
    minHeight: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  eventshiftdetailText: {
    color: "#124590 !important",
    fontSize: "14px !important",
    fontWeight: 600,
    textAlign: "right !important",
    marginRight: "10px !important",
  },
  cursor_manage: {
    cursor: "pointer",
    fontSize: "14px !important",
  },
  header_manage: {
    marginRight: "30px",
  },
}));
