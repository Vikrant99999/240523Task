import { Box, Button, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Done, Edit, FileCopy } from "@material-ui/icons";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DataGrid } from "@mui/x-data-grid";
import { CustomTextField } from "../../../../components/TextField";
import { MainPage } from "../../../layout/MainPage";
import { DatewidgetPayroll } from "./DatewidgetPayroll";
import { payrollAudit } from "../../../../services/api";
import { submitPayrollAudit, needCorrection } from "../../../../services/api";
import { useSelector } from "react-redux";
import moment from "moment";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import ViewPopUp from "./ViewPopUp";
import HistoryPopUp from "./HistoryPopUp";
import ApprovePopUp from "./ApprovePopUp";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { HourCell, LabelCell } from "../productivity_dashboard/HourCell";

export default function IndexPR(props) {
  const classes = useStyles2();
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [payrollData, setPayrollData] = useState({});
  const [rowData, setRowData] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [currentPaycode, setCurrentPaycode] = useState("All PayCode");
  const [viewOpen, setViewOpen] = useState(false);
  const [viewIndex, setViewIndex] = useState(-1);
  const [historyPopup, setHistoryPopup] = useState(false);
  const [approvePopUp, setApprovePopUp] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [auditData, setAuditData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("pendingToSubmit");
  const [person, setPerson] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const [allChecked, setAllChecked] = useState(false);
  const [oriPagedata, setOriPageData] = useState({
    pendingToSubmit: 0,
    underAudit: 0,
    needCorrection: 0,
    readyForPayroll: 0,
    transferred: 0,
    regHrs: 0,
    totalPerson: 0,
    overtime150: 0,
  });
  const [hours, setHours] = useState({});
  const [query, setQuery] = useState("");
  const [dupdata, setDupdata] = React.useState([]);
  const [errorProps, setErrorProps] = useState({});
  const [subButton, setSubButton] = useState("");

  const map = {
    pendingToSubmit: "Draft",
    underAudit: "Submitted",
    needCorrection: "needCorrection",
    readyForPayroll: "Approved",
    transferred: "Transferred",
    totalPerson: "All",
  };

  const allCheckHandler = () => {
    if (allChecked) {
      let arr = new Array(dupdata.length).fill(false);
      setAuditData(arr);
    } else {
      let arr = new Array(dupdata.length).fill(true);
      setAuditData(arr);
    }
    setAllChecked((prev) => !prev);
  };

  useEffect(() => {
    let count = 0;
    auditData.forEach((item, index) => {
      if (!item) {
        setAllChecked(false);
        return;
      }
      count++;
    });
    if (count !== 0 && count === auditData.length) {
      setAllChecked(true);
    }
  }, [auditData]);

  useEffect(() => {
    let oriPagedata = {
      pendingToSubmit:
        payrollData?.data?.dashboardDataDTO?.pendingToSubmit || 0,
      needCorrection: payrollData?.data?.dashboardDataDTO?.needCorrection || 0,
      readyForPayroll:
        payrollData?.data?.dashboardDataDTO?.readyForPayroll || 0,
      transferred: payrollData?.data?.dashboardDataDTO?.transferred || 0,
      underAudit: payrollData?.data?.dashboardDataDTO?.underAudit || 0,
      totalPerson: payrollData?.data?.dashboardDataDTO?.totalPerson || 0,
    };
    setOriPageData((prev) => ({ ...prev, ...oriPagedata }));
  }, [payrollData]);

  const dateConverter = (date) => {
    return moment(date, "DD-MM-YYYY").format("DD-MMM-YYYY");
  };

  const commonReducer = useSelector((state) => state.commonReducer);

  const onSuccess = (data, context, variables) => {
    console.log(data);
    setPayrollData(data.data);
    setRowData(data.data.data.dashboardDataDTO.plistDataDTOS);
    setHours(data.data.data.dashboardDataDTO.hours);
    if (data.data.data.dashboardDataDTO.totalPerson == null) {
      setPerson(0);
    } else {
      setPerson(data.data.data.dashboardDataDTO.totalPerson);
    }
    setDupdata(data.data.data.dashboardDataDTO.plistDataDTOS);
    var arr = new Array(
      data.data.data.dashboardDataDTO.plistDataDTOS.length
    ).fill(allChecked);
    setAuditData(arr);
  };
  const onError = (data, context, variables) => {};

  const { mutate: dataMutate, isLoading: isLoadData } = useMutation(
    payrollAudit,
    {
      onSuccess: (data, context, variables) =>
        onSuccess(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );
  useEffect(() => {
    if (isLoadData) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [isLoadData]);
  const { mutate: dataMutate2, isLoading: isLoadData2 } = useMutation(
    needCorrection,
    {
      onSuccess: (data, context, variables) =>
        onSuccess2(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );
  useEffect(() => {
    if (isLoadData2) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [isLoadData2]);
  const onSuccess2 = (data, context, variables) => {
    setRowData(data.data.data.ApprovalListData);
    setDupdata(data.data.data.ApprovalListData);
    var arr = new Array(data.data.data.ApprovalListData.length).fill(
      allChecked
    );
    setAuditData(arr);
  };
  const changeWork = (e) => {
    setQuery(e.target.value);
  };
  const filterQuery = (item) => {
    if (query != "") {
      if (
        item?.fullName.toString().toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  console.log("RowData", rowData);
  const searchFilter = () => {
    var dumm = rowData?.filter(filterQuery);
    setDupdata(dumm);
    // if (dumm.length == 0) {
    //   ({
    //     snackbarFlag: true,
    //     msz: "No Detail found with specified filter!",
    //     type: "error",
    //   });
    // }
    setClicked(-1);
  };
  const resetFilter = () => {
    setDupdata(rowData);
    setQuery("");
    setClicked(-1);
  };
  // console.log("RD", dupdata);
  useEffect(() => {
    if (selectedFilter != "needCorrection") {
      console.log(dateConverter(commonReducer.startDate));
      dataMutate({
        userId: 300000003286180,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
        payCode: currentPaycode,
        status: map[selectedFilter],
      });
    } else {
      dataMutate2({
        userId: 300000003286180,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
        payCode: currentPaycode,
      });
    }
  }, [
    commonReducer.endDate,
    commonReducer.startDate,
    commonReducer.userId,
    dataMutate,
    currentPaycode,
    selectedFilter,
  ]);
  const { mutate: CreateAuditData } = useMutation(submitPayrollAudit, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    console.log(data);
  };
  const [submitData, setSubmitData] = useState([]);

  const SubmitAuditData = (e) => {
    setSubButton(e);
    setApprovePopUp(true);
    var arr = [];
    for (var i = 0; i < auditData.length; i++) {
      if (auditData[i]) {
        arr.push(rowData[i].payrollAuditId);
      }
    }
    setSubmitData(arr);
  };
  const handleFilterClick = (type) => {
    if (type == "needCorrection") {
      dataMutate2({
        userId: 300000003286180,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
        payCode: currentPaycode,
      });
    } else {
      dataMutate({
        userId: 300000003286180,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
        payCode: currentPaycode,
        status: map[type],
      });
    }
  };
  const MatEdit = ({ index }) => {
    const handleEditClick = (e) => {
      // setStatus(e);
      // console.log(status);
    };
    const handlecopyClick = () => {
      // some action
    };
    const handlesearchClick = () => {
      // some action
    };

    return (
      <>
        <Button
          color="secondary"
          aria-label="add an alarm"
          // onClick={() => handleEditClick(1)}
        >
          <Edit style={{ color: blue[500] }} />
        </Button>
      </>
    );
  };

  const columns = [
    { field: "fullName", headerName: "Employee", width: 200 },
    {
      field: "departmentName",
      headerName: "Department",
      width: 200,
    },
    {
      field: "locationName",
      headerName: "Location",
      width: 180,
    },
    {
      field: "legalEntity",
      headerName: "Legal Entity",
      width: 180,
    },
    {
      field: "businessUnitName",
      headerName: "Business Unit",
      width: 120,
    },
    // {
    //   field: "regHRS",
    //   headerName: "Regular Hrs",
    //   width: "25%",
    // },
    // {
    //   field: "overtime 150",
    //   headerName: "Overtime 150",
    //   width: "30%",
    // },
    // {
    //   field: "regular hrs(new hrs)",
    //   headerName: "Regular Hrs (New Hrs)",
    //   width: "25%",
    // },
    // {
    //   field: "overtime 150(new hrs) ",
    //   headerName: "Overtime 150 (New Hrs)",
    //   width: "30%",
    // },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "shiftType",
      headerName: "Shift Type",
      width: 90,
    },
    {
      field: "band",
      headerName: "Band",
      width: 80,
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 45,
      disableClickEventBubbling: false,
      RenderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit index={params.row.id} />
          </div>
        );
      },
    },
    {
      field: "history",
      headerName: "History",
      width: 60,
    },
  ];

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <Grid
        style={{
          background: "white !important",
        }}
      >
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <DatewidgetPayroll
            paycode={currentPaycode}
            setPaycode={setCurrentPaycode}
          />
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs="12" className={classes.Wrap}>
          <Box
            px={3.8}
            className={`${classes.totalpersonbox} ${
              selectedFilter === "pendingToSubmit" ? classes.active : ""
            }`}
          >
            <Typography className={classes.totalpersonboxtext1}>
              {oriPagedata?.pendingToSubmit}
            </Typography>
            <Typography
              className={classes.link}
              onClick={() => {
                handleFilterClick("pendingToSubmit");
                setSelectedFilter("pendingToSubmit");
              }}
            >
              Pending To Submit
            </Typography>
          </Box>
          <Box
            px={3.8}
            className={`${classes.totalpersonbox} ${
              selectedFilter === "underAudit" ? classes.active : ""
            }`}
          >
            <Typography className={classes.totalpersonboxtext2}>
              {oriPagedata?.underAudit}
            </Typography>
            <Typography
              style={{ marginLeft: "10px" }}
              className={classes.link}
              onClick={() => {
                setSelectedFilter("underAudit");
                handleFilterClick("underAudit");
              }}
            >
              Under Audit
            </Typography>
          </Box>
          <Box
            px={3.8}
            className={`${classes.totalpersonbox} ${
              selectedFilter === "needCorrection" ? classes.active : ""
            }`}
          >
            <Typography className={classes.totalpersonboxtext3}>
              {oriPagedata?.needCorrection}
            </Typography>
            <Typography
              className={classes.link}
              onClick={() => {
                handleFilterClick("needCorrection");
                setSelectedFilter("needCorrection");
              }}
            >
              Need Correction
            </Typography>
          </Box>
          {person > 0 && (
            <>
              <Box
                px={3.8}
                className={`${classes.totalpersonbox} ${
                  selectedFilter === "readyForPayroll" ? classes.active : ""
                }`}
              >
                <Typography className={classes.totalpersonboxtext3}>
                  {oriPagedata?.readyForPayroll}
                </Typography>
                <Typography
                  className={classes.link}
                  onClick={() => {
                    handleFilterClick("readyForPayroll");
                    setSelectedFilter("readyForPayroll");
                  }}
                >
                  Ready For Payroll
                </Typography>
              </Box>
              <Box
                px={3.8}
                className={`${classes.totalpersonbox} ${
                  selectedFilter === "transferred" ? classes.active : ""
                }`}
              >
                <Typography className={classes.totalpersonboxtext3}>
                  {oriPagedata?.transferred}
                </Typography>
                <Typography
                  className={classes.link}
                  onClick={() => {
                    handleFilterClick("transferred");
                    setSelectedFilter("transferred");
                  }}
                >
                  Transfered
                </Typography>
              </Box>
            </>
          )}
          {hours !== null &&
            Object.keys(hours).map((item, index) => {
              return (
                <Box px={3.2} className={classes.totalpersonbox}>
                  <Typography className={classes.totalpersonboxtext3}>
                    {Math.floor(hours[item] * 100) / 100}
                  </Typography>
                  <Typography>{item}</Typography>
                </Box>
              );
            })}

          <Box
            px={3.8}
            className={`${classes.totalpersonbox} ${
              selectedFilter === "totalPerson" ? classes.active : ""
            }`}
          >
            <Typography className={classes.totalpersonboxtext3}>
              {oriPagedata?.totalPerson}
            </Typography>
            <Typography
              className={classes.link}
              onClick={() => {
                handleFilterClick("totalPerson");
                setSelectedFilter("totalPerson");
              }}
            >
              Total Person
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          margin: "10px",
          padding: 8,
          fontSize: "10px !important",
        }}
      >
        <Box
          px={1}
          style={{
            alignContent: "center",
            marginTop: "6px",
            alignItems: "center",
          }}
        >
          {/* <CalendarMonthIcon style={{ fontWeight: "400" ,width:"20px",marginTop:"3px"}} /> */}
          <Button
            startIcon={<CalendarMonthIcon />}
            style={{
              fontWeight: "bold",
              color: "#6F6F6F",
              textTransform: "capitalize",
            }}
          >
            Copy Hours
          </Button>
        </Box>
        {(selectedFilter === "pendingToSubmit" ||
          selectedFilter === "needCorrection") &&
          rowData.length > 0 && (
            <Box
              px={1}
              style={{
                alignContent: "center",
                marginTop: "6px",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={
                  <Done
                    style={{
                      fontWeight: "600",
                      color: "green",
                      fontSize: "20px",
                    }}
                  />
                }
                style={{
                  fontWeight: "bold",
                  color: "#6F6F6F",
                  textTransform: "capitalize",
                }}
                onClick={() => SubmitAuditData("PendingToSubmit")}
              >
                Submit
              </Button>
            </Box>
          )}
        {selectedFilter === "underAudit" && rowData.length > 0 && (
          <>
            <Box
              px={1}
              style={{
                alignContent: "center",
                marginTop: "6px",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={
                  <Done
                    style={{
                      fontWeight: "600",
                      color: "green",
                      fontSize: "20px",
                    }}
                  />
                }
                style={{
                  fontWeight: "bold",
                  color: "#6F6F6F",
                  textTransform: "capitalize",
                }}
                onClick={() => SubmitAuditData("ReadyForPayroll")}
              >
                Ready For Payroll
              </Button>
            </Box>
            <Box
              px={1}
              style={{
                alignContent: "center",
                marginTop: "6px",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={
                  <Done
                    style={{
                      fontWeight: "600",
                      color: "green",
                      fontSize: "20px",
                    }}
                  />
                }
                style={{
                  fontWeight: "bold",
                  color: "#6F6F6F",
                  textTransform: "capitalize",
                }}
                onClick={() => SubmitAuditData("NeedCorrection")}
              >
                Request For Correction
              </Button>
            </Box>
          </>
        )}
        {selectedFilter === "readyForPayroll" && rowData.length > 0 && (
          <Box
            px={1}
            style={{
              alignContent: "center",
              marginTop: "6px",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={
                <Done
                  style={{
                    fontWeight: "600",
                    color: "green",
                    fontSize: "20px",
                  }}
                />
              }
              style={{
                fontWeight: "bold",
                color: "#6F6F6F",
                textTransform: "capitalize",
              }}
              onClick={() => SubmitAuditData("PendingToSubmit")}
            >
              Transfer To Payroll
            </Button>
          </Box>
        )}
        <Box
          px={1}
          style={{
            alignContent: "center",
            marginTop: "6px",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<FileCopy style={{ fontWeight: "600" }} />}
            style={{
              fontWeight: "bold",
              color: "#6F6F6F",
              textTransform: "capitalize",
            }}
          >
            Export
          </Button>
        </Box>
        <Box
          px={1}
          style={{
            alignContent: "center",
            marginTop: "6px",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<FileCopy style={{ fontWeight: "600" }} />}
            style={{
              fontWeight: "bold",
              color: "#6F6F6F",
              textTransform: "capitalize",
            }}
          >
            Date Wise Export
          </Button>
        </Box>
        <Box>
          <CustomTextField
            placeholder="Enter Text"
            style={{ margin: "3px" }}
            value={query}
            onChange={(e) => changeWork(e)}
          />
        </Box>
        <Box
          px={1}
          style={{
            alignContent: "center",
            marginTop: "6px",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={
              <FilterAltIcon style={{ fontWeight: "600", color: "#4487f2" }} />
            }
            style={{
              fontWeight: "bold",
              color: "#6F6F6F",
              textTransform: "capitalize",
            }}
            onClick={searchFilter}
          >
            Filter By Employee
          </Button>
        </Box>
        <Box
          px={1}
          style={{
            alignContent: "center",
            marginTop: "6px",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={
              <FilterAltOffIcon
                style={{ fontWeight: "600", color: "#4487f2" }}
              />
            }
            style={{
              fontWeight: "bold",
              color: "#6F6F6F",
              textTransform: "capitalize",
            }}
            onClick={resetFilter}
          >
            Clear Employee Filter
          </Button>
        </Box>
      </Grid>
      <Box className={classes.mainbox2}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration2}>
            <Box
              style={{
                width: 40,
                marginLeft: "8px",
                marginTop: 5,
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid rgb(194 187 187)",
              }}
            >
              <CustomCheckBox
                onChangeCheck={allCheckHandler}
                check={allChecked}
              />
            </Box>
            {columns.map((col) => (
              <LabelCell
                key={col.field}
                label={col.headerName}
                width={col.width}
              />
            ))}
          </Box>
          <Box style={{}}>
            {dupdata.length > 0 ? (
              dupdata.map((item, index) => {
                return (
                  <Box
                    key={item.payrollAuditId}
                    className={classes.pagedatamainbox}
                  >
                    <Box
                      style={{
                        width: 42,
                        marginLeft: "7px",
                        marginTop: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRight: "1px solid rgb(194 187 187)",
                      }}
                    >
                      <CustomCheckBox
                        onChangeCheck={() => {
                          let newData = [...auditData];
                          if (newData[index]) {
                            newData[index] = false;
                          } else {
                            newData[index] = true;
                          }
                          setAuditData(newData);
                        }}
                        check={auditData[index]}
                      />
                    </Box>
                    {columns.map((col) => {
                      if (col.field === "view") {
                        return (
                          <Box
                            style={{
                              width: col.width,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRight: "1px solid #b8b5b5",
                            }}
                          >
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setViewOpen(true);
                                setViewIndex(index);
                              }}
                            />
                          </Box>
                        );
                      }
                      if (col.field === "history") {
                        return (
                          <Box
                            style={{
                              width: col.width,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRight: "1px solid #b8b5b5",
                            }}
                          >
                            <HistoryIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setHistoryPopup(true);
                                setHistoryIndex(index);
                              }}
                            />
                          </Box>
                        );
                      }
                      return (
                        <HourCell hour={item[col.field]} width={col.width} />
                      );
                    })}
                  </Box>
                );
              })
            ) : (
              <Box style={{ padding: 10, backgroundColor: "white" }}>
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  No Data to display
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {viewOpen && (
        <ViewPopUp
          data={rowData[viewIndex]}
          open={viewOpen}
          handleClose={() => setViewOpen(false)}
          setErrorProps={setErrorProps}
        />
      )}
      {historyPopup && (
        <HistoryPopUp
          data={rowData[historyIndex]}
          open={historyPopup}
          handleClose={() => setHistoryPopup(false)}
        />
      )}
      {approvePopUp && (
        <ApprovePopUp
          open={approvePopUp}
          handleClose={() => setApprovePopUp(false)}
          submitData={submitData}
          subButton={subButton}
          setErrorProps={setErrorProps}
          setIsloading={setIsloading}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          handleFilterClick={handleFilterClick}
          setAllChecked={setAllChecked}
        />
      )}
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </MainPage>
  );
}

const useStyles2 = makeStyles((theme) => ({
  maincontainer1: {
    backgroundColor: "#f5f5f5",
  },
  paper: {
    margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
    width: "100%",
  },
  container: {
    padding: "20px",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  startdate: {
    display: "flex",
    alignItems: "center !important",
    marginTop: "10px !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  totalpersonbox: {
    borderRight: "2px solid #34d9fa",
    cursor: "pointer",
    margin: "20px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  Wrap: {
    display: "flex",
    marginTop: "10px !important",
    width: "100%",
    overflowX: "auto",
    // borderBottom: "1px solid rgb(233, 233, 233)",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
    },
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
    fontSize: "26px !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
    textAlign: "center",
    fontSize: "26px !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
    fontSize: "26px !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
    fontSize: "26px !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },
  tablebox: {
    marginTop: "10px",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
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
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    //margin: "5px",
    // maxHeight: "350px",
    minHeight: "fit-content",
    //backgroundColor: "#F1F1F1",
    width: "100%",
    whiteSpace: "nowrap",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "auto",
  },
  innerboxworkduration2: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#E9E9E9",
    // position: "fixed",
    //width: "100vw",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    //backgroundColor: "#fff",
    "&:hover": {
      //backgroundColor: "#ededed",
    },
    width: "100%",
    // height: "60px"
  },
  link: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  active: {
    backgroundColor: "bisque",
  },
}));
