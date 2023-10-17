import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateState } from "../../../../redux/commonSlice";
import { Grid, Typography, Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import DatePicker from "react-datepicker";
import { CustomButton } from "../../../../components/Button";
import { CustomTextField } from "../../../../components/TextField";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SearchIcon from "@material-ui/icons/Search";
import { useMutation } from "react-query";
import { CreateFlexRota, workDuration } from "../../../../services/api";
import { workLocation, onCall, Emergency } from "../../../../services/api";
import { useQuery } from "react-query";
import { getallStaffData } from "../../../../services/api";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";
// import { dateConverter } from '../../../utils/commonService';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NestedMenuItem from "material-ui-nested-menu-item";
import RotaPopup2 from "./Rota2LOVModal";
import ProgressLoader from "../../rosterSettings/Loader";
import RequiredTitle from "../../../../utils/RequiredTitle";
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
const Option2rota = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const { status, togglehandler, setSnakeBarProps, CloseForm } = props;
  const [save, setSave] = useState("");
  const [workDurationArr, setWorkDurationArr] = React.useState([]);
  const [workLocationArr, setWorkLocationArr] = useState();

  const [location, setLocation] = useState([]);
  const [checki, setChecki] = useState(false);
  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState();
  const [emergency, setEmergency] = useState([]);

  const [index, setIndex] = React.useState({});
  const [state, setState] = React.useState(-1);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [flexrota_name, setflexname] = useState("");
  const [staffTableArr, setStaffTableArr] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [jobTitleArr, setJobTitleArr] = useState("");
  const [emergencyTableArr, setEmergencyTableArr] = React.useState("");
  const [onCallTableArr, setOnCallTableArr] = React.useState("");
  const [dutyManagerTableArr, setDutyManagerTableArr] = React.useState("");
  const [val, setVal] = useState([props.defaultPerson]);
  const [apiData, setApiData] = useState({});
  const [loadingid1, setLoadingId1] = useState(true);
  const [value, setValue] = React.useState(null);
  const [highlightedData, setHighlightedData] = useState(-1);

  const [flexarr, setFlexArr] = useState([
    {
      fri: "",
      iteration: "1",
      mon: "",
      sat: "",
      sequence: "1",
      sun: "",
      thu: "",
      tue: "",
      wed: "",
      Sun: "",
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
    },
  ]);
  const [openSun, setOpenSun] = useState(false);
  const [state1, setState1] = useState(-1);
  const [names, setNames] = useState("");

  const handleChange1 = (index, option) => {
    setSelectedValue(option);
    setState(index);
  };
  const selectWorkDuration = () => {
    // //console.log(selectedValue.workDurationCode)
  };

  const classes = useStyles();

  const dispatch = new useDispatch();
  const [startDateForText, setStartDateForText] = useState("");
  const [startDate, setStartDate] = useState("");
  // //console.log(dateConverter(moment(endDate).format('DD-MM-YYYY')));

  const [endDateForText, setEndDateForText] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [worksee, setWorksee] = useState(true);
  const [checkedList, setCheckedList] = useState([]);
  const [curIndex, setCurIndex] = useState(-1);
  const [rotaLOV, setRotaLOV] = useState([]);
  const [isLoadingBut, setIsLoadingBut] = useState(false)
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

  useEffect(() => {
    // //console.log(flexrota_name);
  }, [flexrota_name]);

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
      setRotaLOV(getAllWorkDuration?.data?.data);
    }
  }, [getAllWorkDuration]);

  const onCountryChange = (object, value) => {
    for (let i in workDurationArr) {
      if (workDurationArr[i].workDurationCode == value) {
        // //console.log(workDurationArr[i]);
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
    // const abc = [...val, ...filterData]

    // //console.log(newCheckedList);

    // //console.log(abc.length)
    // var unique = [];
    // abc.forEach(element => {
    //   if (!unique.includes(element)) {
    //     unique.push(element)
    //   }
    //   setVal(unique)
    // })
    setVal(newCheckedList);
    setOpen(false);
  };

  const openAddStaff = () => {
    setOpen(true);
  };
  const [staffData, setStaffData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSearchData([...staffData]);
  }, [staffData]);

  const { mutate: staffListMutate } = useMutation(getallStaffData, {
    onSuccess: (data, context, variables) =>
      onSuccessProfileList1(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProfileList1(data, context, variables),
  });

  const onSuccessProfileList1 = (data) => {
    setStaffData(data?.data?.data);
    setLoadingId1(false);
  };

  const onErrorProfileList1 = (data) => {
    setLoadingId1(false);
  };
  useEffect(() => {
    Object.keys(commonReducer.selectedProjectObj)?.length > 0 &&
      staffListMutate({
        asc: true,
        pageNo: "0",
        pageSize: "1000",
        sortingField: "fullName",
        userId: "300000006565312",
      });
  }, []);
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
  // //console.log(staffData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [menuPosition, setMenuposition] = useState(null);
  const handleRightClick = (e) => {
    if (menuPosition) {
      return;
    }
    setMenuposition({
      top: e.pageY,
      left: e.pageX,
    });
  };
  const handleItemClick = (e) => {
    setMenuposition(null);
  };

  const handleReset = () => {
    setSearchData([...staffData]);
  };

  const changeSeq = (e, index) => {
    const values = parseInt(e.target.value);
    if (!isNaN(values)) {
      let arr = [...flexarr];
      arr[index].sequence = values;
      setFlexArr(arr);
      // //console.log(flexarr);
    } else if (e.target.value == "") {
      let arr = [...flexarr];
      arr[index].sequence = "";
      setFlexArr(arr);
      // //console.log(flexarr);
    }
  };

  const changeIte = (e, index) => {
    const values = parseInt(e.target.value);
    if (!isNaN(values)) {
      let arr = [...flexarr];
      arr[index].iteration = values;
      setFlexArr(arr);
      // //console.log(flexarr);
    } else if (e.target.value == "") {
      let arr = [...flexarr];
      arr[index].iteration = "";
      setFlexArr(arr);
      // //console.log(flexarr);
    }
  };

  const handleChangeRota = (index, item) => {
    let arr = [...flexarr];
    arr[curIndex][names.toLowerCase()] = item.workDurationId;
    arr[curIndex][names] = item.workDurationCode;
    setFlexArr(arr);
    setState1(index);
  };

  const removeArr = (index) => {
    let arr = [...flexarr];
    arr.splice(index, 1);
    setFlexArr(arr);
  };

  useEffect(() => {
    // //console.log(flexarr);
  }, [flexarr]);

  const { mutate: CreateRota } = useMutation(CreateFlexRota, {
    onSuccess: (data, context, variables) =>
      onCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorRequest(data, context, variables),
  });

  const onCreateRequest = (data) => {
    setIsLoadingBut(false);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Succesfully created Flex Rota!",
      type: "success",
    });
    // //console.log(data);
    CloseForm();
  };

  const onErrorRequest = (data) => {
    setIsLoadingBut(false);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Possible Shift Overlap, Please try again!",
      type: "error",
    });
    //console.log(data);
  };

  const checkFlex = () => {
    //console.log("dddd");
    for (let i = 0; i < flexarr.length; i++) {
      let keys = Object.keys(flexarr[i]);
      //console.log(flexarr[i]);
      if (!keys.includes("sequence") || flexarr[i].sequence == "") {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "No given Seqence",
          type: "error",
        });
        return true;
      } else if (!keys.includes("iteration") || flexarr[i].iteration == "") {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "No given Iteration",
          type: "error",
        });
        return true;
      }
      // } else if(keys.length<=2){
      //   setSnakeBarProps({
      //     snackbarFlag: true,
      //     msz: "No given Work Duration in any weekday",
      //     type: "error",
      //   });
      //   return true;
      // }
      else if (
        flexarr[i].sun == "" &&
        flexarr[i].mon == "" &&
        flexarr[i].tue == "" &&
        flexarr[i].wed == "" &&
        flexarr[i].thu == "" &&
        flexarr[i].fri == "" &&
        flexarr[i].sat == ""
      ) {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "No entered Work Duration for any week day!",
          type: "error",
        });
        return true;
      }
    }
    return false;
  };
  //console.log(checkedList);

  const createRotaShift = () => {
    if (startDate == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "No Date Selected!",
        type: "error",
      });
      return;
    }
    if (flexrota_name == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "No Flex Rota Name Given!",
        type: "error",
      });
      return;
    }
    let bolly = checkFlex();
    if (bolly) {
      return;
    }
    //console.log(checkedList);
    if (checkedList.length == 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "No Employees Selected!",
        type: "error",
      });
      return;
    }
    let arr = [...flexarr];
    for (let i = 0; i < arr.length; i++) {
      delete arr[i].Sun;
      delete arr[i].Mon;
      delete arr[i].Tue;
      delete arr[i].Wed;
      delete arr[i].Thu;
      delete arr[i].Fri;
      delete arr[i].Sat;
      let keys = Object.keys(arr[i]);
      for (let j = 0; j < keys.length; j++) {
        if (arr[i][keys[j]] == "") {
          delete arr[i][keys[j]];
        }
      }
    }
    // setFlexArr(arr)
    const date1 = new Date(startDate);
    const formattedDate1 = `${date1
      .getDate()
      .toString()
      .padStart(2, "0")}-${date1.toLocaleString("default", {
      month: "short",
    })}-${date1.getFullYear()}`;
    const pid = [];
    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i]?.personId) {
        pid.push(checkedList[i].personId.toString());
      }
    }
    const pdata = {
      flexRotaLines: arr,
      flexRotaName: flexrota_name,
      forverFlag: checki ? "Y" : "N",
      personIds: pid,
      startFrom: formattedDate1,
      userId: "300000006565312",
    };
    //console.log(pdata);
    let data = staffData.filter(
      (item) => item.personId.toString() === pdata.personIds[0]
    );
    //console.log(data);
    setIsLoadingBut(true)
    CreateRota(pdata);
  };
  const [empname, setEmpName] = useState("");
  const [depname, setDepName] = useState("");
  const [jobname, setJobName] = useState("");
  const [locname, setLocName] = useState("");
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
  return (
    <Grid container style={{ marginTop: "10px" }}>
      <Grid container style={{ display: "flex", flexDirection: "row" }}>
        <Grid
          xs="12"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            xs="5"
          >
            <Grid xs="3">
              <Typography style={{ fontWeight: "bold" }}>
                * Start From
              </Typography>
            </Grid>
            <Grid
              style={{
                marginLeft: "15px",
              }}
              xs="4"
            >
              <DatePicker
                className="dateManage"
                dateFormat="dd-MMM-yyyy"
                selected={startDate}
                onChange={(value) => setStartDate(value)}
              />
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "30px",
            }}
            xs="6"
          >
            <Grid xs="4">
              <Typography
                style={{
                  fontWeight: "bold",
                  fontFamily: "Inter",
                }}
              >
                * Flex Rota Name
              </Typography>
            </Grid>
            <Grid xs="6">
              <CustomTextField
                style={{
                  marginLeft: "10px",
                }}
                value={flexrota_name}
                onChange={(e) => {
                  setflexname(e.target.value)
                  setFocusField(5)
                }}
                autoFocus={focusField === 5}
              ></CustomTextField>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "30px",
            }}
            xs="4"
          >
            <Grid xs="6">
              <Typography
                style={{
                  margin: "0px 10px",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                }}
              >
                Forever Flag
              </Typography>
            </Grid>
            <Grid xs="2">
              <CustomCheckBox
                checked={checki}
                onChangeCheck={() => setChecki(!checki)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "3px 0",
            cursor: "pointer",
          }}
        >
          <Grid
            style={{
              fontWeight: "bold",
              fontFamily: "Inter",
              color: "black",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              setFlexArr([
                ...flexarr,
                {
                  fri: "",
                  iteration: "1",
                  mon: "",
                  sat: "",
                  sequence: "",
                  sun: "",
                  thu: "",
                  tue: "",
                  wed: "",
                  Sun: "",
                  Mon: "",
                  Tue: "",
                  Wed: "",
                  Thu: "",
                  Fri: "",
                  Sat: "",
                },
              ]);
            }}
          >
            <AddIcon style={{ color: "green" }} fontSize="medium" />
            Add Week
          </Grid>
        </Box>
      </Grid>
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #bfbcbb",
        }}
      >
        {flexarr.length > 0 ? (
          flexarr.map((item, index) => {
            return (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  left: "2px",
                  position: "relative",
                }}
              >
                <Box
                  // px={3}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    * Seq
                  </Typography>
                  <CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.sequence}
                    onInput={(value) => changeSeq(value, index)}
                  />
                </Box>
                <Box
                  // px={5}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                    }}
                  >
                    * Iteration
                  </Typography>
                  <CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.iteration ? item?.iteration : 1}
                    onInput={(value) => changeIte(value, index)}
                  />
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Sun
                  </Typography>
                  {/* <CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    
                    value={item?.Sun ? item?.sun : ""}
                    endIcon={
                      <SearchIcon
                        onClick={() => {
                          setNames("Sun");
                          setCurIndex(index);
                          setOpenSun(true);
                        }}
                        style={{
                          marginLeft: "2px",
                          fontSize: "18px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      />
                    }
                  /> */}
                  {item?.Sun ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Sun");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Sun");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                  
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Mon
                  </Typography>
                  {item?.Mon ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Mon}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Mon");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Mon");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={5.5}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Tue
                  </Typography>
                  {item?.Tue ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Tue}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Tue");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Tue");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Wed
                  </Typography>
                  {item?.Wed ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Wed}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Wed");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Wed");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Thu
                  </Typography>
                  {item?.Thu ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Thu}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Thu");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Thu");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Fri
                  </Typography>
                  {item?.Fri ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Fri}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Fri");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Fri");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={6}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      paddingLeft: "10px",
                    }}
                  >
                    Sat
                  </Typography>
                  {item?.Sat ?  (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    value={item?.Sat}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Sat");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />): (<CustomTextField
                    style={{ outerHeight: "10px", padding: "3px 5px" }}
                    // value={item?.sun}
                    endIcon={
                      <RequiredTitle
                        title="Search"
                        value={
                          <SearchIcon
                            style={{
                              marginLeft: "2px",
                              fontSize: "18px",
                              cursor: "pointer",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setNames("Sat");
                              setCurIndex(index);
                              setOpenSun(true);
                            }}
                          />
                        }
                      />
                    }
                  />)}
                </Box>
                <Box
                  // px={2}
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #bfbcbb",
                    background: "#e6f1f5",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    width={"5em"}
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      textAlign: "center",
                    }}
                  >
                    Action{" "}
                  </Typography>
                  <Button
                    onClick={() => {
                      removeArr(index);
                    }}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      left: "10px",
                    }}
                  >
                    <RemoveCircleIcon style={{ color: "red" }} />
                  </Button>
                </Box>
              </Grid>
            );
          })
        ) : (
          <></>
        )}
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
              position: "relative",
              right: "26px",
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
                      Employee Name
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      key="employeeName"
                      type="text"
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
                        width:"max-content"
                      }}
                    >
                      Job Title
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      type="text"
                      style={{ width: "10em" }}
                      value={jobname}
                      onChange={(e) => {
                        handleJob(e);
                      }}
                      autoFocus={focusField === 2}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid style={{ marginTop: "10px", width: "100%" }}>
              <Grid
                style={{
                  marginTop: "10px",
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
                      type="text"
                      style={{ width: "10em" }}
                      value={depname}
                      onChange={(e) => {
                        handleDep(e);
                      }}
                      autoFocus={focusField === 3}
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
                      Work Location
                    </Typography>
                  </Box>
                  <Box style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      type="text"
                      style={{ width: "10em" }}
                      value={locname}
                      onChange={(e) => {
                        handleLoc(e);
                      }}
                      autoFocus={focusField === 4}
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
        {staffData?.length > 0 ? (
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
                    margin: "0px!important",
                    fontWeight: "bold",
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
                  Work Location
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
                    onClick={() => {
                      if (highlightedData === index) {
                        setHighlightedData(-1);
                      } else {
                        setHighlightedData(index);
                      }
                    }}
                    style={{
                      background:
                        highlightedData === index ? "#D6DFE6" : "#fff",
                    }}
                  >
                    {/* {//console.log('item.checked', typeof (item.checked))} */}
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
          onClick={createRotaShift}
        />
      </Grid>
      {openSun ? (
        <RotaPopup2
          toggleHandler={setOpenSun}
          rotaLov={rotaLOV}
          handleChangeRota={handleChangeRota}
          state1={state1}
          setState1={setState1}
          value={names}
        />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Option2rota;
