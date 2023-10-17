import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const CustomWorkDurationDropdown = (props) => {
  return (
    <Autocomplete
      {...props}
      value={props.value}
      // defaultValue={props.defaultValue}
      disableClearable
      disablePortal={false}
      getoptionlabel={props.getoptionlabel}
      id="combo-box-demo"
      sx={{ width: 164 }}
      options={props.options}
      // ListboxProps={{  }}
      renderInput={(params) => <TextField {...params} />}
      onChange={props.onChange}
      ListboxProps={{
        style: {
          maxHeight: "150px",
          // border: '1px solid red',
          fontSize: "14px",
          fontFamily: "Inter",
        },
      }}
    />
  );
};

export default CustomWorkDurationDropdown;
