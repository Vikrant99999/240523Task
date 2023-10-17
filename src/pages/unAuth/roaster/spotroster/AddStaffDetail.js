import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { CustomDialog } from "../../../../components/CustomDialog";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { CustomTextField } from "../../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../../components/Button";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import AddIcon from "@mui/icons-material/Add";
import { CheckBox } from "@mui/icons-material";
import { Stack } from "@mui/material";
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

const AddStaffDetail = (props) => {
  const { toggleHandler, update, staffData, update1, val, setVal } = props;
  console.log("props.", staffData, val);
  const classes = useStyles();
  const [empname, setEmpname] = useState("");
  const [job, setJob] = useState("");
  const [dep, setDep] = useState("");
  const [loc, setLoc] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [staffdup, setStaff] = useState(staffData);

  const handleClose = () => {
    toggleHandler(false);
  };

  useEffect(() => {
    setStaff(staffData);
    setEmpname("");
    setJob("");
    setDep("");
    setLoc("");
  }, []);

  const getChecked = (item) => {
    for (let i in checkedList) {
      if (checkedList[i]?.personId === item?.personId) {
        return true;
      }
    }
    return false;
  };

  const handleCheck = (isChecked, index) => {
    if (isChecked) setCheckedList((prev) => [...prev, staffdup[index]]);
    else {
      setCheckedList((prev) =>
        prev.filter((item) => item?.personId !== staffdup[index]?.personId)
      );
    }
  };

  const searchStaff = () => {
    var keysArr = [
      { value: empname, key: "staffName" },
      { value: job, key: "jobTitle" },
      { value: dep, key: "department" },
      { value: loc, key: "workLocation" },
    ];
    setStaff(filterArr(staffData, keysArr));
  };

  const resetStaff = () => {
    setStaff(staffData);
    setEmpname("");
    setDep("");
    setJob("");
    setLoc("");
  };

  const empChange = (e) => {
    setEmpname(e.target.value);
  };
  const depChange = (e) => {
    setDep(e.target.value);
  };
  const jobChange = (e) => {
    setJob(e.target.value);
  };
  const locChange = (e) => {
    setLoc(e.target.value);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onChangeCheckAll = (isChecked, i) => {
    if (isChecked) {
      setCheckedList((prev) => {
        let notChecked = staffdup.filter((item) => !getChecked(item));
        return [...prev, ...notChecked];
      });
    } else {
      setCheckedList([]);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      searchStaff();
    }
  };
  return (
    <CustomDialog
      maxWidth="lg"
      dialogTitle="Add Staff(s)"
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
          <Stack
            flexDirection={"row"}
            columnGap={2}
            style={{ marginTop: "10px" }}
          >
            <Stack flexDirection="column" spacing={1}>
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
                    Employee Name
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    value={empname}
                    onChange={empChange}
                    onKeyDown={onKeyDown}
                    type="text"
                  />
                </Box>
              </Box>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "54px" }}
              >
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                    Department
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    value={dep}
                    onKeyDown={onKeyDown}
                    onChange={depChange}
                    type="text"
                  />
                </Box>
              </Box>
            </Stack>
            <Stack flexDirection="column" spacing={1}>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "91px" }}
              >
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                    Job
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    value={job}
                    onKeyDown={onKeyDown}
                    onChange={jobChange}
                    type="text"
                  />
                </Box>
              </Box>
              <Box
                className={classes.maincontentBox}
                style={{ marginLeft: "63px" }}
              >
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: "bolder",
                    }}
                  >
                    Location
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "10px" }}>
                  <CustomTextField
                    value={loc}
                    onKeyDown={onKeyDown}
                    onChange={locChange}
                    type="text"
                  />
                </Box>
              </Box>
            </Stack>
          </Stack>
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
        <Grid item xs="1">
          <CustomCheckBox
            // isChecked={checkAllSelect()}
            onChangeCheck={onChangeCheckAll}
          />
        </Grid>
        <Grid item xs="3">
          <Box fontWeight="bold">
            <Typography fontSize="14px">Employee </Typography>
          </Box>
        </Grid>
        <Grid item xs="3">
          <Typography
            style={{
              fontSize: "17px",
              position: "relative",
              right: "3.6em ",
              color: "black",
            }}
          >
            Department
          </Typography>
        </Grid>
        <Grid item xs="2">
          <Typography
            style={{
              fontSize: "17px",
              position: "relative",
              right: "2.8em",
              color: "black",
            }}
          >
            Job
          </Typography>
        </Grid>
        <Grid item xs="3">
          <Typography
            style={{
              fontSize: "17px",
              position: "relative",
              left: "0.8em",
              color: "black",
            }}
          >
            Location
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="data-table">
        {staffdup?.length > 0 &&
          staffdup?.map((item, index) => {
            return (
              <Grid
                container
                alignItems="center"
                className={classes.bordermanage}
              >
                {/* {console.log('item.checked', typeof (item.checked))} */}
                <Grid item xs="1">
                  <CustomCheckBox
                    check={getChecked(item)}
                    onChangeCheck={handleCheck}
                    currentIndex={index}
                  />
                </Grid>
                <Grid item xs="2.2">
                  <Box>
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      {item?.staffName} [{item?.employeeNumber}]
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="3">
                  <Box>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "22ch",
                      }}
                    >
                      {item?.department}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="2.8">
                  <Box>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        position: "relative",
                        left: "1em",
                      }}
                    >
                      {item?.jobTitle}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs="3">
                  <Box>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "19ch",
                        position: "relative",
                        left: "1.1em",
                      }}
                    >
                      {item?.workLocation}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        {staffdup && staffdup.length === 0 && (
          <Grid
            container
            alignItems="center"
            className={classes.bordermanage}
            //  {...rowContainerProps}
          >
            <Grid
              item
              // {...rowCellProps}
            >
              <Box>
                <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
                  No data to display.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid container justifyContent="flex-end">
        <Box py={2}>
          <CustomButton
            btnText="Add Staff(s)"
            variant="contained"
            startIcon={<AddIcon style={{ color: "#5BB75B" }} />}
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
            onClick={() => update(checkedList)}
          />
        </Box>
      </Grid>
    </CustomDialog>
  );
};

export default AddStaffDetail;

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
  dialog: {
    overflowY: "visible",
  },
}));
