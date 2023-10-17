import { Autocomplete } from "@material-ui/lab";
import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { TextField } from "@mui/material";

export const CustomAutoComplete = (props) => {
  const {
    id,
    getoptionlabelkey,
    selectedvalue,
    defaultValue,
    errorMsz,
    error = false,
    required = false,
    multiple = false,
    readonly = false,
  } = props;
  // console.log('first', multiple, selectedvalue)
  console.log(defaultValue, "defaultValue");
  return (
    <>
      <Autocomplete
        id={id}
        defaultValue={defaultValue}
        multiple={multiple}
        popupIcon={
          <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
        }
        getOptionLabel={(option) =>
          Object.keys(option).length > 0 ? option[getoptionlabelkey] : ""
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            readonly={readonly}
            // label={required ? `${id}*` : `${id}`} error={error}
            InputProps={{
              ...params.InputProps,
              style: {
                fontSize: 14,
                fontWeight: 400,
                color: "#000",
              },
            }}
          />
        )}
        renderOption={(option) => (
          <Typography
            variant="body"
            style={{
              fontWeight: 400,
              color: "#000",
              minHeight: "20px"
            }}
          >
            {Object.keys(option).length > 0 ? option[getoptionlabelkey] : ""}
          </Typography>
        )}
        disableClearable
        value={
          multiple
            ? selectedvalue.length > 0
              ? selectedvalue
              : []
            : Object.keys(selectedvalue).length > 0
            ? selectedvalue
            : null
        }
        {...props}
      />
      {required && error && (
        <Typography
          variant="body1"
          className="errorDom"
          component="span"
          style={{ color: "rgb(211, 47, 47)", fontSize: 12 }}
        >
          <Box>{errorMsz}</Box>
        </Typography>
      )}
    </>
  );
};
