import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import SelectSearch from "../../roaster/spotroster/SelectSearch";

const DepartmentModal = ({
  departmentArr,
  toggleHandler,
  handleChangeData,
}) => {
  const [state1, setState1] = useState(-1);
  const [curIndex, setCurIndex2] = useState(-1);
  const [expanded, setExpanded] = React.useState("panel1");
  const [skilldup, setSkillDup] = useState(departmentArr);
  const [skillName, setskillName] = useState("");

  const searchWorkPlan = () => {
    setSkillDup(departmentArr.filter(filterStaff));
  };

  const resetWorkPlan = () => {
    setskillName("");
    setSkillDup(departmentArr);
  };
  const filterStaff = (item) => {
    if (skillName != "") {
      if (
        item?.departmentName.toLowerCase().includes(skillName.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  const empChange = (e) => {
    setskillName(e.target.value);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = () => {
    if (iitem) {
      handleChangeData(iitem);
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
      xs: "6",
      name: "Departmant Code",
      key: "departmentName",
    },
    {
      xs: "6",
      name: "Departmant Name",
      key: "departmentName",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "sm",
      dialogTitle: "Search & Select : Department",
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
        fieldName: "Department Code",
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
          value: skillName,
          onChange: empChange,
        },
      },
      {
        fieldName: "Department Name",
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
          value: skillName,
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
        width: "100%",
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Inter",
      },
    },
    rows: skilldup,

    rowContainerProps: {
      className: `${classes.bordermanage}`,
    },
    rowCellProps: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
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

export default DepartmentModal;
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
