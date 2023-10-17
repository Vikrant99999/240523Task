import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmployeeDetailModal } from "./EmployeeDetailModal";

import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { makeStyles } from "@material-ui/styles";
import "react-datepicker/dist/react-datepicker.css";
import {
  dashboardList,
  getAllExpenditure,
  getAllProject,
  getAllTask,
  submitPersonTimesheet,
} from "../../../../services/api";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import { updateState } from "../../../../redux/commonSlice";
import { dateConverter } from "../../../../utils/commonService";
import { CustomButton } from "../../../../components/Button";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { CustomBox } from "../../../../components/CustomBox";
import { sortPaycodes } from "../../../../utils/commonService";

import moment from "moment";

export const EmployeeTable = (props) => {
  const {
    setPagedata,
    pagedata,
    appStatus,
    setOriPagedata,
    handleLoading,
    headerArr,
    setHeaderArr,
    isLoading,
  } = props;
  const classes = useStyles();
  const [project2, setProject2] = useState(false);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);
  const [hoveredItemId, setHoveredItemId] = useState();
  const [selectedItem, setItem] = useState();
  const isFilterEmptied = appStatus === "" ? true : false;

  const { mutate: dashboardListMutate } = useMutation(dashboardList, {
    onSuccess: (data, context, variables) =>
      onSuccessProjectList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProjectList(data, context, variables),
  });

  const onSuccessProjectList = (data) => {
    const id = commonReducer?.employeeId;
    var loggedUser = [];
    var dashboardData = [];
    data.data.data.dashboardData.map((option) => {
      if (option.personId === id) {
        loggedUser.push({
          ...option,
          checked: false,
        });
      } else {
        dashboardData.push({
          ...option,
          checked: false,
        });
      }
    });
    setOriPagedata([...loggedUser, ...dashboardData]);
    setHeaderArr(data.data.data.timeSheetHeaders);
    handleLoading(false);
  };

  const onErrorProjectList = (data) => {
    // handleLoading(false);
  };
  const { mutate: submitPersonTimesheetMutate } = useMutation(
    submitPersonTimesheet,
    {
      onSuccess: (data, context, variables) =>
        submitPersonTimesheetSuccess(data, context, variables),
      onError: (data, context, variables) =>
        submitPersonTimesheetError(data, context, variables),
    }
  );

  const submitPersonTimesheetSuccess = (data) => {
    dashboardListMutate({
      userId: commonReducer.userId,
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: isLineManager
        ? null
        : commonReducer.selectedProjectObjTeam.profileId,
      viewedBy: isLineManager ? "LM" : "TK",
      appStatus: appStatus,
    });
    setSnakeBarProps({
      snackbarFlag: true,
      msz: data.data.data,
      type: "success",
    });
  };
  const refetchPersonTimesheet = () => {
    handleLoading(true);
    dashboardListMutate({
      userId: commonReducer.userId,
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: isLineManager
        ? null
        : commonReducer.selectedProjectObjTeam.profileId,
      viewedBy: isLineManager ? "LM" : "TK",
      appStatus: appStatus,
    });
  };
  const submitPersonTimesheetError = (data) => {};

  useEffect(() => {
    handleLoading(true);
    dashboardListMutate({
      userId: commonReducer.userId,
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: isLineManager
        ? null
        : commonReducer.selectedProjectObjTeam.profileId,
      viewedBy: isLineManager ? "LM" : "TK",
      appStatus: appStatus,
    });
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    appStatus,
    commonReducer.selectedProjectObjTeam,
  ]);

  const employeeiconclickhandler = (option) => {
    dispatch(updateState({ selectedEmployeeId: option }));
    setProject2(true);
    setItem(option);
  };

  const setCardValueByType = (type) => {
    return pagedata?.length > 0 &&
      pagedata.reduce(
        (acc, val) => acc + (val?.[type] == null ? 0 : val?.[type]),
        0
      ) > 0
      ? true
      : false;
  };

  const selectEmployeeChecked = (value, index) => {
    // console.log("index,value", index, value);
    var localArr = [...pagedata];
    var localPageData = localArr.map((option, _index) =>
      _index == index ? { ...option, checked: value } : option
    );
    setPagedata(localPageData);
  };

  const submitTimesheet = () => {
    var idArr = pagedata
      .filter((option) => option.checked)
      .map((option) => option.personId);
    // console.log("idArr", idArr);
    if (idArr.length === 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please select row(s).",
        type: "info",
      });
    } else {
      submitPersonTimesheetMutate({
        personIds: idArr,
        userId: commonReducer.userId,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
      });
    }
  };

  const checkForEmptyValueByKey = (key) => {};

  const checkAllEmployee = () => {
    if (pagedata.length === 0) return false;
    var idArr = pagedata.filter((option) => option.checked);
    // console.log('idArr', idArr)
    return idArr.length == pagedata.length;
  };

  const checkAllEmployeeChangeHandler = (value, index) => {
    // console.log('e.target.checked', value)
    var localArr = [...pagedata];
    var localPageData = localArr.map((option, _index) => ({
      ...option,
      checked: value,
    }));
    setPagedata(localPageData);
  };

  const generateUniqueId = (index) => {
    return `paycodes-${index}`;
  };
  const getWidth = (id) => {
    const element = document.getElementById(generateUniqueId(id));
    if (element) {
      return element.getBoundingClientRect().width;
    } else {
      return "";
    }
  };
  const getNoOfDays = () => {
    return new Array(
      moment(dateConverter(commonReducer.endDate)).diff(
        moment(dateConverter(commonReducer.startDate)),
        "days"
      ) + 1
    ).fill({ status: null, value: 0 });
  };

  return (
    <Box py={2} style={{ backgroundColor: "#fff" }}>
      <Grid container style={{ marginBottom: 10 }}>
        <Grid item xs={3}>
          {isFilterEmptied && (
            <CustomButton
              btnText="Submit TimeSheet"
              variant="contained"
              onClick={submitTimesheet}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                fontSize: "12px",
              }}
            />
          )}
        </Grid>
        <Grid item xs={9} textAlign="right">
          <Box display="inline-block" mr={2}>
            <Box
              style={{
                backgroundColor: "#FFCDD2",
                width: "10px",
                height: "10px",
                display: "inline-block",
                marginRight: 5,
              }}
            ></Box>
            <Typography variant="body">Not Submitted</Typography>
          </Box>
          <Box display="inline-block" mr={2}>
            <Box
              style={{
                backgroundColor: "#FFE082",
                width: "10px",
                height: "10px",
                display: "inline-block",
                marginRight: 5,
              }}
            ></Box>
            <Typography variant="body">Pending Approval</Typography>
          </Box>
          <Box display="inline-block" mr={2}>
            <Box
              style={{
                backgroundColor: "#C8E6C9",
                width: "10px",
                height: "10px",
                display: "inline-block",
                marginRight: 5,
              }}
            ></Box>
            <Typography variant="body">Approved</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        className={classes.mainbox}
        style={{
          overflowX: pagedata.length === 0 ? "scroll" : "unset",
        }}
      >
        <Box
          className={classes.innermainbox}
          style={{ verticalAlign: pagedata.length > 0 ? "top" : "bottom" }}
        >
          <Box className={classes.innerboxemployee}>
            {isFilterEmptied && (
              <Box className={classes.checkboxparent}>
                <CustomCheckBox
                  check={checkAllEmployee()}
                  onChangeCheck={checkAllEmployeeChangeHandler}
                />
              </Box>
            )}
            <Box className={classes.actionboxparent}>
              <Typography className={classes.actiontext}>Action</Typography>
            </Box>

            <Box className={classes.employeeboxparent}>
              <Typography className={classes.employeetext}>Employee</Typography>
            </Box>

            {/* <Box className={classes.jobtitleboxparent}>
              <Typography className={classes.jobtitletext}>
                Job Title
              </Typography>
            </Box> */}
            <Box className={classes.shifttypeboxparent}>
              <Typography className={classes.header_text}>
                Shift Type
              </Typography>
            </Box>
            <Box className={classes.bandboxparent}>
              <Typography className={classes.header_text}>Band</Typography>
            </Box>
            {/* <Box className={classes.shifttypeboxparent}>
                        <Typography className={classes.header_text}></Typography>
                    </Box> */}
          </Box>
          {pagedata?.length > 0 &&
            pagedata?.map((item, parentIndex) => {
              return (
                <CustomBox
                  className={classes.pagedatamainbox}
                  itemId={item?.employeeNumber}
                  selectedItemId={selectedItem?.employeeNumber}
                  hoveredItemId={hoveredItemId}
                  setHoveredItemId={setHoveredItemId}
                >
                  <>
                    {isFilterEmptied && (
                      <Box className={classes.checkboxparent}>
                        <CustomCheckBox
                          check={item.checked}
                          onChangeCheck={selectEmployeeChecked}
                          currentIndex={parentIndex}
                        />
                      </Box>
                    )}
                    <Box
                      className={classes.actionboxparent}
                      title="View Timesheet"
                    >
                      <MarkunreadMailboxIcon
                        className={classes.checkboxicon}
                        onClick={() => employeeiconclickhandler(item)}
                      />
                    </Box>
                    <Box className={classes.employeeboxparent}>
                      <Typography className={classes.itemfullname}>
                        {item?.fullName} [{item?.employeeNumber}]
                      </Typography>
                    </Box>

                    {/* <Box className={classes.itemjobtitleparent}>
                      <Typography
                        title={item?.jobTitle}
                        className={classes.body_text}
                      >
                        {item?.jobTitle}
                      </Typography>
                    </Box> */}
                    <Box className={classes.shifttypeboxparent}>
                      <Typography className={classes.body_text}>
                        {item?.shiftType}
                      </Typography>
                    </Box>
                    <Box className={classes.bandboxparent}>
                      <Typography className={classes.body_text}>
                        {item?.band}
                      </Typography>
                    </Box>
                    {/* <Box className={classes.iconparent}>
                      <FileCopyIcon className={classes.FileCopyIcon} />
                      <DeleteIcon className={classes.deleteCopyIcon} />
                    </Box> */}
                  </>
                </CustomBox>
              );
            })}
        </Box>

        <Box
          className={classes.dayArrmainbox}
          style={{
            overflowX: pagedata.length === 0 ? "unset" : "auto",
          }}
        >
          {/* <Box> */}
          {commonReducer?.dayArr?.length > 0 && (
            <Box
            // style={{
            //   minWidth:
            //     commonReducer?.dayArr?.length * 80 +
            //     (Object.keys(commonReducer.selectedProjectObjTeam)?.length >
            //       0 &&
            //     commonReducer.selectedProjectObjTeam.projectName != ""
            //       ? 660
            //       : 0),
            //   overflow: "auto",
            // }}
            >
              <Stack flexDirection={"row"}>
                <Stack
                  sx={{
                    backgroundColor: "#F1F1F1 !important",
                    borderTop: "1px solid silver",
                    borderBottom: "1px solid silver",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px !important",
                      borderBottom: "1px solid silver",
                    }}
                  >
                    Status
                  </Typography>
                  <Box className={classes.dayarrboxparent}>
                    {
                      // Object.keys(commonReducer.selectedProjectObjTeam)?.length >
                      //   0 &&
                      commonReducer?.dayArr?.length > 0 &&
                        commonReducer?.dayArr?.map((option, index) => {
                          return (
                            <Box
                              className={classes.optionboxparent}
                              key={index}
                            >
                              <Typography className={classes.optiontext}>
                                {option}
                              </Typography>
                            </Box>
                          );
                        })
                    }
                  </Box>
                </Stack>
                <Stack
                  flexDirection="row"
                  sx={{
                    backgroundColor: "#F1F1F1 !important",
                    border: "1px solid silver",
                  }}
                >
                  {headerArr.length > 0 &&
                    sortPaycodes(
                      headerArr.filter((option) => {
                        return (
                          option.fixed ||
                          (!option.fixed &&
                            setCardValueByType(option.mappingKey, pagedata) > 0)
                        );
                      })
                    ).map((option, index) => {
                      return (
                        <Box
                          className={classes.wrkhrsbox}
                          key={index}
                          id={generateUniqueId(index)}
                        >
                          <Typography className={classes.floating_celltext}>
                            {option.label}
                          </Typography>
                        </Box>
                      );
                    })}
                </Stack>
              </Stack>
              {pagedata?.length > 0 &&
                pagedata?.map((item) => {
                  var localArr =
                    item?.days?.length === 0 ? getNoOfDays() : item?.days;

                  return (
                    <>
                      <CustomBox
                        className={classes.pagedataarraymainbox}
                        itemId={item?.employeeNumber}
                        selectedItemId={selectedItem?.employeeNumber}
                        hoveredItemId={hoveredItemId}
                        setHoveredItemId={setHoveredItemId}
                      >
                        {localArr.map((option) => {
                          return (
                            <Box
                              className={[
                                classes.pagedataoptionmainbox,
                                classes[option.status],
                              ]}
                            >
                              <Typography
                                className={classes.body_text}
                                title={option.value > 0 ? option.value : ""}
                              >
                                {option.value > 0 ? option.value : ""}
                              </Typography>
                            </Box>
                          );
                        })}
                        {headerArr.length > 0 &&
                          sortPaycodes(
                            headerArr.filter((option) => {
                              return (
                                option.fixed ||
                                (!option.fixed &&
                                  setCardValueByType(
                                    option.mappingKey,
                                    pagedata
                                  ) > 0)
                              );
                            })
                          ).map((option, index) => {
                            return (
                              <Box
                                className={classes.itemparent}
                                sx={{
                                  width: getWidth(index),
                                }}
                              >
                                <Typography className={classes.body_text}>
                                  {item[option.mappingKey]}
                                </Typography>
                              </Box>
                            );
                          })}
                      </CustomBox>
                    </>
                  );
                })}
            </Box>
          )}
          {/* </Box> */}
        </Box>
        {pagedata?.length == 0 && (
          <Box sx={{ fontSize: "15px", paddingLeft: "10px" }}>
            No Data to display
          </Box>
        )}

        {project2 && (
          <EmployeeDetailModal
            togglerHandler={setProject2}
            dateConverter={dateConverter}
            setSnakeBarProps={setSnakeBarProps}
            refetchPersonTimesheet={refetchPersonTimesheet}
          />
        )}
        {Object.keys(snakeBarProps).length > 0 && (
          <CustomSnackbar
            {...snakeBarProps}
            setSnakeBarProps={setSnakeBarProps}
          />
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  floating_cell: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  header_text: {
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainbox: {
    borderLeft: "1px solid #E9E9E9 !important",
    borderRight: "1px solid #E9E9E9 !important",
    borderBottom: "1px solid #E9E9E9 !important",
  },
  innermainbox: {
    display: "inline-block",
    width: "552px",
    // verticalAlign: "bottom",
    border: "1px solid silver",
  },
  dynamicWidth: {
    borderRight: "2px solid aqua",
    "&:hover": {
      cursor: "col-resize",
    },
  },
  innerboxemployee: {
    display: "flex !important",
    // padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    minHeight: 50, //73,
  },
  checkboxparent: {
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
  },
  employeeboxparent: {
    width: 300,
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  employeetext: {
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  actionboxparent: {
    width: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
  },
  actiontext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  jobtitleboxparent: {
    width: 115,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
  },
  shifttypeboxparent: {
    width: 105,
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  bandboxparent: {
    width: 105,
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #D6DFE6",
    paddingLeft: "10px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    minHeight: "45px",
  },
  itemfullname: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    // width: "calc(100% - 60px) !important",
    fontSize: "14px !important",
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "small !important",
    // marginLeft: "15px !important",
    cursor: "pointer !important",
    // marginRight: "10px !important"
  },
  itemjobtitleparent: {
    width: 105,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    marginLeft: "30px",
  },
  iconparent: {
    width: 80,
    justifyContent: "lef !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  FileCopyIcon: {
    color: "#124590 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  deleteCopyIcon: {
    color: "#D90000 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
  },
  dayArrmainbox: {
    width: "calc(100% - 552px) !important",
    display: "inline-block !important",
    border: "1px solid #E9E9E9",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 26, //73,
    textAlign: "right",
  },
  optionboxparent: {
    width: 60,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: "1px solid #D6DFE6",
  },
  optiontext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "12px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  wrkhrsbox: {
    width: "max-content",
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: "1px solid #D6DFE6",
  },
  floating_celltext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "12px !important",
  },
  floating_cellbox: {
    width: 80,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedataarraymainbox: {
    display: "inline-flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    minHeight: "45px",
  },
  pagedataoptionmainbox: {
    width: 60,
    justifyContent: "flex-end !important",
    borderLeft: "1px solid rgb(233, 233, 233) !important",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 80,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },

  itemprojecthrsparent: {
    width: 78,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent: {
    width: 80,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  P: {
    backgroundColor: "#FFE082",
  },
  N: {
    backgroundColor: "#FFCDD2",
  },
  A: {
    backgroundColor: "#C8E6C9",
  },
}));
