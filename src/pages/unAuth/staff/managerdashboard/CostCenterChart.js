import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GetCostCenter, GetPersonView } from "../../../../services/api";
import EmployeeModal from "./EmployeeModal";
import { Link } from "react-router-dom";
import ViewDetailModal from "./ViewDetailModal";

const CostCenterChart = (props) => {
  const {
    openChart,
    setOpenChart,
    startDate,
    endDate,
    selectMonth,
    status,
    setLoader,
  } = props;
  const [costCenterChart2, setcostCenterChart2] = useState([]);
  const [message, setMessage] = useState();
  const [snackbarFlag, setsnackbarFlag] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [personId, setPersonId] = useState();
  const [barData, setBarData] = useState();
  const openDetailModal = (item) => {
    setOpenViewDetail(true);
    setBarData(item);
  };
  const {
    data: getCostCenter,
    error: geterror,
    isLoading: getloading,
    refetch: getAllCostRefetch,
  } = useQuery(
    ["getCostCenter", refetchKey],
    () =>
      status == 1
        ? GetCostCenter({ startDate: startDate, endDate: endDate })
        : GetPersonView({ startDate: startDate, endDate: endDate }),
    {
      enabled: true,
      retry: false,
    }
  );
  useEffect(() => {
    setLoader(getloading);
  }, [getloading]);

  const getTwoPrevMonth = (str) => {
    const date = new Date(str + "-01"); // convert string to Date object
    date.setMonth(date.getMonth() - 1); // set to one month before
    const previousMonth1 = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    }); // format first previous month
    date.setMonth(date.getMonth() - 1); // set to two months before
    const previousMonth2 = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    }); // format second previous month
    return [previousMonth1, previousMonth2]; // return array of two previous months
  };
  console.log(costCenterChart2);

  useEffect(() => {
    if (getCostCenter) {
      console.log(getCostCenter);
      if (getCostCenter.length == 0) {
        setsnackbarFlag(true);
        const msg = "No Data found for this Month";
        setMessage(msg);
      }
      if (status == 1) {
        let [str1, str2] = getTwoPrevMonth(selectMonth);
        const array1 = getCostCenter?.data?.data[0];
        const array2 = getCostCenter?.data?.data[1];
        const array3 = getCostCenter?.data?.data[2];

        for (let i = 0; i < array1?.length; i++) {
          array1[i].chartData = [];
          array1[i].chartData.push({
            name: selectMonth,
            Scheduled: array1[i]?.schHrs,
            Actual: array1[i]?.actHrs,
          });
        }

        for (let i = 0; i < array2?.length; i++) {
          const obj2 = array2[i];
          for (let j = 0; j < array1?.length; j++) {
            const obj1 = array1[j];
            if (obj1?.costCenterName === obj2?.costCenterName) {
              if (!obj1?.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str1,
                Scheduled: obj2?.schHrs,
                Actual: obj2?.actHrs,
              };
              obj1?.chartData.push(dta);
            }
          }
        }
        for (let i = 0; i < array3?.length; i++) {
          const obj2 = array3[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.costCenterName === obj2.costCenterName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str2,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }
        console.log(array1);
        setcostCenterChart2(
          array1?.map((option) => {
            return {
              costCenterName: option?.costCenterName,
              ccId: option?.ccId,
              schHrs: option?.schHrs,
              actHrs: option?.actHrs,
              schPerson: option?.schPerson,
              leaveHrs: option?.leaveHrs,
              holidayHrs: option?.holidayHrs,
              offcHrs: option?.offcHrs,
              persHrs: option?.persHrs,
              regHrs: option?.regHrs,
              overtimeHrs: option?.overtimeHrs,
              unpaidHrs: option?.unpaidHrs,
              chartData: option?.chartData,
            };
          })
        );
      }
      if (status == 2) {
        let [str1, str2] = getTwoPrevMonth(selectMonth);
        const array1 = getCostCenter?.data?.data[0];
        const array2 = getCostCenter?.data?.data[1];
        const array3 = getCostCenter?.data?.data[2];

        for (let i = 0; i < array1?.length; i++) {
          array1[i].chartData = [];
          array1[i].chartData.push({
            name: selectMonth,
            Scheduled: array1[i].schHrs,
            Actual: array1[i].actHrs,
          });
        }

        for (let i = 0; i < array2.length; i++) {
          const obj2 = array2[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.fullName === obj2.fullName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str1,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }
        for (let i = 0; i < array3.length; i++) {
          const obj2 = array3[i];
          for (let j = 0; j < array1.length; j++) {
            const obj1 = array1[j];
            if (obj1.fullName === obj2.fullName) {
              if (!obj1.chartData) {
                obj1.chartData = [];
              }

              let dta = {
                name: str2,
                Scheduled: obj2.schHrs,
                Actual: obj2.actHrs,
              };
              obj1.chartData.push(dta);
            }
          }
        }
        console.log(array1);
        setcostCenterChart2(
          array1?.map((option) => {
            return {
              costCenterName: option.employeeNumber + " - " + option.fullName,
              employeeNumber: option.employeeNumber,
              employeeName: option?.fullName,
              empPersonId: option.empPersonId,
              schHrs: option?.schHrs,
              actHrs: option?.actHrs,
              schPerson: option?.schPerson,
              leaveHrs: option?.leaveHrs,
              holidayHrs: option?.holidayHrs,
              offcHrs: option?.offcHrs,
              persHrs: option?.persHrs,
              regHrs: option?.regHrs,
              overtimeHrs: option?.overtimeHrs,
              unpaidHrs: option?.unpaidHrs,
              chartData: option?.chartData,
            };
          })
        );
      }
      console.log(costCenterChart2);
    }
  }, [getCostCenter]);

  useEffect(() => {
    setRefetchKey((prevKey) => prevKey + 1);
    getAllCostRefetch();
  }, [openChart]);

  useEffect(() => {
    setRefetchKey((prevKey) => prevKey + 1);
    getAllCostRefetch();
  }, [status]);

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };
  console.log(costCenterChart2[0]?.chartData, "costCenterChart2.length");

  var tooltip;
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    console.log(payload, "payload");
    for (const bar of payload)
      if (bar.dataKey === tooltip)
        return (
          <div style={{ background: "#fff" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
            >
              Series{" "}
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {bar.name}{" "}
              </span>
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
            >
              Value{" "}
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
               {bar.value}
              </span>
            </Typography>
          </div>
        );
    return null;
  };

  return (
    <>
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs="12">
          {costCenterChart2 != 0 ? (
            costCenterChart2?.map((item) => {
              return (
                <>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      border: "1px solid black",
                      margin: "5px",
                    }}
                  >
                    <Box style={{ marginLeft: "5px", width: "250px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          fontFamily: "Inter",
                          color: "#788DC9",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (status === 2) {
                            setEmployeeOpen(true);
                            setPersonId(item?.empPersonId);
                          } else {
                            setEmployeeOpen(false);
                          }
                        }}
                      >
                        {item.costCenterName}
                      </Typography>
                    </Box>
                    <Box style={{ marginTop: "10px" }}>
                      <ResponsiveContainer width={600} height={300}>
                        <BarChart
                          data={item.chartData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            tickCount={7}
                            tickFormatter={formatYAxisTick}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend layout="horizontal" verticalAlign="top" />
                          <Bar
                            dataKey="Scheduled"
                            stroke="#2B76A5"
                            fill="#2B76A5"
                            // background={{ stroke: "8884d8", fill: "#8884d8" }}
                            w
                            barSize={30}
                            isAnimationActive={true}
                            onMouseOver={() => (tooltip = "Scheduled")}
                          />
                          <Bar
                            dataKey="Actual"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            barSize={30}
                            // background={{ stroke: "#82ca9d", fill: "#82ca9d" }}
                            isAnimationActive={true}
                            onMouseOver={() => (tooltip = "Actual")}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                      {status == 2 && (
                        <Link
                          style={{
                            fontSize: "16px",
                            fontWeight: "bolder",
                            fontFamily: "Inter",
                            color: "#788DC9",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                          onClick={() => openDetailModal(item)}
                        >
                          View Details
                        </Link>
                      )}
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          fontFamily: "Inter",
                          color: "#788DC9",
                        }}
                      >
                        Balances
                      </Typography>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Sch. Hrs
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Act. Hrs
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Sch. Person
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Leave Hrs
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Holiday Hrs
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Offc. Hrs
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              color: "#788DC9",
                            }}
                          >
                            Pers. Hrs
                          </Typography>
                        </Box>

                        {/* {item.Balances?.map((option) => {
                        return (
                          <> */}
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "10px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.schHrs}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.actHrs}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.schPerson}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.leaveHrs}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.holidayHrs}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.offcHrs}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                          >
                            {item.persHrs}
                          </Typography>
                        </Box>
                        {/* </>
                        );
                      })} */}
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })
          ) : (
            <Typography>No Data to Display</Typography>
          )}
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
      {employeeOpen && (
        <EmployeeModal setEmployeeOpen={setEmployeeOpen} personId={personId} />
      )}
      {openViewDetail && (
        <ViewDetailModal
          toggleHandler={setOpenViewDetail}
          item={barData}
          selectMonth={selectMonth}
          CustomTooltip={CustomTooltip}
          tooltip={tooltip}
        />
      )}
    </>
  );
};

export default CostCenterChart;
