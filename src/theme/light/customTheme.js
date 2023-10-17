import { createTheme, responsiveFontSizes } from "@mui/material";
// import { autoCompleteStyle } from "./component/autoCompleteStyle";
import { buttonStyle } from "./component/buttons";
import { chipStyle } from "./component/chip";
import { cssBaselineStyle } from "./component/cssbaseline";
import { tabStyle } from "./component/tabs";
import { textFieldStyle } from "./component/textfield";
import { typographyStyle } from "./component/typography";
import { accordionStyle } from "./component/accordionStyle";

export const customTheme = responsiveFontSizes(createTheme({

    breakpoints: {
        values: {
            xs: 0,
            s: 400,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: "#124590",
        },
        secondary: {
            main: "#F4F4F4",
        },
        neutral: {
            main: "#ffffff",
        },
    },
    shape: {
        borderRadius: "10px"
    },
    typography: {
        htmlFontSize: 14,
        fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
        fontSize: 14,
        lineHeight: 1,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        h1: {
            fontSize: 62,
        },
        h2: {
            fontSize: 48,
        },
        h3: {
            fontSize: 40,
        },
        h4: {
            fontSize: 32,
        },
        h5: {
            fontSize: 26,
        },
        h6: {
            fontSize: 20,
        },

        subtitle1: {
            fontSize: 22,
        },
        subtitle2: {
            fontSize: 18,
        },
        body1: {
            fontSize: 16,
        },
        body2: {
            fontSize: 14,
        },
    },
    components: {
        ...cssBaselineStyle,
        ...typographyStyle,
        ...textFieldStyle,
        // ...autoCompleteStyle,
        ...buttonStyle,
        ...accordionStyle,
        ...tabStyle,
        ...chipStyle,
    }
}))