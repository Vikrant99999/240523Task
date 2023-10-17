import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@material-ui/styles";
import SelectSearch from "./SelectSearch";
// import SelectSearch from "../roaster/spotroster/SelectSearch";
import { useEffect } from "react";
// import SelectSearch from "./SelectSearch";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const DemandPopup = (props) => {
  const {
    toggleHandler,
    demandLov,
    handleChangeDemand,
    resetChangeDemand,
    state1,
    setState1,
  } = props;
  console.log(demandLov, "demandLov");
  const [staffdup, setStaff] = useState(demandLov);
  console.log(staffdup);
  const [empname, setEmpname] = useState("");

  const searchStaff = () => {
    setStaff(demandLov.filter(filterStaff));
  };

  const resetStaff = () => {
    setEmpname("");
    setStaff(demandLov);
  };

  const filterStaff = (item) => {
    if (empname != "") {
      if (item?.templateName.toLowerCase().includes(empname.toLowerCase())) {
        return item;
      }
    } else {
      return item;
    }
  };

  const empChange = (e) => {
    setEmpname(e.target.value);
  };

  const handleClose = () => {
    handleChangeDemand(state1, iitem);
    setState1(-1);
    toggleHandler(0);
  };

  const handleClose1 = () => {
    setState1(-1);
    toggleHandler(0);
  };

  const [iitem, setItem] = useState();

  const setChange = (index, item) => {
    setState1(index);
    setItem(item);
  };

  const [expanded, setExpanded] = React.useState("panel1");
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // provide either key or method
  const tableColumns = [
    { xs: "0.1", name: "", key: "Checkbox" },
    {
      xs: "5",
      name: "Template Name",
      key: "templateName",
    },
    {
      xs: "2.2",
      name: "Valid From",
      key: "validFrom",
    },
    {
      xs: "2.2",
      name: "Valid To",
      key: "validTo",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      dialogTitle: "Validate Roster By Demand Templates",
      open: "true",
      handleClose: handleClose1,
    },
    accordianProps: {
      expanded: expanded === "panel1",
      onChange: handleChange("panel1"),
    },
    summaryProps: {
      "aria-controls": "panel1d-content",
      id: "panel1d-header",
    },
    summaryFirstChildProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
        marginLeft: "5px",
        fontWeight: "bolder",
      },
    },
    summaryValue: "Search",
    customTextFieldContainer: {
      style: { marginTop: "10px" },
      rowSpacing: 1,
    },
    customTextFieldArr: [
      {
        fieldName: "Template Name",
        mainContainerProps: {
          className: `${classes.maincontainer}`,
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "30px",
          },
        },
        formFieldParentProps: {},
        formFieldProps: {
          style: {
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "bolder",
          },
        },
        customTextFieldParentProps: {
          style: {
            marginLeft: "10px",
          },
        },
        customTextFieldProps: {
          type: "text",
          style: {
            width: "100%",
          },
          value: empname,
          onChange: empChange,
        },
      },
    ],
    customButtonsArr: [
      {
        btnText: "Search",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: searchStaff,
      },
      {
        btnText: "Reset",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: resetStaff,
      },
    ],
    columns: tableColumns,
    columnProps: {
      style: {
        marginLeft: "20px",
        display: "flex",
      },
    },
    columnContainerProps: {
      className: `${classes.headermanage}`,
    },
    columnCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Inter",
      },
    },
    rows: staffdup,
    rowContainerProps: {
      className: `${classes.bordermanage}`,
      xs: ["5", "2", "2"],
    },
    rowCellProps: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: setChange,
    curIndex: 0,
    state: state1,
    customButtonProps: {
      btnText: "Select",
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
      onClick: handleClose,
    },
  };

  return <SelectSearch {...data} checkbox={true} />;
};

export default DemandPopup;

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
}));
