import React, { useEffect, useState } from "react";
import { Header } from "../../layout/Header";
import { Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PreferencesModal from "./PreferencesModal";
import { useQuery } from "react-query";
import { timeZone } from "../../../services/api";
import { MainPage } from "../../layout/MainPage";
import { CustomButton } from "../../../components/Button";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import CustomCheckBox from "../../../components/CustomCheckBox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

//
const dummy = [
  "(-05:00) US Eastern Time",
  "(-06:00) US Central Time",
  "(-07:00) US Mountain Time",
];
const time = [
  { label: "" },

  { label: "01" },
  { label: "02" },
  { label: "03" },
  { label: "04" },
  { label: "05" },
  { label: "06" },
  { label: "07" },
  { label: "08" },
  { label: "09" },
  { label: "10" },
  { label: "11" },
];
const seconds = [{ label: "" }, { label: "00" }, { label: "30" }];
const clock = [{ label: "" }, { label: "AM" }, { label: "PM" }];

const UserPreferences = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [timeZoneData, setTimeZoneData] = useState();
  const [selectedTimeZone, setSelectedTimeZone] = useState(dummy[0]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(timeZoneData, "timeZoneData");
  const [errorProps, setErrorProps] = React.useState({});
  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const [status, setStatus] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const { data: getTimeZone, refetch: getAllProjectRefetch } = useQuery(
    ["getTimeZone"],
    () => timeZone(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getTimeZone) {
      setTimeZoneData(getTimeZone?.data?.data);

      setIsLoading(false);
    }
  }, [getTimeZone]);

  const handelTimechange = (iitem) => {
    console.log(iitem?.userVisibleName);
    setSelectedTimeZone(iitem?.userVisibleName);
  };
  const btnClick = () => {
    setErrorProps({
      snackbarFlag: true,
      msz: "User Preference(s) Saved !",
      type: "success",
    });
  };

  return (
    <MainPage pageName="User Preferences" isLoading={isLoading}>
      <Grid container xs="12" style={{ margin: "10px" }}>
        <Grid className={classes.timezone} xs="12">
          <Grid>
            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                margin: "5px 0px 0px 10px",
                color: "#0572ce",
                cursor:"text"
              }}
            >
              Timezone
            </Typography>
          </Grid>
          <Grid xs="4" style={{ margin: "10px" }}>
            <CustomTextField
              value={selectedTimeZone}
              variant="outlined"
              endIcon={
                <SearchIcon
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              }
            />
          </Grid>
        </Grid>
        <Grid className={classes.timezone} xs="12">
          <FormControl>
            <FormLabel
              id="approval"
              style={{ color: "blue", margin: "5px 0px 0px 10px" }}
            >
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  padding: "5px",
                  color: "#0572ce",
                  cursor:"text"
                }}
              >
                {" "}
                Timesheet Approval Reminder Settings
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="approval"
              defaultValue={2}
              name="approval-group"
              style={{ padding: "5px", fontSize: "14px" }}
            >
              <FormControlLabel
                style={{ fontFamily: "Inter", whiteSpace: "nowrap" }}
                value={1}
                control={<Radio onClick={() => setStatus(0)} />}
                label="I would like to receive email notifications when my employee(s) submit timesheets in real time"
              ></FormControlLabel>
              <FormControlLabel
                value={2}
                control={<Radio onClick={() => setStatus(0)} />}
                label="I do not wish to receive email notifications"
              />
              <FormControlLabel
                value={3}
                control={<Radio onClick={() => setStatus(1)} />}
                label="I would choose my own day and time for Timesheet approval notifications"
              />
            </RadioGroup>
          </FormControl>
          {status == 1 && (
            <>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 50,
                }}
              >
                <Box>
                  <Typography>Days</Typography>
                </Box>
                <Box>
                  <Grid
                    style={{ display: "flex", marginLeft: 10 }}
                    item
                    xs="12"
                    justifyContent="space-around"
                  >
                    <CustomCheckBox
                      isChecked={CheckDays.mon}
                      style={{ padding: 0 }}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, mon: e })
                      }
                      label="Mon"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.tue}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, tue: e })
                      }
                      label="Tue"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.wed}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, wed: e })
                      }
                      label="Wed"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.thu}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, thu: e })
                      }
                      label="Thu"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.fri}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, fri: e })
                      }
                      label="Fri"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.sat}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, sat: e })
                      }
                      label="Sat"
                    />
                    <CustomCheckBox
                      isChecked={CheckDays.sun}
                      onChangeCheck={(e) =>
                        setCheckDays({ ...CheckDays, sun: e })
                      }
                      label="Sun"
                    />
                  </Grid>
                </Box>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 50,
                  marginBottom: 10,
                }}
              >
                <Box>
                  <Typography>Time</Typography>
                </Box>
                <Grid style={{ display: "flex", flexDirection: "row" }}>
                  <Box ml={2}>
                    <Autocomplete
                      id="time"
                      disableClearable
                      disablePortal={true}
                      options={time}
                      sx={{ width: 80 }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                      popupIcon={
                        <ArrowDropDownIcon
                          fontSize="medium"
                          style={{
                            marginLeft: 20,
                            height: 30,
                          }}
                        />
                      }
                    />
                  </Box>

                  <Box ml={2}>
                    <Autocomplete
                      id="seconds"
                      disableClearable
                      disablePortal={true}
                      options={seconds}
                      sx={{ width: 80 }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                      popupIcon={
                        <ArrowDropDownIcon
                          fontSize="medium"
                          style={{ marginLeft: 20, height: 30 }}
                        />
                      }
                    />
                  </Box>

                  <Box ml={2}>
                    <Autocomplete
                      id="clock"
                      disableClearable
                      disablePortal={true}
                      options={clock}
                      sx={{ width: 80 }}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                      popupIcon={
                        <ArrowDropDownIcon
                          fontSize="medium"
                          style={{ height: 30, marginLeft: 50 }}
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        {open && (
          <PreferencesModal
            handelTimechange={handelTimechange}
            open={open}
            toggleHandler={handleClose}
            timeZoneData={timeZoneData}
          />
        )}
      </Grid>
      <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          btnText="Save"
          btnClass={{
            color: "#fff",
            backgroundColor: "#124590",
          }}
          onClick={btnClick}
        />
      </Grid>
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </MainPage>
  );
};

export default UserPreferences;

const useStyles = makeStyles((theme) => ({
  timezone: {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    margin: "10px",
  },
}));
