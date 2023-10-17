import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from "@material-ui/styles";
import DurationData from "./DurationData";
import SplitShit from "./SplitShit";

const useStyles = makeStyles((theme) => ({
  WorkDurationRadio: {
    display: "flex",
    flexDirection: "row",
  },
  text1: {
    fontSize: "10px",
    fontFamily: "Inter",
    fontWeight: "Bold",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
  },
}));

const WorkDuration = (props) => {
  const classes = useStyles();
  const {
    workDurationArr,
    onCountryChange,
    resetIndex,
    index,
    selectedValue,
    handleChange1,
    state,
    setState,
    setSelectedValue,
    selectWorkDuration,
    worksee,
    CheckDays,
    setCheckDays,
  } = props;
  const [status, setStatus] = React.useState(1); // 0: no show, 1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };
  useEffect(() => {
    if (status === 1) {
      resetIndex();
    }
  }, [status]);

  return (
    <>
      <Grid>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Work Duration"
              control={
                <Radio
                  checked={status === 1}
                  onClick={(e) => radioHandler(1)}
                />
              }
              label={
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "Bold",
                  }}
                >
                  Work Duration
                </Typography>
              }
            />

            <FormControlLabel
              value="Split Shift"
              control={
                <Radio
                  checked={status === 2}
                  onClick={(e) => radioHandler(2)}
                />
              }
              label={
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "Bold",
                  }}
                >
                  Split Shift
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        {status === 1 && (
          <DurationData
            workDurationArr={workDurationArr}
            index={index}
            onCountryChange={onCountryChange}
            selectedValue={selectedValue}
            handleChange1={handleChange1}
            state={state}
            setState={setState}
            setSelectedValue={setSelectedValue}
            selectWorkDuration={selectWorkDuration}
            worksee={worksee}
            CheckDays={CheckDays}
            setCheckDays={setCheckDays}
          />
        )}
        {status === 2 && <SplitShit />}
      </Grid>
    </>
  );
};

export default WorkDuration;
