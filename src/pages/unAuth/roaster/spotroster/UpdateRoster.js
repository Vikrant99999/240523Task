import { Typography, Grid, Box, Autocomplete, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AssignTable from "./AssignTable";
import {
  GetSingleShift,
  workDuration,
  getallStaffData,
  getJobTitleById,
  getDepartmentById,
  saveRosterProfile,
} from "../../../../services/api";
import SearchIcon from "@material-ui/icons/Search";
import StaffModal from "./StaffModal";
import DepatmentPopup from "./DepatmentPopup";
import JobTitleModal from "./JobTitleModal";
import DutyManagerModal from "./DutyManagerModal";

import { useQuery } from "react-query";
import DeleteRoster from "./DeleteRoster";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { workLocation, onCall, Emergency } from "../../../../services/api";
import { DutyManager, Department, JobTitle } from "../../../../services/api";
import AddIcon from "@mui/icons-material/Add";
import AssignRoster from "./AssignRoster";
import WorkDurationModal from "./WorkDurationModal";
import moment from "moment";
import RequiredTitle from "../../../../utils/RequiredTitle";
// import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from "react-redux";
import { updateState } from "../../../../redux/commonSlice";

const UpdateRoster = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commonReducer = useSelector((state) => state.commonReducer);
  const [getSingleShift, setGetSingleShift] = React.useState([]);
  const {
    setStatus1,
    personRosterId,
    personRosterPivoteId,
    personIdRoster,
    jobTitleIdRoster,
    departmentIdRoster,
    selectWorkDuration,
    datw,
    setSnakeBarProps,
    getEmployeeList,
  } = props;
  const searchBoxValue = props.SelectedValue;
  const setSearchBoxValue = props.setSelectedValue;
  const setState_ur = props.setState;
  const State_ur = props.state;
  const workDurationArr2 = props.workDurationArr;
  const [stateValue, setStateValue] = React.useState(searchBoxValue);
  const [openDelete, setOpenDelete] = useState(false);
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [index, setIndex] = React.useState({});
  const [status, setStatus] = React.useState(0);
  const [workLocationArr, setWorkLocationArr] = useState();
  const [emergency, setEmergency] = useState([]);

  const [departmentArr, setDepartmentArr] = useState([]);
  const [jobTitleArray, setJobTitleArray] = useState([]);
  const [dutyManagerArr, setDutyManagerArr] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [location, setLocation] = useState([]);

  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  const [changeTextValue, setChangeTextValue] = React.useState();
  const [selectDutyManager, setSelectDutyManager] = React.useState();
  const [selectDepartment, setSelectDepartment] = React.useState({});
  const [selectJobTitle, setSelectJobTitle] = React.useState();
  const [tabledata, setTabledata] = useState();
  const [dat, setDat] = useState(datw);
  const [openAddAnother, setOpenAddAnother] = useState(false);

  const [state, setState] = useState(-1);
  const [state1, setState1] = useState(-1);
  const [state2, setState2] = useState(-1);
  const [state3, setState3] = useState(-1);
  const [staffData, setStaffData] = useState([]);

  const handleChange1 = (index, item) => {
    // console.log("datw", datw);
    setDat(item);
    setChangeTextValue(item);
    setState(index);
  };

  const handleChangeDutyManager = (index, item) => {
    var ar = {
      ...dat,
      dutyManager: item.staffName,
    };
    setDat(ar);
    setState1(index);
    setSelectDutyManager(item);
  };

  const handleChangeDepartment = (index, item) => {
    var ar = dat;
    ar = {
      ...ar,
      departmentId: item.departmentId,
      departmentName: item.departmentName,
      jobTitle: "",
      jobTitleId: "",
    };
    setDat(ar);
    setState2(index);
    setSelectDepartment(item);
  };

  const handleChangeJobTitle = (index, item) => {
    var ar = dat;
    ar = { ...ar, jobTitle: item.jobTitle, jobTitleId: item.jobTitleId };
    setDat(ar);
    setState3(index);
    setSelectJobTitle(item);
  };

  const btnClick = (e) => {
    setStatus(e);
  };

  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  // const [openDelete]
  const handleClose = () => {
    setStatus1(0);
  };

  const { data: getSingleShiftRoster } = useQuery(
    ["getSingleShift", personRosterPivoteId, personRosterId],
    () =>
      GetSingleShift({
        loginUserId: commonReducer.userId,
        personRosterPivoteId: personRosterPivoteId,
        personRosterId: personRosterId,
      }),
    { enabled: true, retry: false }
  );
  useEffect(() => {
    if (getSingleShiftRoster) {
      var shift = getSingleShiftRoster?.data?.data;
      setGetSingleShift(shift);
      setIndex(shift.workDurationDto);
      console.log("single shift", shift);
      dispatch(
        updateState({
          effectiveDate: shift.effectiveDate,
        })
      );
    }
  }, [getSingleShiftRoster]);

  // console.log(getSingleShift?.workDurationDto)
  //

  const {
    data: getAllWorkDuration,
    error,
    isLoading,
  } = useQuery(["getworkDuration"], () => workDuration(), {
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (getAllWorkDuration) {
      setWorkDurationArr(getAllWorkDuration?.data?.data);
    }
  }, [getAllWorkDuration]);

  const onCountryChange = (object, value) => {
    for (let i in workDurationArr) {
      if (workDurationArr[i].workDurationCode === value) {
        setIndex(workDurationArr[i]);
      }
    }
  };
  const [open, setOpen] = useState(false);
  const openWorkDurationPopup = () => {
    setOpen(true);
  };
  const closeWorkDurationPopup = () => {
    setOpen(false);
  };
  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };

  const getDateMonth = (value) => {
    var str = moment(value).format("D/M/(dd)");
    var str = str.split("(");
    var date = str[0].split("/")[0];
    date = date > 10 ? date : "0" + date;
    var month = str[0].split("/")[1];
    month = month > 10 ? month : "0" + month;
    var weekday = str[1].split(")")[0][0];
    return `${date}/${month}(${weekday})`;
  };
  console.log("dat", dat);
  console.log("staffdata", staffData);

  const UpdateRosterProfile = (e) => {
    const key = getDateMonth(commonReducer.effectiveDate);

    var personRosterId = "";
    personRosterId =
      dat?.shiftInformation[key]?.shiftInfoList[0]?.personRosterId;
    personRosterId = parseInt(personRosterId);
    var raw = JSON.stringify({
      effectiveDate: commonReducer.effectiveDate,
      staffDto: {
        departmentId: parseInt(dat?.departmentId),
        dutyManager: dat?.dutyManager,
        emergency: dat?.emergency,
        jobTitleId: parseInt(dat?.jobTitleId),
        onCall: dat?.onCall,
        personId: dat?.personId,
        personRosterId: personRosterId,
        workLocationId: dat?.workLocationId,
      },
      userId: commonReducer?.userId,
      workDurationDto: {
        workDurationId: index.workDurationId,
        workDurationCode: index.workDurationCode,
        timeStart: index.timeStart,
        timeEnd: index.timeEnd,
        shiftHours: index.shiftHours,
        sun: "Y",
        mon: "Y",
        tue: "Y",
        wed: "Y",
        thu: "Y",
        fri: "Y",
        sat: "Y",
      },
    });
    saveRosterProfileMutate(raw);
    setStatus1(0);
  };

  const { mutate: saveRosterProfileMutate } = useMutation(saveRosterProfile, {
    onSuccess: (data, context, variables) =>
      saveRosterProfileSuccess(data, context, variables),
    onError: (data, context, variables) =>
      saveRosterProfileError(data, context, variables),
  });

  const saveRosterProfileSuccess = (data) => {
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Information",
      details: [`${data.data.data}`],
      type: "info",
    });
    setStatus1(0);
    getEmployeeList();
  };

  const saveRosterProfileError = (data) => {
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Error",
      details: [`${data.message}`],
      type: "error",
    });
    getEmployeeList();
  };

  const { mutate: staffListMutate } = useMutation(getallStaffData, {
    onSuccess: (data, context, variables) =>
      onSuccessProfileList1(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProfileList1(data, context, variables),
  });

  const onSuccessProfileList1 = (data) => {
    setStaffData(data?.data?.data);
  };

  const onErrorProfileList1 = (data) => {};
  useEffect(() => {
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
      staffListMutate({
        asc: true,
        pageNo: "0",
        pageSize: "1000",
        sortingField: "fullName",
        userId: commonReducer.userId,
      });
  }, []);

  //api integration for oncall,workLocation and emergency
  const { data: getAllWorkLocation } = useQuery(
    ["getworkLocation"],
    () => workLocation(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllWorkLocation) {
      setWorkLocationArr(getAllWorkLocation?.data?.data);
    }
  }, [getAllWorkLocation]);

  useEffect(() => {
    if (workLocationArr?.length > 0) {
      workLocationArr?.map((option) => {
        setLocation(option);
      });
    }
  });

  //

  const { data: getAllEmergency } = useQuery(
    ["getemergency"],
    () => Emergency(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllEmergency) {
      setEmergencyArr(getAllEmergency?.data?.data);
    }
  }, [getAllEmergency]);

  useEffect(() => {
    if (emergencyArr?.length > 0) {
      emergencyArr?.map((option) => {
        setEmergency(option);
      });
    }
  });

  //
  const { data: getOnCall } = useQuery(["getoncall"], () => onCall(), {
    enabled: true,
    retry: false,
  });
  useEffect(() => {
    if (getOnCall) {
      setOnCallArr(getOnCall?.data?.data);
    }
  }, [getOnCall]);

  //api inetgartion for dutymanager,depatment,jobtitle
  const { data: getAllDepartment } = useQuery(
    ["getDepartment"],
    () =>
      getDepartmentById({
        userId: commonReducer.userId,
        profileId: commonReducer.selectedProjectObj.profileId,
      }),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDepartment) {
      setDepartmentArr(getAllDepartment?.data?.data);
    }
  }, [getAllDepartment]);

  //jobTitle
  const { data: getAllJobTitle } = useQuery(
    ["getJobTitle", dat?.departmentId],
    () =>
      getJobTitleById({
        userId: commonReducer.userId,
        name: "department",
        departmentId: dat.departmentId,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllJobTitle) {
      setJobTitleArray(getAllJobTitle?.data?.data);
    }
  }, [getAllJobTitle]);

  //dutymanager
  const { data: getAllDutyManager } = useQuery(
    ["getDutyManager"],
    () => DutyManager(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDutyManager) {
      setDutyManagerArr(getAllDutyManager?.data?.data);
    }
  }, [getAllDutyManager]);

  const handleChangeOnCall = (item) => {
    var localData = { ...dat, onCall: item };
    setDat(localData);
  };
  const handleChangeOnEmergency = (item) => {
    var localData = { ...dat, emergency: item };
    setDat(localData);
  };
  // debugger
  return (
    <>
      <CustomDialog
        maxWidth="xl"
        dialogTitle="Assign"
        open="true"
        handleClose={handleClose}
      >
        <Grid xs="12" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography style={{ color: "red", fontSize: "10px" }}>
            *Overlapped shifts will be replaced.
          </Typography>
        </Grid>
        <Grid container style={{ border: "1px solid  #dbdbdb " }}>
          <Grid item xs="12">
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  color: "#124590",
                }}
              >
                Times
              </Typography>

              <CustomButton
                btnText="Add another shift"
                startIcon={<AddIcon className={classes.addIcon} />}
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  marginLeft: "10px",
                }}
                onClick={() => setOpenAddAnother(true)}
              />
            </Box>
            <Grid
              item
              xs="10"
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              <Grid xs="4">
                <Grid>
                  <Box style={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      Effective Date
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "10px",
                      }}
                    >
                      {getSingleShift?.effectiveDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ marginTop: "20px" }}>
                  <Box>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <CustomTextField />
                  </Box>
                </Grid>
              </Grid>
              <Grid
                xs="12"
                style={{ marginLeft: "50px", marginBottom: "10px" }}
              >
                <Box className={classes.contentBox}>
                  <Grid xs={1.8}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Work Duration
                    </Typography>
                  </Grid>

                  <Grid xs="4">
                    <Autocomplete
                      id="free-solo-demo"
                      disableClearable
                      title={
                        Object.keys(index).length === 0
                          ? ""
                          : index?.workDurationCode
                      }
                      value={
                        Object.keys(index).length === 0
                          ? ""
                          : index?.workDurationCode
                      }
                      options={workDurationArr?.map(
                        (option) => option?.workDurationCode
                      )}
                      ListboxProps={{
                        style: {
                          // padding: "10px",
                          fontSize: "14px",
                          fontFamily: "Inter",
                        },
                      }}
                      style={{
                        width: 300,
                        // border: "1px solid black",
                        paddingLeft: "0px",
                      }}
                      onChange={onCountryChange}
                      renderInput={(params) => (
                        <CustomTextField {...params}></CustomTextField>
                      )}
                    />
                  </Grid>
                  <Grid sx={{ marginLeft: "20px" }}>
                    <Box sx={{ ml: 5, mt: 0.5 }}>
                      <RequiredTitle
                        title="Search Work Duration"
                        value={
                          <SearchIcon
                            onClick={openWorkDurationPopup}
                            className={classes.searchWorkDuration}
                          />
                        }
                      />
                    </Box>
                  </Grid>
                </Box>

                <Grid>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" "}
                      Start Time
                    </Typography>
                    <CustomTextField
                      value={getDate(index?.timeStart)}
                      style={{ width: 300, marginLeft: "45px" }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                      }}
                    >
                      End Time
                    </Typography>
                    <CustomTextField
                      value={getDate(index?.timeEnd)}
                      style={{ width: 300, marginLeft: "52px" }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        textAlign: "center",
                      }}
                    >
                      Shift Hrs
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        marginLeft: "70px",
                      }}
                    >
                      {index?.shiftHours}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            border: "1px solid  #dbdbdb ",
            marginTop: "20px",
            overflow: "scroll",
          }}
        >
          <Box className={classes.headerBox}>
            <Typography className={classes.headerText}>
              All Staff With Preferences
            </Typography>
          </Box>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px solid  black ",
              marginTop: "10px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Staff
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    marginLeft: "5px",
                  }}
                >
                  Employee Number
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Department
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  JobTitle
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Work Location
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  DutyManager
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  On Call
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                    textAlign: "center",
                  }}
                >
                  Emergency
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              border: "1px solid black",
            }}
          >
            <Grid>
              <Box style={{ width: "300px" }}>
                <CustomTextField
                  value={
                    dat?.staffName
                      ? dat?.staffName + ` [${dat?.employeeNumber}]`
                      : dat?.fullName + ` [${dat?.employeeNumber}]`
                  }
                  endIcon={
                    <SearchIcon
                      onClick={() => btnClick(1)}
                      style={{
                        marginLeft: "2px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "wrap",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {dat?.employeeNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <CustomTextField
                  value={
                    dat?.department ? dat?.department : dat?.departmentName
                  }
                  endIcon={
                    <SearchIcon
                      onClick={() => btnClick(2)}
                      style={{
                        marginLeft: "2px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <CustomTextField
                  value={dat?.jobTitle}
                  endIcon={
                    <SearchIcon
                      onClick={() => btnClick(3)}
                      style={{
                        marginLeft: "2px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <Autocomplete
                  title={dat?.workLocation}
                  id="free-solo-demo"
                  disableClearable
                  value={dat.workLocation}
                  options={
                    workLocationArr === undefined ||
                    workLocationArr.length === 0
                      ? []
                      : workLocationArr?.map((option) => {
                          return option?.locationName;
                        })
                  }
                  renderInput={(params) => (
                    <CustomTextField {...params}></CustomTextField>
                  )}
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <CustomTextField
                  value={selectDutyManager?.staffName.trim() || ""}
                  onChange={(e) => {
                    setSelectDutyManager({ staffName: e.target.value });
                    setState1(-1);
                  }}
                  endIcon={
                    <SearchIcon
                      style={{
                        marginLeft: "2px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => btnClick(4)}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <Autocomplete
                  id="free-solo-demo"
                  disableClearable
                  options={onCallArr?.map((option) => option?.valueMeaning)}
                  renderInput={(params) => (
                    <CustomTextField {...params}></CustomTextField>
                  )}
                  onChange={(e, value) => {
                    var index = onCallArr.findIndex(
                      (item) => item.valueMeaning === value
                    );
                    if (index !== -1) {
                      handleChangeOnCall(onCallArr[index].valueMeaning);
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid>
              <Box style={{ width: "300px" }}>
                <Autocomplete
                  id="free-solo-demo"
                  disableClearable
                  options={emergencyArr?.map((option) => option?.valueMeaning)}
                  renderInput={(params) => (
                    <CustomTextField {...params}></CustomTextField>
                  )}
                  onChange={(e, value) => {
                    var index = emergencyArr.findIndex(
                      (item) => item.valueMeaning === value
                    );
                    if (index !== -1) {
                      handleChangeOnEmergency(emergencyArr[index].valueMeaning);
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: "10px" }}>
          <Grid style={{ display: "Flex", flexDirection: "row" }}>
            <Box>
              <CustomButton
                btnText="Save"
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={UpdateRosterProfile}
              />
            </Box>
            <Box>
              <CustomButton
                btnText="Delete"
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={openDeleteModal}
              />
            </Box>
            <Box>
              <CustomButton
                btnText="Cancel"
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={handleClose}
              />
            </Box>
          </Grid>
        </Grid>
      </CustomDialog>
      {openDelete && (
        <DeleteRoster
          setStatus1={setStatus1}
          toggleHandler={setOpenDelete}
          personRosterId={personRosterId}
          setSnakeBarProps={setSnakeBarProps}
          getEmployeeList={getEmployeeList}
        />
      )}
      {status === 1 && (
        <StaffModal
          toggleHandler={setStatus}
          staffData={staffData}
          selectedValue={selectedValue}
          handleChange1={handleChange1}
          state={state}
          setState={setState}
        />
      )}
      {status === 2 && (
        <DepatmentPopup
          toggleHandler={setStatus}
          departmentArr={departmentArr}
          handleChangeDepartment={handleChangeDepartment}
          state2={state2}
          setState2={setState2}
        />
      )}
      {status === 3 && (
        <JobTitleModal
          toggleHandler={setStatus}
          jobTitleArr={jobTitleArray}
          selectJobTitle={selectJobTitle}
          setSelectJobTitle={setSelectJobTitle}
          handleChangeJobTitle={handleChangeJobTitle}
          state3={state3}
          setState3={setState3}
        />
      )}
      {status === 4 && (
        <DutyManagerModal
          toggleHandler={setStatus}
          dutyManagerArr={dutyManagerArr}
          selectDutyManager={selectDutyManager}
          setSelectDutyManager={setSelectDutyManager}
          handleChangeDutyManager={handleChangeDutyManager}
          state1={state1}
          setState1={setState1}
        />
      )}

      {open && (
        <WorkDurationModal
          toggleHandler={setOpen}
          workDurationArr={workDurationArr}
          selectedValue={searchBoxValue}
          setSelectedValue={setSearchBoxValue}
          handleChange1={handleChange1}
          state={state}
          setState={setState}
          selectWorkDuration={selectWorkDuration}
          closePopup={closeWorkDurationPopup}
          index={index}
          onCountryChange={onCountryChange}
        />
      )}
      {openAddAnother && (
        <AssignRoster
          openAnotherShift={openAddAnother}
          close={setOpenAddAnother}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </>
  );
};

export default UpdateRoster;

const useStyles = makeStyles((theme) => ({
  headerBox: {
    margin: "5px 0px 0px 10px",
  },
  headerText: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bolder",
    color: "#4594D7",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchWorkDuration: {
    color: "#145c9e",
    "&:hover": {
      cursor: "pointer",
    },
  },
  text1: {
    fontSize: "8px",
    fontFamily: "Inter",
  },
  textField: {
    backgroundColor: "red",
  },
  text: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));
