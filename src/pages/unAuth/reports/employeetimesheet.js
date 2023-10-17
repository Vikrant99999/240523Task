import React, { useState } from "react";
import { Header } from "../../layout/Header";
import { Typography, Box, Grid, Autocomplete, TextField } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CustomTextField } from "../../../components/TextField";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import { makeStyles } from "@material-ui/styles";

const payCode = [
  "Lapse Hours",
  "Speciality Overtime 125",
  "Overtime 125",
  "Overtime 150",
  "Project Hours",
  "Public Holiday (Rest Day)",
  "Proximate - On Call",
  "Re-Call - 125",
  "Re-Call - 150",
  "Regular Hours",
  "Remote - On Call",
  "Rest Day OT 125",
  "Rest Day OT 150",
  "TOIL",
  "Telephone - On Call",
];

const Index = () => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <Header />
      <Grid style={{ margin: "10px" }}>
        <Grid item xs="12">
          <Box>
            <Typography
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              Employee Timesheet Report
            </Typography>
          </Box>
        </Grid>
        <Grid container xs="12" style={{ margin: "10px 0" }}>
          <Grid container item xs="2.5" style={{ justifyContent: "center" }}>
            <Grid
              xs="6"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Box textAlign="right">*Start Date</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Box style={{ marginLeft: "10px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => {
                    return <CustomTextField {...params} />;
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs="2.5" style={{ justifyContent: "center" }}>
            <Grid
              xs="6"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Box textAlign="right">*End Date</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Box style={{ marginLeft: "10px" }}>
                <DatePicker
                  className="dateManage"
                  dateFormat="dd-MMM-yyyy"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs="3" style={{ justifyContent: "center" }}>
            <Grid
              xs="4"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Box textAlign="right">Pay Code</Box>
              </Typography>
            </Grid>
            <Grid item xs="8">
              <Box style={{ marginLeft: "10px" }}>
                <Autocomplete
                  id="paycode-list-timesheet"
                  disableClearable
                  options={payCode}
                  renderInput={(params) => <TextField {...params}></TextField>}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs="2" style={{ justifyContent: "center" }}>
            <Grid
              xs="6"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                <Box textAlign="right">Status</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Box style={{ marginLeft: "10px" }}>
                <Autocomplete
                  id="status-list-timesheet"
                  disableClearable
                  options={["Not Submitted", "Pending Approval", "Approved"]}
                  renderInput={(params) => <TextField {...params}></TextField>}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs="1" style={{ marginLeft: "10px" }}>
            <CustomButton
              btnText="Go"
              variant="contained"
              btnClass={{ backgroundColor: "#124590", color: "#fff" }}
            />
          </Grid>
        </Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
                
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    margin: "5px",
    maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    width: "100vw",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "fixed",
    overflow: "scroll",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
}));

export default Index;
