export const afterValidate = (callBack, setSnakeBarProps) => {
  var errorMszDom = [];
  setTimeout(() => {
    errorMszDom = document.getElementsByClassName("errorDom");
    if (errorMszDom.length == 0) {
      callBack();
    } else {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please fill all the required field",
        type: "error",
      });
    }
  });
};

export const setInput = (value, type, pageData, setPageData) => {
  setPageData({ ...pageData, [type]: value });
};
var mnths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateConverter = (str) => {
  if (typeof str == "string") {
    // console.log('str', typeof (str))
    var date = str?.split("-");
    var mnth = mnths[date[1] - 1];
    return `${date[0]}-${mnth}-${date[2]}`;
  } else {
    return null;
  }
};

export const dateConverterForProductivity = (str) => {
  if (typeof str == "string") {
    let date = str?.split("-");
    return `${date[2]}-${date[1]}-${date[0]}`;
  } else {
    return null;
  }
};

export const dateConverterWithoutYear = (str) => {
  if (typeof str == "string") {
    // console.log('str', typeof (str))
    var date = str?.split("-");
    var mnth = mnths[date[1] - 1];
    return `${date[0]}-${mnth}`;
  } else {
    return null;
  }
};

export const isMatched = (value, searchValue) => {
  //  if it is true that means its a string otherwise number
  console.log(value,"isNaN(searchValue)");
  return isNaN(searchValue)
    ? value.trim().toLowerCase().includes(searchValue.toLowerCase())
    : value.toString().includes(searchValue.toString());
};
export const filterArr = (filterData, keysArr) => {
  console.log("hello");
  keysArr.map((searchFields) => {
    console.log(searchFields, "jijijijiji");
    if (searchFields.value !== "") {
      filterData = filterData.filter((item) =>
        isMatched(
          "key" in searchFields
            ? item[searchFields.key]
            : searchFields.method(item),
          searchFields.value
        )
      );
    }
  });
  return filterData;
};

export const PAYCODES = {
  schHrs: { color: "#47BDEF", order: 1 },
  wrkHrs: { color: "#4a85c5", order: 2 },
  regularHrs: { color: "#F4AA46", order: 3 },
  compOffOvertime: { color: "#ee66ab", order: 4 },
  lapsHours: { color: "#ee66ab", order: 5 },
  overtime125: { color: "#ee66ab", order: 6 },
  overtime150: { color: "#ee66ab", order: 7 },
  projectHrs: { color: "#ee66ab", order: 8 },
  proximateOnCall: { color: "#ee66ab", order: 9 },
  publicHolidayRestDay: { color: "#ee66ab", order: 10 },
  reCall125: { color: "#ee66ab", order: 11 },
  reCall150: { color: "#ee66ab", order: 12 },
  restDayOt125: { color: "#ee66ab", order: 13 },
  restDayOt150: { color: "#ee66ab", order: 14 },
  specialtyOvertime125: { color: "#ee66ab", order: 15 },
  toil: { color: "#ee66ab", order: 16 },
  telephoneOnCall: { color: "#ee66ab", order: 17 },
  paidLeaveHrs: { color: "#af3c66", order: 18 },
  unpaidLeaveHrs: { color: "#ed6647", order: 19 },
  missingHrs: { color: "#ee66ab", order: 20 },
  departEarlyHrs: { color: "#ee66ab", order: 21 },
  arriveLateHrs: { color: "#ee66ab", order: 22 },
  remoteOnCall: { color: "#ee66ab", order: 23 },
  totalViolations: { color: "#ee66ab", order: 24 },
  totalPerson: { color: "#3CAF85", order: 100 },
};

export const sortPaycodes = (arr) => {
  arr = arr.map((item) => {
    return {
      ...item,
      order: PAYCODES[item.mappingKey]?.order
        ? PAYCODES[item.mappingKey].order
        : 1000,
    };
  });
  arr.sort((a, b) => (a.order < b.order ? -1 : 1));
  arr = arr.map((item) => {
    delete item.order;
    return { ...item };
  });
  return arr;
};

export const updatePreviousURL = (dispatch, updateState) => {
  const key = "previous_url";
  var currentPath = window.location.origin + window.location.pathname;
  dispatch(updateState({ [key]: currentPath }));
};

export const isPreviousURLMatched = (commonReducer) => {
  const key = "previous_url";
  var currentPath = window.location.origin + window.location.pathname;
  return key in commonReducer ? commonReducer[key] === currentPath : false;
};
