import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import SelectSearch from "../../roaster/spotroster/SelectSearch";

const WorkPlanModal = ({
  WorkPlanData,
  toggleHandler,
  handleChangeWorkPlan,
}) => {
  const [state1, setState1] = useState(-1);
  const [curIndex, setCurIndex2] = useState(-1);
  const [expanded, setExpanded] = React.useState("panel1");
  const [workPlandup, setWorkPlanDup] = useState(WorkPlanData);
  const [workPlanName, setWorkPlanName] = useState("");

  const searchWorkPlan = () => {
    setWorkPlanDup(WorkPlanData.filter(filterStaff));
  };

  const resetWorkPlan = () => {
    setWorkPlanName("");
    setWorkPlanDup(WorkPlanData);
  };
  const filterStaff = (item) => {
    if (workPlanName != "") {
      if (
        item?.workPlanName.toLowerCase().includes(workPlanName.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  const empChange = (e) => {
    setWorkPlanName(e.target.value);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = () => {
    if (iitem) {
      handleChangeWorkPlan(iitem);
      setState1(-1);
      toggleHandler(false);
    }
  };

  const handleClose1 = () => {
    setState1(-1);
    toggleHandler(false);
  };

  const [iitem, setItem] = useState();
  const [currIndex, setCurIndex] = useState(-1);

  const setChange = (index, item, curIndex) => {
    setState1(index);
    setItem(item);
    setCurIndex(curIndex);
  };

  const classes = useStyles();
  const tableColumns = [
    {
      xs: "2.3",
      name: "Work Plan",
      key: "workPlanName",
    },
    {
      xs: "1.3",
      name: "Sun",
      key: "workDurationNameD1",
    },
    {
      xs: "1.3",
      name: "Mon",
      key: "workDurationNameD2",
    },
    {
      xs: "1.3",
      name: "Tue",
      key: "workDurationNameD3",
    },
    {
      xs: "1.3",
      name: "Wed",
      key: "workDurationNameD4",
    },
    {
      xs: "1.3",
      name: "Thu",
      key: "workDurationNameD5",
    },
    {
      xs: "1.3",
      name: "Fri",
      key: "workDurationNameD6",
    },
    {
      xs: "1.3",
      name: "Sat",
      key: "workDurationNameD7",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "md",
      dialogTitle: "Search & Select : Work Plan",
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
        fieldName: "Work Plan",
        mainContainerProps: {
          xs: "12",
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
            width: "70%",
          },
          value: workPlanName,
          onChange: empChange,
        },
      },
    ],
    customButtonsArr: [
      {
        btnText: "Search",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: searchWorkPlan,
      },
      {
        btnText: "Reset",
        variant: "contained",
        btnClass: { backgroundColor: "#124590", color: "#fff" },
        onClick: resetWorkPlan,
      },
    ],
    columns: tableColumns,
    columnProps: {
      style: {
        overflow: "hidden",
        textOverflow: "clip",
        maxWidth: "25ch",
        whiteSpace: "nowrap",
        marginLeft: "0px",
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
    rows: workPlandup,

    rowContainerProps: {
      className: `${classes.bordermanage}`,
    },
    rowCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "23ch",
        textOverflow: "ellipsis",
        fontSize: "14px",
        fontFamily: "Inter",
      },
    },
    handleChange: setChange,
    curIndex: curIndex,
    state: state1,
    // state: state1,
    customButtonProps: {
      btnText: "Select",
      variant: "contained",
      btnClass: {
        backgroundColor: "#124590",
        color: "#fff",
        fontSize: "12px",
      },
      onClick: handleSelect,
    },
  };
  return <SelectSearch {...data} />;
};

export default WorkPlanModal;
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
  },
}));
