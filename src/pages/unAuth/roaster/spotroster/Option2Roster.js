import React, { useState, useEffect } from "react";
// import React, from 'react'
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { CustomTextField } from "../../../../components/TextField";
import AddStaffAssign from "./AddStaffAssign";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateState } from "../../../../redux/commonSlice";
// import AddStaffAssignOption2 from './AddStaffAssignOption2'
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { CustomButton } from "../../../../components/Button";
import { useMutation } from "react-query";
import { workDuration } from "../../../../services/api";
import {
  workLocation,
  onCall,
  Emergency,
  Option2,
  getallStaffData,
} from "../../../../services/api";
import { useQuery } from "react-query";

import {
  dateConverter,
  dateConverterWithoutYear,
} from "../../../../utils/commonService";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";

const useStyles = makeStyles((theme) => ({
  popupContent: {
    backgroundColor: "#fff",
    border: "1px solid  rgb(233, 233, 233)",
    width: "100%",
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

const Option2Roster = (props) => {
  const classes = useStyles();
  const { status, getEmployeeList, setSnakeBarProps } = props;

  const commonReducer = useSelector((state) => state.commonReducer);
  const [save, setSave] = useState("");
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [workLocationArr, setWorkLocationArr] = useState();

  const [location, setLocation] = useState([]);

  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  // console.log(emergencyArr);
  const [emergency, setEmergency] = useState([]);
  // console.log(emergency?.valueMeaning);
  const [index, setIndex] = React.useState({});
  const [open, setOpen] = useState(false);
  // const [worksee, setWorksee] = useState(true);
  const [val, setVal] = useState(
    props.defaultPerson
      ? [{ staffDto: { ...props.defaultPerson }, workDurationDto: {} }]
      : []
  );

  const dispatch = new useDispatch();
  const [startDateForText, setStartDateForText] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(commonReducer.effectiveDate)
  );
  // console.log(dateConverter(moment(endDate).format('DD-MM-YYYY')));

  const [endDateForText, setEndDateForText] = useState("");
  const [endDate, setEndDate] = useState(new Date(commonReducer.effectiveDate));
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

  const { mutate: optionListMutate } = useMutation(Option2, {
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
    console.log("saveBtnClick 2", val);
    var err = {};
    var fromDate = isEmpty(startDateForText)
      ? commonReducer.effectiveDate
      : startDateForText;
    var toDate = isEmpty(endDateForText)
      ? commonReducer.effectiveDate
      : endDateForText;
    if (new Date(fromDate) > new Date(toDate)) {
      err["To Date should be after From Date."] = "";
    }
    fromDate = formatDate(fromDate);
    toDate = formatDate(toDate);

    var localVal = [];
    val.map((item) => {
      var defaultData = {
        staffDto: {
          departmentId: 0,
          dutyManager: "",
          emergency: "",
          jobTitleId: 0,
          onCall: "",
          personId: 0,
          personRosterId: "",
          workLocationId: 0,
        },
        workDurationDto: {
          fri: "",
          mon: "",
          sat: "",
          shiftHours: "",
          sun: "",
          thu: "",
          timeEnd: "",
          timeStart: "",
          tue: "",
          validFrom: "",
          validTo: "",
          wed: "",
          workDurationCode: "",
          workDurationId: "",
        },
      };

      Object.keys(defaultData.staffDto).map((key) => {
        if (item.staffDto[key]) {
          defaultData.staffDto[key] = item.staffDto[key];
        }
      });
      Object.keys(defaultData.workDurationDto).map((key) => {
        if (item.workDurationDto[key]) {
          defaultData.workDurationDto[key] = item.workDurationDto[key];
        }
      });
      localVal.push(defaultData);
    });

    var keyFields = {
      workDurationDto: [
        { key: "workDurationId", message: "Work Duration is required" },
      ],
      staffDto: [
        { key: "jobTitleId", message: "Job Title is required" },
        { key: "workLocationId", message: "Work Location is required" },
      ],
    };

    localVal.map((rows) => {
      keyFields.workDurationDto.map((fields) => {
        if (isEmpty(rows.workDurationDto[fields.key])) {
          err[fields.message] = "";
        }
      });
      keyFields.staffDto.map((fields) => {
        if (isEmpty(rows.staffDto[fields.key])) {
          err[fields.message] = "";
        }
      });
    });
    if (localVal.length === 0) {
      err["Please add staff."] = "";
    }
    var saveOption2 = {
      fromDate: dateConverter(moment(fromDate).format("DD-MM-YYYY")),
      toDate: dateConverter(moment(toDate).format("DD-MM-YYYY")),
      staffWorkDurationDto: localVal,
      userId: parseInt(commonReducer?.userId),
    };

    if (Object.keys(err).length > 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Error",
        details: Object.keys(err),
        type: "error",
      });
    } else {
      optionListMutate(saveOption2);
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
    var localNewCheckedList = newCheckedList
      .map((item) => {
        return { staffDto: { ...item }, workDurationDto: {} };
      })
      .filter((item) => !personIds.includes(item.staffDto.personId));
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
      <Grid item xs="12" className={classes.popupContent}>
        <Grid item>
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
              *From Date
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
              *To Date
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
                    endDateForText == "" ? endDate : new Date(endDateForText)
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
              <CustomTextField style={{ marginLeft: "22px" }} />{" "}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "10px", display: "block" }}>
        <Grid item xs="">
          <AddStaffAssign
            workDurationArr={workDurationArr}
            index={index}
            onCountryChange={onCountryChange}
            workLocationArr={workLocationArr}
            onCallArr={onCallArr}
            emergencyArr={emergencyArr}
            status2={status}
            open={open}
            setOpen={setOpen}
            handleAdd={handleAdd}
            openAddStaff={openAddStaff}
            onChangeCheck={onChangeCheck}
            val={val}
            setVal={setVal}
            filterData={filterData}
            staffData={staffData}
            worksee={worksee}
            setSnakeBarProps={setSnakeBarProps}
          />
        </Grid>
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

export default Option2Roster;
