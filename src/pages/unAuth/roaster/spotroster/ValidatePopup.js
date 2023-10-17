import { Typography, Grid, Box } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@mui/icons-material/Search";

// import AssignTable from "./AssignTable";
import DoneIcon from "@mui/icons-material/Done";
// import {
//   GetSingleShift,
//   workDuration,
//   getallStaffData,
// } from "../../../../services/api";

import DatePicker from "react-datepicker";

import moment from "moment";

import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../../components/CustomDialog";

const ValidatePopup = (props) => {
  const {
    setStatus1,
    datw,
    setSnakeBarProps,
    demandTempId,
    editData,
    setErrorProps,
    citizenData,
    // title,
  } = props;
  const closeForm1 = () => {
    setStatus1(false);
  };
  const title = " Dummy";
  // const data=[["100422 - Carin Deleo",  "Operating Room Sec - 2483 ", "Clinical Nurse(729)",  "LifeLine Hospitals,North"],["100422 - Carin Deleo",  "Operating Room Sec - 2483 ", "Clinical Nurse(729)",  "LifeLine Hospitals,North"],["100422 - Carin Deleo",  "Operating Room Sec - 2483 ", "Clinical Nurse(729)",  "LifeLine Hospitals,North"],["100422 - Carin Deleo",  "Operating Room Sec - 2483 ", "Clinical Nurse(729)",  "LifeLine Hospitals,North"]]
  const data = [
    {
      id: 1,
      employee: "100422 - Carin Deleo",
      department: "Operating Room Sec - 2483 ",
      jobTitle: "Clinical Nurse(729)",
      location: "LifeLine Hospitals,North",
    },
    {
      id: 2,
      employee: "100422 - Carin Deleo",
      department: "Operating Room Sec - 2483 ",
      jobTitle: "Clinical Nurse(729)",
      location: "LifeLine Hospitals,North",
    },
    {
      id: 3,
      employee: "100422 - Carin Deleo",
      department: "Operating Room Sec - 2483 ",
      jobTitle: "Clinical Nurse(729)",
      location: "LifeLine Hospitals,North",
    },
  ];
  const row2 = [
    "12-Mar(Sun)",
    "13-Mar(Mon)",
    "14-Mar(Tue)",
    "15-Mar(Wed)",
    "16-Mar(Thu)",
    "17-Mar(Fri)",
    "18-Mar(Sat)",
  ];
  const nmRow = [
    {
      id: 1,
      sun: "3",
      mon: "1",
      tue: "4",
      wed: " ",
      thu: "1",
      fri: "5",
      sat: " ",
    },
    {
      id: 2,
      sun: "3",
      mon: "1",
      tue: "4",
      wed: " ",
      thu: "1",
      fri: "5",
      sat: " ",
    },
    {
      id: 3,
      sun: "3",
      mon: "1",
      tue: "4",
      wed: " ",
      thu: " ",
      fri: "5",
      sat: " ",
    },
  ];
  return (
    <>
      <CustomDialog
        maxWidth="lg"
        dialogTitle={"Roaster Details:" + title}
        open="true"
        handleClose={closeForm1}
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            border: "1px solid #E9E9E9",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #E9E9E9",
            }}
          >
            <Grid
              // item
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box style={{ padding: "2px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    width: "200px",
                  }}
                >
                  Employee
                </Typography>
              </Box>

              <Box style={{ padding: "2px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    width: "200px",
                  }}
                >
                  Department
                </Typography>
              </Box>

              <Box style={{ padding: "2px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    width: "200px",
                  }}
                >
                  Job Title
                </Typography>
              </Box>

              <Box style={{ padding: "2px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    width: "200px",
                  }}
                >
                  Work Location
                </Typography>
              </Box>
            </Grid>
            {data?.length > 0 &&
              data?.map((item) => {
                return (
                  <>
                    <Grid
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px",
                      }}
                    >
                      <Box
                        style={{
                          border: "1px solid #E9E9E9",
                          padding: "2px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            width: "200px",
                          }}
                        >
                          {item?.employee}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          border: "1px solid #E9E9E9",
                          padding: "2px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            width: "200px",
                          }}
                        >
                          {item?.department}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          border: "1px solid #E9E9E9",
                          padding: "2px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            width: "200px",
                          }}
                        >
                          {item?.jobTitle}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          border: "1px solid #E9E9E9",
                          padding: "2px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            width: "200px",
                          }}
                        >
                          {item?.location}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                );
              })}
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {row2.map((item) => {
                return (
                  <Box
                    style={{
                      border: "1px solid #E9E9E9",
                      padding: "2px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        width: "90px",
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Grid>
            <Grid>
              {nmRow?.length > 0 &&
                nmRow?.map((item) => {
                  return (
                    <>
                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          margin: "0px",
                        }}
                      >
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.sun}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.mon}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.tue}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.wed}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.thu}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.fri}
                          </Typography>
                        </Box>
                        <Box
                          style={{
                            border: "1px solid #E9E9E9",
                            padding: "2px",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              width: "90px",
                            }}
                          >
                            {item?.sat}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
};
export default ValidatePopup;
