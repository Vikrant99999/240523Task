import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { makeStyles } from "@material-ui/styles";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  getAllExpenditure,
  getAllProject,
  getAllTask,
  getTeamList,
} from "../../../../services/api";
import { updateState } from "../../../../redux/commonSlice";
import { dateConverter } from "../../../../utils/commonService";
import { RequestDetailsModal } from "./RequestDetailsModal";
import { teamtableHeader } from "../../../contants";
import { CustomBox } from "../../../../components/CustomBox";

export const EmployeeTable = (props) => {
  const {
    pagedata,
    appStatus,
    setOriPagedata,
    filterData,
    setSnakeBarProps,
    setIsLoading,
    oriPagedata,
  } = props;
  const classes = useStyles();

  const [project2, setProject2] = useState(false);
  const [getAllProjectDataArr, setGetAllProjectDataArr] = useState([]);
  const [getAllTaskDataArr, setGetAllTaskDataArr] = useState([]);
  const [getAllExpenditureDataArr, setGetAllExpenditureDataArr] = useState([]);
  const [projectEnableFlag, setProjectEnableFlag] = useState(true);
  const [taskEnableFlag, setTaskEnableFlag] = useState(true);
  const [expenditureEnableFlag, setExpenditureEnableFlag] = useState(true);
  const [selectedItem, setItem] = useState();
  const [hoveredItemId, setHoveredItemId] = useState();
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);
  const [dataArr, setDataArr] = useState();
  // console.log(dataArr, "dataarr");

  const { data: getAllProjectData } = useQuery(
    ["getAllProjectCall", pagedata?.countryID],
    () => getAllProject(),
    { enabled: projectEnableFlag, retry: false }
  );

  useEffect(() => {
    if (getAllProjectData) {
      setProjectEnableFlag(false);
      setGetAllProjectDataArr(getAllProjectData?.data?.data);
    }
  }, [getAllProjectData]);

  const { data: getAllTaskData } = useQuery(
    ["getAllTaskCall", pagedata?.countryID],
    () => getAllTask(),
    { enabled: taskEnableFlag, retry: false }
  );

  useEffect(() => {
    if (getAllTaskData) {
      setTaskEnableFlag(false);
      setGetAllTaskDataArr(getAllTaskData?.data?.data);
    }
  }, [getAllTaskData]);

  const { data: getAllExpenditureData } = useQuery(
    ["getAllExpenditureCall", pagedata?.countryID],
    () => getAllExpenditure(),
    { enabled: expenditureEnableFlag, retry: false }
  );

  useEffect(() => {
    if (getAllExpenditureData) {
      setExpenditureEnableFlag(false);
      setGetAllExpenditureDataArr(getAllExpenditureData?.data?.data);
    }
  }, [getAllExpenditureData]);

  const { mutate: teamListMutate, isLoading: isLoad } = useMutation(
    getTeamList,
    {
      onSuccess: (data, context, variables) =>
        onSuccessProjectList(data, context, variables),
      onError: (data, context, variables) =>
        onErrorProjectList(data, context, variables),
    }
  );

  const onSuccessProjectList = (data) => {
    setOriPagedata(data.data.data);
  };
  const onErrorProjectList = () => {};

  useEffect(() => {
    if (isLoad) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoad]);

  useEffect(() => {
    teamListMutate({
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: isLineManager
        ? ""
        : commonReducer.selectedProjectObjTeam.profileId,
      viewBy: isLineManager ? "LM" : "TK",
      // appStatus: appStatus,
      personId: commonReducer.employeeId,
      userId: commonReducer.userId,
    });
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    // appStatus,
    commonReducer.selectedProjectObjTeam.profileId,
    commonReducer.lineManageForTeam,
  ]);

  console.log(commonReducer.startDate)

  const requestclickhandler = (item) => {
    dispatch(updateState({ personId: item?.personId }));
    setProject2(true);
    setDataArr(item);
    setItem(item);
  };

  return (
    <>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxemployee}>
            {teamtableHeader.map((option) => {
              return (
                <Box className={classes[option.mapClass]}>
                  <Typography className={classes.font}>
                    {option.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          {filterData?.length > 0 &&
            filterData?.map((item) => {
              return (
                <>
                  <CustomBox
                    className={classes.pagedatamainbox}
                    itemId={item?.personId + item?.timecardId}
                    selectedItemId={
                      selectedItem?.personId + selectedItem?.timecardId
                    }
                    hoveredItemId={hoveredItemId}
                    setHoveredItemId={setHoveredItemId}
                  >
                    <Box className={classes.personParent}>
                      {/* <CustomCheckBox /> */}
                      <Typography
                        title={item?.personName}
                        className={classes.itemfullname}
                      >
                        {item?.personName}
                      </Typography>
                    </Box>
                    <Box className={classes.effectiveParent}>
                      <Typography
                        title={item?.jobTitle}
                        className={classes.font}
                      >
                        {item?.effectiveDate == null
                          ? commonReducer.startDate
                          : moment(item?.effectiveDate).format("DD-MM-YYYY")}
                      </Typography>
                    </Box>
                    <Box className={classes.requestparent}>
                      <Typography
                        title={item?.jobTitle}
                        className={classes.font}
                      >
                        <Tooltip title="View/Add Requests" >
                        <MarkunreadMailboxIcon
                          className={classes.checkboxicon}
                          onClick={() => requestclickhandler(item)}
                        />
                        </Tooltip>
                      </Typography>
                    </Box>
                    <Box className={classes.itemshifttypeparent}>
                      <Typography className={classes.dept}>
                        {item?.departmentName}
                      </Typography>
                    </Box>
                    <Box className={classes.itemjobtitleparent}>
                      <Typography
                        className={classes.font}
                        title={item?.jobTitle}
                      >
                        {item?.jobTitle}
                      </Typography>
                    </Box>
                  </CustomBox>
                </>
              );
            })}
        </Box>
        <Box className={classes.dayArrmainbox}>
          <Box>
            {commonReducer?.dayArr?.length > 0 && (
              <Box
                style={{
                  minWidth:
                    commonReducer?.dayArr?.length * 50 +
                    (Object.keys(commonReducer.selectedProjectObjTeam)?.length >
                      0 &&
                    commonReducer.selectedProjectObjTeam.projectName != ""
                      ? 530
                      : 0),
                  overflow: "auto", 
                }}
              >
                <Box className={classes.dayarrboxparent}>
                  <>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Sch In
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Sch Out
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Sch Hrs
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        On Call
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox_punchTime}>
                      <Typography className={classes.floating_celltext}>
                        Punch Times(s)
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Act Hrs
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox_violation}>
                      <Typography className={classes.floating_celltext}>
                        Violation Code
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Request
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Absence(s)
                      </Typography>
                    </Box>
                    <Box className={classes.floating_cellbox}>
                      <Typography className={classes.floating_celltext}>
                        Holiday
                      </Typography>
                    </Box>
                  </>
                </Box>
                {filterData?.length > 0 &&
                  filterData?.map((item) => {
                    return (
                      <>
                        <CustomBox
                          className={classes.pagedataarraymainbox}
                          itemId={item?.personId + item?.timecardId}
                          selectedItemId={
                            selectedItem?.personId + selectedItem?.timecardId
                          }
                          hoveredItemId={hoveredItemId}
                          setHoveredItemId={setHoveredItemId}
                        >
                          {item?.days?.length > 0 &&
                            item?.days.map((option) => {
                              return (
                                <Box className={classes.pagedataoptionmainbox}>
                                  <Typography className={classes.body_text}>
                                    {option > 0 ? option : ""}
                                  </Typography>
                                </Box>
                              );
                            })}

                          <>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.schTimeStart == null
                                  ? ""
                                  : moment(item?.schTimeStart).format(
                                      "H:mm"
                                    )}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.schTimeEnd == null
                                  ? " "
                                  : moment(item?.schTimeEnd).format(
                                      "H:mm"
                                    )}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.schHrs == null ? " " : item?.schHrs}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.onCall == null ? " " : item?.onCall}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent_punchTime}>
                              <Typography className={classes.body_text}>
                                {item?.punchTimes == null
                                  ? " "
                                  : item?.punchTimes}
                                  {console.log(item)}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.actHrs == null
                                  ? " "
                                  : Number(item?.actHrs).toFixed(2)}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent_violation}>
                              <Typography className={classes.body_text}>
                                {item?.violationCode == null
                                  ? " "
                                  : item?.violationCode}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.requestName == null
                                  ? " "
                                  : item?.requestName}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.absenseHrs == null
                                  ? " "
                                  : item?.absenseHrs}
                              </Typography>
                            </Box>
                            <Box className={classes.commonitemparent}>
                              <Typography className={classes.body_text}>
                                {item?.holidayHours == null
                                  ? " "
                                  : item?.holidayHours}
                              </Typography>
                            </Box>
                          </>
                        </CustomBox>
                      </>
                    );
                  })}
              </Box>
            )}
          </Box>
        </Box>
        {filterData?.length == 0 && (
          <Box width={1} textAlign="center" my={2}>
            No Data Found
          </Box>
        )}
        {project2 && (
          <RequestDetailsModal
            togglerHandler={setProject2}
            dateConverter={dateConverter}
            getAllProjectDataArr={getAllProjectDataArr}
            getAllExpenditureDataArr={getAllExpenditureDataArr}
            getAllTaskDataArr={getAllTaskDataArr}
            setSnakeBarProps={setSnakeBarProps}
            dataArr={dataArr}
            oriPagedata={oriPagedata}
            item={selectedItem}
          />
        )}
      </Box>
    </>
  );
};

