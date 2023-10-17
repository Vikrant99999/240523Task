import {
  Typography,
  Grid,
  Box,
  Autocomplete,
  Button,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AssignTable from "./AssignTable";
import DoneIcon from "@mui/icons-material/Done";
import {
  GetSingleShift,
  workDuration,
  getallStaffData,
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
import {
  getDemandTemp,
  GetDemandId,
  CreateEmployeeSuggestions,
} from "../../../../services/api";
import AddIcon from "@mui/icons-material/Add";
import AssignRoster from "./AssignRoster";
import WorkDurationModal from "./WorkDurationModal";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import DemandPopup from "./DemandLOVModal";
import { getEmployeeSuggestions } from "../../../../services/api";
import ProgressLoader from "../../rosterSettings/Loader";
import moment from "moment";
// import Autocomplete from '@mui/material/Autocomplete';

const GenerateFormDemand = (props) => {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const [getSingleShift, setGetSingleShift] = React.useState([]);
  const { setStatus1, datw, setSnakeBarProps, changeDelete, setChangeDelete } =
    props;
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

  // console.log(tabledata);

  const [state, setState] = useState(-1);
  const [state1, setState1] = useState(-1);
  const [state2, setState2] = useState(-1);
  const [state3, setState3] = useState(-1);
  const [value, setValue] = React.useState(dayjs(""));
  const [data, setData] = useState();
  const [openDemand, setOpenDemand] = useState(false);
  const [demandLOV, setDemandLov] = useState("");
  const [selectDemand, setSelectDemand] = useState({});
  const [demandID, setDemandId] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeSuggestions, setemployeeSuggestions] = useState({});
  const [suggestionsHeader, setSuggestionsHeader] = useState([]);
  const [closeStart, setCloseStart] = useState(false);
  const [closeEnd, setCloseEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [demandLoad, setDemandLoad] = useState(true);


  // console.log(selectDutyManager.staffName)
  // console.log(changeTextValue?.value);
  const handleChange1 = (index, item) => {
    setDat(item);
    setChangeTextValue(item);
    setState(index);
  };

  const handleChangeDutyManager = (index, item) => {
    setState1(index);
    setSelectDutyManager(item);
  };

  const handleChangeDemand = (index, item) => {
    setSelectDemand(item);
    setLoading(true);
    setState2(index);
    // getAllDemandRefetch();
  };

  const resetChangeDemand = () => {
    setSelectDemand();
  };

  // console.log(index);

  // const [openDelete]
  const handleClose = () => {
    setSelectDemand({});
    setDemandId([]);
    setStatus1(0);
  };

  const [open, setOpen] = useState(false);
  // console.log("heya", searchBoxValue);

  const {
    data: getAllDemandId,
    error: getAllDemandIdError,
    isloading: getAllDemandIdIsloading,
    refetch: getAllDemandRefetch,
  } = useQuery(
    ["getAllDemandId"],
    () =>
      GetDemandId({
        demandId: selectDemand.demandTemplateId
          ? selectDemand?.demandTemplateId
          : undefined,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllDemandId && selectDemand.demandTemplateId) {
      console.log(getAllDemandId?.data?.data);
      setDemandId(getAllDemandId?.data?.data);
      setLoading(false);
    }
  }, [getAllDemandId]);

  const {
    data: getAllDemandTemplates,
    error: getAllDemandtError,
    isloading: getAllDemandIsloading,
    // refetch: getAllDemandRefetch,
  } = useQuery(
    ["getAllDemandTemplates"],
    () => getDemandTemp({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllDemandTemplates) {
      console.log(getAllDemandTemplates?.data?.data);
      setDemandLov(
        getAllDemandTemplates?.data?.data?.map((option) => {
          return {
            templateName: option?.demandTemplateName,
            validFrom: option?.validFrom,
            validTo: option?.validTo,
            profileName: option?.profile,
            demandTemplateId: option?.demandTemplateId,
            profileId: option?.profileId,
          };
        })
      );
      setDemandLoad(false)
    }
  }, [getAllDemandTemplates]);

  useEffect(() => {
    getAllDemandRefetch();
  }, [selectDemand]);

  // const {
  //   data: getDemandSuggestion,
  //   error: getDemandSuggestionError,
  //   isloading: getDemandSuggestionloading,
  //   // refetch: getAllDemandRefetch,
  // } = useQuery(["getDemandSuggestion"], () => GetDemandSuggestion(), {
  //   enabled: true,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (getDemandSuggestion) {
  //     console.log(getDemandSuggestion?.data?.data);
  //   }
  // }, [getDemandSuggestion]);

  // const {
  //   data: getDemand,
  //   error: getAllDemandtError,
  //   isloading: getAllDemandIsloading,
  //   // refetch: getAllDemandRefetch,
  // } = useQuery(["getAllDemandTemplates"], () => GetDemandTemplate(), {
  //   enabled: true,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (getAllDemandTemplates) {
  //     console.log(getAllDemandTemplates?.data?.data);
  //   }
  // }, [getAllDemandTemplates]);

  const { mutate: EmployeeSuggestions } = useMutation(getEmployeeSuggestions, {
    onSuccess: (data, context, variables) =>
      onEmployeeSuggestions(data, context, variables),
    onError: (data, context, variables) =>
      onErrEmployeeSuggestions(data, context, variables),
  });

  const onEmployeeSuggestions = (data) => {
    if (data) {
      setemployeeSuggestions(data?.data?.data?.empSuggetionMap);
      setSuggestionsHeader(data?.data?.data?.header);
      console.log(data?.data?.data);
    }
    setLoading1(false);
  };

  const onErrEmployeeSuggestions = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Couldn't fetch Employee Suggestions",
        type: "error",
      });
      console.log(data);
    }
    setLoading1(false);
  };

  const { mutate: CreateSuggestions } = useMutation(CreateEmployeeSuggestions, {
    onSuccess: (data, context, variables) =>
      onCreateSuggestions(data, context, variables),
    onError: (data, context, variables) =>
      onErrCreateSuggestions(data, context, variables),
  });

  const onCreateSuggestions = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully submitted Employee Suggestions",
        type: "success",
      });
      setChangeDelete(!changeDelete);
      setLoading2(false);
      setSelectDemand({});
      setDemandId([]);
      setStatus1(0);
    }
  };
  console.log(selectDemand);
  const onErrCreateSuggestions = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Couldn't submit the Demand",
        type: "error",
      });
      setLoading2(false);
    }
  };

  const CloseForm = (e) => {
    setLoading2(true);
    const date1 = new Date(startDate);
    const formattedDate1 = `${date1
      .getDate()
      .toString()
      .padStart(2, "0")}-${date1.toLocaleString("default", {
      month: "short",
    })}-${date1.getFullYear()}`;
    const date2 = new Date(endDate);
    const formattedDate2 = `${date2
      .getDate()
      .toString()
      .padStart(2, "0")}-${date2.toLocaleString("default", {
      month: "short",
    })}-${date2.getFullYear()}`;
    const dum = Object.keys(employeeSuggestions);
    var empMap = {};
    for (let i = 0; i < dum.length; i++) {
      var key = dum[i].slice(-10);
      empMap[key] = employeeSuggestions[dum[i]];
    }
    const pdata = {
      endDate: formattedDate2,
      startDate: formattedDate1,
      userId: "300000006565312",
      empSuggetionMap: empMap,
    };
    console.log(pdata);
    CreateSuggestions(pdata);
  };

  const handlegetSuggestions = () => {
    if (demandID.length > 0) {
      setLoading1(true);
      const date1 = new Date(startDate);
      const formattedDate1 = `${date1
        .getDate()
        .toString()
        .padStart(2, "0")}-${date1.toLocaleString("default", {
        month: "short",
      })}-${date1.getFullYear()}`;
      const date2 = new Date(endDate);
      const formattedDate2 = `${date2
        .getDate()
        .toString()
        .padStart(2, "0")}-${date2.toLocaleString("default", {
        month: "short",
      })}-${date2.getFullYear()}`;
      const pdata = {
        demandTemplateDetailsDto: demandID,
        startDate: formattedDate1,
        endDate: formattedDate2,
        profileId: selectDemand.profileId,
        userId: "300000006565312",
      };
      console.log(pdata);
      EmployeeSuggestions(pdata);
    }
  };

  useEffect(() => {
    if (demandID.length > 0 && startDate != "" && endDate != "") {
      handlegetSuggestions();
    }
  }, [demandID, startDate, endDate]);

  const handleCheckchange = (head, index1, key) => {
    var sugg = employeeSuggestions;
    if (sugg[key][index1].dateSuggestion[head] == "C") {
      sugg[key][index1].dateSuggestion[head] = "Y";
    } else {
      sugg[key][index1].dateSuggestion[head] = "C";
    }
    setemployeeSuggestions(sugg);
  };

  return (
    <>
      <CustomDialog
        maxWidth="xl"
        dialogTitle="Generate From Demand"
        open="true"
        handleClose={handleClose}
      >
        <Grid container style={{ border: "1px solid  #dbdbdb " }}>
          <Grid item xs="12">
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "15px",
                marginLeft: "10px",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                  // marginTop: "10px",
                  // marginLeft: "10px",
                  // padding:"0px"
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginTop: "4px",
                  }}
                >
                  {" "}
                  * Demand Template
                </Typography>
                <CustomTextField
                  style={{
                    width: 240,
                    marginLeft: "15px",
                    position: "relative",
                    right: "3px",
                  }}
                  value={
                    selectDemand.templateName ? selectDemand?.templateName : ""
                  }
                />
                <Button
                  onClick={() => {
                    setOpenDemand(true);
                  }}
                >
                  {<SearchIcon />}
                </Button>
                <ProgressLoader isLoading={demandLoad} size={25}/>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // marginTop: "10px",
                  marginLeft: "1em",
                  // padding:"0px"
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginTop: "6px",
                    marginRight: "9px",
                  }}
                >
                  {" "}
                  * Start Date
                </Typography>
                <DatePicker
                  className="dateManage"
                  // value={effectiveDate}
                  selected={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  dateFormat="dd-MMM-yyyy"
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // marginTop: "10px",
                  marginLeft: "1em",
                  // padding:"0px"
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginTop: "6px",
                    marginRight: "9px",
                  }}
                >
                  {" "}
                  * End Date
                </Typography>
                <DatePicker
                  className="dateManage"
                  // value={effectiveDate}
                  selected={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  dateFormat="dd-MMM-yyyy"
                />
              </Grid>
            </Box>
            <Grid
              item
              xs="10"
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Grid xs="25" style={{ widows: "100%" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    xs="5"
                    style={{
                      margin: "0px 20px",
                      left: "2.1em",
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      Valid From
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "10px",
                      }}
                    >
                      {selectDemand.validFrom
                        ? selectDemand?.validFrom.slice(0, 11)
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs="8"
                    style={{
                      left: "6em",
                      position: "relative",
                      display: "block",
                      marginLeft: " 20px",
                      display: "flex",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      Valid To
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "10px",
                      }}
                    >
                      {selectDemand.validTo
                        ? selectDemand?.validTo.slice(0, 11)
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs="3.7"
                    style={{
                      right: "3.4em",
                      position: "relative",
                      marginLeft: "50px",
                      display: "flex",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      Profile
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "10px",
                      }}
                    >
                      {selectDemand?.profileName}
                    </Typography>
                  </Grid>
                </Box>
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
          <Box style={{ margin: "10px 0 0 10px" }}>
            <ProgressLoader isLoading={loading} />
          </Box>
          {/* <Box>
                    <Typography style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Inter", color: "#124590" }}>
                        Add Staff With Preferences
                    </Typography>
                </Box> */}
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px solid  black ",
              marginTop: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              backgroundColor: "#d0d0d0",
            }}
          >
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "250px", borderRight: "1px grey solid" }}>
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
                  Department
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "300px", borderRight: "1px grey solid" }}>
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
                  Job Title
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "200px", borderRight: "1px grey solid" }}>
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
                  Specialized Department
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "100px", borderRight: "1px grey solid" }}>
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
                  Split Shift
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "150px", borderRight: "1px grey solid" }}>
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
                  Work Duration
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "100px", borderRight: "1px grey solid" }}>
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
                  Time Start
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "100px", borderRight: "1px grey solid" }}>
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
                  Time End
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "100px", borderRight: "1px grey solid" }}>
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
                  Skill
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Fte
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "150px", borderRight: "1px grey solid" }}>
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
                  Employee Type
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Sun
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Mon
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Tue
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Wed
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Thu
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Fri
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "50px", borderRight: "1px grey solid" }}>
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
                  Sat
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "150px", borderRight: "1px grey solid" }}>
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
                  Gender
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ alignItems: "center" }}>
              <Box style={{ width: "150px", borderRight: "1px grey solid" }}>
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
                  Nationality
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              // border: "1px solid grey",
            }}
          >
            {demandID.length > 0 ? (
              demandID.map((item) => {
                return (
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      border: "1px solid  black ",
                      // marginTop: "10px",
                      // marginRight: "10px",
                      // marginLeft: "10px",
                    }}
                  >
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "250px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.department}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "300px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                            marginLeft: "5px",
                          }}
                        >
                          {item?.jobTitle}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "200px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.specialized_department != ""
                            ? item?.specialized_department
                            : `-`}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "100px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.splitShift != "" ? item?.splitShift : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "150px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.workduration}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "100px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.timeStart}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "100px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.timeEnd}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "100px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.skill == "" || item.skill == null
                            ? "-"
                            : item?.skill}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.fte}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "150px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.employeeType != "" ? item?.employeeType : `-`}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.sun ? item?.sun : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.mon ? item?.mon : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.tue ? item?.tue : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.wed ? item?.wed : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.thu ? item?.thu : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.fri ? item?.fri : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{ width: "50px", borderRight: "1px grey solid" }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.sat ? item?.sat : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "150px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.gender != "" ? item?.gender : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid style={{ alignItems: "center" }}>
                      <Box
                        style={{
                          width: "150px",
                          borderRight: "1px grey solid",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            //fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "5px",
                            textAlign: "center",
                          }}
                        >
                          {item?.nationality != "" ? item?.nationality : "-"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <Box
                style={{ width: "300px", marginLeft: "5px", border: "none" }}
              >
                No Data to display
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          style={{ border: "1px solid  #dbdbdb", marginTop: "15px" }}
        >
          <Box style={{ margin: "10px 0 0 10px" }}>
            <ProgressLoader isLoading={loading1} />
          </Box>
          <Grid item xs="12">
            {employeeSuggestions &&
            Object.keys(employeeSuggestions).length > 0 ? (
              Object.keys(employeeSuggestions).map((key) => {
                return (
                  <Box style={{ margin: "20px 0", paddingLeft: "20px" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {key.slice(0, -11)}
                    </Typography>
                    <Box style={{ display: "flex" }}>
                      <Box
                        style={{
                          minWidth: "300px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          style={{
                            padding: "5px 5px",
                            borderLeft: "1px solid grey",
                            borderTop: "1px solid grey",
                            borderBottom: "1px solid grey",
                            // border: "1px solid grey",
                            backgroundColor: "#d0d0d0",
                          }}
                        >
                          {suggestionsHeader[0]}
                        </Box>
                        <Box
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {employeeSuggestions[key].map((item) => {
                            return (
                              <Box
                                style={{
                                  height: "40.81px",
                                  // border: "1px solid grey",
                                  borderLeft: "1px solid grey",
                                  borderRight: "1px solid grey",
                                  borderBottom: "1px solid grey",
                                  display: "flex",
                                  alignItems: "center",
                                  paddingLeft: "5px",
                                }}
                              >
                                {item.employee}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          overflowX: "scroll",
                        }}
                      >
                        <Box style={{ display: "flex" }}>
                          {suggestionsHeader.map((head, index) => {
                            if (index != 0) {
                              return (
                                <Box
                                  style={{
                                    minWidth: "100px",
                                    textAlign: "center",
                                    borderLeft: "1px solid grey",
                                    borderTop: "1px solid grey",
                                    borderBottom: "1px solid grey",
                                    // border: "1px solid grey",
                                    padding: "5px 0",
                                    backgroundColor: "#d0d0d0",
                                  }}
                                >
                                  {head}
                                </Box>
                              );
                            }
                          })}
                        </Box>
                        <Box
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {employeeSuggestions[key].map((item, index1) => {
                            return (
                              <Box style={{ display: "flex" }}>
                                {suggestionsHeader.map((head, index) => {
                                  if (index != 0) {
                                    return (
                                      <Box
                                        style={{
                                          minWidth: "100px",
                                          textAlign: "center",
                                          borderRight: "1px solid grey",
                                          borderBottom: "1px solid grey",
                                          padding: "5px 0",
                                        }}
                                      >
                                        {item.dateSuggestion?.[head] == "C" ||
                                        item.dateSuggestion[head] == "Y" ? (
                                          <Checkbox
                                            onClick={() => {
                                              handleCheckchange(
                                                head,
                                                index1,
                                                key
                                              );
                                            }}
                                            style={{ height: "30px" }}
                                            defaultChecked={
                                              item.dateSuggestion[head] == "C"
                                                ? true
                                                : false
                                            }
                                          />
                                        ) : (
                                          <Box
                                            style={{ height: "40.81" }}
                                          ></Box>
                                        )}
                                      </Box>
                                    );
                                  }
                                })}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box style={{ margin: "0 0 10px 10px" }}>
                No Employee Suggestions
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid style={{ marginTop: "10px", display: "block" }}>
          <Grid style={{ display: "Flex", flexDirection: "row", alignItems: "center" }}>
              <ProgressLoader isLoading={loading2} />
              <CustomButton
                startIcon={<DoneIcon />}
                btnText="Submit"
                btnClass={
                  loading2
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
                variant="contained"
                onClick={CloseForm}
              />
          </Grid>
        </Grid>
      </CustomDialog>
      {openDemand && (
        <DemandPopup
          toggleHandler={setOpenDemand}
          demandLov={demandLOV}
          handleChangeDemand={handleChangeDemand}
          resetChangeDemand={resetChangeDemand}
          state1={state1}
          setState1={setState1}
        />
      )}

      {/* {openDelete && (
        <DeleteRoster
          toggleHandler={setOpenDelete}
          personRosterId={personRosterId}
        />
      )} */}
    </>
  );
};

export default GenerateFormDemand;

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
