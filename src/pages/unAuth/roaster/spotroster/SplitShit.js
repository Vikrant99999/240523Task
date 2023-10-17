import { Typography, Box, Grid, TextField,  } from "@mui/material";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/styles";
import RequiredTitle from "../../../../utils/RequiredTitle";

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
}));
const SplitShit = (props) => {
  const classes = useStyles();
  const demodata = ["data1", "data2", "data3", "data4", "data5"];


  return (
    <Grid xs="12" style={{ marginTop: "10px" }}>
      <Box className={classes.contentBox}>
        <Grid xs="3">
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
          >
             <RequiredTitle title="Required" value={"*"} /> Split Shift
          </Typography>
        </Grid>
        <Grid xs="7">
          <Autocomplete
            id="free-solo-demo"
            disableClearable
            options={demodata}

            renderInput={(params) => <TextField {...params}></TextField>}
          />
        </Grid>
    
      </Box>
    </Grid>
  );
};

export default SplitShit;
