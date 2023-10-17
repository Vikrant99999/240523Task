import React, { useState } from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import { Grid, Box, makeStyles, Typography } from "@material-ui/core";
import data from "./publishedrosters.json";

const PublishedRosters = () => {
  const classes = useStyles();

  const [rosterData, setRosterData] = useState(data.rosters.slice(0, 5));

  const length = data.rosters.length;

  return (
    <>
      <CustomPanel title="Timesheet(s) Awaiting Your Action">
        <Grid xs="12" style={{ margin: "10px 15px" }}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "5px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography style={{ fontSize: "12px", color: "blue" }}>
              View Roster(s) Published by me
            </Typography>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 15px",
            }}
          >
            {rosterData.map((timesheet) => {
              return (
                <>
                  <Grid
                    xs="12"
                    style={{
                      display: "flex",
                      paddingTop: "1px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Grid xs="6">
                      <Typography style={{ fontSize: "12px", color: "blue" }}>
                        {timesheet.title}
                      </Typography>
                    </Grid>
                    <Grid xs="6">
                      <Typography style={{ fontSize: "12px", color: "grey" }}>
                        {timesheet.time}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
            <Grid
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "5px",
              }}
            >
              <Typography
                style={{
                  fontSize: "12px",
                  color: "blue",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setRosterData((prev) => {
                    if (prev.length + 5 > length) {
                      return data.rosters.slice(0, prev.length + 5);
                    } else {
                      return data.rosters.slice(0, length);
                    }
                  });
                }}
              >
                Load More Items
              </Typography>
              <Typography style={{ fontSize: "12px" }}>
                1-{rosterData.length} of {length} items
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CustomPanel>
    </>
  );
};

export default PublishedRosters;

const useStyles = makeStyles((theme) => ({}));
