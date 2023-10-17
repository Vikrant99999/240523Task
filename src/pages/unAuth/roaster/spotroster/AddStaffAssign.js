import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import AddStaffDetail from "./AddStaffDetail";
import AssignTable from "./AssignTable";
import { getallStaffData } from "../../../../services/api";
import { useMutation } from "react-query";

import { useSelector } from "react-redux";
import AssignTableOption2 from "./AssignTableOption2";

const AddStaffAssign = (props) => {
  const {
    emergencyArr,
    workLocationArr,
    onCallArr,
    status2,
    workDurationArr,
    index,
    onCountryChange,
    val,
    setDutyManagerTableArr,
    setJobTitleArr,
    setOnCallTableArr,
    setStaffTableArr,
    setEmergencyTableArr,
    setDepartmentName,
    onChangeCheck,
    openAddStaff,
    open,
    setVal,
    filterData,
    staffData,
    setOpen,
    addStaff,
    handleAdd,
    worksee,
    setSnakeBarProps
  } = props;
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  console.log("checking", val,props);
  return (
    <>
      <Grid item xs="12" style={{ display: "flex" }}>
        <Box className={classes.headerBox}>
          <Typography className={classes.headerText}>
            All Staff With Preferences
          </Typography>
        </Box>
        <Box className={classes.addStaffBtn}>
          <CustomButton
            btnText="Add Staff"
            variant="contained"
            startIcon={<AddIcon />}
            btnClass={{ backgroundColor: "#124590", color: "#fff" }}
            onClick={openAddStaff}
          />
          {open && (
            <AddStaffDetail
              toggleHandler={setOpen}
              update={handleAdd}
              staffData={staffData}
              update1={onChangeCheck}
              val={val}
              setVal={setVal}
            />
          )}
        </Box>
      </Grid>

      {status2 === 2 ? (
        <AssignTableOption2
          value={val}
          setValue={setVal}
          addStaff={addStaff}
          filterData={filterData}
          emergencyArr={emergencyArr}
          workLocationArr={workLocationArr}
          onCallArr={onCallArr}
          workDurationArr={workDurationArr}
          index={index}
          onCountryChange={onCountryChange}
          staffData={staffData}
          worksee={worksee}
          setSnakeBarProps={setSnakeBarProps}
        />
      ) : (
        <AssignTable
          value={val}
          setValue={setVal}
          addStaff={addStaff}
          filterData={filterData}
          onCallArr={onCallArr}
          workLocationArr={workLocationArr}
          emergencyArr={emergencyArr}
          staffData={staffData}
          setStaffTableArr={setStaffTableArr}
          setDepartmentName={setDepartmentName}
          setDutyManagerTableArr={setDutyManagerTableArr}
          setJobTitleArr={setJobTitleArr}
          setEmergencyTableArr={setEmergencyTableArr}
          setOnCallTableArr={setOnCallTableArr}
         
        />
      )}
    </>
  );
};

export default AddStaffAssign;

const useStyles = makeStyles((theme) => ({
  headerBox: {
    margin: "5px 0px 0px 10px",
  },
  headerText: {
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "bolder",
    color: "#4594D7",
  },
  addStaffBtn: {
    marginLeft: "10px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  tableGrid: {
    display: "flex",
    flexDirection: "row",

    width: "100%",
  },
  textgrid: {
    fontSize: "10px",
    fontFamily: "Inter",
  },
}));
