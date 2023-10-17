import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomButton } from "../../../../components/Button";
import { MainPage } from "../../../layout/MainPage";
import CostCenterChart from "./CostCenterChart";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { CustomTextField } from "../../../../components/TextField/index";
import { Autocomplete } from "@mui/material";
import ProgressLoader from "../../rosterSettings/Loader";
import { Department, selectMonthMock } from "./utils";
import { GetMonth } from "../../../../services/api";
import moment from "moment/moment";

const ManagerDashboard = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState(1);
  const [DepartmentData, setDepartmentData] = useState([]);
  const [openChart, setOpenChart] = useState(false);
  const [textdata, setTextData] = useState("");
  const [selectMonth, setSelectMonth] = useState();
  const [monthData, setMonthData] = useState();
  console.log(monthData, "monthData");
  const [message, setMessage] = useState();
  const [snackbarFlag, setsnackbarFlag] = useState(false);
  const [state, setState] = useState(-1);
  const [costCenterText, setCostCenterText] = useState();
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [isLoad, setLoader] = useState(false);

  const onClickHandler = () => {
    if (selectMonth == undefined) {
      setsnackbarFlag(true);
      const msg = "Please fill select month  value";
      setMessage(msg);
    }
    if (costCenterText != costCenterText?.department) {
      setsnackbarFlag(true);
      const msg = "Please Enter Valid Input";
      setMessage(msg);
    } else {
      // if (
      //   selectMonth == "March 2022" ||
      //   selectMonth == "April 2022" ||
      //   selectMonth == "May 2022" ||
      //   selectMonth == "Feb 2022"
      // ) {
      setOpenChart(!openChart);
    }
    // } else {
    //   setTextData("No data to display");
    // }
  };
  const handleInputChange = (inputDate) => {
    setSelectMonth(inputDate);
    console.log(moment(inputDate).format("MM"), "inputDate");
    const month = moment(inputDate).format("MMM").substring(0, 3); // extract the month abbreviation
    const year = inputDate.substring(4);
    const monthNum = new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1; // get the month number
    const startDate = `01-${month}-${year}`; // set the start date to the 1st of the month
    const endDate = new Date(year, monthNum, 0).getDate(); // get the last day of the month
    const endDateStr = `${endDate
      .toString()
      .padStart(2, "0")}-${month}-${year}`;
    setEndMonth(endDateStr);
    console.log(startDate, "startDate");
    setStartMonth(startDate);
  };

  const handleChangecostCenter = (index, item) => {
    setState(index);
    setCostCenterText(item);
  };
  useEffect(() => {
    console.log(isLoad);
  }, [isLoad]);

  useEffect(() => {
    const data = Department.map((item) => item);
    setDepartmentData(data);
  }, []);

  const { data: getAllMonthData, refetch: getAllProjectRefetch } = useQuery(
    ["getAllMonthData"],
    () => GetMonth(),
    {
      enabled: true,
      retry: false,
    }
  );
  console.log(getAllMonthData?.data?.data, "hello");
  useEffect(() => {
    if (getAllMonthData) {
      setMonthData(getAllMonthData?.data?.data);
    }
  }, [getAllMonthData]);
  console.log(monthData, "monthData");

  const btnClick = (e) => {
    setStatus(e);
  };
  return (
    <MainPage pageName={props.title}>
      <Box className={classes.btnBox}>
        <CustomButton
          btnText="Cost Center View"
          variant="contained"
          btnClass={
            status == 1
              ? {
                  backgroundColor: "#124590",
                  color: "#fff",
                  fontWeight: "bold",
                }
              : {
                  backgroundColor: "#dedede",
                  color: "black",
                  fontWeight: "bold",
                }
          }
          onClick={() => btnClick(1)}
        />
        <CustomButton
          btnText="Person View"
          variant="contained"
          onClick={() => btnClick(2)}
          btnClass={
            status == 2
              ? {
                  backgroundColor: "#124590",
                  color: "#fff",
                  fontWeight: "bold",
                }
              : {
                  backgroundColor: "#dedede",
                  color: "black",
                  fontWeight: "bold",
                }
          }
        />
      </Box>
      <Box>
        <>
          <Grid container style={{ marginLeft: "20px" }}>
            <Grid item xs="5" style={{ display: "flex", alignItems: "center" }}>
              <Grid className={classes.contentBox}>
                <Box>
                  <Typography className={classes.typo1}>
                    *Select Month
                  </Typography>
                </Box>
                <Box style={{ marginLeft: "8px" }}>
                  <Autocomplete
                    required
                    disableClearable
                    className={classes.filterData}
                    value={selectMonth}
                    options={
                      monthData?.length > 0
                        ? monthData?.map((item) => item?.payPeriodName)
                        : []
                    }
                    // options={
                    //   selectMonthMock.length > 0 &&
                    //   selectMonthMock.map((item) => item.label)
                    // }
                    onInputChange={(e) => setSelectMonth(e.target.value)}
                    onChange={(event, value) => handleInputChange(value)}
                    renderInput={(params) => (
                      <CustomTextField {...params} style={{ width: 150 }} />
                    )}
                  />
                </Box>
              </Grid>
              {/* <Grid className={classes.contentBox} style={{ marginTop: "10px" }}>
            <Box>
              <Typography className={classes.typo1}>Cost Center</Typography>
            </Box>
            <Box style={{ marginLeft: "25px" }}>
              <CustomTextField
                required
                value={costCenterText?.department}
                onChange={(e) => setCostCenterText(e.target.value)}
                endIcon={
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenModal(true)}
                  />
                }
              />
            </Box>
          </Grid> */}
              <Box>
                <CustomButton
                  btnText="Go"
                  variant="contained"
                  btnClass={{
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginRight: "20px",
                  }}
                  onClick={onClickHandler}
                />
              </Box>
              <ProgressLoader isLoading={isLoad} />
            </Grid>
          </Grid>
          {snackbarFlag && (
            <CustomSnackbar
              msz={message}
              type="error"
              snackbarFlag={snackbarFlag}
              setsnackbarFlag={setsnackbarFlag}
            />
          )}
        </>
      </Box>
      {openChart ? (
        <Box>
          <CostCenterChart
            openChart={openChart}
            setOpenChart={setOpenChart}
            startDate={startMonth}
            endDate={endMonth}
            selectMonth={selectMonth}
            status={status}
            setLoader={setLoader}
          />
        </Box>
      ) : (
        <Box>
          <Typography></Typography>
        </Box>
      )}
      {/* {openChart ? (
        <Box>
          <CostCenterChart
            openChart={openChart}
            setOpenChart={setOpenChart}
            startDate={startMonth}
            endDate={endMonth}
            selectMonth={selectMonth}
            status={status}
          />
        </Box>
      ) : (
        <Box>
          <Typography>{textdata}</Typography>
        </Box>
      )} */}
    </MainPage>
  );
};

export default ManagerDashboard;

const useStyles = makeStyles((theme) => ({
  mainBox: {
    border: "1px solid #EDEDED",
    margin: "10px",
  },

  headerBox: {
    margin: "10px",
  },

  btnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "10px",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  typo1: {
    fontFamily: "Inter",
    fontSize: "14px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: "bold",
  },
  filterData: {
    width: "170px !important",
  },
}));
