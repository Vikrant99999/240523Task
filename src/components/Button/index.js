import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Button, Input, Typography, Stack } from "@mui/material";

export const CustomButton = (props) => {
  const {
    btnText,
    btnHandler,
    startIcon,
    endIcon,
    upload,
    loading,
    onUpload,
    multiple,
    btnClass,
  } = props;
  return (
    <>
      {upload ? (
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            onChange={onUpload}
            multiple={multiple}
            type="file"
            style={{ display: "none" }}
          />
          <Button
            startIcon={startIcon && startIcon}
            endIcon={endIcon && endIcon}
            style={btnClass}
            component="span"
            {...props}
          >
            {btnText}
          </Button>
        </label>
      ) : loading ? (
        <LoadingButton
          {...props}
          startIcon={startIcon && startIcon}
          endIcon={endIcon && endIcon}
          style={btnClass}
        >
          Save
        </LoadingButton>
      ) : (
        <Button
          {...props}
          startIcon={startIcon && startIcon}
          endIcon={endIcon && endIcon}
          style={btnClass}
          disableElevation
        >
          {btnText}
        </Button>
      )}
    </>
  );
};
