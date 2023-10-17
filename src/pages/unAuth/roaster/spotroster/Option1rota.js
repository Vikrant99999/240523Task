import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateState } from "../../../../redux/commonSlice";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import DatePicker from "react-datepicker";
// import DatePicker from "react-datepicker";
import { CustomButton } from "../../../../components/Button";
import { CustomTextField } from "../../../../components/TextField";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import DoneIcon from "@mui/icons-material/Done";
import SearchIcon from "@material-ui/icons/Search";
import { useMutation } from "react-query";
import {
  GenerateRotaShifts,
  GetWorkRotation,
  GetWorkRotationDet,
  workDuration,
} from "../../../../services/api";
import { workLocation, onCall, Emergency } from "../../../../services/api";
import { useQuery } from "react-query";
import { getallStaffData } from "../../../../services/api";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RotaPopup from "./Rota1LOVModal";
import ProgressLoader from "../../rosterSettings/Loader";
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
// import {
//   workLocation,
//   onCall,
//   Emergency,
//   Option2,
//   getallStaffData,
// } from "../../../../services/api";
const Option1rota = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    status,
    togglehandler,
    workDet,
    setWorkdet,
    setSnakeBarProps,
    CloseForm,
  } = props;
  const classes = useStyles();
  const dispatch = new useDispatch();

  const [save, setSave] = useState("");
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [workLocationArr, setWorkLocationArr] = useState();
  const [state1, setState1] = useState(-1);

  const [location, setLocation] = useState([]);

  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  const [emergency, setEmergency] = useState([]);

  const [index, setIndex] = React.useState({});
  const [state, setState] = React.useState(-1);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [staffTableArr, setStaffTableArr] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [openRota, setOpenRota] = useState(false);
  const [jobTitleArr, setJobTitleArr] = useState("");
  const [emergencyTableArr, setEmergencyTableArr] = React.useState("");
  const [onCallTableArr, setOnCallTableArr] = React.useState("");
  const [dutyManagerTableArr, setDutyManagerTableArr] = React.useState("");
  const [val, setVal] = useState([props.defaultPerson]);
  const [apiData, setApiData] = useState({});
  const [value, setValue] = useState(null);
  const [rotaLOV, setRotaLOV] = useState([]);
  const [isLoadingBut, setIsLoadingBut] = useState(false);

  const [selectrota, setSelectRota] = useState({});

  const [startDate, setStartDate] = useState("");
  // console.log(dateConverter(moment(endDate).format('DD-MM-YYYY')));

  const [endDateForText, setEndDateForText] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [worksee, setWorksee] = useState(true);
  const [loadingid, setLoadingId] = useState(false);
  const [loadingid1, setLoadingId1] = useState(true);
  const [checkedList, setCheckedList] = useState([]);
  const [empname, setEmpName] = useState("");
  const [depname, setDepName] = useState("");
  const [jobname, setJobName] = useState("");
  const [locname, setLocName] = useState("");
  const [loadWork, setLoadWork] = useState(true);
  const dateWidgetOptionArr = [
    { id: 1, label: "Weekly", value: "1", type: "weeks" },
    { id: 2, label: "Bi-Weekly", value: "2", type: "weeks" },
    // { id: 2, label: "Three-Weekly", value: "2", type: "weeks" },
    { id: 3, label: "Monthly", value: "1", type: "months" },
    // { id: 4, label: "6 Month", value: "6", type: "months" }
  ];
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(
    dateWidgetOptionArr[0]
  );
  const [data, setData] = useState("");
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const commonLogic = (type, e) => {
    var a =
      dateWidgetSelectedOption.type != "months"
        ? moment(new Date(e))
        : moment(new Date(e)).startOf("month");
    var b = a.add(
      dateWidgetSelectedOption.value,
      dateWidgetSelectedOption.type
    );

    var localDiff =
      dateWidgetSelectedOption.type != "months"
        ? (moment(new Date(e)).diff(moment(b), "days") + 1) * -1
        : (moment(new Date(e)).startOf("month").diff(moment(b), "days") + 1) *
          -1;

    var localDayArr = [];
    for (var i = 0; i <= localDiff; i++) {
      localDayArr.push(
        type == "diff"
          ? moment(e).add(i, "days").format("DD")
          : moment().add(i, "days").format("DD")
      );
    }

    var localStartDay = type == "diff" ? moment(e) : moment();
    const lastDay = localStartDay.add(localDiff, "days").format("DD-MM-YYYY");
    dispatch(
      updateState({
        oriDate: type == "diff" ? moment(e).format() : startDate,
        startDate:
          type == "diff"
            ? dateWidgetSelectedOption.type != "months"
              ? moment(e).format("DD-MM-YYYY")
              : moment(e).startOf("month").format("DD-MM-YYYY")
            : moment().format("DD-MM-YYYY"),
        endDate: lastDay,
        dayArr: localDayArr,
      })
    );
  };

  const onSuccessProfileList = (data) => {
    // console.log(data);
    setSave(data?.data?.data);
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
    for (let i in workDurationArr) {
      if (workDurationArr[i].workDurationCode == value) {
        // console.log(workDurationArr[i]);
        setIndex(workDurationArr[i]);
      }
    }
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

  const [staffData, setStaffData] = useState([]);

  const { mutate: staffListMutate } = useMutation(getallStaffData, {
    onSuccess: (data, context, variables) =>
      onSuccessProfileList1(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProfileList1(data, context, variables),
  });

  const onSuccessProfileList1 = (data) => {
    setStaffData(data?.data?.data);
    dupdata(data?.data?.data);
    // console.log(data);
    setLoadingId1(false);
  };

  const onErrorProfileList1 = (data) => {
    // setSnakeBarProps({
    //   snackbarFlag: true,
    //   // msz: "Unable to get Employee!",
    //   type: "error",
    // });
    setLoadingId1(false);
  };
  useEffect(() => {
    // console.log(commonReducer.userId);
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
      staffListMutate({
        asc: true,
        pageNo: "0",
        pageSize: "1000",
        sortingField: "fullName",
        userId: commonReducer.userId,
      });
  }, []);

  const {
    data: getAllWorkRotation,
    error: getAllWRErr,
    isLoading: getAllWRload,
    // refetch: getAllDemandRefetch,
  } = useQuery(
    ["getAllWorkRotation"],
    () => GetWorkRotation({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    setRotaLOV(
      getAllWorkRotation?.data?.data?.map((option) => {
        return {
          workRotationId: option?.workRotationId,
          workRotationName: option?.workRotationName,
          startDate: moment(option?.startDate).format("DD-MMM-YYYY"),
          iterations: option?.iterations,
          expiryDate:
            option?.expiryDate == null
              ? ""
              : moment(option?.expiryDate).format("DD-MMM-YYYY"),
        };
      })
    );
    setLoadWork(false);
  }, [getAllWorkRotation]);

  const {
    data: getAllWorkRotationdet,
    error: getAllWRdetErr,
    isError: getIsError,
    isLoading: getAllWRdetload,
    refetch: getAllRotaRefetch,
  } = useQuery(
    ["getAllWorkRotationdet"],
    () =>
      GetWorkRotationDet({
        workRotationId: selectrota?.workRotationId,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    setWorkdet(getAllWorkRotationdet?.data?.data);
    // console.log(getAllWorkRotationdet?.data?.data, "getAllWorkRotationdet");
    setLoadingId(false);
  }, [getAllWorkRotationdet]);

  useEffect(() => {
    // console.log(getIsError);
    if (getIsError) {
      setWorkdet([]);
    }
  }, [getIsError]);

  const getChecked = (item) => {
    for (let i in checkedList) {
      if (checkedList[i]?.personId === item?.personId) {
        return true;
      }
    }
    return false;
  };

  const handleCheck = (isChecked, index) => {
    if (isChecked) setCheckedList((prev) => [...prev, staffData[index]]);
    else {
      setCheckedList((prev) =>
        prev.filter((item) => item?.personId !== staffData[index]?.personId)
      );
    }
  };
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({}));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  // console.log(checkedList);
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  const onChangeCheckAll = (isChecked, i) => {
    if (isChecked) {
      setCheckedList((prev) => {
        let notChecked = staffData.filter((item) => !getChecked(item));
        return [...prev, ...notChecked];
      });
    } else {
      setCheckedList([]);
    }
  };
  // console.log(staffData);

  const { mutate: CreateRotaShift } = useMutation(GenerateRotaShifts, {
    onSuccess: (data, context, variables) =>
      onCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorRequest(data, context, variables),
  });

  const onCreateRequest = (data) => {
    setIsLoadingBut(false);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Rota Created SuccessFully!",
      type: "success",
    });
    // console.log(data);
    CloseForm();
  };

  const onErrorRequest = (data) => {
    setIsLoadingBut(false);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Unable to create request!",
      type: "error",
    });
    // console.log(data);
  };

  const genRotaShift = () => {
    if (Object.keys(selectrota).length == 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: " Work Rotation is required!",
        type: "error",
      });
      // console.log("dd");
      return;
    }
    if (startDate == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Start date is required!",
        type: "error",
      });
      return;
    }
    if (checkedList.length == 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "No Employees Selected!",
        type: "error",
      });
      return;
    }

    // const date1 = new Date(value);
    // const formattedDate1 = `${date1
    //   .getDate()
    //   .toString()
    //   .padStart(2, "0")}-${date1.toLocaleString("default", {
    //   month: "short",
    // })}-${date1.getFullYear()}`;
    const pid = [];
    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i]?.personId) {
        pid.push(checkedList[i].personId);
      }
    }
    const pdata = {
      personId: pid,
      rotaStartDate: moment(startDate).format("DD-MMM-YYYY"),
      userId: commonReducer.userId,
      workRotationId: [selectrota?.workRotationId],
    };
    console.log(pdata, "pdata");
    setIsLoadingBut(true);
    CreateRotaShift(pdata);
  };

  const resetChangeRota = () => {
    setSelectRota({});
  };

  useEffect(() => {
    if (selectrota?.workRotationId) {
      getAllRotaRefetch();
    }
  }, [selectrota]);

  const handleChangeRota = (index, iitem) => {
    // console.log(iitem, "iitem");
    setSelectRota(iitem);
    // setLoading(true);
    setState1(index);
    setStartDate(new Date(iitem?.startDate));
    // setValue(new Date(iitem?.startDate));
    setLoadingId(true);
    // getAllDemandRefetch();
  };
  // console.log(value);
  const changeDate = (date) => {
    const dat = new Date(date);
    const pp = dat.toLocaleDateString();

    return pp;
  };
  const [dupdata, setDupdata] = React.useState([]);
  const handleEmp = useCallback((e) => {
    setEmpName(e.target.value);
    setDepName("");
    setJobName("");
    setLocName("");
    setFocusField(1);
  }, []);
  const handleDep = useCallback((e) => {
    const value = e.target.value;
    setEmpName("");
    setDepName(value);
    setJobName("");
    setLocName("");
    setFocusField(3);
  }, []);
  const handleJob = useCallback((e) => {
    setEmpName("");
    setDepName("");
    setJobName(e.target.value);
    setLocName("");
    setFocusField(2);
  }, []);
  const handleLoc = useCallback((e) => {
    setEmpName("");
    setDepName("");
    setJobName("");
    setLocName(e.target.value);
    setFocusField(4);
  }, []);

  const [focusField, setFocusField] = useState("");

  const searchFilter = () => {
    var dumm = staffData?.filter(filterQuery);
    setDupdata(dumm);
    // setClicked(-1);
  };

  const resetFilter = () => {
    setDupdata(staffData);
    setEmpName("");
    setDepName("");
    setJobName("");
    setLocName("");
    // setClicked(-1);
  };
  useEffect(() => {
    if (staffData) {
      setDupdata(staffData);
    }
  }, [staffData]);
  const filterQuery = (item) => {
    if (empname != "") {
      if (
        item?.staffName.toString().toLowerCase().includes(empname.toLowerCase())
      ) {
        return item;
      }
    } else if (depname != "") {
      if (
        item?.department
          .toString()
          .toLowerCase()
          .includes(depname.toLowerCase())
      ) {
        return item;
      }
    } else if (jobname != "") {
      if (
        item?.jobTitle.toString().toLowerCase().includes(jobname.toLowerCase())
      ) {
        return item;
      }
    } else if (locname != "") {
      if (
        item?.workLocation
          .toString()
          .toLowerCase()
          .includes(locname.toLowerCase())
      ) {
        return item;
      }
    } else return item;
  };
  console.log(staffData, "staffData");
  return (
    <Grid style={{ marginTop: "10px" }}>
      <Grid
        container
        style={{ display: "flex", flexDirection: "row" }}
        // xs="18"
      >
        <Grid
          // xs="6"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px 0",
            marginRight: "30px",
          }}
        >
          <Grid
            // xs="12"
            style={{
              // width: "500px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid>
              <Typography style={{ fontWeight: "bold", width: "160px" }}>
                * Work Rotation
              </Typography>
            </Grid>
            <Grid style={{ display: "flex", marginRight: "20px" }}>
              <CustomTextField
                style={
                  {
                    // marginLeft: "15px",
                    // right: "3px"
                  }
                }
                value={
                  selectrota.workRotationName
                    ? selectrota?.workRotationName
                    : ""
                }
                key="rotname"
                endIcon={
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenRota(true)}
                  />
                }
              ></CustomTextField>
              {/* {console.log(selectrota, "selectrota")} */}
            </Grid>
            <ProgressLoader isLoading={loadWork} size={25} />
          </Grid>
          <Grid
            // xs="12"
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <Grid xs="3">
              <Typography
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                * Rota Start Date
              </Typography>
            </Grid>
            <Grid
              style={{
                marginLeft: "53px",
              }}
            >
              <DatePicker
                className="dateManage"
                dateFormat="dd-MMM-yyyy"
                selected={startDate}
                onChange={(value) => setStartDate(value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          // xs="8"
          container
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            overflowX: "scroll",
            height: "fit-content",
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              width: "fit-content",
              position: "relative",
              left: "1em",
            }}
          >
            <Box
              px={4.5}
              style={{
                border: "1px solid #b0aea9",
                width: "235px",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Work Plan
              </Typography>
            </Box>
            <Box
              px={2}
              style={{
                border: "1px solid #b0aea9",
                width: "100px",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Sequence
              </Typography>
            </Box>
            <Box
              px={2}
              style={{
                border: "1px solid #b0aea9",
                width: "100px",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Iteration
              </Typography>
            </Box>
            {workDet?.length > 0 && (
              <>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sun
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Mon
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tue
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Wed
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Thu
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Fri
                  </Typography>
                </Box>
                <Box
                  px={1}
                  style={{ border: "1px solid #b0aea9", width: "164px" }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sat
                  </Typography>
                </Box>
              </>
            )}
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            {loadingid ? (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "fit-content",
                  position: "relative",
                  left: "1em",
                }}
              >
                <ProgressLoader isLoading={loadingid} />
              </Grid>
            ) : workDet?.length > 0 ? (
              workDet.map((item) => {
                return (
                  <Grid
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "fit-content",
                      position: "relative",
                      left: "1em",
                    }}
                  >
                    <Box
                      px={4.5}
                      style={{
                        border: "1px solid #b0aea9",
                        width: "235px",
                        textAlign: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {item?.workPlan}
                      </Typography>
                    </Box>
                    <Box
                      px={2}
                      style={{
                        border: "1px solid #b0aea9",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {item?.sequence}
                      </Typography>
                    </Box>
                    <Box
                      px={2}
                      style={{
                        border: "1px solid #b0aea9",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      <Typography style={{ fontSize: "15px" }}>
                        {item?.iteration}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.sun}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.mon}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.tue}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.wed}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.thu}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.fri}
                      </Typography>
                    </Box>
                    <Box
                      px={1}
                      style={{ border: "1px solid #b0aea9", width: "164px" }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.sat}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })
            ) : (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "fit-content",
                }}
              >
                <Box
                  px={4.52}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Typography
                    style={{ fontSize: "15px", wordWrap: "break-word" }}
                  >
                    No Data to Display
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            style={{ marginTop: "20px" }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                marginLeft: "5px",
                fontWeight: "bolder",
              }}
            >
              Search
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-5px",
            }}
          >
            <Grid
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                // background:"blue"
              }}
            >
              <Grid
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  // width:"100%",
                  // background:"yellow"
                }}
              >
                <Box
                  style={{
                    marginLeft: "10px",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                        width: "8em",
                      }}
                    >
                      Employee Name
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      key="emp"
                      value={empname}
                      onChange={(e) => {
                        handleEmp(e);
                      }}
                      autoFocus={focusField === 1}
                      style={{ width: "10em" }}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    marginLeft: "30px",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                        width: "max-content",
                      }}
                    >
                      Job Title
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      key="job"
                      value={jobname}
                      onChange={(e) => {
                        handleJob(e);
                      }}
                      autoFocus={focusField === 2}
                      // type="text"
                      style={{ width: "10em" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid style={{ marginTop: "20px", width: "100%" }}>
              <Grid
                style={{
                  marginTop: "0px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  className={classes.maincontentBox}
                  style={{
                    marginLeft: "30px",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                      }}
                    >
                      Department
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      key="dep"
                      value={depname}
                      onChange={(e) => {
                        handleDep(e);
                      }}
                      autoFocus={focusField === 3}
                      // type="text"
                      style={{ width: "10em" }}
                    />
                  </Box>
                </Box>
                <Box
                  className={classes.maincontentBox}
                  style={{
                    marginLeft: "30px",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                        width: "8em",
                      }}
                    >
                      Business Unit
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      key="loc"
                      value={locname}
                      onChange={(e) => {
                        handleLoc(e);
                      }}
                      autoFocus={focusField === 4}
                      // type="text"
                      style={{ width: "10em" }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                marginLeft: "0px",
                marginTop: "2px",
                width: "53em",
                display: "flex",
                top: "0.5em",
                alignItems: "center",
                position: "relative",
                flexWrap: "nowrap",
              }}
            >
              <Grid
                item
                padding={"2px"}
                style={{
                  marginLeft: "30px",
                  width: "fit-content",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  btnText="Search"
                  variant="contained"
                  btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                  onClick={searchFilter}
                />
              </Grid>
              <Grid
                item
                padding={"2px"}
                style={{
                  marginLeft: "15px",
                  width: "fit-content",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  btnText="Reset"
                  variant="contained"
                  btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                  onClick={resetFilter}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid>
        {dupdata?.length > 0 ? (
          <Grid
            container
            mt="20px"
            style={{
              background: "#D6DFE6",
              alignItems: "center",
              fontWeight: "500",
            }}
          >
            <Grid item xs="1">
              <CustomCheckBox
                // isChecked={checkAllSelect()}
                onChangeCheck={onChangeCheckAll}
              />
            </Grid>
            <Grid item xs="2.2">
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    margin: "0px!important",
                  }}
                >
                  Employee Name
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="3">
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "22ch",
                    fontWeight: "bold",
                  }}
                >
                  Department Name
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="2.8">
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    position: "relative",
                    left: "1em",
                    fontWeight: "bold",
                  }}
                >
                  Job Title
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="3">
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "19ch",
                    position: "relative",
                    left: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  Business Unit
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {loadingid1 ? (
          <ProgressLoader isLoading={loadingid1} />
        ) : (
          <Grid
            container
            style={{ borderLeft: "1px solid #D6DFE6" }}
            className="data-table-small"
          >
            {dupdata?.length > 0 &&
              dupdata?.map((item, index) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    // className={classes.bordermanage}
                  >
                    {/* {console.log('item.checked', typeof (item.checked))} */}
                    <Grid item xs="1">
                      <CustomCheckBox
                        check={getChecked(item)}
                        onChangeCheck={handleCheck}
                        currentIndex={index}
                      />
                    </Grid>
                    <Grid item xs="2.2">
                      <Box>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            margin: "0px!important",
                          }}
                        >
                          {item?.staffName}({item?.employeeNumber})
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs="3">
                      <Box>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "22ch",
                          }}
                        >
                          {item?.department}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs="2.8">
                      <Box>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            position: "relative",
                            left: "1em",
                          }}
                        >
                          {item?.jobTitle}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs="3">
                      <Box>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "19ch",
                            position: "relative",
                            left: "1.1em",
                          }}
                        >
                          {item?.workLocation}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <ProgressLoader isLoading={isLoadingBut} size={25} />
        <CustomButton
          btnText="Submit Rota"
          variant="contained"
          // disabled={true}
          startIcon={<DoneIcon style={{ color: "#5BB75B" }} />}
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
                  fontSize: "12px",
                }
          }
          onClick={genRotaShift}
        />
      </Grid>
      {openRota ? (
        <RotaPopup
          toggleHandler={setOpenRota}
          rotaLov={rotaLOV}
          handleChangeRota={handleChangeRota}
          resetChangeRota={resetChangeRota}
          state1={state1}
          setState1={setState1}
        />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Option1rota;
