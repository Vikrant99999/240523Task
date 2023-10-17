import { Box, Typography } from "@mui/material";
import React from "react";
import { Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { CustomAutoComplete } from "../../../../../components/CustomAutoComplete";
import {
  dateConverter,
  dateConverterWithoutYear,
} from "../../../../../utils/commonService";

import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { useEffect } from "react";
import { updateState } from "../../../../../redux/commonSlice";

export const DateWidget = (props) => {
  const classes = useStyles();

  const { setAppStatus, dateWidgetOption, durationFilter } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateForText, setStartDateForText] = useState("");
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(
    dateWidgetOption[0]
  );
  const [dayDiff, setDayDiff] = useState(6);

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
        dateRangeType: dateWidgetSelectedOption.type,
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
    // setAppStatus("");
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
    setAppStatus("");
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
    <>
      <ChevronLeftIcon className={classes.enddate} onClick={prevDate} />
      <Box>{_renderDateValue()}</Box>
      <ChevronRightIcon className={classes.nextdate} onClick={nextDate} />
      <Box>
        <Box className="calender-widget-wrap" onClick={handleClick}>
          <Typography component="span" className={classes.calenderdropdown}>
            {commonReducer.startDate}
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
          <Box
            sx={{
              ".react-datepicker": {
                border: "none",
              },
            }}
          >
            <DatePicker
              selected={
                startDateForText == "" ? startDate : new Date(startDateForText)
              }
              onChange={handleChange}
              inline
            />
          </Box>
        </Popover>
      </Box>
      {durationFilter && (
        <CustomAutoComplete
          id="Duration"
          required
          options={dateWidgetOption}
          getoptionlabelkey="label"
          selectedvalue={dateWidgetSelectedOption}
          onChange={(_event, newData) => {
            // setAppStatus("");
            onOptionChange(newData);
            // setDateWidgetSelectedOption(newData)
          }}
          className={classes.duration}
        />
      )}
    </>
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
