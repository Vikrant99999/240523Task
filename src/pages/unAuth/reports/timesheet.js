import React, { useState } from "react";
import { Header } from "../../layout/Header";
import { Typography, Box, Grid, Autocomplete, TextField } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import SearchIcon from "@material-ui/icons/Search";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CustomTextField } from "../../../components/TextField";
import { CustomSnackbar } from "../../../components/CustomSnackbar";

const list = ["Not Submitted", "Pending Approval", "Approved"];

const Index = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [legalEntity, setLegalEntity] = useState("");
  const [status, setStatus] = useState(list);
  const [errorProps, setErrorProps] = useState({});

  const searchHandler = () => {
    if (startDate > endDate) {
      setErrorProps({
        snackbarFlag: true,
        type: "error",
        msz: "Start Date should be less than End Date",
      });
      return;
    }
    if (!legalEntity) {
      setErrorProps({
        snackbarFlag: true,
        type: "error",
        msz: "Legal Entity is required",
      });
      return;
    }
  };

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
              Timesheet Report
            </Typography>
          </Box>
        </Grid>
        <Grid container xs="9" style={{ margin: "10px 0" }}>
          <Grid container item xs="4" style={{ justifyContent: "center" }}>
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
          <Grid container item xs="4" style={{ justifyContent: "center" }}>
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
          <Grid container item xs="4" style={{ justifyContent: "center" }}>
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
                <Box textAlign="right">Legal Entity</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Box style={{ marginLeft: "10px" }}>
                <CustomTextField
                  style={{ marginLeft: "10px" }}
                  endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
                  value={legalEntity}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs="12">
          <Grid container item xs="3" style={{ justifyContent: "center" }}>
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
                <Box textAlign="right">Business Unit</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <CustomTextField
                style={{ marginLeft: "10px" }}
                endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
              />
            </Grid>
          </Grid>
          <Grid container item xs="3" style={{ justifyContent: "center" }}>
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
                <Box textAlign="right">Employee</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <CustomTextField
                style={{ marginLeft: "10px" }}
                endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
              />
            </Grid>
          </Grid>
          <Grid container item xs="3" style={{ justifyContent: "center" }}>
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
                <Box textAlign="right">Pay Code</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <CustomTextField
                style={{ marginLeft: "10px" }}
                endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
              />
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
              <Autocomplete
                id="status-demo"
                disableClearable
                options={status}
                renderInput={(params) => <TextField {...params}></TextField>}
                style={{ marginLeft: "10px" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs="2.5" style={{ justifyContent: "center" }}>
          <CustomButton
            btnText="Go"
            variant="contained"
            btnClass={{ margin: "10px 3px" }}
            onClick={searchHandler}
          />
        </Grid>
        <Grid
          container
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            margin: "5px 0",
          }}
        ></Grid>
        <p>No data to display</p>
      </Grid>
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </>
  );
};

export default Index;
