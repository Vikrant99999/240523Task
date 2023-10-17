import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import DatePicker from "react-datepicker";
import { CustomButton } from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import CustomCheckBox from "../../../components/CustomCheckBox";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import AddUser from "./Modals/AddUser";
import AddProfileCriteria from "./Modals/AddProfileCriteria";
import {
  BussinessUnitData,
  LegalEntityData,
  getCitizen,
  getDepartmentData,
  getEmployeeCategoryData,
  getPayrollData,
  getReligionData,
  getScheduleJobFamily,
  getScheduleJobTitle,
  getScheduleUserData,
  getSubDepartmentData,
} from "../../../services/api";
import { useQuery } from "react-query";

const ManageProfileModal = (props) => {
  const { handleClose, editData } = props;
  const [profileName, setProfileName] = useState(
    editData == undefined ? "" : editData?.profileName
  );
  const [startDate, setStartDate] = useState(
    editData == undefined
      ? null
      : new Date(moment(editData?.startDate).format("DD-MMM-YYYY"))
  );
  const [endDate, setEndDate] = useState(
    editData == undefined
      ? null
      : new Date(moment(editData?.endDate).format("DD-MMM-YYYY"))
  );
  const [addUser, setAddUser] = useState([]);
  const [profileCriteria, setProfileCriteria] = useState([]);

  const [BussinessData, setBussinessData] = useState({
    BussinessArray: [],
    BussinessObj: {},
    BussinessName: "",
  });
  const [LegalEntity, setLegalEntity] = useState([]);
  const [JobTitle, setJobTitle] = useState();
  const [jobFamily, setJobFamily] = useState([]);
  const [employeeCategory, setEmployeeCategory] = useState();
  const [departmentArr, setDepartmentArr] = useState();
  const [subDepartmentArr, setSubDepartmentArr] = useState();
  const [hierarchy, setHierarachy] = useState(0);
  const [payroll, setPayroll] = useState();
  const [religion, setReligion] = useState();
  const [citizenData, setCitizenData] = useState();

  const handleAddRow = () => {
    const AddCriteria = [...addUser, []];

    setAddUser(AddCriteria);
  };

  const handleDeleteCriteria = (index) => {
    var deletevalCriteria = [...addUser];
    deletevalCriteria.splice(index, 1);
    setAddUser(deletevalCriteria);
  };
  const handleAddProfileCriteria = () => {
    const AddCriteria = [...profileCriteria, []];

    setProfileCriteria(AddCriteria);
  };

  const handleDeleteProfileCriteria = (index) => {
    var deletevalCriteria = [...profileCriteria];
    deletevalCriteria.splice(index, 1);
    setProfileCriteria(deletevalCriteria);
  };

  const startDateChange = (effectiveDatevalue) => {
    setStartDate(effectiveDatevalue);
  };
  const endDateChange = (effectiveDatevalue) => {
    setEndDate(effectiveDatevalue);
  };

  const { data: getScheduleUserDataById } = useQuery(
    ["getUserData", editData?.profileId],
    () => getScheduleUserData({ profileId: editData?.profileId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getScheduleUserDataById) {
      setAddUser(getScheduleUserDataById?.data?.data);
    }
  }, [getScheduleUserDataById]);

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

  const { data: getAllLegalEntityData } = useQuery(
    ["getAllLegalEntityData"],
    () => LegalEntityData({}),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllLegalEntityData) {
      setLegalEntity(getAllLegalEntityData?.data?.data);
    }
  }, [getAllLegalEntityData]);

  const { data: getAllJobTitleData } = useQuery(
    ["getAllJobTitleData"],
    () => getScheduleJobTitle(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllJobTitleData) {
      setJobTitle(getAllJobTitleData?.data?.data);
    }
  }, [getAllJobTitleData]);

  const { data: getJobFamilyData } = useQuery(
    ["getJobFamilyData"],
    () => getScheduleJobFamily(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getJobFamilyData) {
      setJobFamily(getJobFamilyData?.data?.data);
    }
  }, [getJobFamilyData]);

  const { data: getEmployeeCategory } = useQuery(
    ["getScheduleEmployeeCategoryData"],
    () => getEmployeeCategoryData(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getEmployeeCategory) {
      setEmployeeCategory(getEmployeeCategory?.data?.data);
    }
  }, [getEmployeeCategory]);

  const { data: getAllDepartmentData } = useQuery(
    ["getDepartmentData"],
    () => getDepartmentData(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDepartmentData) {
      setDepartmentArr(getAllDepartmentData?.data?.data);
    }
  }, [getAllDepartmentData]);

  const { data: getAllSubDepartmentData } = useQuery(
    ["getSubDepartmentData"],
    () => getSubDepartmentData(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllSubDepartmentData) {
      setSubDepartmentArr(getAllSubDepartmentData?.data?.data);
    }
  }, [getAllSubDepartmentData]);

  const { data: getAllPayroll } = useQuery(
    ["getAllPayrollData"],
    () => getPayrollData(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllPayroll) {
      setPayroll(getAllPayroll?.data?.data);
    }
  }, [getAllPayroll]);

  const { data: getAllReligion } = useQuery(
    ["getAllReligionData"],
    () => getReligionData(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllReligion) {
      setReligion(getAllReligion?.data?.data);
    }
  }, [getAllReligion]);

  const { data: getCitizenData } = useQuery(
    ["getCitizenData"],
    () => getCitizen(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getCitizenData) {
      setCitizenData(getCitizenData?.data?.data);
    }
  }, [getCitizenData]);

  return (
    <CustomDialog
      maxWidth="lg"
      open={true}
      dialogTitle="Profile"
      handleClose={handleClose}
    >
      <Grid xs="12">
        <Grid
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "row",
            padding: "5px",
          }}
        >
          <Grid xs="4" style={{ border: "1px solid #E9E9E9 ", padding: "3px" }}>
            <Box>
              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "bolder",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#124590",
                }}
              >
                Profile
              </Typography>
            </Box>
            <Grid>
              <Grid style={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs="4">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      margin: "8px",
                    }}
                  >
                    <Box textAlign="right">*Profile</Box>
                  </Typography>
                </Grid>
                <Grid>
                  <CustomTextField
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}
              >
                <Grid item xs="4">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      margin: "8px",
                    }}
                  >
                    <Box textAlign="right">*Start Date</Box>
                  </Typography>
                </Grid>
                <Grid>
                  <DatePicker
                    className="dateManage"
                    // value={effectiveDate}
                    selected={startDate}
                    onChange={startDateChange}
                    dateFormat="dd-MMM-yyyy"
                  />
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}
              >
                <Grid item xs="4">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      margin: "8px",
                    }}
                  >
                    <Box textAlign="right">*End Date </Box>
                  </Typography>
                </Grid>
                <Grid>
                  <DatePicker
                    className="dateManage"
                    // value={effectiveDate}
                    selected={endDate}
                    onChange={endDateChange}
                    dateFormat="dd-MMM-yyyy"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            xs="8"
            style={{
              marginLeft: "5px",
              border: "1px solid #E9E9E9 ",
              padding: "3px",
            }}
          >
            <Grid style={{ padding: "3px" }}>
              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "bolder",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#124590",
                }}
              >
                Add User In Profile
              </Typography>
              <CustomButton
                btnText="Add User"
                variant="contained"
                onClick={() => handleAddRow()}
                startIcon={
                  <AddIcon
                    style={{
                      color: "#60AA60",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  />
                }
              />
              <Grid>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    border: "3px solid #ededed",
                    padding: "2px",
                    marginTop: "5px",
                    backgroundColor: "#F1F1F1",
                  }}
                >
                  <Box style={{ width: "10%", padding: "2px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    ></Typography>
                  </Box>
                  <Box
                    style={{
                      width: "70%",
                      borderLeft: "3px solid #ededed",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    >
                      *User
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "70%",
                      borderLeft: "3px solid #ededed",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    >
                      User Role
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      borderLeft: "3px solid #ededed",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    >
                      Read Only
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "30%",
                      borderLeft: "3px solid #ededed",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    >
                      Can Create/Edit
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "25%",
                      borderLeft: "3px solid #ededed",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: "8px",
                      }}
                    >
                      Action
                    </Typography>
                  </Box>
                </Box>
                {addUser?.length > 0 ? (
                  addUser?.map((item, index) => {
                    const number = index + 1;
                    return (
                      <AddUser
                        handleDeleteCriteria={handleDeleteCriteria}
                        number={number}
                        addUser={addUser}
                        setAddUser={setAddUser}
                        item={item}
                        index={index}
                      />
                    );
                  })
                ) : (
                  <Typography>No Data to display</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          style={{
            border: "1px solid #E9E9E9 ",
            padding: "3px",
            margin: "5px",
          }}
        >
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: "bolder",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#124590",
            }}
          >
            Profile Criteria
          </Typography>
          <CustomButton
            btnText="New Profile Criteria"
            variant="contained"
            onClick={() => handleAddProfileCriteria()}
            startIcon={
              <AddIcon
                style={{
                  color: "#60AA60",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              />
            }
          />
          <Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "column",
                // border: "1px solid  black ",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px",
                overflow: "scroll",
                backgroundColor: "#F1F1F1",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // border: "1px solid  black ",
                  marginTop: "10px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 230, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Employee
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 230, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Job
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        textAlign: "left",
                        marginLeft: "5px",
                      }}
                    >
                      Job Family
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Employee Catgory
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 230, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Department
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 230, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Sub Department
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 250, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Business Unit
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Legal Entity
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Payroll
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Shift Type
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Employee Type
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Gender
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Religion
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Nationality
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Include/Exclude
                    </Typography>
                  </Box>
                </Grid>
                <Grid style={{ alignItems: "center" }}>
                  <Box style={{ width: 200, marginLeft: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        marginLeft: "5px",
                        textAlign: "left",
                      }}
                    >
                      Hierarchy Level
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
                      Action
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {profileCriteria?.length
                ? profileCriteria?.map((item, index) => {
                    return (
                      <AddProfileCriteria
                        item={item}
                        index={index}
                        profileCriteria={profileCriteria}
                        setProfileCriteria={profileCriteria}
                        handleDeleteProfileCriteria={
                          handleDeleteProfileCriteria
                        }
                        BussinessData={BussinessData}
                        LegalEntity={LegalEntity}
                        JobTitle={JobTitle}
                        jobFamily={jobFamily}
                        employeeCategory={employeeCategory}
                        departmentArr={departmentArr}
                        subDepartmentArr={subDepartmentArr}
                        hierarchy={hierarchy}
                        setHierarachy={setHierarachy}
                        payroll={payroll}
                        religionData={religion}
                        citizenData={citizenData}
                      />
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
        {editData == undefined ? (
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // position: "fixed",
              // right: "10px",
              // bottom: "10px",
            }}
          >
            <CustomButton
              btnText="Save"
              // onClick={!isLoadingBut && saveWorkDuration}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
            <CustomButton
              btnText="Cancel"
              // onClick={!isLoadingBut && handleClose}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
          </Grid>
        ) : (
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // position: "fixed",
              // right: "10px",
              // bottom: "2px",
            }}
          >
            {/* <ProgressLoader isLoading={isLoadingBut} size={25} /> */}
            <CustomButton
              btnText="Save"
              // onClick={ UpdateDurationData}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
            <CustomButton
              btnText="Delete"
              // onClick={() => setOpenDelete(true)}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
            <CustomButton
              btnText="Cancel"
              // onClick={!isLoadingBut && handleClose}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
          </Grid>
        )}
      </Grid>
    </CustomDialog>
  );
};

export default ManageProfileModal;
