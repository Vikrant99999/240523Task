import React, { useState, useEffect } from "react";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateState } from "../../../../redux/commonSlice";

import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

import AddStaffAssign from "./AddStaffAssign";
import WorkDuration from "./WorkDuration";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";

import { CustomButton } from "../../../../components/Button";
import "react-datepicker/dist/react-datepicker.css";
import { CustomTextField } from "../../../../components/TextField";

import {
  dateConverter,
  dateConverterWithoutYear,
} from "../../../../utils/commonService";

import { Option1 } from "../../../../services/api";
import { useMutation } from "react-query";
import { workDuration } from "../../../../services/api";
import { workLocation, onCall, Emergency } from "../../../../services/api";
import { useQuery } from "react-query";
import { getallStaffData } from "../../../../services/api";
import RequiredTitle from "../../../../utils/RequiredTitle";
// import { dateConverter } from '../../../utils/commonService';

// import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  popupContent: {
    backgroundColor: "#fff",
    border: "1px solid  rgb(233, 233, 233)",
    minWidth: "max-content",
    margin: "10px 0px 0px 0px",
  },
  iconStyle: {
    color: "#5BB75B",
  },
  cancelIconStyle: {
    color: "#f51414",
  },
  headerBox: {
    margin: "5px 0px 0px 10px",
  },
  headerText: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#4594D7",
  },
  dateBox: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
  },
  dateText: {
    fontSize: "8px",
    fontFamily: "Inter",
    color: "red",
  },
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center !important",
    marginLeft: "10px",
  },
  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  dateBoxGrid: {
    display: "flex",
    flexDirection: "column !important",
  },
}));

