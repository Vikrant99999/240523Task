import React, { useState, useEffect } from "react";
import { Header } from "../../layout/Header";
import { Typography, Box, Grid, Autocomplete, TextField } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../components/Button";
import { CustomTextField } from "../../../components/TextField";
import { CustomAutoComplete } from "../../../components/CustomAutoComplete";
import { styled } from "@mui/material/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
import DatePicker from "react-datepicker";
import DepatmentPopup from "../roaster/spotroster/DepatmentPopup";
import { Department } from "../../../services/api";

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
}));

const status = ["Submitted", "Approved", "Rejected"];

const Index = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState("panel1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statusList, setStatusList] = useState(status);
  const [value, setValue] = useState(statusList[0]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [department, setDepartment] = useState(false);
  const [depValue, setDepValue] = useState(-1);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { data: getAllDepartment } = useQuery(
    ["getDepartment"],
    () => Department(),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDepartment) {
      setDepartmentArr(getAllDepartment?.data?.data);
    }
  }, [getAllDepartment]);

  return (
    <>
      <Header />
      <Grid container style={{ margin: "10px" }}>
        <Grid item xs="12">
          <Box style={{ margin: "20px", display: "flex" }}>
            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "Inter",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Request Status Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="12">
          <Box style={{ margin: "10px" }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
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
                <Grid xs="6" container style={{ marginTop: "1%" }}>
                  <Grid
                    xs="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                  >
                    <Grid xs="3">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          fontWeight: "bold",
                        }}
                      >
                        <Box textAlign="right">*Start Date</Box>
                      </Typography>
                    </Grid>
                    <Grid xs="6" item style={{ marginLeft: "10px" }}>
                      <DatePicker
                        className="dateManage"
                        dateFormat="dd-MMM-yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    xs="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                  >
                    <Grid xs="3">
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          fontWeight: "bold",
                        }}
                      >
                        <Box textAlign="right">*End Date</Box>
                      </Typography>
                    </Grid>
                    <Grid xs="6" item style={{ marginLeft: "10px" }}>
                      <DatePicker
                        className="dateManage"
                        dateFormat="dd-MMM-yyyy"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs="3"
                  style={{
                    marginTop: "1%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                      }}
                    >
                      <Box textAlign="right">Employee</Box>
                    </Typography>
                  </Grid>
                  <Grid xs="6" item style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
                    />
                  </Grid>
                </Grid>
                <Grid
                  xs="3"
                  style={{
                    marginTop: "1%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                      }}
                    >
                      <Box textAlign="right">Department</Box>
                    </Typography>
                  </Grid>
                  <Grid xs="6" item style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      endIcon={
                        <SearchIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => setDepartment(true)}
                        />
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  xs="3"
                  style={{
                    marginTop: "1%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                      }}
                    >
                      <Box textAlign="right">Business Unit</Box>
                    </Typography>
                  </Grid>
                  <Grid xs="6" item style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
                    />
                  </Grid>
                </Grid>
                <Grid
                  xs="3"
                  style={{
                    marginTop: "1%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                      }}
                    >
                      <Box textAlign="right">Legal Entity</Box>
                    </Typography>
                  </Grid>
                  <Grid xs="6" item style={{ marginLeft: "10px" }}>
                    <CustomTextField
                      endIcon={<SearchIcon style={{ cursor: "pointer" }} />}
                    />
                  </Grid>
                </Grid>
                <Grid
                  xs="3"
                  style={{
                    marginTop: "1%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid xs="3">
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                      }}
                    >
                      <Box textAlign="right">Status</Box>
                    </Typography>
                  </Grid>
                  <Grid xs="6" item style={{ marginLeft: "10px" }}>
                    <Autocomplete
                      id="status-list"
                      disableClearable
                      options={statusList}
                      renderInput={(params) => (
                        <TextField {...params}></TextField>
                      )}
                      style={{ marginLeft: "10px" }}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.selectbutton}>
                  <Grid item padding={"2px"}>
                    <CustomButton
                      btnText="Search"
                      variant="contained"
                      btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                    />
                  </Grid>
                  <Grid item padding={"2px"}>
                    <CustomButton
                      btnText="Reset"
                      variant="contained"
                      btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Request Id
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Employee Number
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Employee
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Department
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Job Title
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Business Unit
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Legal Entity
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Request Type
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Start Date
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  End Date
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Start Time
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  End Time
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Request On
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Request By
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Status
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      {department && (
        <DepatmentPopup
          toggleHandler={setDepartment}
          departmentArr={departmentArr}
        />
      )}
    </>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    margin: "5px",
    maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    width: "100vw",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "fixed",
    overflow: "scroll",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  employee: {
    display: "flex",
    alignItems: "center",
    width: "15%",
  },
  common: {
    display: "flex",
    alignItems: "center",
    width: "10%",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    paddingRight: "10px",
  },
}));
