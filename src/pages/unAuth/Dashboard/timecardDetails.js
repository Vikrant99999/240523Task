import React, { useState } from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import TimeCardDistribution from "./timecardDist";
import TimeCard from "./timecard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DatePicker from "react-datepicker";
import { Popover } from "@mui/material";
import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../components/Button";

const Index = () => {
  const classes = useStyles();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <CustomPanel title="Timecard Details">
        <Grid
          style={{
            margin: "1px 3%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronLeftIcon className={classes.enddate} />
          <ChevronRightIcon className={classes.nextdate} />
          <Grid xs="1">
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                color: "grey",
              }}
            >
              From
            </Typography>
          </Grid>
          <Grid xs="3">
            <DatePicker
              className="dateManage"
              dateFormat="dd-MMM-yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Grid>
          <Grid xs="1">
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                color: "grey",
                textAlign: "center",
              }}
            >
              To
            </Typography>
          </Grid>
          <Grid xs="3">
            <DatePicker
              className="dateManage"
              dateFormat="dd-MMM-yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </Grid>
          <Grid container item xs="1" style={{ marginLeft: "10px" }}>
            <CustomButton
              btnText="Go"
              variant="contained"
              btnClass={{ backgroundColor: "#124590", color: "#fff" }}
            />
          </Grid>
        </Grid>
        <TimeCardDistribution />
        <TimeCard />
      </CustomPanel>
    </>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center !important",
  },
  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  enddate: {
    color: "#124590",
    cursor: "pointer",
  },
  nextdate: {
    cursor: "pointer",
    color: "#124590",
  },
}));
