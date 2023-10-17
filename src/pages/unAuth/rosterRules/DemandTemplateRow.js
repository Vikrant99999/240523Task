import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { CustomTextField } from "../../../components/TextField";
import { useState } from "react";
import RequiredTitle from "../../../utils/RequiredTitle";
import CustomCheckBox from "../../../components/CustomCheckBox";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@material-ui/lab";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SkillModal from "./modal/SkillModal";
import WorkDurationModal from "./modal/WorkDurationModal";
import WorkLocationModal from "./modal/WorkLocation";
import moment from "moment";

const DemandTemplateRow = (props) => {
  const {
    handleDelete,
    index,
    citizen,
    setCitizen,
    skillData,
    setEmployeeType,
    EmployeeType,
    gender,
    setGender,
    BussinessData,
    setBussinessData,
    workDurationArr,
    departmentData,
    setDepartmentData,
    jobTitleData,
    setJobTitleData,
    workLocationArr,
    item,
    demandTemplateLines,
    setDemandTemplateLines,
  } = props;
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [openWorkDurationModal, setOpenWorkDurationModal] = useState(false);
  const [openWorkLocationModal, setOpenWorkLocationModal] = useState(false);

  const handleDepartment = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < departmentData?.departmentArray.length; i++) {
      if (departmentData?.departmentArray[i].departmentName == val) {
        changeRow[index].departmentId =
          departmentData?.departmentArray[i].departmentId;
        setDepartmentData({
          ...departmentData,
          departmentId: departmentData?.departmentArray[i].departmentId,
        });
      }
    }
    setDemandTemplateLines(changeRow);
  };
  const handleJob = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < jobTitleData?.jobTitleArray.length; i++) {
      if (jobTitleData?.jobTitleArray[i].jobTitle == val) {
        changeRow[index].jobTitleId = jobTitleData?.jobTitleArray[i].jobTitleId;
      }
    }
    setDemandTemplateLines(changeRow);
  };
  const handleBussinessUnit = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < BussinessData?.BussinessArray.length; i++) {
      if (BussinessData?.BussinessArray[i].businessUnitName == val) {
        changeRow[index].businessId =
          BussinessData?.BussinessArray[i].businessUnitId;
      }
    }
    setDemandTemplateLines(changeRow);
  };

  const handleGender = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < gender?.genderArray.length; i++) {
      if (gender?.genderArray[i].value == val) {
        changeRow[index].gender = gender?.genderArray[i].value;
      }
    }
    setDemandTemplateLines(changeRow);
  };
  const handleNationality = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < citizen?.citizenArray.length; i++) {
      if (citizen?.citizenArray[i].meaning == val) {
        changeRow[index].nationality = citizen?.citizenArray[i].meaning;
      }
    }
    setDemandTemplateLines(changeRow);
  };
  const handleEmployeeType = (index, val, e) => {
    const changeRow = [...demandTemplateLines];
    for (let i = 0; i < EmployeeType?.employeeArray.length; i++) {
      if (EmployeeType?.employeeArray[i].value == val) {
        changeRow[index].emplooyeeTypeId = EmployeeType?.employeeArray[i].id;
      }
    }
    setDemandTemplateLines(changeRow);
  };
  const handleChangeSkill = (iitem) => {
    const changeval = [...demandTemplateLines];
    let rData = changeval[index];
    rData["skillName"] = iitem.skill;
    rData["skill"] = iitem.skillId;
    setDemandTemplateLines(changeval);
  };
  const handleChangeWorkDuration = (iitem) => {
    const changeval = [...demandTemplateLines];
    let rData = changeval[index];
    rData["workDuration"] = iitem.label;
    rData["workDurationId"] = iitem.id;
    rData["timeStart"] = moment(iitem.timeStart).format("hh:mm A");
    rData["timeend"] = moment(iitem.timeEnd).format("hh:mm A");
    setDemandTemplateLines(changeval);
  };
  const handleChangeWorkLocation = (iitem) => {
    const changeval = [...demandTemplateLines];
    let rData = changeval[index];
    rData["workLocation"] = iitem.locationName;
    rData["workLocationId"] = iitem.workLocationId;
    setDemandTemplateLines(changeval);
  };
  const handleDayCheck = (dayName, checked) => {
    const changeval = [...demandTemplateLines];
    let rData = changeval[index];
    rData[dayName] = checked ? "Y" : "N";
    setDemandTemplateLines(changeval);
  };

  const handleFte = (e) => {
    const changeval = [...demandTemplateLines];
    let rData = changeval[index];
    rData["fte"] = e.target.value;
    setDemandTemplateLines(changeval);
  };

  return (
    <>
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          // border: "1px solid black",
        }}
      >
        <Box
          style={{
            width: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RequiredTitle
            title="Action"
            value={
              <DoNotDisturbOnIcon
                onClick={() => {
                  handleDelete(index);
                }}
                style={{
                  fontSize: "22px",
                  color: "red",
                  // marginLeft: "15px",
                  // marginTop: "5px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              />
            }
          />
        </Box>
        <Box style={{ width: 300 }}>
          <Autocomplete
            defaultValue={item?.department}
            id="Department"
            required
            options={
              departmentData?.departmentArray?.length > 0
                ? departmentData?.departmentArray?.map(
                    (option) => option?.departmentName
                  )
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleDepartment(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />{" "}
        </Box>
        <Box style={{ width: 300 }}>
          <Autocomplete
            defaultValue={item?.jobTitle}
            id="job title"
            required
            options={
              jobTitleData?.jobTitleArray?.length > 0
                ? jobTitleData?.jobTitleArray?.map((option) => option?.jobTitle)
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleJob(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />{" "}
        </Box>
        <Box style={{ width: 300, marginLeft: "10px", marginTop: "1px" }}>
          <CustomTextField
            value={item?.workDuration}
            endIcon={
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenWorkDurationModal(true)}
              />
            }
          />
        </Box>
        <Box
          style={{
            width: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textAlign: "center",
            }}
          >
            {item?.timeStart ? item?.timeStart : null}
          </Typography>
        </Box>
        <Box
          style={{
            width: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textAlign: "center",
            }}
          >
            {item?.timeend ? item?.timeend : null}
          </Typography>
        </Box>
        <Box style={{ width: 100 }}>
          <CustomTextField value={item?.fte} onChange={(e) => handleFte(e)} />
        </Box>
        <Box style={{ width: 250 }}>
          <Autocomplete
            defaultValue={item?.emplooyeeType}
            id="Employee Type"
            required
            options={
              EmployeeType?.employeeArray?.length > 0
                ? EmployeeType?.employeeArray?.map((option) => option?.value)
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleEmployeeType(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />{" "}
        </Box>
        <Box style={{ width: 500 }}>
          <Grid style={{ display: "flex" }}>
            <CustomCheckBox
              check={item.sun === "Y"}
              onChangeCheck={(e) => handleDayCheck("sun", e)}
              label="Sun"
            />
            <CustomCheckBox
              check={item.mon === "Y"}
              style={{ padding: 0 }}
              onChangeCheck={(e) => handleDayCheck("mon", e)}
              label="Mon"
            />
            <CustomCheckBox
              check={item.tue === "Y"}
              onChangeCheck={(e) => handleDayCheck("tue", e)}
              label="Tue"
            />
            <CustomCheckBox
              check={item.wed === "Y"}
              onChangeCheck={(e) => handleDayCheck("wed", e)}
              label="Wed"
            />
            <CustomCheckBox
              check={item.thu === "Y"}
              onChangeCheck={(e) => handleDayCheck("thu", e)}
              label="Thu"
            />
            <CustomCheckBox
              check={item.fri === "Y"}
              onChangeCheck={(e) => handleDayCheck("fri", e)}
              label="Fri"
            />
            <CustomCheckBox
              check={item.sat === "Y"}
              onChangeCheck={(e) => handleDayCheck("sat", e)}
              label="Sat"
            />
          </Grid>
        </Box>
        <Box style={{ width: 250 }}>
          <CustomTextField
            value={item?.skillName}
            endIcon={
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenSkillModal(true)}
              />
            }
          />
        </Box>
        <Box style={{ width: 250 }}>
          <Autocomplete
            defaultValue={item?.business}
            id="Bussiness Unit"
            required
            options={
              BussinessData?.BussinessArray?.length > 0
                ? BussinessData?.BussinessArray?.map(
                    (option) => option?.businessUnitName
                  )
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleBussinessUnit(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />{" "}
        </Box>
        <Box style={{ width: 250, marginLeft: "5px" }}>
          <CustomTextField
            value={item?.workLocation}
            endIcon={
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenWorkLocationModal(true)}
              />
            }
          />
        </Box>
        <Box style={{ width: 250 }}>
          <Autocomplete
            defaultValue={item?.gender}
            id="Citizenship"
            required
            options={
              gender?.genderArray?.length > 0
                ? gender?.genderArray?.map((option) => option?.value)
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleGender(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />
        </Box>
        <Box style={{ width: 250 }}>
          <Autocomplete
            defaultValue={item?.nationality}
            id="Citizenship"
            required
            options={
              citizen?.citizenArray?.length > 0
                ? citizen?.citizenArray?.map((option) => option?.meaning)
                : []
            }
            style={{ marginLeft: "10px" }}
            // getoptionlabel="label"
            onChange={(e, value) => {
              handleNationality(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />{" "}
        </Box>
      </Grid>
      {openSkillModal && (
        <SkillModal
          skillData={skillData}
          toggleHandler={setOpenSkillModal}
          handleChangeData={handleChangeSkill}
        />
      )}
      {openWorkDurationModal && (
        <WorkDurationModal
          workDurationArr={workDurationArr}
          toggleHandler={setOpenWorkDurationModal}
          handleChangeData={handleChangeWorkDuration}
        />
      )}
      {openWorkLocationModal && (
        <WorkLocationModal
          toggleHandler={setOpenWorkLocationModal}
          workLocationArr={workLocationArr}
          handleChangeData={handleChangeWorkLocation}
        />
      )}
    </>
  );
};

export default DemandTemplateRow;
