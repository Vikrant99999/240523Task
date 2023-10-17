import React, { useEffect, useState } from "react";
import SelectSearch from "../roaster/spotroster/SelectSearch";
import { makeStyles } from "@material-ui/styles";
import { EmployeeVacatioRuleData, SearchEmployeeData } from "../../../services/api";
import { useQuery } from "react-query";

const UserModal = ({
  timeZoneData,
  toggleHandler,
  handelEmployeechange,
  open,
  enterUser,
  user
}) => {
  // SearchEmployeeData
  const [state1, setState1] = useState(-1);
  const [curIndex, setCurIndex2] = useState(-1);
  const [expanded, setExpanded] = React.useState("panel1");

  const [employeeDup, setEmployeeDup] = useState();
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [enabled,setEnabled ] = useState(false);

  const { data: searchUser,refetch } = useQuery(
    ["searchUser"],
    () =>
      SearchEmployeeData({fullName:employeeName,employeeNumber:employeeNum}),
    { enabled: false , retry: false }
  );

  const searchWorkPlan = () => {
    refetch();
  };
  useEffect(() => {
      if (searchUser) {
        setEmployeeDup(searchUser?.data?.data);
        console.log(employeeDup);
      }
    }, [searchUser]);

  const resetWorkPlan = () => {
    setEmployeeName("");
    setEmployeeNum("");
    refetch();
  };
  
  const empNumChange = (e) => {
    setEmployeeNum(e.target.value);
  };
  const empNameChange = (e) => {
    setEmployeeName(e.target.value);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = () => {
    if (iitem) {
      handelEmployeechange(iitem);
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
console.log(employeeDup);
 
  const classes = useStyles();
  const tableColumns = [
    {
      xs: "3",
      name: "Employee Number",
      key: "employeeNumber",
    },
    {
      xs: "3",
      name: "Employee",
      key: "fullName",
    },
    {
      xs: "3",
      name: "Job Title",
      key: "jobTitle",
    },
    {
      xs: "3",
      name: "Department",
      key: "departmentName",
    },
  ];
  const data = {
    classes,
    customDialogProps: {
      maxWidth: "md",
      dialogTitle: "Search & Select : To User",
      open: open,
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
        fieldName: "Employee Number",
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
          value: employeeNum,
          onChange: empNumChange,
        },
      },
      {
        fieldName: "Employee",
        mainContainerProps: {
          xs: "12",
        },
        mainContentBoxProps: {
          className: `${classes.maincontentBox}`,
          style: {
            marginLeft: "80px",
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
          value: employeeName,
          onChange: empNameChange,
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
    rows: employeeDup,

    rowContainerProps:{
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

export default UserModal;

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
