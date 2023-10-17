import React from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import data from "./notifs.json";

const Index = () => {
  const classes = useStyles();

  const [notifType, setNotifType] = React.useState("all");

  return (
    <>
      <CustomPanel title="Notifications">
        <Grid container xs="12" className={classes.topbar}>
          <Grid item>
            <Typography
              className={classes.type}
              onClick={() => setNotifType("all")}
            >
              All
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.type}
              onClick={() => setNotifType("action")}
            >
              Actionable
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.type}
              onClick={() => setNotifType("info")}
            >
              Info Only
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.type}>
              View Closed Notifications
            </Typography>
          </Grid>
        </Grid>

        <Grid className={classes.notifications} xs="12">
          {data.notifs.map((notif) => {
            if (notifType !== "all") {
              if (notifType !== notif.type) {
                return null;
              }
            }
            return (
              <Grid className={classes.notif}>
                <Grid container>
                  <Typography
                    style={{
                      fontSize: "13px",
                      color: "blue",
                    }}
                    className={classes.title}
                  >
                    {notif.title}
                  </Typography>
                  <Typography
                    variant="span"
                    style={{
                      color: notif.type === "action" ? "red" : "green",
                      fontSize: "13px",
                      marginLeft: "2px",
                    }}
                  >
                    {notif.type === "action"
                      ? "(Your Action Required)"
                      : "(Info only)"}
                  </Typography>
                  <Grid style={{ marginLeft: "auto" }}>
                    <Typography
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {notif.time}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.time}>
                  <Typography
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {notif.duration}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CustomPanel>
    </>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  topbar: {
    margin: "10px 15px",
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
  },
  type: {
    fontSize: "14px",
    borderRight: "1px solid #e0e0e0",
    padding: "0 5px",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  notifications: {
    display: "flex",
    flexDirection: "column",
    margin: "5px 15px",
  },
  notif: {
    padding: "5px 8px",
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  title: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));
