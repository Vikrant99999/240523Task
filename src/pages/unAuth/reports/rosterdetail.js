import React, { useState } from "react";
import { Header } from "../../layout/Header";
import { makeStyles } from "@material-ui/styles";
import { Typography, Box, Grid, Autocomplete, TextField } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import SearchIcon from "@material-ui/icons/Search";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CustomTextField } from "../../../components/TextField";

const statusOption = ["Draft", "Pending Approval", "Un Published", "Published"];

const dummy_data = [
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "Launa Torez(44)",
    department: "Maintainence",
    jobTitle: "HD-Driver",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "Bea lida(111024)",
    department: "Engineering",
    jobTitle: "Field Service Engineer",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "Dona Lamer(301)",
    department: "Maintainence",
    jobTitle: "LD-Driver",
    legalEntity: "Patrick Central Air Condition",
    businessUnit: "Western Applied BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
  {
    person: "In Muns(103982)",
    department: "Logistics",
    jobTitle: "Data entry operator",
    legalEntity: "Patrick Air Condition",
    businessUnit: "Western Consumer BU",
  },
];

const Index = () => {
  const classes = useStyles();

  const [statusOptions, setStatusOptions] = useState(statusOption);
  const [reportData, setReportData] = useState(dummy_data);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <Header />
      <Grid item container style={{ margin: "10px" }}>
        <Grid item xs="12">
          <Box>
            <Typography
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              Roster Detail Report
            </Typography>
          </Box>
        </Grid>
        <Grid container xs="6" style={{ margin: "10px 0" }}>
          <Grid container item xs="6" style={{ justifyContent: "center" }}>
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
          <Grid container item xs="6" style={{ justifyContent: "center" }}>
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
        </Grid>
        <Grid container xs="12" style={{ margin: "10px 0" }}>
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
                <Box textAlign="right">Legal Entity</Box>
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
                <Box textAlign="right">Status</Box>
              </Typography>
            </Grid>
            <Grid item xs="6">
              <Autocomplete
                id="status-demo"
                disableClearable
                options={statusOptions}
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
          />
        </Grid>
        <Grid
          container
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            margin: "5px 0",
          }}
        ></Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Person
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Department
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  JobTitle
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  LegalEntity
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  BusinessUnit
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Total Sch. Hrs
                </Typography>
              </Box>
            </Box>
            <Box style={{ maxHeight: "45vh", marginTop: "35px" }}>
              {reportData.map((item, index) => {
                return (
                  <>
                    <Box className={classes.pagedatamainbox}>
                      <Box className={classes.common}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item.person}
                        </Typography>
                      </Box>
                      <Box className={classes.common}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item.department}
                        </Typography>
                      </Box>
                      <Box className={classes.legalEntity}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item.jobTitle}
                        </Typography>
                      </Box>
                      <Box className={classes.legalEntity}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                          }}
                        >
                          {item.legalEntity}
                        </Typography>
                      </Box>
                      <Box className={classes.common}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item.businessUnit}
                        </Typography>
                      </Box>
                      <Box className={classes.common}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          ""
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Index;

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
    overflowY: "scroll",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "fixed",
    width: "98.1%",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  common: {
    display: "flex",
    alignItems: "center",
    width: "10%",
  },
  legalEntity: {
    display: "flex",
    alignItems: "center",
    width: "15%",
  },
}));
