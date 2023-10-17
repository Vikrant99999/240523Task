import { makeStyles } from "@material-ui/styles";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { productivityDateWidgetOption } from "../../../contants";
import ProfileSelector from "../shared/ProfileSelector";
import { DateWidget } from "../shared/datewidget";

import Filter from "./Filter";

export const SelectProfileCard = (props) => {
  const { dashboardData, setTabledata } = props;

  const classes = useStyles();

  return (
    <>
      <Box className={classes.paper}>
        <Grid container p={2} justifyContent="space-between">
          <Grid
            item
            xs={12}
            style={{
              marginLeft: "5px",
              marginBottom: "20px",
            }}
          >
            <ProfileSelector managerFlag={true} />
          </Grid>

          <Grid
            item
            xs="12"
            className={classes.dateWrap}
            borderBottom="1px solid rgb(233, 233, 233)"
            borderTop="1px solid rgb(233, 233, 233)"
          >
            <DateWidget
              durationFilter={true}
              {...props}
              dateWidgetOption={productivityDateWidgetOption}
            />
            <Filter dashboardData={dashboardData} setTabledata={setTabledata} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dateWrap: {
    padding: 15,
    display: "flex",
    alignItems: "center !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center ",
  },
  duration: {
    width: "140px ",
    marginLeft: "10px ",
  },
  filterData: {
    width: "170px ",
    marginLeft: "10px ",
  },
  calenderdropdown: {
    display: "flex ",
    alignItems: "center ",
    padding: "1.2px",
  },
  Wrap: {
    display: "flex",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px ",
      marginTop: "10px",
    },
  },
  daycolor: {
    backgroundColor: "#0572ce",
    color: "#fff",
    border: "1px solid #0572ce",
  },
  dateManage: {
    color: "#6F6F6F",
  },
  employee: {
    backgroundColor: "#124590 ",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  FilterAltIcon: {
    color: "white !important",
    fontSize: "large !important",
    marginRight: "10px",
  },
  clearFilter: {
    backgroundColor: "#f0ad4e",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  grid4: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
  grid5: {
    color: "#124590",
    verticalAlign: "middle",
  },
  grid3: {
    padding: "10px",
    backgroundColor: "#FFF",
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },
  totalpersonbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  projectTitle: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    // width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
}));
