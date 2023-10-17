import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../components/Button";
import { CustomDialog } from "../../../components/CustomDialog";
import { makeStyles } from "@material-ui/styles";
import FilterManageTeam from "./FilterManageTeam";
import { EmployeeFilterModal } from "../staff/shared/filters/EmployeeFilterModal";
import { DepartmentFilterModal } from "../staff/shared/filters/DepartmentFilterModal";
import { JobfilterModal } from "../staff/shared/filters/JobfilterModal";
import { ProfileFilterModal } from "../staff/shared/filters/ProfileFilterModal";
import { TeamFilterModal } from "../staff/shared/filters/TeamFilterModal";
import { CustomAutoComplete } from "../../../components/CustomAutoComplete";
import { Autocomplete } from "@material-ui/lab";
import { createManageTeamMember } from "../../../services/api";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import ProgressLoader from "../rosterSettings/Loader";
import { uniqueArrByKey } from "../../contants";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const ManageTeamMemberModal = (props) => {
  const {
    toggleHandler,
    employeeArr,
    rows,
    setEmployeeArr,
    getAllProjectRefetchEmployee,
    setSnakeBarProps,
    oriPagedata,
    setOriPagedata,
    employeeFilterData,
    setEmployeeFilterData,
    departmentFilterData,
    setDepartmentFilterData,
    jobTypeFilterData,
    setJobTypeFilterData,
    teamFilterData,
    setTeamFilterData,
    profileFilterData,
    setProfileFilterData,
    TableData,
    setTabledata,
    employeeToggle,
    setEmployeeToggle,
    jobTypeToggle,
    setJobTypeToggle,
    departmentToggle,
    setDepartmentToggle,
    profileToggle,
    setProfileToggle,
    employeeFilter,
    setEmployeeFilter,
    departmentFilter,
    setDepaertmentFilter,
    jobTypeFilter,
    setJobTypeFilter,
    profileFilter,
    setProfileFilter,
    teamFilter,
    setTeamFilter,
    teamToggle,
    setTeamToggle,
    filterPopUpType,
    setFilterPopUpType,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  console.log("holalalal",oriPagedata);
  const classes = useStyles();
  const [isLoadingBut, setIsLoadingBut] = useState(false);

  const employeeFilterHeader = ["Employee Number", "Employee"];

  const [teamDropDown, setTeamDropDown] = useState({
    teamArray: rows,
    teamObj: {},
    teamId: "",
    personId: "",
  });

  const handleClose = () => {
    toggleHandler(0);
  };
  //Api for create team
  const { mutate: CreateManageTeamMemberMutate } = useMutation(
    createManageTeamMember,
    {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    }
  );

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully updated team members!",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetchEmployee();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to update request",
        type: "error",
      });

      toggleHandler(true);
    }
  };
  const saveHandler = () => {
    let finalBodyData = {
      personIdTeamIdMap: {},
    };
    employeeArr?.map((item) => {
      finalBodyData.personIdTeamIdMap[item.personId] = item.teamId;
    });
    var pdata = {
      ...finalBodyData,
      userId: commonReducer?.userId,
    };
    setIsLoadingBut(true);
    CreateManageTeamMemberMutate(pdata);
  };
  return (
    <>
      <CustomDialog
        dialogTitle="Manage Team Members"
        maxWidth="lg"
        open="true"
        handleClose={handleClose}
      >
        <Grid>
          <FilterManageTeam
            setEmployeeToggle={setEmployeeToggle}
            setDepartmentToggle={setDepartmentToggle}
            setJobTypeToggle={setJobTypeToggle}
            setProfileToggle={setProfileToggle}
            setTeamToggle={setTeamToggle}
            oriPagedata={oriPagedata}
            tableData={TableData}
            employeeFilterData={employeeFilterData}
            setEmployeeFilterData={setEmployeeFilterData}
            setEmployeeFilter={setEmployeeFilter}
            employeeFilter={employeeFilter}
            profileFilterData={profileFilterData}
            setProfileFilterData={setProfileFilterData}
            profileFilter={profileFilter}
            setProfileFilter={setProfileFilter}
            teamFilterData={teamFilterData}
            setTeamFilterData={setTeamFilterData}
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
            departmentFilterData={departmentFilterData}
            setDepartmentFilterData={setDepartmentFilterData}
            setDepaertmentFilter={setDepaertmentFilter}
            departmentFilter={departmentFilter}
            jobTypeFilterData={jobTypeFilterData}
            setJobTypeFilterData={setJobTypeFilterData}
            setJobTypeFilter={setJobTypeFilter}
            jobTypeFilter={jobTypeFilter}
            setFilterPopUpType={setFilterPopUpType}
            setTabledata={setTabledata}
          />
          <Box className={classes.mainbox}>
            <Box className={classes.innermainbox}>
              <Box className={classes.innerboxemployee}>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "5px",
                    }}
                  >
                    Employee Number
                  </Typography>
                </Box>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "5px",
                    }}
                  >
                    Employee
                  </Typography>
                </Box>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "5px",
                    }}
                  >
                    Job
                  </Typography>
                </Box>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "5px",
                    }}
                  >
                    Department
                  </Typography>
                </Box>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "40px",
                    }}
                  >
                    Profile
                  </Typography>
                </Box>
                <Box style={{ width: "16.7%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter",
                      marginLeft: "5px",
                    }}
                  >
                    Team
                  </Typography>
                </Box>
              </Box>
              {TableData?.length > 0 ? (
                TableData?.map((item) => {
                  return (
                    <Box className={classes.pagedatamainbox}>
                      <Box style={{ width: "16.7%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "Inter",
                            marginLeft: "5px",
                          }}
                        >
                          {item?.employeeNumber}
                        </Typography>
                      </Box>
                      <Box style={{ width: "16.7%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "Inter",
                            marginLeft: "5px",
                          }}
                        >
                          {item?.personName}
                        </Typography>
                      </Box>
                      <Box style={{ width: "16.7%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "Inter",
                            marginLeft: "5px",
                            overflow: "hidden",
                          }}
                        >
                          {item?.jobTitle}
                        </Typography>
                      </Box>
                      <Box style={{ width: "16.7%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "Inter",
                            marginLeft: "5px",
                            overflow: "hidden",
                          }}
                        >
                          {item?.departmentName}
                        </Typography>
                      </Box>
                      <Box style={{ width: "16.7%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: "Inter",
                            marginLeft: "40px",
                          }}
                        >
                          {item?.profileName}
                        </Typography>
                      </Box>
                      <Box style={{ width: "16.7%" }}>
                        {" "}
                        {console.log(item?.teamName, "hello")}{" "}
                        <Autocomplete
                          id="Team"
                          required
                          value={item?.teamName}
                          options={
                            teamDropDown?.teamArray?.length > 0
                              ? teamDropDown?.teamArray?.map(
                                  (option) => option.teamName
                                )
                              : []
                          }
                          style={{ marginLeft: "10px" }}
                          // options={[]}
                          // getoptionlabelkey="teamName"
                          // selectedvalue={teamDropDown?.teamObj}
                          onChange={(_event, newData) => {
                            let currElem = teamDropDown?.teamArray?.filter(
                              (item1) => item1.teamName === newData
                            );
                            currElem = {
                              teamId: currElem[0]?.teamId,
                              teamName: currElem[0]?.teamName,
                            };
                            let localEmployeeArr = [...employeeArr];
                            let currIndex = localEmployeeArr?.findIndex(
                              (item1) => item1.personId === item.personId
                            );
                            if (currIndex != -1) {
                              localEmployeeArr[currIndex] = {
                                ...localEmployeeArr[currIndex],
                                ...currElem,
                              };
                            }
                            setEmployeeArr(localEmployeeArr);
                            // console.log(currElem, item, "currElem");
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          // disableClearable
                          popupIcon={
                            <ArrowDropDownIcon
                              fontSize="large"
                              style={{ marginRight: 0 }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "Inter",
                    margin: "5px",
                    // textAlign: "center",
                  }}
                >
                  No Data To Display
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid className={classes.selectButton}>
          <Box style={{ marginTop: "10px" }}>
            <ProgressLoader isLoading={isLoadingBut} size={25} />
          </Box>
          <CustomButton
            btnText="Save"
            btnClass={
              isLoadingBut
                ? {
                    backgroundColor: "white",
                    color: "grey",
                    border: "solid 1px grey",
                    margin: "10px 3px",
                  }
                : {
                    backgroundColor: "#124590",
                    color: "#fff",
                    margin: "10px 3px",
                  }
            }
            onClick={!isLoadingBut && saveHandler}
          />
          <CustomButton
            btnText="Cancel"
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              margin: "10px 3px",
            }}
            onClick={handleClose}
          />
        </Grid>
      </CustomDialog>
      {employeeToggle && (
        <EmployeeFilterModal
          togglerhandler={setEmployeeToggle}
          {...props}
          setEmployeeupdateData={setEmployeeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "employeeNumber")}
          employeeupdateData={employeeFilterData}
          type="Employee"
          employeeNameMappedKey="personName"
          employeeIdMappedKey="employeeNumber"
          employeeFilterHeader={employeeFilterHeader}
          setEmployeeFilter={setEmployeeFilter}
        />
      )}
      {jobTypeToggle && (
        <JobfilterModal
          togglerhandler={setJobTypeToggle}
          {...props}
          setEmployeeupdateData={setJobTypeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "jobTitle")}
          employeeupdateData={jobTypeFilterData}
          setJobTypeFilter={setJobTypeFilter}
        />
      )}
      {departmentToggle && (
        <DepartmentFilterModal
          togglerhandler={setDepartmentToggle}
          {...props}
          setEmployeeupdateData={setDepartmentFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "departmentName")}
          employeeupdateData={departmentFilterData}
          setDepaertmentFilter={setDepaertmentFilter}
        />
      )}
      {profileToggle && (
        <ProfileFilterModal
          togglerhandler={setProfileToggle}
          {...props}
          setEmployeeupdateData={setProfileFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "profileName")}
          employeeupdateData={profileFilterData}
          setDepaertmentFilter={setProfileFilter}
        />
      )}
      {teamToggle && (
        <TeamFilterModal
          togglerhandler={setTeamToggle}
          {...props}
          setEmployeeupdateData={setTeamFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "teamId")}
          employeeupdateData={teamFilterData}
          setDepaertmentFilter={setTeamFilter}
        />
      )}
    </>
  );
};

export default ManageTeamMemberModal;
const useStyles = makeStyles((theme) => ({
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    height: "calc(100vh - 350px)",
    overflow: "auto",
    marginTop: "10px",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
  },
  innerboxemployee: {
    display: "flex !important",
    padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    alignItems: "center",
    margin: "5px",
  },
}));
