import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React from "react";
import { CustomTextField } from "../../../../components/TextField";
import SearchIcon from "@material-ui/icons/Search";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { useState } from "react";
import UserModal from "../../SelfServices/UserModal";
import JobModal from "./JobModal";
import Departmentmodal from "./DepartmentModal";
import EmpModal from "./EmpModal";
import SubDepertment from "./SubDepertment";
import NationalityModal from "./NationalityModal";
import IncludeModal from "./Religion";
import Religion from "./Religion";
import { CustomButton } from "../../../../components/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { GenderMock, includeMock } from "../../rosterRules/Utils";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { EmployeeTypeMockData } from "../../rosterRules/Utils";
import { shiftMock } from "../../rosterRules/Utils";
import { useSelector } from "react-redux";

const AddProfileCriteria = (props) => {
  const {
    item,
    index,
    profileCriteria,
    setProfileCriteria,
    handleDeleteProfileCriteria,
    BussinessData,
    LegalEntity,
    JobTitle,
    jobFamily,
    employeeCategory,
    departmentArr,
    subDepartmentArr,
    hierarchy,
    setHierarachy,
    payroll,
    religionData,
    citizenData,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [openEmployee, setOpenEmployee] = useState(false);
  const [personId, setPersonId] = useState();
  const [empCatgory, setEmpCatgory] = useState(false);
  const [department, setDepartment] = useState(false);
  const [subDepertment, setSubDepertment] = useState(false);
  const [nationality, setnationality] = useState(false);
  const [religion, setReligion] = useState(false);
  const [job, setJob] = useState(false);
  const [status, setStatus] = useState(0);
  const [gender, setGender] = useState({
    genderArray: GenderMock,
    genderObj: {},
    genderName: "",
  });
  const [jobTitle, setJobTitle] = useState({
    jobTitleArray: jobFamily,
    jobTitleObj: {},
    jobFamily: "",
  });
  const [payrollData, setpayrollData] = useState({
    payrollDataArray: payroll,
    payrollDataObj: {},
    payrollDataName: "",
  });
  const [EmployeeType, setEmployeeType] = useState({
    EmployeeTypeArray: EmployeeTypeMockData,
    EmployeeTypeObj: {},
    EmployeeTypeName: "",
  });
  const [shitftType, setshitftType] = useState({
    shitftTypeArray: shiftMock,
    shitftTypeObj: {},
    shitftTypeName: "",
  });

  const [IncludeType, setIncludeType] = useState({
    IncludeTypeArray: includeMock,
    IncludeTypeObj: {},
    IncludeTypeName: "",
  });
  const handleOpenEmployeeModal = () => {
    setOpenEmployee(true);
  };
  const handleOpenJob = () => {
    setJob(true);
  };

  const incrementHierarachy = () => {
    const number = hierarchy + 1;
    setHierarachy(number);
  };

  const decrementHierarachy = () => {
    const number = hierarchy - 1;
    setHierarachy(number);
  };
  const handleOpenEmpCatgory = () => {
    setEmpCatgory(true);
  };
  const handleOpenDepartment = () => {
    setDepartment(true);
  };
  const handleOpenSubDepartment = () => {
    setSubDepertment(true);
  };
  const handleOpenNationality = () => {
    setnationality(true);
  };
  const handleOpenReligion = () => {
    setReligion(true);
  };

  const handleChangeUser = (iitem) => {
    setPersonId(iitem?.personId);
    const changeval = [...profileCriteria];
    let rData = changeval[index];
    rData["personId"] = iitem.userId;
    rData["fullName"] = iitem.fullName;
    rData["jobId"] = null;
    rData["departmentId"] = null;
    rData["employeeTypeId"] = null;
    rData["positionId"] = null;
    rData["includeExcludeFag"] = null;
    rData["createdBy"] = commonReducer.userId;
    rData["lastUpdatedBy"] = commonReducer.userId;
    rData["businessUnitId"] = null;
    rData["payrollId"] = null;
    rData["hierarchyLevel"] = null;
    rData["jobFamily"] = null;
    rData["legalEntityId"] = null;
    rData["gender"] = null;
    rData["nationality"] = null;
    rData["religion"] = null;
    rData["subDepartmentId"] = null;
    rData["employeeCatogery"] = null;
    rData["shiftType"] = null;
    setProfileCriteria(changeval);
  };

  const handleJobTilte = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < jobTitle?.jobTitleArray.length; i++) {
      if (jobTitle?.jobTitleArray[i].jobFamily == val) {
        changeRow[index].jobFamily = jobTitle?.jobTitleArray[i].jobFamily;
      }
    }
    setProfileCriteria(changeRow);
  };

  const handleBuisiness = (index, val, e) => {
    const changeRow = [...profileCriteria];
    for (let i = 0; i < BussinessData?.BussinessArray.length; i++) {
      if (BussinessData?.BussinessArray[i].jobFamily == val) {
        changeRow[index].jobFamily = BussinessData?.BussinessArray[i].jobFamily;
      }
    }
    setProfileCriteria(changeRow);
  };
  return (
    <>
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
            <CustomTextField
              value={item?.fullName}
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenEmployeeModal()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenJob()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              id="Job Family"
              required
              disableClearable
              onChange={(e, val) => {
                handleJobTilte(index, val, e);
              }}
              // defaultValue={data?.businessUnitName}
              // value={data?.businessUnitName}
              options={
                jobTitle?.jobTitleArray?.length > 0
                  ? jobTitle?.jobTitleArray?.map((option) => option?.jobFamily)
                  : []
              }
              renderInput={(params) => <TextField {...params} />}
              ListboxProps={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenEmpCatgory()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenDepartment()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 230, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenSubDepartment()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 250, marginLeft: "10px" }}>
            <Autocomplete
              id="Bussiness Unit"
              required
              disableClearable
              onChange={(e, val) => {
                handleBuisiness(index, val);
              }}
              // defaultValue={data?.businessUnitName}
              // value={data?.businessUnitName}
              options={
                BussinessData?.BussinessArray?.length > 0
                  ? BussinessData?.BussinessArray?.map(
                      (option) => option?.businessUnitName
                    )
                  : []
              }
              renderInput={(params) => <TextField {...params} />}
              ListboxProps={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              id="Legal Entity"
              required
              disableClearable
              // defaultValue={data?.legalEntityName}
              // value={data?.legalEntityName}
              // onChange={(e, value) => {
              //   handleLegal(index, value);
              // }}
              options={
                LegalEntity?.length > 0 &&
                LegalEntity?.map((option) => option?.name)
              }
              renderInput={(params) => <TextField {...params} />}
              ListboxProps={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              id="Bussiness Unit"
              required
              disableClearable
              // onChange={(e, val) => {
              //   handleBuisiness(index, val);
              // }}
              // defaultValue={data?.businessUnitName}
              // value={data?.businessUnitName}
              options={
                payrollData?.payrollDataArray?.length > 0
                  ? payrollData?.payrollDataArray?.map(
                      (option) => option?.payrollName
                    )
                  : []
              }
              renderInput={(params) => <TextField {...params} />}
              ListboxProps={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              // defaultValue={item?.gender}
              id="Citizenship"
              required
              options={
                shitftType?.shitftTypeArray?.length > 0
                  ? shitftType?.shitftTypeArray?.map(
                      (option) => option?.shiftType
                    )
                  : []
              }
              style={{ marginLeft: "10px" }}
              // getoptionlabel="label"
              // onChange={(e, value) => {
              //   handleGender(index, value, e);
              // }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
              renderInput={(params) => <TextField {...params} />}
              disableClearable
            />{" "}
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              // defaultValue={item?.gender}
              id="Citizenship"
              required
              options={
                EmployeeType?.EmployeeTypeArray?.length > 0
                  ? EmployeeType?.EmployeeTypeArray?.map(
                      (option) => option?.value
                    )
                  : []
              }
              style={{ marginLeft: "10px" }}
              // getoptionlabel="label"
              // onChange={(e, value) => {
              //   handleGender(index, value, e);
              // }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
              renderInput={(params) => <TextField {...params} />}
              disableClearable
            />{" "}
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              // defaultValue={item?.gender}
              id="Citizenship"
              required
              options={
                gender?.genderArray?.length > 0
                  ? gender?.genderArray?.map((option) => option?.value)
                  : []
              }
              style={{ marginLeft: "10px" }}
              // getoptionlabel="label"
              // onChange={(e, value) => {
              //   handleGender(index, value, e);
              // }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
              renderInput={(params) => <TextField {...params} />}
              disableClearable
            />{" "}
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenReligion()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <CustomTextField
              endIcon={
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenNationality()}
                />
              }
            />
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box style={{ width: 200, marginLeft: "10px" }}>
            <Autocomplete
              // defaultValue={item?.gender}
              id="Citizenship"
              required
              options={
                IncludeType?.IncludeTypeArray?.length > 0
                  ? IncludeType?.IncludeTypeArray?.map(
                      (option) => option?.value
                    )
                  : []
              }
              style={{ marginLeft: "10px" }}
              // getoptionlabel="label"
              // onChange={(e, value) => {
              //   handleGender(index, value, e);
              // }}
              popupIcon={
                <ArrowDropDownIcon
                  fontSize="large"
                  style={{ marginRight: 0 }}
                />
              }
              renderInput={(params) => <TextField {...params} />}
              disableClearable
            />{" "}
          </Box>
        </Grid>
        <Grid style={{ alignItems: "center" }}>
          <Box
            style={{
              width: 200,
              marginLeft: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CustomTextField value={hierarchy} />
            <KeyboardArrowUpIcon
              style={{ cursor: "pointer" }}
              onClick={() => incrementHierarachy()}
            />
            <KeyboardArrowDownIcon
              style={{ cursor: "pointer" }}
              onClick={() => decrementHierarachy()}
            />
          </Box>
        </Grid>
        <Grid
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <Box
            style={{
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              marginTop: "5px",
            }}
          >
            <DoDisturbOnIcon
              style={{
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
                textAlign: "center",
              }}
              onClick={() => handleDeleteProfileCriteria()}
            />
          </Box>
        </Grid>
        {openEmployee && (
          <UserModal
            toggleHandler={setOpenEmployee}
            handelEmployeechange={handleChangeUser}
            open={openEmployee}
          />
        )}

        {job == 1 && (
          <JobModal
            jobTitle={JobTitle}
            toggleHandler={setJob}
            handelEmployeechange={handleOpenJob}
            open={openEmployee}
          />
        )}

        {empCatgory && (
          <EmpModal
            toggleHandler={setEmpCatgory}
            handelEmployeechange={handleChangeUser}
            open={empCatgory}
            employeeCategory={employeeCategory}
          />
        )}
        {department && (
          <Departmentmodal
            toggleHandler={setDepartment}
            handleOpenDepartment={handleChangeUser}
            open={department}
            departmentArr={departmentArr}
          />
        )}
        {subDepertment && (
          <SubDepertment
            toggleHandler={setSubDepertment}
            handleOpenSubDepartment={handleChangeUser}
            open={subDepertment}
            subDepartmentArr={subDepartmentArr}
          />
        )}
        {religion && (
          <Religion
            toggleHandler={setReligion}
            handleOpenReligion={handleChangeUser}
            open={religion}
            religionData={religionData}
          />
        )}
        {nationality && (
          <NationalityModal
            toggleHandler={setnationality}
            handleOpenNationality={handleChangeUser}
            open={nationality}
            citizenData={citizenData}
          />
        )}
      </Grid>
    </>
  );
};

export default AddProfileCriteria;
