export const textFieldStyle = {
  MuiTextField: {
    styleOverrides: {
      // Name of the slot
      root: {
        width: "100%",
        backgroundColor: "#F7F8F9",
        borderRadius: "0px !important",
        "& .MuiAutocomplete-inputRoot": {
          padding: "10px 8px 9px !important",
          borderRadius: "0px !important",
          "& .MuiAutocomplete-input": {
            padding: "0px !important",
            maxWidth: "calc(100% - 40px)",
          },
          "& .MuiAutocomplete-endAdornment": {
            top: "calc(50% - 20px) !important",
          },
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: "0px !important",
      },
      input: {
        borderRadius: "0px !important",
        padding: "3px 3px!important",
        backgroundColor: "#F7F8F9 !important",
        fontSize: 14,
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        marginTop: "0px !important",
        "& .MuiButtonBase-root": {
          padding: "9px 5px !important",
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#F7F8F9 !important",
        "&:after,&:before": {
          border: "none !important",
        },
      },
    },
  },
};
