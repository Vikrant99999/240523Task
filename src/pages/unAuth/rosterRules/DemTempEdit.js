import { Typography, Grid, Box } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../.././components/Button";
import { CustomDialog } from "../../.././components/CustomDialog";
import { CustomTextField } from "../../.././components/TextField";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";

// import AssignTable from "./AssignTable";
import DoneIcon from "@mui/icons-material/Done";
// import {
//   GetSingleShift,
//   workDuration,
//   getallStaffData,
// } from "../../../../services/api";

import DatePicker from "react-datepicker";

import moment from "moment";

import {
  deleteworkRotation,
  createWorkRotation,
  updateWorkRotation,
  getWorkRotataionById,
  BussinessUnitData,
  workDuration,
  Department,
  JobTitle,
  getProfileById,
  getDepartmentById,
  getJobTitleById,
  getWorkLocationById,
  workLocation,
  getDemandTemplateById,
  createDemandTemplate,
  updateDemandTemplate,
} from "../../../services/api";
import { dateConverter } from "../../../utils/commonService";
import DemandTemplateRow from "./DemandTemplateRow";
import RequiredTitle from "../../../utils/RequiredTitle";
import { EmployeeTypeMockData, GenderMock } from "./Utils";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ProfileFilterModal } from "../staff/shared/filters/ProfileFilterModal";
import ProfileModal from "./modal/ProfileModal";
import ProgressLoader from "../rosterSettings/Loader";
const DemTempEdit = (props) => {
  const {
    setStatus1,
    datw,
    setSnakeBarProps,
    demandTempId,
    editData,
    setErrorProps,
    citizenData,
    skillData,
    getAllProjectRefetch,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [profile, setProfile] = useState([]);
  const [pageData, setPageData] = useState();
  console.log(pageData, "pageData");
  const [profileName, setProfileName] = useState(
    editData == undefined ? null : editData?.profile
  );
  const [profileId, setProfileId] = useState(
    editData == undefined ? null : editData?.profileId
  );

  const [templateName, setTemplateName] = useState(
    editData == undefined ? null : editData?.demandTemplateName
  );

  const [demandTemplateLines, setDemandTemplateLines] = useState([]);
  const [validFrom, setValidFrom] = React.useState(
    editData === undefined
      ? null
      : new Date(moment(editData?.validFrom).format("DD-MMM-YYYY"))
  );
  const [validTo, setValidTo] = React.useState(
    editData === undefined
      ? null
      : new Date(moment(editData?.validTo).format("DD-MMM-YYYY"))
  );
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [citizen, setCitizen] = useState({
    citizenArray: citizenData,
    citizenObj: {},
    citizenName: "",
  });
  const [EmployeeType, setEmployeeType] = useState({
    employeeArray: EmployeeTypeMockData,
    employeeObj: {},
    employeeName: "",
  });
  const [gender, setGender] = useState({
    genderArray: GenderMock,
    genderObj: {},
    genderName: "",
  });
  const [BussinessData, setBussinessData] = useState({
    BussinessArray: [],
    BussinessObj: {},
    BussinessName: "",
  });
  const [departmentData, setDepartmentData] = useState({
    departmentArray: [],
    departmenteObj: {},
    departmentName: "",
    departmentId: "",
  });
  const [jobTitleData, setJobTitleData] = useState({
    jobTitleArray: [],
    jobTitleObj: {},
    jobTitleName: "",
  });
  const [workDurationArr, setWorkDurationArr] = useState([]);
  const [workLocationArr, setWorkLocationArr] = useState([]);

  const handleAdd = () => {
    const abc = [...demandTemplateLines];
    abc.push({});
    setDemandTemplateLines(abc);
  };

  const handleDelete = (index) => {
    const deleteRow = [...demandTemplateLines];
    deleteRow.splice(index, 1);
    setDemandTemplateLines(deleteRow);
  };

  useEffect(() => {
    if (profileName && validFrom && validTo) {
      const abc = profileName?.concat(
        " ",
        "(",
        moment(validFrom).format("DD-MMM-YYYY"),
        " to ",
        moment(validTo).format("DD-MMM-YYYY"),
        ")"
      );

      setTemplateName(abc);
    }
  });

  const closeForm1 = () => {
    setStatus1(false);
  };

  const handleChangeProfile = (iitem) => {
    setProfileName(iitem?.profileName);
    setProfileId(iitem?.profileId);
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

  const effectiveDateChangeFrom = (effectiveDatevalue) => {
    setValidFrom(effectiveDatevalue);
  };
  const effectiveDateChangeTo = (effectiveDatevalue) => {
    setValidTo(effectiveDatevalue);
  };
  //------------------------------------

  const classes = useStyles();
  const [submitFlag, setSubmitFlag] = useState(false);
  const [isLoadingBut, setIsLoadingBut] = useState(false);

  const { data: getBussinessData } = useQuery(
    ["getBussinessData"],
    () => BussinessUnitData(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getBussinessData) {
      setBussinessData({
        ...BussinessData,
        BussinessArray: getBussinessData?.data?.data,
        BussinessObj: {},
      });
    }
  }, [getBussinessData]);
  const { data: getAllWorkDuration } = useQuery(
    ["getworkDuration"],
    () => workDuration(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllWorkDuration) {
      setWorkDurationArr(
        getAllWorkDuration?.data?.data?.map((option) => {
          return {
            id: option?.workDurationId,
            label: option?.workDurationCode,
            timeStart: option?.timeStart,
            timeEnd: option?.timeEnd,
          };
        })
      );
    }
  }, [getAllWorkDuration]);
  //Api for profile list
  const { data: getAllProfile } = useQuery(
    ["getAllSingleData"],
    () => getProfileById({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllProfile) {
      setProfile(getAllProfile?.data?.data);
    }
  }, [getAllProfile]);

  const { data: getAllDataById } = useQuery(
    ["getAllDataById", editData?.demandTemplateId],

    () =>
      getDemandTemplateById({
        id: editData?.demandTemplateId || editData?.demandTemplateIdToCopy,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllDataById) {
      setDemandTemplateLines(getAllDataById?.data?.data?.demandTemplateLines);
      setPageData(getAllDataById?.data?.data);
    }
  }, [getAllDataById]);
  //api inetgartion for dutymanager,depatment,jobtitle

  const { data: getAllDepartment } = useQuery(
    ["getDepartment", profileId],
    () =>
      getDepartmentById({
        userId: commonReducer.userId,
        profileId: profileId,
      }),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDepartment) {
      setDepartmentData({
        ...departmentData,
        departmentArray: getAllDepartment?.data?.data,
        departmentObj: {},
      });
    }
  }, [getAllDepartment]);

  //jobTitle

  const { data: getAllJobTitle } = useQuery(
    ["getJobTitle", departmentData?.departmentId],
    () =>
      getJobTitleById({
        userId: commonReducer.userId,
        name: "department",
        departmentId: departmentData?.departmentId,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllJobTitle) {
      setJobTitleData({
        ...jobTitleData,
        jobTitleArray: getAllJobTitle?.data?.data,
        jobTitleObj: {},
      });
    }
  }, [getAllJobTitle]);
  //Api for work location
  const { data: getAllWorkLocation } = useQuery(
    ["getAllWorkLocation", profileId],
    () =>
      getWorkLocationById({
        userId: commonReducer.userId,
        profileId: profileId,
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllWorkLocation) {
      setWorkLocationArr(getAllWorkLocation?.data?.data);
    }
  }, [getAllWorkLocation]);
  // console.log(demandTemplateLines, "demandTemplateLines");

  //Api for create work Demand template
  const { mutate: createDemandTemplateMutate } = useMutation(
    createDemandTemplate,
    {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    }
  );

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully added new Demand Template!",
        type: "success",
      });

      setIsLoadingBut(false);
      closeForm1();
      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      // console.log(error?.response?.data?.status?.description, "error");
      setErrorProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setIsLoadingBut(false);
      setStatus1(true);
    }
  };

  const saveHandler = () => {
    if (profileName == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Profile!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (validFrom == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Valid From!",
        type: "error",
      });
      return;
    }
    if (validTo == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Valid To !",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (validTo < validFrom) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Valid to is not less than valid from   !",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (demandTemplateLines.length == 0) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please add atleast one row",
        type: "error",
      });
      return;
    }
    for (let i = 0; i < demandTemplateLines?.length; i++) {
      if (demandTemplateLines[i]?.departmentId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Department is required!",
          type: "error",
        });
        return;
      }
      if (demandTemplateLines[i]?.jobTitleId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Job Title is required!",
          type: "error",
        });
        return;
      }
      if (demandTemplateLines[i]?.workDurationId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Work Duration is required!",
          type: "error",
        });
        return;
      }
      if (
        demandTemplateLines[i]?.fte == undefined ||
        demandTemplateLines[i]?.fte < 0
      ) {
        setErrorProps({
          snackbarFlag: true,
          msz: "fte is required!",
          type: "error",
        });
        return;
      }
      // if (demandTemplateLines[i]?.fte != "number") {
      //   setErrorProps({
      //     snackbarFlag: true,
      //     msz: "FTE should be a number!",
      //     type: "error",
      //   });
      //   return;
      // }
    }

    var pData = {
      userId: commonReducer.userId,
      profileId: profileId,
      profile: profileName,
      validFrom: dateConverter(moment(validFrom).format("DD-MM-YYYY")),
      validTo: dateConverter(moment(validTo).format("DD-MM-YYYY")),
      templateName: templateName,
      demandTemplateLines: demandTemplateLines,
    };
    setIsLoadingBut(true);
    createDemandTemplateMutate(pData);
  };

  const { mutate: updateDemandTemplateMutate } = useMutation(
    updateDemandTemplate,
    {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    }
  );

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully Updated Demand Template!",
        type: "success",
      });

      setIsLoadingBut(false);
      closeForm1();
      getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      // console.log(error?.response?.data?.status?.description, "error");
      setErrorProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });

      setStatus1(true);
      setIsLoadingBut(false);
    }
  };

  const updateHandler = () => {
    if (profileName == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Profile!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (validFrom == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Valid From!",
        type: "error",
      });
      return;
    }
    if (validTo == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Valid To !",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (demandTemplateLines.length == 0) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please select atleast one row",
        type: "error",
      });
      return;
    }
    for (let i = 0; i < demandTemplateLines?.length; i++) {
      if (demandTemplateLines[i]?.departmentId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Department is required",
          type: "error",
        });
        return;
      }
      if (demandTemplateLines[i]?.jobTitleId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Job Title is required",
          type: "error",
        });
        return;
      }
      if (demandTemplateLines[i]?.workDurationId == undefined) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Work Duration is required!",
          type: "error",
        });
        return;
      }
    }

    var pData = {
      demandTemplateId: editData?.demandTemplateId,
      userId: commonReducer.userId,
      profileId: profileId,
      profile: profileName,
      validFrom: dateConverter(moment(validFrom).format("DD-MM-YYYY")),
      validTo: dateConverter(moment(validTo).format("DD-MM-YYYY")),
      templateName: templateName,
      demandTemplateLines: demandTemplateLines,
    };
    setIsLoadingBut(true);
    updateDemandTemplateMutate(pData);
  };

  return (
    <>
      <CustomDialog
        maxWidth="lg"
        dialogTitle="Demand Template"
        open="true"
        handleClose={closeForm1}
      >
        <Grid container style={{ display: "flex", flexDirection: "row" }}>
          <Grid xs="6">
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Profile</Box>
                </Typography>
              </Grid>
              <Grid xs="5" style={{ marginLeft: "5px" }}>
                <CustomTextField
                  type="text"
                  required
                  value={profileName}
                  endIcon={
                    <SearchIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenProfileModal(true)}
                    />
                  }
                />
              </Grid>
            </Box>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Valid From</Box>
                </Typography>
              </Grid>
              <Grid xs="5" style={{ marginLeft: "5px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={validFrom}
                  onChange={effectiveDateChangeFrom}
                />
              </Grid>
            </Box>

            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Template Name</Box>
                </Typography>
              </Grid>
              <Grid xs="2" style={{ marginLeft: "5px" }}>
                <Typography
                  style={{
                    fontSize: "14px",

                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  {" "}
                  {templateName}
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Grid xs="6" style={{ marginTop: 35 }}>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                ></Typography>
              </Grid>
              <Grid xs="5" style={{ marginLeft: "5px" }}></Grid>
            </Box>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Valid To</Box>
                </Typography>
              </Grid>
              <Grid xs="5" style={{ marginLeft: "5px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={validTo}
                  onChange={effectiveDateChangeTo}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs="12">
            <Box>
              <CustomButton
                btnText="New"
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                onClick={handleAdd}
                startIcon={<AddIcon className={classes.addIcon} />}
              />
            </Box>

            <Grid
              container
              style={{
                border: "1px solid  #dbdbdb ",
                marginTop: "20px",
                overflow: "scroll",
                // height: 160,
              }}
            >
              <Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // border: "1px solid  black ",
                    marginTop: "10px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#F1F1F1",
                  }}
                >
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 80 }}>
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
                        Action
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 300 }}>
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
                        <RequiredTitle title="Required" value="*" />
                        Department
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 300 }}>
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
                        <RequiredTitle title="Required" value="*" />
                        Job Title
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 300 }}>
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
                        <RequiredTitle title="Required" value="*" />
                        Work Duration
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 120 }}>
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
                    <Box style={{ width: 120 }}>
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
                        Time End{" "}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 100 }}>
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
                        *FTE
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 250 }}>
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
                    <Box style={{ width: 500 }}>
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
                        Days
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 250 }}>
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
                    <Box style={{ width: 250 }}>
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
                        Bussiness Unit{" "}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid style={{ alignItems: "center" }}>
                    <Box style={{ width: 250 }}>
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
                    <Box style={{ width: 250 }}>
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
                    <Box style={{ width: 250 }}>
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
                <Grid style={{ height: 160, overflowY: "scroll" }}>
                  {demandTemplateLines?.length > 0 ? (
                    demandTemplateLines?.map((item, index) => {
                      return (
                        <DemandTemplateRow
                          demandTemplateLines={demandTemplateLines}
                          setDemandTemplateLines={setDemandTemplateLines}
                          item={item}
                          handleDelete={handleDelete}
                          index={index}
                          skillData={skillData}
                          citizen={citizen}
                          setCitizen={setCitizen}
                          setEmployeeType={setEmployeeType}
                          EmployeeType={EmployeeType}
                          gender={gender}
                          setGender={setGender}
                          BussinessData={BussinessData}
                          setBussinessData={setBussinessData}
                          workDurationArr={workDurationArr}
                          departmentData={departmentData}
                          setDepartmentData={setDepartmentData}
                          jobTitleData={jobTitleData}
                          setJobTitleData={setJobTitleData}
                          workLocationArr={workLocationArr}
                        />
                      );
                    })
                  ) : (
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        marginLeft: "10px",
                      }}
                    >
                      No Data To Display
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {editData == null || editData.isCopy ? (
          <Grid item xs="12" className={classes.selectButton}>
            <ProgressLoader
              isLoading={isLoadingBut}
              size={25}
              style={{ marginRight: "10px", marginTop: "15px" }}
            />

            <CustomButton
              btnText="Save"
              btnClass={
                isLoadingBut
                  ? {
                      backgroundColor: "white",
                      color: "grey",
                      border: "solid 1px grey",
                      marginTop: "10px",
                    }
                  : {
                      backgroundColor: "#124590",
                      color: "#fff",
                      marginTop: "10px",
                    }
              }
              onClick={!isLoadingBut && saveHandler}
            />
            <CustomButton
              btnText="Cancel"
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
                marginTop: "10px",
              }}
              onClick={closeForm1}
            />
          </Grid>
        ) : (
          <Grid item xs="12" className={classes.selectButton}>
            <ProgressLoader
              isLoading={isLoadingBut}
              size={25}
              style={{ marginRight: "10px", marginTop: "15px" }}
            />

            <CustomButton
              btnText="Save"
              btnClass={
                isLoadingBut
                  ? {
                      backgroundColor: "white",
                      color: "grey",
                      border: "solid 1px grey",
                      marginTop: "10px",
                    }
                  : {
                      backgroundColor: "#124590",
                      color: "#fff",
                      marginTop: "10px",
                    }
              }
              onClick={!isLoadingBut && updateHandler}
            />
            <CustomButton
              btnText="Cancel"
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
                marginTop: "10px",
              }}
              onClick={closeForm1}
            />
          </Grid>
        )}
      </CustomDialog>
      {openProfileModal && (
        <ProfileModal
          profile={profile}
          toggleHandler={setOpenProfileModal}
          handleChangeData={handleChangeProfile}
        />
      )}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  textField: {
    display: "flex",
    alignItems: "center",
    margin: "15px 10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    height: "35px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    // overflow: "auto",
    // height: "150px",
    // width: "100%",
    overflow: "scroll",
  },
  innermainbox: {
    display: "inline-block",
    minWidth: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    // width: "100%",
    // overflow: "auto",
    overflow: "scroll",
  },
  workplan: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
    background: "lightblue",
  },
  sequence: {
    width: "14%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
  },
  week: {
    width: "8%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
  },
  placer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "25px",
  },
  text: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
export default DemTempEdit;
