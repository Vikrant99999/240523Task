export const textFieldStyle = {
    MuiTextField: {
        styleOverrides: {
            // Name of the slot
            root: {
                width: "100%",
                backgroundColor: "#F7F8F9",
                borderRadius: "10px !important",
            },

        },
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                borderRadius: "10px !important",
                '& .MuiIconButton-root': {
                    minWidth: "auto !important",
                },
            },
            input: {
                borderRadius: "10px !important",
                padding: "15px 24px!important",
                backgroundColor: "#F7F8F9 !important",

            },
        },
    },
    MuiInputAdornment: {
        styleOverrides: {
            root: {
                marginTop: "0px !important"
            }
        }
    },
    MuiFilledInput: {
        styleOverrides: {
            root: {
                backgroundColor: "#F7F8F9 !important",
                '&:after,&:before': {
                    border: "none !important",
                }
            }
        }
    },
}