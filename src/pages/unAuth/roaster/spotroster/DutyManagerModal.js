import React, { useState } from "react";
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
import { filterArr } from "../../../../utils/commonService";
import SelectSearch from "./SelectSearch";

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

const DutyManagerModal = (props) => {
  const {
    toggleHandler,
    dutyManagerArr,
    handleChangeDutyManager,
    state1,
    setState1,
  } = props;
  const [indexItemObj, setIndexItemObj] = useState({});

  const handleClose = () => {
    handleChangeDutyManager(indexItemObj.index, indexItemObj.item);
    toggleHandler(0);
  };
  const justClose = () => {
    toggleHandler(0);
  };

  const onChangeEvent = (index, item) => {
    setIndexItemObj({
      index,
      item,
    });
    setState1(index);
  };

  // console.log(staffData)
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [empnum, setEmpnum] = useState("");
  const [staffdup, setStaff] = useState(dutyManagerArr);
  const [empname, setEmpname] = useState("");

  const searchStaff = () => {
    var keysArr = [
      { value: empnum, key: "employeeNumber" },
      { value: empname, key: "staffName" },
    ];
    setStaff(filterArr(dutyManagerArr, keysArr));
  };
  const resetAllFields = () => {
    setEmpnum("");
    setEmpname("");
  };

  const resetStaff = () => {
    resetAllFields();
    setStaff(dutyManagerArr);
  };

  const empChange = (e) => {
    setEmpname(e.target.value);
  };
  const numChange = (e) => {
    setEmpnum(e.target.value);
  };
  // provide either key or method
  const tableColumns = [
    {
      xs: "2",
      name: "Employee Number",
      key: "employeeNumber",
    },
    {
      xs: "2",
      name: "Employee Name",
      key: "staffName",
    },
    {
      xs: "3",
      name: "Department",
      key: "department",
    },
    {
      xs: "2.6",
      name: "Job Title",
      key: "jobTitle",
    },
    {
      xs: "2",
      name: "Location",
      key: "workLocation",
      style: { color: "red" },
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "md",
      dialogTitle: "Search & Select : Duty Manager",
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
        fieldName: "Employee Number",
        mainContainerProps: {
          className: `${classes.maincontainer}`,
          xs: "12",
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
          value: empnum,
          onChange: numChange,
        },
      },
      {
        fieldName: "Employee Name",
        mainContainerProps: {
          xs: "12",
          className: `${classes.maincontainer}`,
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "30px",
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
        overflow: "hidden",
        textOverflow: "clip",
        maxWidth: "25ch",
        whiteSpace: "nowrap",
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
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "23ch",
        textOverflow: "ellipsis",
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: onChangeEvent,
    state: state1,
    customButtonProps: {
      btnText: "Select",
      onClick: handleClose,
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
      onClick: handleClose,
    },
  };

  return <SelectSearch {...data} />;
  /*
  return (
    <CustomDialog
      maxWidth="md"
      dialogTitle="Search & Select : Duty Manager"
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
                    Employee Id
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
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
          <Grid container style={{ marginTop: "10px" }}>
            <Grid item xs="12" className={classes.maincontainer}>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "30px" }}
              >
                <Box marginLeft="10px">
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                    Employee Name
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "12px" }}>
                  <CustomTextField
                    type="text"
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
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs="2">
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
              Employee Number{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="2">
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
              Staff Name{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="3">
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
              Department{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="3">
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
        <Grid item xs="2">
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
              Location{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {staffdup?.length > 0 &&
          staffdup?.map((item, index) => {
            return (
              <Grid
                container
                alignItems="center"
                onClick={() => handleChangeDutyManager(index, item)}
                style={{
                  background: state1 === index ? "lightblue" : "white",
                }}
                className={classes.bordermanage}
              >
                <Grid item xs="2">
                  <Box>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {item.employeeNumber}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="2">
                  <Box>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {item.staffName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="3">
                  <Box>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {item.department}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="3">
                  <Box>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {item.jobTitle}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="2">
                  <Box>
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "clip",
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {item.workLocation}
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
            onClick={handleClose}
            variant="contained"
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

export default DutyManagerModal;

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
