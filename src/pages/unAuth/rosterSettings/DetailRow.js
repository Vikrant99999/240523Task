import React, { useState } from "react";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import { _formatTime } from "../../contants";
import { useEffect } from "react";
import { dateConverter } from "../../../utils/commonService";
import moment from "moment";

const DetailRow = (props) => {
  const {
    endTimeCriteria,
    edit,
    workDurationDetailArr,
    val,
    item,
    setVal,
    index,
    starTime,
    timeDiff,
  } = props;

  const [startTimeCriteria, setStartTimeCriteria] = useState(null);

  const [onBlurFlag, setOnBlurFlag] = useState(false);

  const [itemdup, setItem] = useState(item);

  const startTime = item?.startTime?.split("T");
  const endTime = item?.endTime?.split("T");
  const timediff = timeDiff(startTime[1], endTime[1]);

  const workDurationDetailTypeName = [
    {
      value: "S",
      label: "Start",
    },
    {
      value: "L",
      label: "Lunch",
    },
    {
      value: "D",
      label: "Dinner",
    },
    {
      value: "B",
      label: "Break",
    },
    {
      value: "T",
      label: "Tea",
    },
  ];

  const effectDayOptions = [
    {
      value: 11,
      label: "1",
    },

    {
      value: 12,
      label: "2",
    },
  ];

  const createOptions = (arr) => {
    return arr.map((item) => ({
      value: item.value,
      label: item.label,
    }));
  };

  const makeStartTimeInVal = (value) => {
    const newVals = val.map((el, i) => {
      if (i === index) {
        return {
          ...el,
          startTime:
            dateConverter(moment(starTime).format("DD-MM-YYYY")) + "T" + value,
        };
      }
      return { ...el };
    });
    setVal(newVals);
  };

  const [effectDay, setEffectDay] = useState(
    effectDayOptions.find((fn) => fn.value === item.effectDay)
  );
  if (!effectDay && edit != undefined && item.id) {
    setEffectDay({
      value: 11,
      label: "1",
    });
  }

  return (
    <Box
      style={{
        display: "flex ",
        backgroundColor: "#fff",
        padding: "5px 0px",
      }}
    >
      <Box style={{ width: "20%" }}>
        <Autocomplete
          id="Type Name"
          disableClearable
          required
          defaultValue={item.typeName}
          options={createOptions(workDurationDetailTypeName)}
          renderInput={(params) => <TextField {...params} />}
          ListboxProps={{ fontSize: "14px", fontFamily: "Inter" }}
          value={workDurationDetailTypeName.find(
            (fn) => fn.value === item.typeName[0]
          )}
          onChange={(el, newVal) => {
            const newVals = val.map((el, i) => {
              if (i === index) {
                return { ...el, typeName: newVal.value };
              }
              return { ...el };
            });
            setVal(newVals);
          }}
        />
      </Box>
      <Box style={{ width: "20%", marginLeft: "5px" }}>
        <Autocomplete
          id="Effect Day"
          required
          disableClearable
          defaultValue={effectDay?.label}
          options={createOptions(effectDayOptions)}
          renderInput={(params) => <TextField {...params} />}
          ListboxProps={{ fontSize: "14px", fontFamily: "Inter" }}
          value={effectDay?.label}
          onChange={(el, newVal) => {
            const newVals = val.map((el, i) => {
              if (i === index) {
                return { ...el, effectDay: newVal.value };
              }
              return { ...el };
            });
            setEffectDay(newVal);
            setVal(newVals);
          }}
        />
      </Box>
      <Box style={{ width: "20%", marginLeft: "5px" }}>
        <CustomTextField
          type="text"
          // value="13"
          value={startTime?.[1]}
          // value={startTimeCriteria}
          onChange={(e) => {
            setOnBlurFlag(false);
            setStartTimeCriteria(e.target.value);
            makeStartTimeInVal(e.target.value);
          }}
          onBlur={(e) => {
            setOnBlurFlag(true);
            setStartTimeCriteria(_formatTime(e.target.value).formattedValue);
            makeStartTimeInVal(_formatTime(e.target.value).formattedValue);
          }}
          required={true}
          error={onBlurFlag && _formatTime(startTimeCriteria).errorMsz != ""}
          errorMsz={onBlurFlag && _formatTime(startTimeCriteria).errorMsz}
        />
      </Box>
      <Box style={{ width: "20%", display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            textAlign: "center",
            marginLeft: "8px",
          }}
        >
          {/* {endTimeCriteria} */}
          {endTime[1] ? endTime[1] : endTime[0]}
        </Typography>
      </Box>
      <Box style={{ width: "20%", display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            textAlign: "center",
            marginLeft: "8px",
          }}
        >
          {item.duration || item.duration == 0
            ? Number(item.duration).toFixed(2)
            : timediff && timediff != 0
            ? Number(timediff).toFixed(2)
            : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailRow;
