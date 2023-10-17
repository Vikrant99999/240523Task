import {
  FormControl,
  Grid,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { CustomButton } from "../../../../components/Button";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import SelectSearch from "./SelectSearch";
import moment from "moment";
import { filterArr } from "../../../../utils/commonService";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const WorkDurationModal = (props) => {
  const {
    toggleHandler,
    workDurationArr,
    selectedValue,
    handleChange1,
    state,
    setState,
    setSelectedValue,
    selectWorkDuration,
    onCountryChange,
    closePopup,
    index
  } = props;
  const classes = useStyles();

  const [stateValue, setStateValue] = React.useState(selectedValue);
  const [selectedCode, setSelectedCode] = useState("");

  // console.log(stateValue);

  const handleClose = () => {
    toggleHandler(false);
    onCountryChange("", selectedCode);
  };

  const onChangeEvent = (index, item) => {
    setSelectedCode(item.workDurationCode);
    setState(index);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [workDurationCode, setWorkDurationCode] = useState("");
  const [time, setTime] = useState("");
  const [staffdup, setStaff] = useState(workDurationArr);

  const searchStaff = () => {
    const getDateValue = (item) =>
      `${getDate(item.timeStart)} - ${getDate(item.timeEnd)}`;

    var keysArr = [
      { value: workDurationCode, key: "workDurationCode" },
      { value: time, method: getDateValue },
    ];
    setStaff(filterArr(workDurationArr, keysArr));
  };

  const resetAllFields = () => {
    setWorkDurationCode("");
    setTime("");
  };

  const resetStaff = () => {
    resetAllFields();
    setStaff(workDurationArr);
  };
  const workDurationChange = (e) => {
    setWorkDurationCode(e.target.value);
  };
  const timeChange = (e) => {
    setTime(e.target.value);
  };
  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };
  // provide either key or method
  const tableColumns = [
    {
      xs: "5",
      name: "Work Duration",
      key: "workDurationCode",
    },
    {
      xs: "5",
      name: "Time",
      // key: "timeStart", key is undefined then we need a function
      method: (item) => {
        return `${getDate(item.timeStart)} - ${getDate(item.timeEnd)}`;
      },
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      dialogTitle: "Search & Select : Work Duration",
      open: "true",
      handleClose: closePopup,
    },
    accordianProps: {
      expanded: expanded === "panel1",
      onChange: handleChange("panel1"),
    },
    summaryProps: {
      "aria-controls": "panel1d-content",
      id: "panel1d-header",
    },
    summaryFirstChildProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
        marginLeft: "5px",
        fontWeight: "bolder",
      },
    },
    summaryValue: "Search",
    customTextFieldContainer: {
      style: { marginTop: "10px" },
      rowSpacing: 1,
    },
    customTextFieldArr: [
      {
        fieldName: "Work Duration",
        mainContainerProps: {
          className: `${classes.maincontainer}`,
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "30px",
          },
        },
        formFieldParentProps: {},
        formFieldProps: {
          style: {
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "bolder",
          },
        },
        customTextFieldParentProps: {
          style: {
            marginLeft: "10px",
          },
        },
        customTextFieldProps: {
          type: "text",
          style: {
            width: "70%",
          },
          value: workDurationCode,
          onChange: workDurationChange,
        },
      },
      {
        fieldName: "Time",
        mainContainerProps: {
          xs: "12",
          className: `${classes.maincontainer}`,
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "70px",
          },
        },
        formFieldParentProps: {
          marginLeft: "10px",
        },
        formFieldProps: {
          style: {
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "bolder",
          },
        },
        customTextFieldParentProps: {
          style: {
            marginLeft: "12px",
          },
        },
        customTextFieldProps: {
          type: "text",
          style: { width: "70%" },
          value: time,
          onChange: timeChange,
        },
      },
    ],
    customButtonsArr: [
      {
        btnText: "Search",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: searchStaff,
      },
      {
        btnText: "Reset",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: resetStaff,
      },
    ],
    columns: tableColumns,
    columnProps: {},
    columnContainerProps: {
      className: `${classes.headermanage}`,
    },
    columnCellProps: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Inter",
      },
    },
    rows: staffdup,
    rowContainerProps: {
      className: `${classes.bordermanage}`,
    },
    rowCellProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: onChangeEvent,
    state: state,
    customButtonProps: {
      btnText: "Select",
      onClick: handleClose,
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
      },
    },
  };
  return <SelectSearch {...data} />;
  /*
  return (
    <CustomDialog
      maxWidth="sm"
      dialogTitle="Search & Select : Work Duration"
      open="true"
      handleClose={handleClose}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              marginLeft: "5px",
              fontWeight: "bolder",
            }}
          >
            Search
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid style={{ marginTop: "10px" }}>
            <Grid className={classes.maincontainer}>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "30px" }}
              >
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                  Work Duration
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    type="text"
                    value={empname}
                    onChange={empChange}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs="12" className={classes.maincontainer}>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "70px" }}
              >
                <Box marginLeft="10px">
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                    Time
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "12px" }}>
                  <CustomTextField
                    type="text"
                    style={{ width: "70%" }}
                    value={empnum}
                    onChange={numChange}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container className={classes.selectbutton}>
            <Grid item padding={"2px"}>
              <CustomButton
                btnText="Search"
                variant="contained"
                onClick={searchStaff}
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
              />
            </Grid>
            <Grid item padding={"2px"}>
              <CustomButton
                btnText="Reset"
                variant="contained"
                onClick={resetStaff}
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid container>
        <Grid
          item
          xs="12"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f1f4f9",
          }}
        >
          <Grid xs="5">
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Work Duration
            </Typography>
          </Grid>
          <Grid xs="5">
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Time
            </Typography>
          </Grid>
        </Grid>

        <Grid container style={{ height: "50vh", overflowY: "scroll" }}>
          {staffdup?.length > 0 &&
            staffdup?.map((option, index) => {
              {
                var item = option?.timeStart;
                var startTime = item?.split("T");

                var item1 = option?.timeEnd;
                var endTime = item1?.split("T");
              }

              return (
                <Grid
                  item
                  xs="12"
                  onClick={() => handleChange1(index, option)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    background: state === index ? "lightblue" : "white",
                    cursor: "pointer",
                  }}
                >
                  <Grid xs="5" style={{ marginTop: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      {option.workDurationCode}
                    </Typography>
                  </Grid>
                  <Grid xs="5" style={{ marginTop: "10px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      {startTime?.[1]} - {endTime?.[1]}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
        <Grid
          container
          style={{
            display: "flex !important",
            justifyContent: "flex-end !important",
            marginTop: "10px",
          }}
        >
          <Grid item>
            <CustomButton
              btnText="Select"
              variant="contained"
              onClick={}
              btnClass={{ backgroundColor: "#124590", color: "#fff" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </CustomDialog>
  );
  */
};

export default WorkDurationModal;
const useStyles = makeStyles((theme) => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
