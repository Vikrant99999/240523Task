import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import "react-datepicker/dist/react-datepicker.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { CustomAutoComplete } from "../../../../../components/CustomAutoComplete";
import {
  dateConverter,
  dateConverterWithoutYear,
} from "../../../../utils/commonService";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { updateState } from "../../../../redux/commonSlice";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { CustomButton } from "../../../../components/Button";
// import { updateState } from "../../../../../redux/commonSlice";

export const DatewidgetPayroll = (props) => {
  const classes = useStyles();

  const { setAppStatus, paycode, setPaycode } = props;
  const dateWidgetOption = {
    id: 2,
    label: "Monthly",
    value: "1",
    type: "months",
  };
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateForText, setStartDateForText] = useState("");
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] =
    useState(dateWidgetOption);
  const [dayDiff, setDayDiff] = useState(6);
  const dropdownOptions = [
    { id: 1, label: "All PayCode", value: "1" },
    { id: 2, label: "Overtime 125", value: "2" },
    { id: 3, label: "TOIL", value: "3" },
    { id: 4, label: "Overtime 150", value: "4" },
    { id: 5, label: "Proximate - On Call", value: "5" },
    { id: 6, label: "Telephone - On Call", value: "6" },
    { id: 7, label: "Remote - On Call", value: "7" },
    { id: 8, label: "Re-Call - 125", value: "8" },
    { id: 9, label: "Re-Call - 150", value: "9" },
    { id: 10, label: "Speciality Overtime 125", value: "10" },
    { id: 11, label: "Lapse Hours", value: "11" },
    { id: 12, label: "Rest Day OT 125", value: "12" },
    { id: 13, label: "Rest Day OT 150", value: "13" },
    { id: 14, label: "Public Holiday (Rest Day)", value: "14" },
    { id: 15, label: "Project Hours", value: "15" },
  ];
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    let weekDay = moment(commonReducer.oriDate).isoWeekday();
    commonReducer.oriDate
      ? commonLogic(
          "diff",
          moment(commonReducer.oriDate).add(-1 * weekDay, "days")
        )
      : commonLogic("", moment());
  }, [dayDiff]);

  useEffect(() => {
    if (Object.keys(dateWidgetSelectedOption).length > 0) {
      var a = moment(new Date(startDate));
      var b = a.add(
        dateWidgetSelectedOption.value,
        dateWidgetSelectedOption.type
      );
      // debugger
      setDayDiff(
        (moment(new Date(startDate)).diff(moment(b), "days") + 1) * -1
      );
    }
  }, [dateWidgetSelectedOption]);

  const commonLogic = (type, e) => {
    var a =
      dateWidgetSelectedOption.type != "months"
        ? moment(new Date(e))
        : moment(new Date(e)).startOf("month");
    var b = a.add(
      dateWidgetSelectedOption.value,
      dateWidgetSelectedOption.type
    );

    var localDiff =
      dateWidgetSelectedOption.type != "months"
        ? (moment(new Date(e)).diff(moment(b), "days") + 1) * -1
        : (moment(new Date(e)).startOf("month").diff(moment(b), "days") + 1) *
          -1;
    var localDayArr = [];
    for (var i = 0; i <= localDiff; i++) {
      localDayArr.push(
        type == "diff"
          ? moment(e).add(i, "days").format("DD")
          : moment().add(i, "days").format("DD")
      );
    }

    var localStartDay = type == "diff" ? moment(e) : moment();
    const lastDay = localStartDay.add(localDiff, "days").format("DD-MM-YYYY");
    console.log("lastDay", lastDay);
    dispatch(
      updateState({
        oriDate: type == "diff" ? moment(e).format() : startDate,
        startDate:
          type == "diff"
            ? dateWidgetSelectedOption.type != "months"
              ? moment(e).format("DD-MM-YYYY")
              : moment(e).startOf("month").format("DD-MM-YYYY")
            : moment().format("DD-MM-YYYY"),
        endDate: lastDay,
        dayArr: localDayArr,
      })
    );
  };

  const handleChange = (e) => {
    var localDate =
      dateWidgetSelectedOption.type == "day"
        ? new Date(moment(e).format())
        : dateWidgetSelectedOption.type != "months"
        ? new Date(moment(e).startOf("week").format())
        : new Date(moment(e).startOf("month").format());
    console.log("localDate", localDate);

    setStartDateForText(
      e.getMonth() + 1 + "-" + e.getDate() + "-" + e.getFullYear()
    );
    // setStartDate(dateConverter);
    setAnchorEl(null);
    //setPaycode("");
    commonLogic("diff", localDate);
  };

  const onOptionChange = (newData) => {
    var localDate =
      startDateForText == ""
        ? new Date(moment(startDate).format())
        : new Date(moment(startDateForText).startOf("week").format());
    // console.log('localDate', localDate)
    setDateWidgetSelectedOption(newData);
    setAnchorEl(null);
    //setPaycode("");
    commonLogic("diff", localDate);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFormattedDate = (currentDate) => {
    return moment(currentDate).format("DD-MM-YYYY");
  };

  const prevDate = () => {
    commonLogic(
      "diff",
      moment(commonReducer.oriDate ? commonReducer.oriDate : null)
        .add(-dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
        .format()
    );
    // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() - 7)))
  };
  const nextDate = () => {
    commonLogic(
      "diff",
      moment(commonReducer.oriDate ? commonReducer.oriDate : null)
        .add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
        .format()
    );
    // setStartDate(new Date(startDate.setDate(startDate.getDate() - startDate.getDay() + 7)))
  };

  const _renderDateValue = () => {
    return dateWidgetSelectedOption.type != "day"
      ? `${dateConverterWithoutYear(
          commonReducer.startDate
        )} to ${dateConverterWithoutYear(commonReducer.endDate)}`
      : `${dateConverterWithoutYear(commonReducer.startDate)}`;
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <ChevronLeftIcon className={classes.enddate} onClick={prevDate} />
      <Box>{_renderDateValue()}</Box>
      <ChevronRightIcon className={classes.nextdate} onClick={nextDate} />
      <Box style={{ marginLeft: "30px" }}>
        <Box className="calender-widget-wrap" onClick={handleClick}>
          <Typography component="span" className={classes.calenderdropdown}>
            {startDateForText == ""
              ? dateConverter(getFormattedDate(startDate))
              : dateConverter(getFormattedDate(startDateForText))}
            <CalendarMonthIcon className={classes.calendericon} />
          </Typography>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <DatePicker
            selected={
              startDateForText == "" ? startDate : new Date(startDateForText)
            }
            onChange={handleChange}
            inline
          />
        </Popover>
      </Box>
      <Typography style={{ marginLeft: "20px" }}>Paycode</Typography>
      <Autocomplete
        style={{ marginLeft: "20px", marginRight: "20px" }}
        disableClearable
        required
        options={dropdownOptions}
        // popupIcon={<ArrowDropDownIcon fontSize='large' style={{ marginRight: 0 }} />}
        getoptionlabelkey="label"
        sx={{ width: 200 }}
        value={
          paycode === "All PayCode" ? dropdownOptions[0] : dropdownOptions[1]
        }
        onChange={(_event, newData) => {
          console.log(newData);
          setPaycode(newData.label);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <CustomButton btnText="Go" variant="contained" color="primary" />
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  enddate: {
    color: "#124590",
    cursor: "pointer",
  },
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center !important",
  },
  duration: {
    width: "140px !important",
    marginLeft: "10px !important",
  },

  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  nextdate: {
    verticalAlign: "bottom",
    cursor: "pointer",
    color: "#124590",
  },
}));
