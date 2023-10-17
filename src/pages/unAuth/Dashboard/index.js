import React, { useEffect } from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { Header } from "../../layout/Header";
import Timecard from "./timecardDetails";
import Notifications from "./notifications";
import MyRequests from "./myrequests";
import MyTeam from "./myteam";
import { MainPage } from "../../layout/MainPage";
import { useDispatch,useSelector } from "react-redux";
import { updateState } from "../../../redux/commonSlice";
import Timesheet from "./Timesheet";
import PublishedRosters from "./PublishedRosters";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    height: "40vh",
    width: "50%",
    top: "2.2rem",
    left: "1rem",
    WebkitBoxShadow: "0px 1px 5px 0px rgba(0,0,0,0.54)",
    MozBoxShadow: " 0px 1px 5px 0px rgba(0,0,0,0.54)",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.54)",
  },
  gridSection1: {
    display: "flex",
    flexDirection: "column !important",
    padding: "5px",
    margin: "10px",
  },
  link: {
    fontSize: "12px",
    color: "#124590",
    textDecoration: "none",
    fontFamily: "Inter",
  },
  Text: {
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "Inter",
  },
  icons: {
    fontSize: "14px",
    color: "#124590",
  },
  gridSection2: {},
}));

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <MainPage pageName="Dashboard">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Timecard />
        </Grid>
        <Grid item xs={6}>
          <Notifications  />
          <MyRequests />
          <MyTeam />
          <Timesheet />
          <PublishedRosters />
        </Grid>
      </Grid>
    </MainPage>
  );
};

export default Dashboard;
