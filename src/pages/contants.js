import { Box, Typography } from "@mui/material";
import moment from "moment";

export const FilterArray = [
  { id: 1, label: "No Filter", value: "" },
  { id: 2, label: "Not Submitted", value: "N" },
  { id: 3, label: "Pending Approval", value: "P" },
  { id: 4, label: "Approved", value: "A" },
];

export const dashboardDateWidgetOption = [
  { id: 1, label: "Weekly", value: "1", type: "weeks" },
  { id: 2, label: "Bi-Weekly", value: "2", type: "weeks" },
  // { id: 2, label: "Three-Weekly", value: "2", type: "weeks" },
  // { id: 3, label: "Monthly", value: "1", type: "months" },
  // { id: 4, label: "6 Month", value: "6", type: "months" }
];

export const teamDateWidgetOption = [
  { id: 1, label: "Day", value: "1", type: "day" },
  { id: 2, label: "Weekly", value: "1", type: "weeks" },
];

export const productivityDateWidgetOption = [
  { id: 1, label: "Weekly", value: "1", type: "weeks" },
  { id: 2, label: "Monthly", value: "1", type: "months" },
];

export const rosterDateWidgetOption = [
  { id: 1, label: "Weekly", value: "1", type: "weeks" },
  { id: 1, label: "2 Weeks", value: "2", type: "weeks" },
  { id: 1, label: "4 Weeks", value: "4", type: "weeks" },
  { id: 1, label: "6 Weeks", value: "6", type: "weeks" },
  { id: 1, label: "8 Weeks", value: "8", type: "weeks" },
  { id: 1, label: "12 Weeks", value: "12", type: "weeks" },
  { id: 1, label: "16 Weeks", value: "16", type: "weeks" },
  { id: 1, label: "18 Weeks", value: "18", type: "weeks" },
];

export const dashboardSelectCardInfo = [
  {
    label: "Scheduled Hrs",
    mappedKey: "schHrs",
    mapClass: "totalpersonboxtext1",
  },
  {
    label: "Working Hours",
    mappedKey: "wrkHrs",
    mapClass: "totalpersonboxtext2",
  },
  {
    label: "Overtime 125",
    mappedKey: "overtime150",
    mapClass: "totalpersonboxtext3",
  },
  {
    label: "Paid Leave Hrs",
    mappedKey: "paidLeaveHrs",
    mapClass: "totalpersonboxtext5",
  },
  {
    label: "Unpaid Leave Hrs",
    mappedKey: "unpaidLeaveHrs",
    mapClass: "totalpersonboxtext6",
  },
  {
    label: "Holiday Hrs",
    mappedKey: "holidayHours",
    mapClass: "totalpersonboxtext3",
  },
];

export const teamSelectCardInfo = [
  {
    label: "Scheduled Hrs",
    mappedKey: "schHrs",
    mapClass: "totalpersonboxtext1",
  },
  {
    label: "Working Hours",
    mappedKey: "actHrs",
    mapClass: "totalpersonboxtext2",
  },
];

export const teamViolationCardInfo = [
  {
    label: "No Show No Reason",
  },
  {
    label: "Late",
  },
  {
    label: "Left Early",
  },
];

export const teamtableHeader = [
  { label: "Employee Name", mapClass: "personParent_h" },
  { label: "Effective Date", mapClass: "effectiveParent" },
  { label: "Request", mapClass: "requestParent" },
  { label: "Department", mapClass: "departmentParent" },
  { label: "Job Title", mapClass: "jobtitleboxparent" },
];

export const requestDetailtableHeader = [
  { label: "Details", width: "1" },
  { label: "Request Type", width: "2" },
  { label: "Start Date", width: "2" },
  { label: "End Date", width: "2" },
  { label: "Time/Hours", width: "2" },
  { label: "Creation Date", width: "2" },
  { label: "Status", width: "1" },
];
export const dashboardTimesheetTableHeader = [
  { mappedKey: "Time (Hours)", width: "1.5" },
  { mappedKey: "Project Name", width: "2" },
  { mappedKey: "Task", width: "2" },
  { mappedKey: "PayCode", width: "2" },
  { mappedKey: "Comments", width: "1.5" },
  { mappedKey: "", width: "2" },
  { mappedKey: "Hours", width: "1" },
];
export const timesheetTableHeader = [
  { mappedKey: "", width: "1" },
  { mappedKey: "Time or Hours", width: "2.2" },
  { mappedKey: "Department", width: "2" },
  { mappedKey: "Job", width: "1.6" },
  { mappedKey: "PayCode", width: "1.7" },
  { mappedKey: "Comments", width: "1" },
  { mappedKey: "", width: "0.5" },
  {
    mappedKey: "Hrs",
    width: "1.5",
    style: { display: "flex", direction: "rtl" },
  },
];

export const setCardValueByType = (type, arr) => {
  let sum = arr?.reduce(
    (acc, val) => acc + (val?.[type] == null ? 0 : parseFloat(val?.[type])),
    0
  );

  return sum > 0 ? sum.toFixed(2).replace(/[.,]00$/, "") : 0;
};

