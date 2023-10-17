import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

import React, { useEffect, useState } from "react";
import CustomCheckBox from "../../../components/CustomCheckBox";

const DurationTable = (props) => {
  const classes = useStyles();
  const {
    workDurationArr,
    workDurationArrSelected,
    workDurationIds,
    handleCheck,
  } = props;
  const [onlySelected, setOnlySelected] = useState("");
  const [shiftArray, setShiftArray] = useState(true);

  useEffect(() => {
    setShiftArray(
      onlySelected
        ? workDurationArr?.filter((item) =>
            workDurationIds?.includes(parseInt(item.id))
          )
        : workDurationArr
    );
  }, [onlySelected]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomCheckBox
          check={onlySelected}
          onChangeCheck={(e) => setOnlySelected(e)}
        />
        <Typography style={{ fontSize: "14px", fontFamily: "Inter" }}>
          Show only Selected
        </Typography>
      </Box>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxemployee}>
            <Box style={{ width: "15%" }}>
              <Typography></Typography>
            </Box>
            <Box style={{ width: "85%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Work Duration
              </Typography>
            </Box>
          </Box>
          {shiftArray?.length > 0 ? (
            shiftArray?.map((option, index) => {
              return (
                <Box className={classes.pagedatamainbox}>
                  <Box style={{ width: "15%" }}>
                    <CustomCheckBox
                      check={
                        workDurationArrSelected?.indexOf(parseInt(option.id)) >
                        -1
                      }
                      onChangeCheck={(e) => handleCheck(e, parseInt(option.id))}
                    />
                  </Box>
                  <Box style={{ width: "85%" }}>
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      {option?.value}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "Inter",
                margin: "5px",
                // textAlign: "center",
              }}
            >
              No data to display
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DurationTable;
const useStyles = makeStyles((theme) => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    height: "calc(100vh - 350px)",
    overflow: "auto",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
  },
  innerboxemployee: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    // position: "absolute",
    width: "100%",
  },
  pagedatamainbox: {
    display: "flex !important",

    alignItems: "center",
    flexDirection: "row",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
}));