const OptionRoaster = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const { status, togglehandler, getEmployeeList, setSnakeBarProps } = props;
  const [save, setSave] = useState("");
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [workLocationArr, setWorkLocationArr] = useState();

  const [location, setLocation] = useState([]);

  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  const [emergency, setEmergency] = useState([]);

  const [index, setIndex] = React.useState({});
  const [state, setState] = React.useState(-1);
  const [selectedValue, setSelectedValue] = React.useState({});

  const [staffTableArr, setStaffTableArr] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [jobTitleArr, setJobTitleArr] = useState("");
  const [emergencyTableArr, setEmergencyTableArr] = React.useState("");
  const [onCallTableArr, setOnCallTableArr] = React.useState("");
  const [dutyManagerTableArr, setDutyManagerTableArr] = React.useState("");
  const [val, setVal] = useState(
    props.defaultPerson ? [props.defaultPerson] : []
  );
  const [apiData, setApiData] = useState({});

  const handleChange1 = (index, option) => {
    setSelectedValue(option);
    setState(index);
  };
  const selectWorkDuration = () => {
    // console.log(selectedValue.workDurationCode)
  };

  const classes = useStyles();

  const dispatch = new useDispatch();
  const [startDateForText, setStartDateForText] = useState("");

  const [startDate, setStartDate] = useState(
    new Date(commonReducer.effectiveDate)
  );

  // console.log(dateConverter(moment(endDate).format('DD-MM-YYYY')));
  const [endDateForText, setEndDateForText] = useState("");
  const [endDate, setEndDate] = useState(
    new Date(new Date(commonReducer.effectiveDate))
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [worksee, setWorksee] = useState(false);

  const isWorkSeeVisible = () => {
    return new Date(endDate) > new Date(startDate);
  };

  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open1 ? "simple-popover" : undefined;
  const id2 = open2 ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const getFormattedDate = (currentDate) => {
    return moment(currentDate).format("DD-MM-YYYY");
  };

  const handleChange = (e) => {
    setStartDate(e);
    setStartDateForText(
      e.getMonth() + 1 + "-" + e.getDate() + "-" + e.getFullYear()
    );
    setAnchorEl(null);
  };
  const handleChange12 = (e) => {
    setEndDate(e);
    setEndDateForText(
      e.getMonth() + 1 + "-" + e.getDate() + "-" + e.getFullYear()
    );
    setAnchorEl2(null);
  };

  useEffect(() => {
    if (isWorkSeeVisible()) {
      setWorksee(true);
    } else {
      setWorksee(false);
    }
  }, [startDateForText, endDateForText]);
  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const { mutate: optionListMutate } = useMutation(Option1, {
    onSuccess: (data, context, variables) =>
      onSuccessProfileList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProfileList(data, context, variables),
    // retryDelay:retryDelay,
  });

  const onSuccessProfileList = (data) => {
    console.log(data);
    setSave(data?.data?.data);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: data?.data?.data,
      // details: err,
      type: "success",
    });
    getEmployeeList();
  };
  const onErrorProfileList = (data) => {
    getEmployeeList();
    setSnakeBarProps({
      snackbarFlag: true,
      msz: data?.message,
      // details: err,
      type: "error",
    });
  };
  const isEmpty = (value) => {
    return ["", undefined, null].includes(value) ? true : false;
  };
  const formatDate = (value) => {
    var str = value.split("-");
    value = [str[0], str[1], str[2]].join("-");
    return value;
  };
  const saveBtnClick = () => {
    var err = [];
    var fromDate = isEmpty(startDateForText)
      ? commonReducer.effectiveDate
      : startDateForText;
    var toDate = isEmpty(endDateForText)
      ? commonReducer.effectiveDate
      : endDateForText;
    if (new Date(fromDate) > new Date(toDate)) {
      err.push("To Date should be after From Date.");
    }

    fromDate = formatDate(fromDate);
    toDate = formatDate(toDate);

    var days = {};

    Object.keys(CheckDays).map((key) => {
      days[key] = CheckDays[key] ? "Y" : "N";
    });

    var localVal = [];
    val.map((item) => {
      var employee = {
        personId: 0,
        // personRosterId: 4907337,
        departmentId: 0,
        jobTitleId: 0,
        dutyManager: "",
        workLocationId: 0,
        onCall: "",
        emergency: "",
      };

      Object.keys(employee).map((key) => {
        if (item[key]) {
          employee[key] = item[key];
        }
      });
      localVal.push(employee);
    });

    var saveOption1 = {
      fromDate: dateConverter(moment(fromDate).format("DD-MM-YYYY")),
      toDate: dateConverter(moment(toDate).format("DD-MM-YYYY")),
      staffDtoList: localVal,
      userId: commonReducer?.userId,
      workDurationDto: {
        ...days,
        timeStart: index.timeStart,
        timeEnd: index.timeEnd,
        shiftHours: index.shiftHours,
        workDurationCode: index.workDurationCode,
        workDurationId: index.workDurationId,
      },
    };

    if (isEmpty(saveOption1.workDurationDto.workDurationId)) {
      err.push("Work Duration is required");
    }
    if (localVal.length === 0) {
      err.push("Please add staff.");
    }
    var keyFields = [
      { key: "jobTitleId", message: "Job Title is required" },
      { key: "workLocationId", message: "Work Location is required" },
    ];

    saveOption1.staffDtoList.map((item) => {
      keyFields.map((fields) => {
        if (isEmpty(item[fields.key])) {
          err.push(fields.message);
        }
      });
    });

    if (err.length > 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Error",
        details: err,
        type: "error",
      });
    } else {
      console.log("save Option 1: ", saveOption1, val);
      optionListMutate(saveOption1);
      props.togglehandler(false);
    }
  };

  //workDuration api integration

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
    if (value) {
      for (let i in workDurationArr) {
        if (workDurationArr[i].workDurationCode == value) {
          setIndex(workDurationArr[i]);
        }
      }
    } else {
      resetIndex();
    }
  };
  const resetIndex = () => {
    setIndex({});
  };
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

  const [open, setOpen] = useState(false);

  const [addStaffArr, setAddStaffArr] = useState([]);
  const [filterData, setFilterData] = React.useState([]);

  const onChangeCheck = (value, currentIndex) => {
    var finalarr = filterData;

    if (!finalarr.includes(staffData[currentIndex])) {
      finalarr.push(staffData[currentIndex]);
    }

    setFilterData(finalarr);
  };

  const handleAdd = (newCheckedList) => {
    var personIds = val.map((item) => item.personId);
    var localNewCheckedList = newCheckedList.filter(
      (item) => !personIds.includes(item.personId)
    );

    setVal([...val, ...localNewCheckedList]);
    setOpen(false);
  };

  const openAddStaff = () => {
    setOpen(true);
  };
  const [staffData, setStaffData] = useState([]);

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

  return (
    <Grid container style={{ marginTop: "10px" }}>
      <Grid
        item
        xs="12"
        className={classes.popupContent}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs="5">
          <Grid container>
            <Grid item xs="12">
              <Box className={classes.headerBox}>
                <Typography className={classes.headerText}>Times</Typography>
              </Box>
            </Grid>
            <Grid className={classes.dateBoxGrid}>
              <Box className={classes.dateBox} style={{ marginLeft: "10px" }}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                  }}
                >
                  <RequiredTitle title="Required" value={"*"} />
                  From Date
                </Typography>

                <Box style={{ marginLeft: "20px" }}>
                  <Box className="calender-widget-wrap" onClick={handleClick}>
                    <Typography
                      component="span"
                      className={classes.calenderdropdown}
                    >
                      {startDateForText == ""
                        ? dateConverter(getFormattedDate(startDate))
                        : dateConverter(getFormattedDate(startDateForText))}

                      <CalendarMonthIcon className={classes.calendericon} />
                    </Typography>
                  </Box>
                  <Popover
                    id={id}
                    open={open1}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    <DatePicker
                      selected={
                        startDateForText == ""
                          ? startDate
                          : new Date(startDateForText)
                      }
                      onChange={handleChange}
                      inline
                    />
                  </Popover>
                </Box>
              </Box>

              <Box className={classes.dateBox} style={{ marginLeft: "28px" }}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                  }}
                >
                  <RequiredTitle title="Required" value={"*"} />
                  To Date
                </Typography>

                <Box style={{ marginLeft: "20px" }}>
                  <Box className="calender-widget-wrap" onClick={handleClick2}>
                    <Typography
                      component="span"
                      className={classes.calenderdropdown}
                    >
                      {endDateForText == ""
                        ? dateConverter(getFormattedDate(endDate))
                        : dateConverter(getFormattedDate(endDateForText))}
                      <CalendarMonthIcon className={classes.calendericon} />
                    </Typography>
                  </Box>
                  <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl2}
                    onClose={handleClose2}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    <DatePicker
                      selected={
                        endDateForText == ""
                          ? endDate
                          : new Date(endDateForText)
                      }
                      onChange={handleChange12}
                      inline
                    />
                  </Popover>
                </Box>
              </Box>

              <Box className={classes.dateBox} style={{ marginLeft: "10px" }}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                  }}
                >
                  Comments
                </Typography>
                <Box sx={{ width: "300px" }}>
                  <CustomTextField style={{ marginLeft: "22px" }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="4.5" style={{ marginTop: "30px" }}>
          <WorkDuration
            workDurationArr={workDurationArr}
            index={index}
            onCountryChange={onCountryChange}
            resetIndex={resetIndex}
            selectedValue={selectedValue}
            handleChange1={handleChange1}
            state={state}
            setState={setState}
            setSelectedValue={setSelectedValue}
            selectWorkDuration={selectWorkDuration}
            worksee={worksee}
            CheckDays={CheckDays}
            setCheckDays={setCheckDays}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "10px" }}>
        <AddStaffAssign
          workLocationArr={workLocationArr}
          onCallArr={onCallArr}
          emergencyArr={emergencyArr}
          val={val}
          onChangeCheck={onChangeCheck}
          setVal={setVal}
          filterData={filterData}
          staffData={staffData}
          setOpen={setOpen}
          handleAdd={handleAdd}
          addStaff={addStaffArr}
          open={open}
          openAddStaff={openAddStaff}
          setStaffTableArr={setStaffTableArr}
          setDepartmentName={setDepartmentName}
          setDutyManagerTableArr={setDutyManagerTableArr}
          setJobTitleArr={setJobTitleArr}
          setEmergencyTableArr={setEmergencyTableArr}
          setOnCallTableArr={setOnCallTableArr}
        />
      </Grid>
      <Grid container style={{ margin: "10px 0px 0px 0px" }}>
        <Grid item>
          <CustomButton
            btnText="Save"
            onClick={saveBtnClick}
            startIcon={<CheckIcon className={classes.iconStyle} />}
            variant="contained"
            btnClass={{ backgroundColor: "#124590", color: "#fff" }}
          />
          <CustomButton
            btnText="Cancel"
            startIcon={
              <NotInterestedIcon className={classes.cancelIconStyle} />
            }
            onClick={() => {
              props.togglehandler(false);
            }}
            variant="contained"
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              marginLeft: "10px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OptionRoaster;