export const _renderCardInfo = (item, arr, classes) => {
  return (
    <Box
      px={2}
      borderRight="1px solid rgb(233, 233, 233)"
      className={classes.totalpersonbox}
    >
      <Typography style={{ fontSize: 18 }} className={classes[item.mapClass]}>
        {setCardValueByType(item.mappedKey, arr)}
      </Typography>
      <Typography variant="h7" fontSize="0.75em">
        {item.label}
      </Typography>
    </Box>
  );
};

export const setCardValueByType2 = (type, arr) => {
  let sum = 0;
  for (const ele of arr) {
    for (const elseData of ele.data) {
      if (elseData.weeklyData[0][type] != undefined) {
        sum += elseData.weeklyData[0][type];
      }
    }
  }

  return sum > 0 ? sum.toFixed(2).replace(/[.,]00$/, "") : 0;
};

export const _renderCardInfo2 = (item, arr, classes) => {
  return (
    <Box
      px={2}
      borderRight="1px solid rgb(233, 233, 233)"
      className={classes.totalpersonbox}
    >
      <Typography style={{ fontSize: 18 }} className={classes[item.mapClass]}>
        {setCardValueByType2(item.mappedKey, arr)}
      </Typography>
      <Typography variant="h7" fontSize="0.75em">
        {item.label}
      </Typography>
    </Box>
  );
};

export const _renderViolationCardInfo = (item, arr, classes) => {
  return (
    <Box px={2} className={classes.totalpersonbox}>
      <Typography
        style={{ fontSize: "20px" }}
        color="#ee66ab"
        className={classes[item.mapClass]}
      >
        {arr.filter((a) => a.violationCode?.includes(item.label)).length}
      </Typography>
      <Typography variant="h7">{item.label}</Typography>
    </Box>
  );
};

export const _formatTimeHour = (value) => {
  // console.log('value_formatTimeHour', value)
  if (value && value != "" /* && !value.includes(":") **/) {
    // console.log('value', value)
    var errorMsz = "";
    var formattedValue = value;

    const reg = new RegExp(
      "[0-9]{1,2}[.]?[0-9]{1,2}?[-][0-9]{1,2}[.]?[0-9]{1,2}"
    );
    const digitOnlyRegex = new RegExp("^[0-9]{0,2}[.]?[0-9]{1,2}?$");

    if (reg.test(value)) {
      // console.log('first', "222")
      var startTime = value.split("-")[0];
      var endTime = value.split("-")[1];
      if (startTime > 24) {
        errorMsz = "StartTime is not greater than 24";
      }
      if (endTime > 24) {
        errorMsz = "EndTime is not greater than 24";
      }
      if (startTime > endTime) {
        errorMsz = "EndTime is not greater than start time";
      } else {
        var localValue = `${moment(startTime, "LT").format(
          "hh:mm A"
        )} - ${moment(endTime, "LT").format("hh:mm A")}`;
      }
      return { errorMsz: errorMsz, formattedValue: localValue };
    } else if (digitOnlyRegex.test(value)) {
      if (value > 24) {
        errorMsz = "Value is not greater than 24";
      }
      return { errorMsz: errorMsz, formattedValue: formattedValue };
    } else {
      return {
        errorMsz:
          "Enter value in correct format (hh, hh-hh, hh.m-hh.m, hh.mm-hh.mm,)",
        formattedValue: formattedValue,
      };
    }
  } else {
    return { errorMsz: "", formattedValue: formattedValue };
  }
};

export const _formatTime = (value) => {
  if (value && value != "" && !value.includes(":")) {
    var errorMsz = "";
    var formattedValue = value;
    const reg = new RegExp("^[0-9]{1,2}[.][0-9]{1,2}$");
    const digitOnlyRegex = new RegExp("^[0-9]{1,}$");

    return digitOnlyRegex.test(value)
      ? commonLogicForTimeFormat(value, errorMsz, formattedValue)
      : reg.test(value)
      ? commonLogicForTimeFormat(value, errorMsz, formattedValue)
      : {
          errorMsz: "Enter value in correct format (12|24)",
          formattedValue: formattedValue,
        };
  } else {
    return { errorMsz: "", formattedValue: value };
  }
};
const commonLogicForTimeFormat = (value, errorMsz, formattedValue) => {
  // console.log('value', value)
  if (value > 24) {
    errorMsz = "Value is not greater than 24";
  } else {
    var val = moment(value, "LT").format("hh:mm A");
    formattedValue = val == "Invalid date" ? value : val;
  }
  // console.log('formattedValue', formattedValue)
  return { errorMsz: errorMsz, formattedValue: formattedValue };
};

export const uniqueArrByKey = (arr, key) => {
  return [...new Map(arr?.map((item) => [item[key], item])).values()];
};

export const checkNull = (value) => {
  return value == null ? "" : value;
};
