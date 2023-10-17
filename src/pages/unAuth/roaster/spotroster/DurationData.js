import { Typography, Box, Grid, TextField, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "../../../../components/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { workDuration } from '../../../../services/api';
import { makeStyles } from "@material-ui/styles";
// import { useQuery } from 'react-query';
import WorkDurationModal from "./WorkDurationModal";
import SearchIcon from "@mui/icons-material/Search";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import RequiredTitle from "../../../../utils/RequiredTitle";
import moment from "moment";

// import { set } from 'date-fns';
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
  searchWorkDuration: {
    color: "#145c9e",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colWidth: {
    width: "190px",
  },
}));
const DurationData = (props) => {
  const classes = useStyles();
  const {
    workDurationArr,
    onCountryChange,
    index,
    selectedValue,
    handleChange1,
    state,
    setState,
    setSelectedValue,
    selectWorkDuration,
    worksee,
    CheckDays,
    setCheckDays,
  } = props;
  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };
  var startTime = index && "timeStart" in index ? getDate(index.timeStart) : "";
  var endTime = index && "timeEnd" in index ? getDate(index.timeEnd) : "";
  var shiftHours =
    index && "shiftHours" in index ? index.shiftHours + " hrs" : "";

  const [open, setOpen] = useState(false);

  const openWorkDurationPopup = () => {
    setOpen(true);
  };
  const closeWorkDurationPopup = () => {
    setOpen(false);
  };
  const Labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <>
      <Grid xs="10" sx={{ my: "10px" }}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"row"} alignItems="center">
            <Typography
              className={classes.colWidth}
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              <RequiredTitle title="Required" value="*" /> Work Duration
            </Typography>
            <Autocomplete
              sx={{
                ml: 1,
                ".MuiAutocomplete-clearIndicator": {
                  display: "none",
                },
              }}
              fullWidth
              title={
                Object.keys(index).length === 0 ? "" : index?.workDurationCode
              }
              id="free-solo-demo"
              value={
                Object.keys(index).length === 0 ? "" : index?.workDurationCode
              }
              options={workDurationArr.map((option) => option.workDurationCode)}
              onChange={onCountryChange}
              renderInput={(params) => <TextField {...params}></TextField>}
            />
            {/* <Button */}
            <RequiredTitle
              title="Search Work Duration"
              value={
                <SearchIcon
                  onClick={openWorkDurationPopup}
                  className={classes.searchWorkDuration}
                />
              }
            />
            {/* </Button> */}
          </Stack>
          <Stack flexDirection={"row"} alignItems="center">
            <Box sx={{ width: "32%", paddingLeft: "35px" }}>
              <Typography
                className={classes.colWidth}
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Start Time
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <CustomTextField
                disabled={startTime === ""}
                readOnlyValue="readonly"
                className={classes.textField}
                value={startTime}
              />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} alignItems="center">
            <Box sx={{ width: "32%", paddingLeft: "35px" }}>
              <Typography
                className={classes.colWidth}
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                End Time
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <CustomTextField
                disabled={endTime === ""}
                readOnlyValue="readonly"
                className={classes.textField}
                value={endTime}
              />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} alignItems="center">
            <Box sx={{ width: "32%", paddingLeft: "35px" }}>
              <Typography
                className={classes.colWidth}
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Shift Hrs
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {shiftHours}
              </Typography>
            </Box>
          </Stack>
          {worksee ? (
            <Stack flexDirection={"row"} alignItems="center">
              <Box sx={{ width: "32%", paddingLeft: "20px" }}>
                <Typography
                  className={classes.colWidth}
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Working Days
                </Typography>
              </Box>
              <Box sx={{ width: "30%" }}>
                <Stack
                  flexDirection={"row"}
                  alignItems="center"
                  columnGap={0.5}
                >
                  {Object.keys(CheckDays).map((key, index) => {
                    return (
                      <CustomCheckBox
                        isChecked={CheckDays[key]}
                        onChangeCheck={(e) =>
                          setCheckDays({ ...CheckDays, [key]: e })
                        }
                        label={Labels[index]}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Grid>
      {open && (
        <WorkDurationModal
          toggleHandler={setOpen}
          workDurationArr={workDurationArr}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleChange1={handleChange1}
          state={state}
          setState={setState}
          selectWorkDuration={selectWorkDuration}
          onCountryChange={onCountryChange}
          closePopup={closeWorkDurationPopup}
        />
      )}
    </>
  );
};

export default DurationData;
