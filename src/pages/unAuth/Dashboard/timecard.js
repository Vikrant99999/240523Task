import React, { useState } from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import data from "./timecard.json";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const Index = () => {
  const classes = useStyles();

  const [timecardDetails, setTimecardDetails] = useState(data.data);

  return (
    <>
      <CustomPanel title="Timecard">
        <Grid style={{ padding: "5px" }}>
          <Grid container xs="12" style={{ borderBottom: "1px solid #e5e5e5", borderTop: "1px solid #e5e5e5" }}>
            <Grid item style={{ width: "10%" }}></Grid>
            <Grid item style={{ width: "30%" }}></Grid>
            <Grid item style={{ width: "20%" }}>
              <Typography
                style={{ fontSize: "14px", fontFamily: "Inter", color: "blue" }}
              >
                Schedule
              </Typography>
            </Grid>
            <Grid item style={{ width: "20%" }}>
              <Typography
                style={{ fontSize: "14px", fontFamily: "Inter", color: "blue" }}
              >
                Actuals
              </Typography>
            </Grid>
          </Grid>
          <Grid xs="12" style={{ padding: "5px 0" }}>
            {timecardDetails.map((item, index) => (
              <Grid container key={item.id} class={classes.timecard}>
                <Box style={{ width: "10%" }}>
                  <Typography
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter",
                      color: "grey",
                    }}
                  >
                    {item.day}
                  </Typography>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                    {item.date}
                  </Typography>
                </Box>
                <Box style={{ width: "30%" }}>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                    {item.code}
                  </Typography>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                    {item.team}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter",
                      color: "grey",
                    }}
                  >
                    {item.role}
                  </Typography>
                </Box>
                <Box style={{ width: "20%" }}>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                    {item.schedule}
                  </Typography>
                </Box>
                <Box style={{ width: "20%" }}>
                  <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                    {item.actuals}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CustomPanel>
    </>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  timecard: {
    margin: "5px 0",
    padding: "3px 0",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    borderBottom: "1px solid #e5e5e5",
    display: "flex",
  },
}));
