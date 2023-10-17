import { Box, Typography } from "@mui/material";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CustomTextField } from "../../../../components/TextField";

const LabelCell = ({ label, numeric, width }) => (
  <Box
    style={{
      width: width || 120,
      alignItems: "center",
      justifyContent: numeric ? "right" : "left",
      display: "flex",
      borderRight: "1px solid rgb(194 187 187)",
    }}
  >
    <Typography
      style={{
        textAlign: numeric ? "right" : "left",
        fontSize: "14px",
        fontFamily: "Inter",
        fontWeight: "bold",
        margin: "5px",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
      }}
    >
      {label}
    </Typography>
  </Box>
);

const HourCell = ({ hour, numeric, showBlank, width, onChange }) => (
  <Box
    style={{
      width: width || 120,
      alignItems: "center",
      display: "flex",
      justifyContent: numeric ? "right" : "left",
      borderRight: "1px solid #b8b5b5",
    }}
  >
    <Typography
      style={{
        textAlign: numeric ? "right" : "left",
        margin: onChange ? "2px" : "5px",
        fontSize: "13px",
        fontFamily: "Inter",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
      }}
    >
      {onChange ? (
        <CustomTextField
          onChange={onChange}
          defaultValue={hour}
          textAlign={numeric ? "right" : "left"}
        />
      ) : (
        hour
      )}
    </Typography>
  </Box>
);

export { LabelCell, HourCell };
