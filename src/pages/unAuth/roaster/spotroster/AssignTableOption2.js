import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import { makeStyles } from "@material-ui/styles";
import { CustomTextField } from "../../../../components/TextField";
import { useQuery } from "react-query";
import { workLocation, onCall, Emergency } from "../../../../services/api";
import { workDuration } from "../../../../services/api";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import DepatmentPopup from "./DepatmentPopup";
import JobTitleModal from "./JobTitleModal";
import DutyManagerModal from "./DutyManagerModal";
import StaffModal from "./StaffModal";
import {
  DutyManager,
  getDepartmentById,
  getJobTitleById,
} from "../../../../services/api";
import SearchIcon from "@material-ui/icons/Search";
import RequiredTitle from "../../../../utils/RequiredTitle";
import { useSelector } from "react-redux";

const AssignTableOption2 = (props) => {
  const {
    value,
    setValue,
    data,
    staffData,
    worksee,
    index,
    onCountryChange,
    workDurationArr,
    setSnakeBarProps,
  } = props;
  // const[data,setData]= useState()
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const deleteRow = (i) => {
    const deleteval = [...value];
    deleteval?.splice(i, 1);
    setValue(deleteval);
    // console.log(value)
  };

  const [status, setStatus] = React.useState(0);
  const [state, setState] = useState(-1);
  const [state1, setState1] = useState(-1);
  const [state2, setState2] = useState(-1);
  const [state3, setState3] = useState(-1);
  const [selectDutyManager, setSelectDutyManager] = React.useState();
  const [selectDepartment, setSelectDepartment] = React.useState({});
  const [jobTitleArray, setJobTitleArray] = useState([]);
  const [dutyManagerArr, setDutyManagerArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedStaff, setSelectedStaff] = useState(-1);
  const [selectJobTitle, setSelectJobTitle] = React.useState({});

  const handleSelectedStaff = (value) => {
    setSelectedStaff(value);
  };

  const handleChangeDutyManager = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = {
      staffDto: {
        ...localStaff[selectedStaff].staffDto,
        dutyManager: item.staffName,
      },
      workDurationDto: { ...localStaff[selectedStaff].workDurationDto },
    };

    setValue(localStaff);
    setState1(index);
    setSelectDutyManager(item);
  };

  const handleChange1 = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = { staffDto: { ...item }, workDurationDto: {} };
    setValue(localStaff);
    setState(index);
  };

  const handleChangeDepartment = (index, item) => {
    var localStaff = [...value];

    localStaff[selectedStaff] = {
      staffDto: {
        ...localStaff[selectedStaff].staffDto,
        departmentId: item.departmentId,
        department: item.departmentName,
        jobTitle: "",
        jobTitleId: "",
      },
      workDurationDto: { ...localStaff[selectedStaff].workDurationDto },
    };

    setValue(localStaff);
    setSelectDepartment(item);
  };

  const handleChangeJobTitle = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = {
      staffDto: {
        ...localStaff[selectedStaff].staffDto,
        jobTitle: item.jobTitle,
        jobTitleId: item.jobTitleId,
      },
      workDurationDto: { ...localStaff[selectedStaff].workDurationDto },
    };

    setValue(localStaff);
    setSelectJobTitle(item);
  };

  const handleChangeOnCall = (index, item) => {
    var localStaff = [...value];
    localStaff[index] = {
      staffDto: {
        ...localStaff[index].staffDto,
        onCall: item,
      },
      workDurationDto: { ...localStaff[index].workDurationDto },
    };

    setValue(localStaff);
  };
  const handleChangeOnEmergency = (index, item) => {
    var localStaff = [...value];
    localStaff[index] = {
      staffDto: {
        ...localStaff[index].staffDto,
        emergency: item,
      },
      workDurationDto: { ...localStaff[index].workDurationDto },
    };
    setValue(localStaff);
  };

  const btnClick = (e) => {
    setStatus(e);
  };

  const {
    data: getAllWorkDuration,
    error,
    isLoading,
  } = useQuery(["getworkDuration"], () => workDuration(), {
    enabled: true,
    retry: false,
  });

  // useEffect(() => {
  //   if (getAllWorkDuration) {
  //     setWorkDurationArr(getAllWorkDuration?.data?.data);
  //   }
  // }, [getAllWorkDuration]);

  const [workLocationArr, setWorkLocationArr] = useState([]);
  const [onCallArr, setOnCallArr] = useState([]);
  const [emergencyArr, setEmergencyArr] = useState([]);

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
  const [departmentId, setDepartmentId] = useState("");
  const { data: getAllJobTitle } = useQuery(
    ["getJobTitle", departmentId],
    () =>
      getJobTitleById({
        userId: commonReducer.userId,
        name: "department",
        departmentId: departmentId,
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

  console.log(emergencyArr);
  const { data: getOnCall } = useQuery(["getoncall"], () => onCall(), {
    enabled: true,
    retry: false,
  });
  useEffect(() => {
    if (getOnCall) {
      console.log("onCall", getOnCall?.data?.data);
      setOnCallArr(getOnCall?.data?.data);
    }
  }, [getOnCall]);

  const handleWorkDuration = (rowIndex, workDurationValue) => {
    var localVal = [...value];

    if (workDurationValue) {
      for (let i in workDurationArr) {
        if (workDurationArr[i].workDurationCode == workDurationValue) {
          localVal[rowIndex].workDurationDto = { ...workDurationArr[i] };
        }
      }
    } else {
      localVal[rowIndex].workDurationDto.workDurationId = "";
    }
    setValue(localVal);
  };

  // const populateSnakebar = (arr) => {
  //   setSnakeBarProps({
  //     snackbarFlag: true,
  //     msz: "Error",
  //     details: arr,
  //     type: "error",
  //   });
  // };

  const handleWorkingDays = (rowIndex, key, checkedValue) => {
    var localVal = [...value];
    localVal[rowIndex].workDurationDto[key] = encodeWorkingDays(checkedValue);
    setValue(localVal);
  };
  const encodeWorkingDays = (checkedState) => {
    return checkedState ? "Y" : "N";
  };
  const decodeWorkingDays = (checkedState) => {
    return checkedState === "Y" ? true : false;
  };
  return (
    <Grid
      container
      style={{
        border: "1px solid  #dbdbdb ",
        marginTop: "20px",
        overflow: "scroll",
      }}
    >
      <Grid>
        <table
          style={{
            border: "1px solid  #dbdbdb",
            borderCollapse: "collapse",
          }}
        >
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px solid  rgb(219, 219, 219)",
            }}
          >
            <Grid
              className={`${classes.remove_col} ${classes.rightBorderHeading} `}
            >
              <Box>
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
                  Remove
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.staff_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    marginLeft: "5px",
                  }}
                >
                  <RequiredTitle title="Required" value="*" />
                  Staff
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.work_dur_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    marginLeft: "5px",
                  }}
                >
                  <RequiredTitle title="Required" value="*" />
                  Work Duration
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.start_time_col} ${classes.rightBorderHeading}`}
            >
              <Box>
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
                  Start Time
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.end_time_col} ${classes.rightBorderHeading} `}
            >
              <Box>
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
                  End Time
                </Typography>
              </Box>
            </Grid>
            {worksee && (
              <Grid
                className={`${classes.working_days_col} ${classes.rightBorderHeading}`}
              >
                <Box>
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
                    Working Days
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid
              className={`${classes.dep_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  <RequiredTitle title="Required" value="*" />
                  Department
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.job_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  JobTitle
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.work_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  Work Location
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.duty_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  Duty Manager
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.oncall_col} ${classes.rightBorderHeading}`}
            >
              {" "}
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  On Call
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.emergency_col} ${classes.rightBorderHeading}`}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    marginLeft: "5px",
                  }}
                >
                  Emergency
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {value?.length > 0 ? (
            value?.map((item, i) => {
              var staffName = item.staffDto?.staffName
                ? item.staffDto?.staffName +
                  ` [${item.staffDto?.employeeNumber}]`
                : item.staffDto?.fullName +
                  ` [${item.staffDto?.employeeNumber}]`;

              var workDurationCode = item.workDurationDto?.workDurationCode;
              workDurationCode = workDurationCode ? workDurationCode : "";
              var startTimeArr = item.workDurationDto?.timeStart?.split("T");
              var StartTime = startTimeArr?.[1];

              var endTimeArr = item.workDurationDto?.timeEnd?.split("T");
              var EndTime = endTimeArr?.[1];
              var department = item.staffDto?.department
                ? item.staffDto?.department
                : item.staffDto?.departmentName;

              var jobTitle = item.staffDto?.jobTitle;
              var workLocation = item.staffDto?.workLocation;
              var dutyManager = item.staffDto?.dutyManager;

              return (
                <Grid
                  item
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px solid silver",
                  }}
                >
                  <Box
                    className={`${classes.remove_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RequiredTitle
                      title="Remove"
                      value={
                        <RemoveIcon
                          onClick={() => {
                            deleteRow(i);
                          }}
                          style={{
                            fontSize: "22px",
                            color: "red",
                            marginLeft: "15px",
                            marginTop: "5px",
                            cursor: "pointer",
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    className={`${classes.staff_col} ${classes.rightBorderRow}`}
                  >
                    <CustomTextField
                      value={staffName}
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
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
                                handleSelectedStaff(i);
                                btnClick(1);
                              }}
                            />
                          }
                        />
                      }
                    />
                  </Box>
                  <Box
                    className={`${classes.work_dur_col} ${classes.rightBorderRow}`}
                  >
                    <Autocomplete
                      sx={{
                        ".MuiAutocomplete-clearIndicator": {
                          display: "none",
                        },
                      }}
                      id="free-solo-demo"
                      // disablePortal
                      // disableClearable

                      options={workDurationArr.map(
                        (option) => option.workDurationCode
                      )}
                      title={workDurationCode}
                      value={workDurationCode}
                      onChange={(e, newCode) => {
                        handleWorkDuration(i, newCode);
                      }}
                      // onBlur={(e) => {
                      //   if (e.target.value == "") {
                      //     var arr = ["Work Duration is required"];
                      //     populateSnakebar(arr);
                      //   }
                      // }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                    />
                  </Box>
                  <Box
                    className={`${classes.start_time_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "#E9E9E9 2px solid",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      {" "}
                      {StartTime}
                    </Typography>
                  </Box>
                  <Box
                    className={`${classes.end_time_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRight: "#E9E9E9 2px solid",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                    >
                      {EndTime}
                    </Typography>
                  </Box>
                  {worksee && (
                    <Box
                      className={`${classes.working_days_col} ${classes.rightBorderRow}`}
                    >
                      <Grid style={{ display: "flex", flexDirection: "row" }}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (key) => {
                            var checkedBoxState = decodeWorkingDays(
                              item.workDurationDto[key.toLowerCase()]
                            );
                            return (
                              <Box
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <CustomCheckBox
                                  disabled={
                                    workDurationCode === "" ? true : false
                                  }
                                  check={checkedBoxState}
                                  onChangeCheck={(checked) => {
                                    handleWorkingDays(
                                      i,
                                      key.toLowerCase(),
                                      checked
                                    );
                                  }}
                                />
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "bold",
                                    marginTop: "10px",
                                  }}
                                >
                                  {key}
                                </Typography>
                              </Box>
                            );
                          }
                        )}
                      </Grid>
                    </Box>
                  )}
                  <Box
                    className={`${classes.dep_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CustomTextField
                      title={department}
                      value={department}
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
                      endIcon={
                        <SearchIcon
                          style={{
                            marginLeft: "2px",
                            fontSize: "18px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            handleSelectedStaff(i);
                            btnClick(2);
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box
                    className={`${classes.job_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CustomTextField
                      value={jobTitle}
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                      }}
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
                                setDepartmentId(item.departmentId);
                                handleSelectedStaff(i);
                                btnClick(3);
                              }}
                            />
                          }
                        />
                      }
                    />
                  </Box>
                  <Box
                    className={`${classes.work_col} ${classes.rightBorderRow}`}
                  >
                    <Autocomplete
                      title={workLocation}
                      id="free-solo-demo"
                      disableClearable
                      value={workLocation}
                      options={
                        workLocationArr.length > 0 &&
                        workLocationArr.map((option) => option?.locationName)
                      }
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                    />
                  </Box>
                  <Box
                    className={`${classes.duty_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CustomTextField
                      value={dutyManager}
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
                                handleSelectedStaff(i);
                                btnClick(4);
                              }}
                            />
                          }
                        />
                      }
                    />
                  </Box>
                  <Box
                    className={`${classes.oncall_col} ${classes.rightBorderRow}`}
                  >
                    <Autocomplete
                      id="free-solo-demo"
                      disableClearable
                      options={onCallArr.map((option) => option?.valueMeaning)}
                      onChange={(e, value) => {
                        var index = onCallArr.findIndex(
                          (item) => item.valueMeaning === value
                        );
                        if (index !== -1) {
                          handleChangeOnCall(
                            i,
                            onCallArr[index].valueSetValueId
                          );
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                    />
                  </Box>
                  <Box
                    className={`${classes.emergency_col} ${classes.rightBorderRow}`}
                  >
                    <Autocomplete
                      id="free-solo-demo"
                      disableClearable
                      options={emergencyArr.map(
                        (option) => option?.valueMeaning
                      )}
                      onChange={(e, value) => {
                        var index = emergencyArr.findIndex(
                          (item) => item.valueMeaning === value
                        );
                        if (index !== -1) {
                          handleChangeOnEmergency(
                            i,
                            emergencyArr[index].valueSetValueId
                          );
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                    />
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "clip",
                fontSize: "14px",
                fontFamily: "Inter",
                margin: "5px 0px",
                paddingLeft: "20px",
              }}
            >
              No data to display
            </Typography>
          )}
          {/* {
            value?.length > 0 ?
            value?.map((item,i)=>{
            return  <tbody style={{backgroundColor:"#e8f3fc",border:"1px solid  #dbdbdb",borderCollapse:"collapse",overflowX:"scroll",width:"100%"}}>
                <tr>
                    <td>
                    <CancelIcon onClick={deleteRow} style={{fontSize:"22px",color:"red",marginLeft:"15px",marginTop:"5px",cursor:"pointer"}}/>
                    </td>
                    <td>
                        <CustomTextField
                        value={
                             item.staffName
                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            workDurationArr.length > 0 &&
            workDurationArr.map((option)=>
                 option.workDurationCode
            ) 

        }
        onChange={onCountryChange}
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                    </td>
                    <td>
                     
                   <Typography style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}> {StartTime}</Typography>
                    </td>
                    <td>
                   
                   <Typography style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>{EndTime}</Typography>
                    </td>
                    <td>
                    <Grid style={{display:"flex",flexDirection:"row",}}>
                <Box style={{display:"flex",flexDirection:"row"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Sun</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Mon</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Tue</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Wed</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Thu</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Fri</Typography>
                </Box>
                <Box style={{display:"flex",flexDirection:"row",marginLeft:"5px"}}>
                    <CustomCheckBox/>
                    <Typography  style={{fontSize:"14px",  fontFamily:"Inter",fontWeight:"bold",marginTop:"10px"}}>Sat</Typography>
                </Box>
                </Grid>
                    </td>
                    <td>
                        <CustomTextField
                        value={
                            item?.department

                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                        <CustomTextField
                        value={
                            item?.jobTitle

                        }
                        style={{fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}
                        />
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            workLocationArr.length > 0 &&
            workLocationArr.map((option)=>
                 option?.locationName
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                       
                    </td>
                    <td>
                        <CustomTextField/>
                    </td>
                  
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            onCallArr.length > 0 &&
           onCallArr.map((option)=>
                 option?.valueMeaning
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                    
                    </td>
                    <td>
                    <Autocomplete
        id="free-solo-demo"
        disableClearable
        options={
            emergencyArr.length > 0 &&
           emergencyArr.map((option)=>
           option?.valueMeaning
            )

        }
        renderInput={(params) => <TextField {...params}></TextField>}
      />
                      
                    </td>
                </tr>
            </tbody>
                     }
                     )
                    
                 : 
                  <Typography style={{whiteSpace: "nowrap", overflow: "hidden",textOverflow: "clip",fontSize:"14px",fontWeight:"bold",fontFamily:"Inter"}}>No data to display</Typography> 
                  
                    } */}
        </table>
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
      </Grid>
    </Grid>
  );
};

export default AssignTableOption2;

const useStyles = makeStyles((theme) => ({
  rightBorderHeading: {
    borderRight: "1px solid silver",
  },
  rightBorderRow: {
    borderRight: "1px solid #EEEEEE",
  },
  remove_col: {
    width: 100,
  },
  staff_col: {
    width: 250,
  },
  work_dur_col: {
    width: 250,
  },
  start_time_col: {
    width: 150,
  },
  end_time_col: {
    width: 150,
  },
  working_days_col: {
    width: 450,
  },
  dep_col: {
    width: 250,
  },
  job_col: {
    width: 250,
  },
  work_col: {
    width: 250,
  },
  duty_col: {
    width: 250,
  },
  oncall_col: {
    width: 250,
  },
  emergency_col: {
    width: 250,
  },
}));
