import { Box, Checkbox, Typography, Stack, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

// import { makeStyles } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  getallemployeedata,
  DeleteRosterProfile,
  GetSingleShift,
} from "../../../../services/api";
import { useMutation } from "react-query";
import { dateConverter } from "../../../../utils/commonService";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteRoster from "./DeleteRoster";
import UpdateRoster from "./UpdateRoster";
import AssignRoster from "./AssignRoster";
import { Link } from "react-router-dom";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import {
  RemoveCircle as RemoveCircleIcon,
  ContentCopy as ContentCopyIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { CustomBox } from "../../../../components/CustomBox";
import { useQuery } from "react-query";
import { updateState } from "../../../../redux/commonSlice";

var borderRight = "1px solid rgb(233, 233, 233)";
var borderLeft = "1px solid rgb(233, 233, 233)";

const RoasterPersonDetailTable = (props) => {
  const dispatch = useDispatch();

  const commonReducer = useSelector((state) => state.commonReducer);
  const {
    setOriPagedata,
    oriPagedata,
    viewBy,
    isLoading,
    setIsLoading,
    checked,
    setChecked,
    changeDelete,
  } = props;
  const filter = viewBy?.value;
  const [filterName, setFilterName] = useState(filter);
  const employeeFilter = filter === "Employee" ? true : false;
  const notEmployee = [
    "Department",
    "Job Title",
    "Work Location",
    "Shift Time",
  ].includes(filter)
    ? true
    : false;
  const [isEmployeeFilter, setIsEmployeeFilter] = useState(employeeFilter);
  const [isNotEmployeed, setIsNotEmployeed] = useState(notEmployee);

  const handleFilter = () => {
    setFilterName(filter);
    setIsEmployeeFilter(employeeFilter);
    setIsNotEmployeed(notEmployee);
  };

  const width = 710;
  const [minWidth, setMinWidth] = useState(width);
  const classes = useStyles({
    minWidth: minWidth,
    isEmployeeFilter,
    isNotEmployeed,
  });
  const isNursingProfile = commonReducer.selectedProjectObj
    ? commonReducer.selectedProjectObj.profileName === "Nursing"
      ? true
      : false
    : false;

  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [result, setResult] = useState([]);
  //    const[shiftIntoArr,setShiftIntoArr]=useState([]);
  const [dat, setData] = useState();

  const [eachDayCountArr, setEachDayCountArr] = useState();
  const [personRosterId, setPersonRosterId] = useState("");
  const [personRosterPivoteId, setPersonPivoteId] = useState("");
  const [personIdRoster, setPersonIdRoster] = useState("");
  const [jobTitleIdRoster, setJobTitleIdRoster] = useState("");
  const [departmentIdRoster, setDepartmentIdRoster] = useState("");
  const [onClickDefaultPerson, setOnClickDefaultPerson] = useState({});
  const [dynamicList, setDynamicList] = useState([]);
  const [workDurationArr, setWorkDurationArr] = useState([]);
  const [jobtitlesArr, setJobTitlesArr] = useState([]);

  const getYear = () => {
    return commonReducer.endDate.split("-")[2];
  };

  // const [effectiveDate, setEffectiveDate] = useState("");
  const [Assign, setAssign] = useState(false);

  const getFormattedDate = (day) => {
    var str = day.split("(")[0].split("/");
    var current_day = str[0];
    var current_month = str[1];
    var current_year = getYear();
    day = [current_month, current_day, current_year].join("-");
    dispatch(
      updateState({
        effectiveDate: day,
      })
    );
  };
  const selectAssign = (id) => {
    let index = result[0].value.findIndex((x) => x.personId === id);
    setAssign(true);

    var localemployee = { ...result[0].value[index] };

    // console.log("localemploye", employee, localemployee);
    setOnClickDefaultPerson(localemployee);
  };

  // const { data: getSingleShiftRoster } = useQuery(
  //   ["getSingleShift", personRosterPivoteId, personRosterId],
  //   () =>
  //     GetSingleShift({
  //       loginUserId: "300000006565312",
  //       personRosterPivoteId: personRosterPivoteId,
  //       personRosterId: personRosterId,
  //     }),
  //   { enabled: true, retry: false }
  // );
  // useEffect(() => {
  //   if (getSingleShiftRoster) {
  //     var effect_date = getSingleShiftRoster?.data?.data?.effectiveDate;
  //     console.log("single shift testing", effect_date);
  //     setEffectiveDate(effect_date);
  //   }
  // }, [getSingleShiftRoster]);

  //    const[pagedata,setPageData]=useState([]);

  // const[openUpdatePoppup,setOpenUpdatePopup]=useState(false);
  const [status, setStatus] = React.useState(0);

  const btnClick = (e, index, value, data) => {
    // console.log("btnclick", value);
    setData(data);
    setPersonPivoteId(data.personRosterPivoteId);
    setPersonRosterId(value.personRosterId);

    setPersonIdRoster(data.personId);
    setDepartmentIdRoster(data.departmentId);
    setJobTitleIdRoster(data.jobTitleId);
    // personId
    // departmentId
    // jobTitleId

    setStatus(e);
  };

  // console.log(personRosterPivoteId);

  const [dataRoster, setDataRoster] = useState([]);

  useEffect(() => {
    var localArr1 = [];
    if (filter == "Employee") {
      localArr1?.push(oriPagedata?.eachDayShiftCount);
    }
    setEachDayCountArr(localArr1);
  }, []);

  const data = oriPagedata?.personRosterData?.[filter];

  useEffect(() => {
    let localArr = [];
    for (let x in oriPagedata?.personRosterData) {
      let data1 = {
        label: x,
        value: (oriPagedata?.personRosterData)[x],
      };
      localArr.push(data1);
    }
    if (localArr.length != 0) {
      localArr[0].value = localArr[0].value.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    }
    setResult(localArr);
    let temp = [];
    if (
      "personRosterData" in oriPagedata &&
      "Employee" in oriPagedata.personRosterData
    ) {
      for (
        let i = 0;
        i < oriPagedata?.personRosterData?.["Employee"].length;
        i++
      )
        temp.push(false);
      setChecked(temp);
    }
    var localWorkDurationArr = [],
      localJobTilesArr = [];
    var workDurationList =
      "header" in oriPagedata
        ? "dynamicColoums" in oriPagedata.header
          ? oriPagedata.header.dynamicColoums
          : []
        : [];

    oriPagedata.eachDayShiftCount &&
      Object.keys(oriPagedata.eachDayShiftCount).forEach(function (key, index) {
        Object.keys(oriPagedata.eachDayShiftCount[key]).forEach(function (
          key2,
          index
        ) {
          // console.log(key2);
          // if (!dynamicList.includes(key2)) {
          //   var arr = dynamicList;
          //   arr.push(key2);
          //   setDynamicList(arr);
          // }
          if (workDurationList.includes(key2)) {
            if (!localWorkDurationArr.includes(key2)) {
              localWorkDurationArr.push(key2);
            }
          } else {
            if (!localJobTilesArr.includes(key2)) {
              localJobTilesArr.push(key2);
            }
          }
        });
      });
    setWorkDurationArr(localWorkDurationArr);
    setJobTitlesArr(localJobTilesArr);
  }, [oriPagedata]);

  console.log(result);
  const empData = result.map((option) => ({
    ...option,
    value: option.value.map((valueOption) => ({
      valueOption,
    })),
  }));

  const localArr = result.map((option) => ({
    ...option,
    value: option.value.map((valueOption) => ({
      ...valueOption,
      shiftInformationArr: Object.keys(valueOption.shiftInformation).map(
        (key) => valueOption.shiftInformation[key]?.shiftInfoList[0]
      ),
    })),
  }));
  console.log(localArr);

  useEffect(() => {
    result.map((option) => setDataRoster(option.value));
  }, []);

  const { mutate: employeeListMutate, isLoading: isLoad } = useMutation(
    getallemployeedata,
    {
      onSuccess: (data, context, variables) =>
        onSuccessProfileList(data, context, variables),
      onError: (data, context, variables) =>
        onErrorProfileList(data, context, variables),
    }
  );

  useEffect(() => {
    if (isLoad) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoad]);

  const onSuccessProfileList = (data) => {
    console.log("oriData---", data.data.data);
    setOriPagedata(data.data.data);
    handleFilter();
  };
  useEffect(() => {
    handleMinwidth();
  }, [isNotEmployeed]);
  const onErrorProfileList = (data) => {};

  const getEmployeeList = () => {
    if (Object.keys(commonReducer.selectedProjectObj)?.length > 0) {
      employeeListMutate({
        userId: "300000006565312",
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
        profileId: commonReducer.selectedProjectObj.profileId,
        apprvStatus: "",
        asc: true,
        viewBy: filter,
        pageSize: "1000",
        pageNo: "0",
      });
      setCheckedAll(false);
    }
  };
  useEffect(() => {
    getEmployeeList();
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    commonReducer.apprvStatus,
    commonReducer.selectedProjectObj.profileId,
    filter,
    changeDelete,
  ]);

  const [filterData, setFilterData] = useState([]);
  const onChangeCheck = (value, currentIndex) => {
    var finalarr = filterData;

    if (!finalarr.includes(empData[currentIndex])) {
      finalarr.push(empData[currentIndex]);
    }

    setFilterData(finalarr);
  };

  const eachDayShiftCount = oriPagedata?.eachDayShiftCount;

  // const [checked, setChecked] = React.useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const handleParentChange = async (event) => {
    if (checkedAll) {
      let temp = checked.map((val) => false);
      setChecked(temp);
    } else {
      let temp = checked.map((val) => true);
      setChecked(temp);
    }
    setCheckedAll(!checkedAll);
  };
  const handleChildChange = (index) => {
    let updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setCheckedAll(!checked);
    setChecked(updatedChecked);
  };

  const getTotalJobTitleShiftCounts = (day) => {
    var total = 0;
    jobtitlesArr.map((key2) => {
      var shiftCount = oriPagedata?.eachDayShiftCount?.[day]?.[key2];
      shiftCount = shiftCount ? shiftCount : 0;
      total += shiftCount;
    });
    return total;
  };

  const handleMinwidth = () => {
    var extra_column_width = 110;
    //  in case of department adding one more column
    if (isNotEmployeed) {
      setMinWidth(width + extra_column_width);
    } else {
      //  reset the minimum width
      setMinWidth(width);
    }
  };

  const days =
    "header" in oriPagedata
      ? "days" in oriPagedata.header
        ? oriPagedata.header.days
        : []
      : [];
  const getDefaultValue = (value) => {
    return value === 0 ? "" : value;
  };
  const getScheduledHrsDayWise = (arr, key) => {
    var totalHrs = 0;
    arr?.map((item) => {
      var shifts = item.shiftInformation[key];
      if (![null, undefined].includes(shifts) && "cumulativeHours" in shifts) {
        totalHrs += parseFloat(shifts["cumulativeHours"]);
      }
    });
    return totalHrs.toFixed(2);
  };
  const getScheduledHrsDepartmentWise = (arr) => {
    var totalHrs = 0;
    arr?.map((item1) => {
      Object.keys(item1.shiftInformation).map((key) => {
        var shifts = item1.shiftInformation[key];
        if (
          ![null, undefined].includes(shifts) &&
          "cumulativeHours" in shifts
        ) {
          totalHrs += parseFloat(shifts["cumulativeHours"]);
        }
      });
    });
    return totalHrs.toFixed(2);
  };

  return (
    <>
      <Box className={classes.mainbox}>
        <Box
          className={classes.innermainbox}
          style={{
            width: localArr.length > 0 ? minWidth : "",
          }}
        >
          <Box className={classes.innerboxemployee}>
            <Box className={classes.checkboxparent}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedAll}
                    onChange={handleParentChange}
                  />
                }
              />
            </Box>
            <Box className={classes.employeeboxparent}>
              <Typography className={classes.employeetext}>
                {filterName}
              </Typography>
            </Box>
            <Box className={classes.jobtitleboxparent}>
              <Typography className={classes.jobtitletext}>
                Job Title
              </Typography>
            </Box>
            <Box className={classes.shifttypeboxparent}>
              <Typography className={classes.header_text}>
                Shift Type
              </Typography>
            </Box>
            <Box className={classes.bandboxparent}>
              <Typography className={classes.header_text}>Band</Typography>
            </Box>
            {localArr.length > 0 ? (
              <Box className={classes.actionsboxparent}>
                <Typography className={classes.header_text}></Typography>
              </Box>
            ) : (
              ""
            )}
            {isEmployeeFilter ? null : (
              <Box className={classes.totalschhoursboxparent}>
                <Typography className={classes.header_text}>
                  Total Sch Hrs
                </Typography>
              </Box>
            )}
          </Box>

          <>
            {result.length > 0 &&
              result?.map((item, index) => {
                console.log(item);
                return (
                  <>
                    {item.label == "Employee" ? null : (
                      <Box
                        className={classes.pagedatamainbox}
                        // style={{ backgroundColor: "#EFEBF9" }}
                      >
                        <Box
                          className={`${classes.checkboxparent} ${classes.departmentrowstyles}`}
                        />
                        <Box
                          className={`${classes.employeeboxparent} ${classes.departmentrowstyles}`}
                        >
                          <Typography
                            className={classes.itemfullname}
                            style={{
                              fontWeight: "bolder",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                        <Box
                          className={`${classes.jobtitleboxparent} ${classes.departmentrowstyles}`}
                        />
                        <Box
                          className={`${classes.shifttypeboxparent} ${classes.departmentrowstyles}`}
                        />
                        <Box
                          className={`${classes.bandboxparent} ${classes.departmentrowstyles}`}
                        />
                        <Box
                          className={`${classes.iconparent} ${classes.departmentrowstyles}`}
                        />
                        {isEmployeeFilter ? null : (
                          <Box className={classes.totalschedulehrs}>
                            {getScheduledHrsDepartmentWise(item.value)}
                          </Box>
                        )}
                      </Box>
                    )}
                    <Box>
                      {item?.value?.length > 0 &&
                        item?.value?.map((option, index) => {
                          return (
                            <Box className={classes.pagedatamainbox}>
                              <Box
                                key={option.checkboxparent}
                                className={classes.checkboxparent}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checked[index]}
                                      onChange={() => handleChildChange(index)}
                                      onChangeCheck={onChangeCheck}
                                      currentIndex={index}
                                    />
                                  }
                                />
                              </Box>
                              <Box className={classes.employeeboxparent}>
                                <Typography
                                  title={option?.fullName}
                                  className={classes.itemfullname}
                                >
                                  {option?.fullName}[{option?.employeeNumber}]
                                </Typography>
                              </Box>
                              <Box className={classes.jobtitleboxparent}>
                                <Typography
                                  title={option?.jobTitle}
                                  className={classes.body_text}
                                >
                                  {option.jobTitle}
                                </Typography>
                              </Box>
                              <Box className={classes.shifttypeboxparent}>
                                <Typography className={classes.body_text}>
                                  {option?.shiftType}
                                </Typography>
                              </Box>
                              <Box className={classes.bandboxparent}>
                                <Typography className={classes.body_text}>
                                  {option?.band}
                                </Typography>
                              </Box>
                              <Box className={classes.iconparent}>
                                <Box title="Copy Shift">
                                  <ContentCopyIcon
                                    fontSize="small"
                                    className={classes.FileCopyIcon}
                                  />
                                </Box>
                                {/* <FileCopyIcon className={classes.FileCopyIcon} /> */}
                                <Box title="Delete All Shift">
                                  <RemoveCircleIcon
                                    fontSize="small"
                                    className={classes.deleteCopyIcon}
                                  />
                                </Box>
                                {/* <DeleteIcon className={classes.deleteCopyIcon} /> */}
                              </Box>
                            </Box>
                          );
                        })}
                    </Box>
                  </>
                );
              })}
            {localArr.length > 0 && isEmployeeFilter ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  borderBottom: "1px solid silver",
                  backgroundColor: "#F2F4F7",
                }}
              >
                {workDurationArr.length != 0 &&
                  workDurationArr?.map((item, d_index) => {
                    return (
                      <Box className={classes.pagedatamainboxdynamicrows}>
                        <Box className={classes.checkboxparent} />
                        <Box className={classes.employeeboxparent}>
                          <Typography className={classes.itemfullname} />
                        </Box>
                        <Box
                          className={`${classes.jobtitleboxparent} ${classes.workdurations_bg}`}
                        >
                          <Typography
                            className={classes.body_text}
                            style={{
                              fontWeight: "bolder",
                              textAlign: "right",
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                        <Box className={classes.shifttypeboxparent}>
                          <Typography className={classes.body_text} />
                        </Box>
                        <Box className={classes.bandboxparent}>
                          <Typography className={classes.body_text} />
                        </Box>
                        <Box className={classes.iconparent}>
                          <Box></Box>
                          <Box />
                        </Box>
                      </Box>
                    );
                  })}
                {jobtitlesArr.length != 0 &&
                  jobtitlesArr?.map((item, d_index) => {
                    return (
                      <Box className={classes.pagedatamainboxdynamicrows}>
                        <Box className={classes.checkboxparent} />
                        <Box className={classes.employeeboxparent}>
                          <Typography className={classes.itemfullname} />
                        </Box>
                        <Box
                          className={`${classes.jobtitleboxparent} ${classes.jobtitles_bg}`}
                        >
                          <Typography
                            className={classes.body_text}
                            style={{
                              fontWeight: "bolder",
                              textAlign: "right",
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                        <Box className={classes.shifttypeboxparent}>
                          <Typography className={classes.body_text} />
                        </Box>
                        <Box className={classes.bandboxparent}>
                          <Typography className={classes.body_text} />
                        </Box>
                        <Box className={classes.iconparent}>
                          <Box></Box>
                          <Box />
                        </Box>
                      </Box>
                    );
                  })}
                <Box className={classes.pagedatamainboxdynamicrows}>
                  <Box className={classes.checkboxparent} />
                  <Box className={classes.employeeboxparent}>
                    <Typography className={classes.itemfullname} />
                  </Box>
                  <Box
                    className={`${classes.jobtitleboxparent} ${classes.totaljobtitles_bg}`}
                  >
                    <Typography
                      className={classes.body_text}
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                      }}
                    >
                      Total
                    </Typography>
                  </Box>
                  <Box className={classes.shifttypeboxparent}>
                    <Typography className={classes.body_text} />
                  </Box>
                  <Box className={classes.bandboxparent}>
                    <Typography className={classes.body_text} />
                  </Box>
                  <Box className={classes.iconparent}>
                    <Box></Box>
                    <Box />
                  </Box>
                </Box>
              </Box>
            ) : null}
          </>
        </Box>
        <Box
          className={classes.dayArrmainbox}
          style={{
            overflowX: localArr.length === 0 ? "unset" : "auto",
          }}
        >
          <Box>
            {commonReducer?.dayArr?.length > 0 && (
              <Box
                className={`${classes.dayarrboxparent} ${classes.dayarrboxparentlastcolumn}`}
              >
                {oriPagedata?.header?.days?.length > 0 &&
                  oriPagedata?.header?.days?.map((item) => {
                    return (
                      <Box className={classes.optionboxparent}>
                        <Typography className={classes.optiontext}>
                          {item}
                        </Typography>
                      </Box>
                    );
                  })}

                {isEmployeeFilter &&
                  oriPagedata?.header?.dynamicColoums?.length > 0 &&
                  oriPagedata?.header?.dynamicColoums?.map((item) => {
                    return (
                      <Box
                        className={classes.optionboxparent1}
                        style={{ justifyContent: "right", padding: "8px" }}
                      >
                        <Typography className={classes.optiontext}>
                          {item}
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            )}
          </Box>
          {localArr?.map((option) => {
            return (
              <Box style={{ display: "flex" }}>
                <Stack flexDirection={"column"}>
                  <Box>
                    <Stack
                      flexDirection="row"
                      className={classes.dayarrboxparentlastcolumn}
                    >
                      <Box>
                        {!isEmployeeFilter ? (
                          <Box className={classes.pagedatamainbox}>
                            {days.map((day_keyword, index) => {
                              var totalScheduleHrs = 0;
                              totalScheduleHrs = getScheduledHrsDayWise(
                                option.value,
                                day_keyword
                              );
                              var finalValue =
                                totalScheduleHrs > 0 ? totalScheduleHrs : "";
                              return (
                                <Box className={classes.pagedataarraymainbox}>
                                  <Box
                                    className={
                                      classes.pagedataoptionmainboxspecialrow
                                    }
                                    style={{
                                      borderRight:
                                        index === days.length - 1
                                          ? borderRight
                                          : "",
                                    }}
                                  >
                                    {finalValue}
                                    <AddIcon
                                      onClick={() => {
                                        getFormattedDate(day_keyword);
                                        selectAssign();
                                      }}
                                      className={classes.addicon}
                                    />
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        ) : (
                          ""
                        )}
                        {option.value.map((data, index) => {
                          return (
                            <Box className={classes.pagedatamainbox}>
                              {Object.keys(data.shiftInformation).map(
                                (value, index) => {
                                  var shiftInfoList =
                                    data.shiftInformation[value]?.[
                                      "shiftInfoList"
                                    ][0];
                                  var workDurationCode =
                                    shiftInfoList?.workDurationCode;

                                  var isClickable =
                                    !isNotEmployeed && !workDurationCode;
                                  return (
                                    <Box
                                      className={classes.pagedataarraymainbox}
                                    >
                                      <Box
                                        className={
                                          classes.pagedataoptionmainbox
                                        }
                                        onClick={() => {
                                          if (isClickable) {
                                            console.log(
                                              "list 1",
                                              shiftInfoList,
                                              data
                                            );
                                            getFormattedDate(value);
                                            selectAssign(data.personId);
                                          }
                                        }}
                                        style={{
                                          cursor: isClickable ? "pointer" : "",
                                        }}
                                      >
                                        {isEmployeeFilter && (
                                          <Typography
                                            title={"Cumulative Schedule"}
                                            style={{
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                              fontFamily: "Inter",
                                              textAlign: "center",
                                              backgroundColor: "#124590",
                                              color: "#fff",
                                              width: "100%",
                                            }}
                                          >
                                            {
                                              data.shiftInformation[value]?.[
                                                "cumulativeHours"
                                              ]
                                            }
                                          </Typography>
                                        )}
                                        <Link
                                          className={`${classes.body_text} ${classes.link_text}`}
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            fontFamily: "Inter",
                                            textAlign: "center",
                                          }}
                                          onClick={() => {
                                            console.log(
                                              "list 2",
                                              shiftInfoList,
                                              data
                                            );
                                            btnClick(
                                              1,
                                              index,
                                              shiftInfoList,
                                              data
                                            );
                                          }}
                                        >
                                          {workDurationCode}
                                        </Link>
                                      </Box>
                                    </Box>
                                  );
                                }
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                      {isEmployeeFilter && (
                        <Box>
                          {option.value.map((data) => {
                            return (
                              <Box className={classes.pagedatamainbox}>
                                <Box className={classes.pagedataarraymainbox}>
                                  {oriPagedata?.header?.dynamicColoums?.length >
                                    0 &&
                                    oriPagedata?.header?.dynamicColoums?.map(
                                      (item) => {
                                        return (
                                          <Box
                                            className={
                                              classes.pagedataoptionmainbox1
                                            }
                                            // onClick={
                                            //   data === undefined && selectAssign
                                            // }
                                            // style={{ cursor: "pointer" }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                fontFamily: "Inter",
                                                color: "black",
                                                width: "100%",
                                              }}
                                            >
                                              {getDefaultValue(
                                                data.workDurationCount[item]
                                              )}
                                            </Typography>
                                          </Box>
                                        );
                                      }
                                    )}
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            );
          })}
          {isEmployeeFilter && (
            <Box
              style={{
                backgroundColor: "rgb(242, 244, 247)",
                width: "fit-content",
              }}
              className={classes.dayarrboxparentlastcolumn}
            >
              {workDurationArr.map((data, d_index) => {
                return (
                  <Stack flexDirection="row">
                    <Box className={classes.pagedatamainboxlastrows}>
                      {days.map((key2, index) => {
                        var shiftCount =
                          oriPagedata?.eachDayShiftCount?.[key2]?.[data];
                        shiftCount = shiftCount ? shiftCount : 0;
                        return (
                          <Box className={classes.pagedataarraymainboxlastrows}>
                            <Box
                              className={classes.pagedataoptionmainboxlastrows}
                            >
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  color: "black",
                                  width: "100%",
                                }}
                              >
                                {shiftCount}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                    <Stack
                      flexDirection={"row"}
                      sx={{ backgroundColor: "rgb(242, 244, 247)" }}
                    >
                      {oriPagedata?.header?.dynamicColoums?.length > 0 &&
                        oriPagedata?.header?.dynamicColoums?.map((item) => {
                          return (
                            <Box>
                              <Box
                                className={
                                  classes.pagedataoptionmainbox1lastrow
                                }
                              />
                            </Box>
                          );
                        })}
                    </Stack>
                  </Stack>
                );
              })}
              {jobtitlesArr.map((data, d_index) => {
                return (
                  <Stack flexDirection="row">
                    <Box className={classes.pagedatamainboxlastrows}>
                      {days.map((key2, index) => {
                        var shiftCount =
                          oriPagedata?.eachDayShiftCount?.[key2]?.[data];
                        shiftCount = shiftCount ? shiftCount : 0;
                        return (
                          <Box className={classes.pagedataarraymainboxlastrows}>
                            <Box
                              className={classes.pagedataoptionmainboxlastrows}
                            >
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  color: "black",
                                  width: "100%",
                                }}
                              >
                                {shiftCount}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                    <Stack
                      flexDirection={"row"}
                      sx={{ backgroundColor: "rgb(242, 244, 247)" }}
                    >
                      {oriPagedata?.header?.dynamicColoums?.length > 0 &&
                        oriPagedata?.header?.dynamicColoums?.map((item) => {
                          return (
                            <Box>
                              <Box
                                className={
                                  classes.pagedataoptionmainbox1lastrow
                                }
                              />
                            </Box>
                          );
                        })}
                    </Stack>
                  </Stack>
                );
              })}
              {days.length > 0 && (
                <Stack flexDirection="row">
                  <Box className={classes.pagedatamainboxlastrows}>
                    {days?.map((key2, index) => {
                      var total = getTotalJobTitleShiftCounts(key2);
                      return (
                        <Box className={classes.pagedataarraymainboxlastrows}>
                          <Box
                            className={classes.pagedataoptionmainboxlastrows}
                          >
                            <Typography
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontFamily: "Inter",
                                color: "black",
                                width: "100%",
                              }}
                            >
                              {total}
                              {/* [{key2}] */}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                  {/* empty boxes */}
                  <Stack
                    flexDirection={"row"}
                    sx={{ backgroundColor: "rgb(242, 244, 247)" }}
                  >
                    {oriPagedata?.header?.dynamicColoums?.length > 0 &&
                      oriPagedata?.header?.dynamicColoums?.map((item) => {
                        return (
                          <Box>
                            <Box
                              className={classes.pagedataoptionmainbox1lastrow}
                            />
                          </Box>
                        );
                      })}
                  </Stack>
                </Stack>
              )}
            </Box>
          )}
          {/* {
                    oriPagedata?.eachDayShiftCount?.length === null ?
                    'hello'
                  :  
                  <Box style={{display:"flex",flexDirection:"row",}}>
                    {
                  Object.keys(oriPagedata?.eachDayShiftCount).map(data => {
                    return    <Box  style={{display:"flex",flexDirection:"column",  borderBottom: "1px solid #E9E9E9 !important",backgroundColor: "#fff !important"}}>{
                        Object.keys(eachDayShiftCount[data]).map(value => {
                            return <Box className={classes.pagedataarraymainbox}>
                                <Box className={classes.pagedataoptionmainbox1} >
                                    <Typography>{eachDayShiftCount[data][value]}</Typography>
                                </Box>
                                 
                            </Box>
                        })
                    }
                    
                    </Box>
                    
                    
                })
            }
            </Box>
                    } */}
        </Box>

        {/* {
                filter === 'Employee' ?
                  
                        <Box style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", marginBottom: "20px" }} className={classes.pagedatamainbox}>
                            {
                                oriPagedata?.header?.dynamicColoums?.length > 0 &&
                                oriPagedata?.header?.dynamicColoums?.map(item => {
                                    return <>
                                        <Box display={{ display: "flex", justifyContent: "flex-end", width: "32%", }} className={classes.pagedatamainbox} >
                                            <Typography style={{ fontSize: "14px", fontFamily: "Inter", backgroundColor: "#BAFFC9", width: "100%", fontWeight: "bold", textAlign: "center" }}>{item}</Typography>
                                        </Box>
                                    </>
                                })
                            }
                        </Box>
        
                      
                    
                    : null
            } */}

        {}
        {localArr?.length == 0 && (
          <>
            <Box sx={{ fontSize: "15px", paddingLeft: "10px" }}>
              No Data to display
            </Box>
            <Box className={classes.innerboxemployeelastrow}>
              <Box className={classes.checkboxparent} />
              <Box className={classes.employeeboxparent} />
              <Box className={classes.jobtitleboxparent} />
              <Box className={classes.shifttypeboxparent} />
              <Box className={classes.bandboxparent} />
            </Box>
          </>
        )}
      </Box>
      {status === 1 && (
        <UpdateRoster
          setStatus1={setStatus}
          datw={dat}
          personRosterId={personRosterId}
          personRosterPivoteId={personRosterPivoteId}
          personIdRoster={personIdRoster}
          departmentIdRoster={departmentIdRoster}
          jobTitleIdRoster={jobTitleIdRoster}
          setSnakeBarProps={setSnakeBarProps}
          getEmployeeList={getEmployeeList}
        />
      )}
      {Assign && (
        <AssignRoster
          togglehandler={setAssign}
          data={data}
          setResult={setResult}
          defaultPerson={onClickDefaultPerson}
          getEmployeeList={getEmployeeList}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </>
  );
};

export default RoasterPersonDetailTable;

const useStyles = makeStyles({
  workdurations_bg: {
    backgroundColor: "#E4D1E8",
  },
  jobtitles_bg: {
    backgroundColor: "#baffc9",
  },
  totaljobtitles_bg: {
    backgroundColor: "#babfff",
  },
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
    width: "100%",
  },
  link_text: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    backgroundColor: "rgb(247,249,252)",
  },
  innermainbox: {
    display: "inline-block",
    // width: "700px",
    verticalAlign: "top",
    borderRight: "1px solid blue",
  },
  innerboxemployee: {
    display: "flex !important",
    // padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    height: 50,
  },
  innerboxemployeelastrow: {
    display: "inline-flex",
    // padding: "15px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    height: 40,
    borderRight: "1px solid blue",
  },
  totalschedulehrs: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 50,
    fontSize: "15px",
  },
  checkboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    width: 50,
    borderRight: borderRight,
  },
  departmentrowstyles: {
    borderRight: "0px !important",
  },
  employeeboxparent: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    minWidth: 230,
    borderRight: borderRight,
  },
  employeetext: {
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  jobtitleboxparent: {
    minWidth: 200,
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: borderRight,
  },
  jobtitletext: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  shifttypeboxparent: {
    minWidth: 100,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: borderRight,
  },
  bandboxparent: {
    minWidth: 60,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: borderRight,
  },
  actionsboxparent: (props) => ({
    minWidth: 70,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: props.isEmployeeFilter ? "" : borderRight,
  }),
  totalschhoursboxparent: {
    minWidth: 110,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedatamainboxdynamicrows: {
    display: "flex",
    // backgroundColor: "#fff",
    height: 42,
    width: "min-content",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
    height: 42,
    // width: "min-content",
  },
  pagedatamainboxlastrows: {
    display: "flex",
    // backgroundColor: "#fff",
    height: 42,
  },

  pagedatamainbox1: {
    display: "flex !important",
    flexDirection: "column",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
  },
  // checkboxparent: {
  //   padding: "0 8px",
  //   width: 200,
  //   display: "flex !important",
  //   alignItems: "center !important",
  // },
  itemfullname: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    // width: "calc(100% - 60px) !important",
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
  },
  itemshifttypeparent: {
    width: 80,
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
  iconparent: (props) => ({
    minWidth: 70,
    display: "flex",
    alignItems: "center",
    borderRight: props.isNotEmployeed ? borderRight : "",
  }),
  FileCopyIcon: {
    color: "#124590 !important",
    fontSize: "medium !important",
    marginLeft: "15px !important",
  },
  deleteCopyIcon: {
    color: "#D90000 !important",
    fontSize: "medium !important",
    marginLeft: "15px !important",
    cursor: "pointer",
  },
  dayArrmainbox: {
    width: (props) => {
      return `calc(100% - ${props.minWidth}px) !important`;
    },
    // overflow: "auto !important",
    display: "inline-block !important",
  },
  dayarrboxparent: {
    display: "inline-flex !important",
    padding: "1px 0 !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#F1F1F1 !important",
    minHeight: 50,
    textAlign: "right",
  },
  dayarrboxparentlastcolumn: {
    borderRight: borderRight,
    width: "max-content",
  },
  optionboxparent: {
    width: 100,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    borderRight: borderRight,
  },
  optionboxparent1: {
    width: 130,
    justifyContent: "flex-end !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRight: borderRight,
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
    width: 80,
    justifyContent: "flex-end !important",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  pagedataarraymainbox: {
    display: "inline-flex !important",
    // borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
  },
  pagedataarraymainboxlastrows: {
    display: "inline-flex",
  },
  pagedataoptionmainboxlastrows: {
    width: 100,
    borderRight: borderRight,
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    textAlign: "right",
    padding: "8px",
  },
  pagedataoptionmainbox: {
    width: 100,
    borderRight: borderRight,
    minHeight: 40.7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addicon: {
    cursor: "pointer",
    color: "blue",
  },
  pagedataoptionmainboxspecialrow: {
    fontSize: "15px",
    width: 100,
    // borderRight: borderRight,
    minHeight: 40.7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagedataoptionmainbox2: {
    width: 80,
    justifyContent: "center !important",
    borderLeft: borderLeft,
    borderRight: borderRight,
    minHeight: 40.7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "0 8px",
    // overflow:"hidden",
    // whiteSpace:"nowrap",
    // width:"100%",
  },
  pagedataoptionmainbox1: {
    width: 130,
    justifyContent: "center !important",
    borderLeft: "1px solid rgb(233, 233, 233) !important",
    minHeight: 40.7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px",
    textAlign: "right",
    // overflow:"hidden",
    // whiteSpace:"nowrap",
    // width:"100%",
  },
  pagedataoptionmainbox1lastrow: {
    width: 130,
    justifyContent: "center !important",
    borderLeft: "1px solid rgb(233, 233, 233) !important",
    minHeight: 40.7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(242, 244, 247)",
  },
  pagedataarraymainbox1: {
    display: "flex !important",
    flexDirection: "row",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
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
    width: 80,
    justifyContent: "flex-end",
    borderLeft: "1px solid rgb(233, 233, 233)",
    minHeight: 42,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
});