const useStyles = makeStyles(() => ({
  font: {
    fontSize: "14px !important",
    // minHeight: 42,
  },
  jobtitleboxparent: {
    width: 150,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 0px",
  },
  personParent_h: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 180,
  },
  personParent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 180,
  },
  effectiveParent: {
    width: 115,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  requestParent: {
    width: 70,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  departmentParent: {
    width: 200,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cell: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  header_text: {
    fontSize: "14px !important",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    height: "calc(100vh - 350px)",
    overflow: "auto",
  },
  innermainbox: {
    display: "inline-block",
    width: "715px",
    verticalAlign: "top",
  },
  innerboxemployee: {
    display: "flex !important",
    padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  employeeboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
  },
  employeetext: {
    fontSize: "14px !important",
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
  },
  shifttypeboxparent: {
    width: 80,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  bandboxparent: {
    width: 50,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
  },
  checkboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 200,
    display: "flex !important",
    alignItems: "center !important",
    padding: "0 0 0 15px !important",
  },
  itemfullname: {
    fontSize: "14px !important",
    // textOverflow: "ellipsis",
    // overflow: "hidden",
    // whiteSpace: "nowrap",
    width: "100% !important",
    fontSize: "14px !important",
  },
  dept: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "small !important",
    marginLeft: "15px !important",
    cursor: "pointer !important",
    // marginRight: "10px !important"
  },
  itemjobtitleparent: {
    width: 150,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    minHeight: 42,
  },
  requestparent: {
    width: 70,
    justifyContent: "flex-start !important",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemshifttypeparent: {
    width: 200,
    justifyContent: "left !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itembandparent: {
    width: 50,
    justifyContent: "left !important",
    alignItems: "center !important",
    paddingLeft: 10,
    display: "flex !important",
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
    width: "calc(100% - 715px) !important",
    overflow: "hidden !important",
    display: "inline-block !important",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 52,
    textAlign: "right",
  },
  optionboxparent: {
    width: 60,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
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
    width: 65,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_celltext: {
    color: "black !important",
    fontWeight: "bold !important",
    fontSize: "14px !important",
  },
  floating_cellbox: {
    width: 100,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cellbox_punchTime: {
    width: 130,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  floating_cellbox_violation: {
    width: 200,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedataarraymainbox: {
    display: "inline-flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
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
    width: 65,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  itemparent: {
    width: 65,
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
    width: 100,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent_violation: {
    width: 200,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  commonitemparent_punchTime: {
    width: 130,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
}));
