import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  _renderCardInfo,
  _renderCardInfo2,
  uniqueArrByKey,
} from "../../../contants";
import { makeStyles } from "@material-ui/styles";

const SummaryData = ({ tableData, summaryTitles }) => {
  const classes = useStyles();

  return (
    <Box className={classes.innermainbox2}>
      <Box className={classes.pagedatamainbox2}>
        <Box
          px={2}
          borderRight="1px solid rgb(233, 233, 233)"
          className={classes.totalpersonbox}
        >
          <Typography style={{ fontSize: 20 }} color="#3CAF85">
            {uniqueArrByKey(tableData, "personId").length}
          </Typography>
          <Typography variant="h7" fontSize="0.75em">
            Total Person
          </Typography>
        </Box>
        {_renderCardInfo(
          {
            label: "Scheduled Hrs",
            mappedKey: "schHrs",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}
        {_renderCardInfo(
          {
            label: "Working Hrs",
            mappedKey: "wrkHrs",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}
        {summaryTitles.map((option) => {
          return _renderCardInfo2(
            {
              label: option,
              mappedKey: option,
              mapClass: "totalpersonboxtext3",
            },
            tableData,
            classes
          );
        })}
        {_renderCardInfo(
          {
            label: "Paid Leave Hrs",
            mappedKey: "paidLeaveHrs",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}

        {_renderCardInfo(
          {
            label: "Unpaid Leave Hrs",
            mappedKey: "unpaidLeaveHrs",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}
        {_renderCardInfo(
          {
            label: "Holiday Hrs",
            mappedKey: "holidayHours",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}
        {_renderCardInfo(
          {
            label: "Official Permission Hrs",
            mappedKey: "offPermReqHrs",
            mapClass: "totalpersonboxtext3",
          },
          tableData,
          classes
        )}
      </Box>
    </Box>
  );
};

export default SummaryData;

const useStyles = makeStyles((theme) => ({
  Wrap: {
    display: "flex",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px ",
    },
  },

  totalpersonbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    textAlign: "center",
    width: 120,
    paddingTop: 20,
  },
  mainbox2: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    //maxHeight: "350px",
    //background: "#f7f9fc",
    marginTop: "15px",
    // overflow: "scroll",
  },
  innermainbox2: {
    display: "inline-block",
    width: "100%",
    //maxHeight: "14em",
    verticalAlign: "top",
    overflow: "auto",
  },
  pagedatamainbox2: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    borderTop: "1px solid #E9E9E9 !important",
    //backgroundColor: "#fff",
    // "&:hover": {
    //   backgroundColor: "#ededed",
    // },
    width: "fit-content",
  },
}));
