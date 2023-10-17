import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SearchIcon from "@material-ui/icons/Search";
import { CustomTextField } from "../../../../components/TextField";
import StaffModal from "./StaffModal";
import DepatmentPopup from "./DepatmentPopup";
import JobTitleModal from "./JobTitleModal";
import DutyManagerModal from "./DutyManagerModal";
import {
  DutyManager,
  Department,
  JobTitle,
  getDepartmentById,
  getJobTitleById,
} from "../../../../services/api";
import { useQuery } from "react-query";
import { SettingsRemote } from "@material-ui/icons";
import { internal_processStyles } from "@mui/styled-engine";
import RequiredTitle from "../../../../utils/RequiredTitle";
import { useSelector } from "react-redux";
const AssignTable = (props) => {
  const {
    value,
    setValue,
    data,
    workLocationArr,
    onCallArr,
    emergencyArr,
    staffData,
    setDutyManagerTableArr,
    setJobTitleArr,
    setOnCallTableArr,
    setStaffTableArr,
    setEmergencyTableArr,
    setDepartmentName,
    setSnakeBarProps,
  } = props;
  const [item, setItem] = useState();
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const [tableArr, setTableArr] = useState(value);
  const [dataArr, setDataArr] = useState();
  const [status, setStatus] = React.useState(0);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [jobTitleArray, setJobTitleArray] = useState([]);
  const [dutyManagerArr, setDutyManagerArr] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [changeTextValue, setChangeTextValue] = React.useState();
  const [selectDutyManager, setSelectDutyManager] = React.useState();
  const [selectDepartment, setSelectDepartment] = React.useState({});
  const [selectJobTitle, setSelectJobTitle] = React.useState();
  const [tabledata, setTabledata] = useState();

  const [state, setState] = useState(-1);
  const [state1, setState1] = useState(-1);
  const [state2, setState2] = useState(-1);
  const [state3, setState3] = useState(-1);
  const [selectedStaff, setSelectedStaff] = useState(-1);

  const handleSelectedStaff = (value) => {
    setSelectedStaff(value);
  };
  const handleChange1 = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = item;
    setValue(localStaff);
    // setChangeTextValue(item)
    setState(index);
  };

  const handleChangeDutyManager = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = {
      ...localStaff[selectedStaff],
      dutyManager: item.staffName,
    };

    setValue(localStaff);
    setSelectDutyManager(item);
    setState1(index);
  };

  const handleChangeDepartment = (index, item) => {
    var localStaff = [...value];

    localStaff[selectedStaff] = {
      ...localStaff[selectedStaff],
      departmentId: item.departmentId,
      department: item.departmentName,
      jobTitle: "",
      jobTitleId: "",
    };

    setValue(localStaff);
    setSelectDepartment(item);
  };

  const handleChangeJobTitle = (index, item) => {
    var localStaff = [...value];
    localStaff[selectedStaff] = {
      ...localStaff[selectedStaff],
      jobTitle: item.jobTitle,
      jobTitleId: item.jobTitleId,
    };
    setValue(localStaff);
    setSelectJobTitle(item);
  };
  const handleChangeOnCall = (index, item) => {
    var localStaff = [...value];
    localStaff[index] = {
      ...localStaff[index],
      onCall: item,
    };
    setValue(localStaff);
  };
  const handleChangeOnEmergency = (index, item) => {
    var localStaff = [...value];
    localStaff[index] = {
      ...localStaff[index],
      emergency: item,
    };
    setValue(localStaff);
  };

  const btnClick = (e) => {
    setStatus(e);
  };

  const handleChange = (name, e) => {
    const change = {};
    change[name] = e.target.value;
    setDataArr(change);
  };

  const deleteRow = (i) => {
    const deleteval = [...value];
    deleteval?.splice(i, 1);
    setValue(deleteval);
  };

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
  const [departmentId, setDepartmentId] = useState("");

  //jobTitle
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

  const getInputValue = (event) => {
    const UserValue = event.target.value;
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
          style={{ border: "1px solid  #dbdbdb", borderCollapse: "collapse" }}
        >
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid rgb(219, 219, 219)",
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
              className={`${classes.empl_col} ${classes.rightBorderHeading}`}
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
                  Employee Number
                </Typography>
              </Box>
            </Grid>
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
              className={`${classes.job_col} ${classes.rightBorderHeading} `}
            >
              <Box style={{ width: "300px" }}>
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
                  JobTitle
                </Typography>
              </Box>
            </Grid>
            <Grid
              className={`${classes.work_col} ${classes.rightBorderHeading} `}
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
                        <RemoveCircleIcon
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
                      value={
                        item?.staffName
                          ? item?.staffName + ` [${item?.employeeNumber}]`
                          : item?.fullName + ` [${item?.employeeNumber}]`
                      }
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
                    className={`${classes.empl_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        paddingLeft: "5px",
                      }}
                    >
                      {item?.employeeNumber}
                    </Typography>
                  </Box>
                  <Box
                    className={`${classes.dep_col} ${classes.rightBorderRow}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CustomTextField
                      value={
                        item?.department
                          ? item?.department
                          : item?.departmentName
                      }
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
                                btnClick(2);
                              }}
                            />
                          }
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
                      value={item?.jobTitle}
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
                      title={item?.workLocation}
                      id="free-solo-demo"
                      disableClearable
                      value={item?.workLocation}
                      options={
                        workLocationArr?.length > 0 &&
                        workLocationArr?.map((option) => option?.locationName)
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
                      color: "red",
                    }}
                  >
                    <CustomTextField
                      value={item?.dutyManager}
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
                    style={{ color: "red" }}
                  >
                    <Autocomplete
                      id="free-solo-demo"
                      disableClearable
                      options={onCallArr?.map((option) => option?.valueMeaning)}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
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
                    />
                  </Box>
                  <Box
                    className={`${classes.emergency_col} ${classes.rightBorderRow}`}
                  >
                    <Autocomplete
                      id="free-solo-demo"
                      disableClearable
                      options={emergencyArr?.map(
                        (option) => option?.valueMeaning
                      )}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
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

export default AssignTable;

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
  empl_col: {
    width: 200,
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
