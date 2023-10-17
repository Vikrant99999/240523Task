import React, { useState, useEffect } from "react";
import { CustomDialog } from "../../../../components/CustomDialog";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomButton } from "../../../../components/Button";
import { Typography, Grid, Box } from "@mui/material";
import { CustomTextField } from "../../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import SelectSearch from "./SelectSearch";
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

const JobTitleModal = (props) => {
  const {
    toggleHandler,
    jobTitleArr,
    state3,
    handleChangeJobTitle,
    setState3,
  } = props;
  console.log("props", props);
  useEffect(() => {
    searchStaff();
  }, []);
  const [staffdup, setStaff] = useState(jobTitleArr);
  const [empname, setEmpname] = useState("");
  const [indexItemObj, setIndexItemObj] = useState({});

  const searchStaff = () => {
    var keysArr = [{ value: empname, key: "jobTitle" }];
    setStaff(filterArr(jobTitleArr, keysArr));
  };

  const resetAllFields = () => {
    setEmpname("");
  };
  const resetStaff = () => {
    resetAllFields();
    setStaff(jobTitleArr);
  };

  const empChange = (e) => {
    setEmpname(e.target.value);
  };

  const handleClose = () => {
    toggleHandler(0);
    handleChangeJobTitle(indexItemObj.index, indexItemObj.item);
  };

  const justClose = () => {
    toggleHandler(0);
  };

  const onChangeEvent = (index, item) => {
    setIndexItemObj({ index, item });
    setState3(index);
  };

  const [expanded, setExpanded] = React.useState("panel1");
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // provide either key or method
  const tableColumns = [
    {
      xs: "12",
      name: "Job Title",
      key: "jobTitle",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      dialogTitle: "Search & Select : Job Title",
      open: "true",
      handleClose: justClose,
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
        fieldName: "Job Title",
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
            width: "100%",
          },
          value: empname,
          onChange: empChange,
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
    columnProps: {
      style: {
        marginLeft: "0px",
      },
    },
    columnContainerProps: {
      className: `${classes.headermanage}`,
    },
    columnCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
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
    state: state3,
    customButtonProps: {
      btnText: "Select",
      variant: "contained",
      onClick: handleClose,
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
    },
  };

  return <SelectSearch {...data} />;

  /*
  return (
    <CustomDialog
      maxWidth="sm"
      dialogTitle="Search & Select : Job Title"
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
                    Job Title
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    type="text"
                    style={{ width: "100%" }}
                    value={empname}
                    onChange={empChange}
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
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                onClick={searchStaff}
              />
            </Grid>
            <Grid item padding={"2px"}>
              <CustomButton
                btnText="Reset"
                variant="contained"
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                onClick={resetStaff}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs="12" style={{ marginLeft: "20px" }}>
          <Box fontWeight="bold">
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "clip",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              Job Title{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: "10px" }}>
        {staffdup?.length > 0 &&
          staffdup?.map((item, index) => {
            return (
              <Grid
                container
                alignItems="center"
                onClick={() => handleChangeJobTitle(index, item)}
                style={{
                  background: state3 === index ? "lightblue" : "white",
                }}
                className={classes.bordermanage}
              >
                <Grid item xs="5" style={{ marginLeft: "20px" }}>
                  <Box>
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      {item.jobTitle}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
      </Grid>

      <Grid container justifyContent="flex-end">
        <Box py={2}>
          <CustomButton
            btnText="Select"
            variant="contained"
            onClick={handleClose}
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        </Box>
      </Grid>
    </CustomDialog>
  );
  */
};

export default JobTitleModal;

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
