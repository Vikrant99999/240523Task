export const accordionStyle = {
    MuiAccordion: {
        styleOverrides: {
            root: {
                '&.Mui-expanded': {
                    margin: "0px !important"

                }
            }
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            content: {
                margin: "0px !important"
            },
            root: {
                margin: 0,
                padding: "0px 0px !important",
                backgroundColor: "#EBF3FF !important",
                minHeight: 0,
                width: "100%",
                '&.Mui-expanded': {
                    minHeight: 0,
                }
            }
        }
    },
    MuiAccordionDetails: {
        styleOverrides: {

            root: {
                margin: 0,
                padding: "0px !important"
            }
        }
    },

}