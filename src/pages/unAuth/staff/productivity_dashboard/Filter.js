import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Box, Grid, Typography } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { getTeamList } from "../../../../services/api";
import { dateConverter } from "../../../../utils/commonService";
import { uniqueArrByKey } from "../../../contants";
import { DepartmentFilterModal } from "../shared/filters/DepartmentFilterModal";
import { EmployeeFilterModal } from "../shared/filters/EmployeeFilterModal";
import { JobfilterModal } from "../shared/filters/JobfilterModal";

const Filter = ({ dashboardData, setTabledata }) => {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);

  const [oriPagedata, setOriPagedata] = useState([]);

  const [employeeFilter, setEmployeeFilter] = useState(false);
  const [employeeToggle, setEmployeeToggle] = useState(false);
  const [employeeFilterData, setEmployeeFilterData] = useState([]);

  const [departmentToggle, setDepartmentToggle] = useState(false);
  const [departmentFilter, setDepaertmentFilter] = useState(false);
  const [departmentFilterData, setDepartmentFilterData] = useState([]);

  const [jobTypeToggle, setJobTypeToggle] = useState(false);
  const [jobTypeFilter, setJobTypeFilter] = useState(false);
  const [jobTypeFilterData, setJobTypeFilterData] = useState([]);

  const [clearFilter, setClearFilter] = useState(false);

  useEffect(() => {
    if (employeeFilter || jobTypeFilter || departmentFilter) {
      setClearFilter(true);
    }
  }, [employeeFilter, jobTypeFilter, departmentFilter]);

  const { mutate: teamListMutate, isLoading: isLoad } = useMutation(
    getTeamList,
    {
      onSuccess: (data, context, variables) => onSuccessProjectList(data),
      onError: (data, context, variables) =>
        onErrorProjectList(data, context, variables),
    }
  );

  useEffect(() => {
    teamListMutate({
      startDate: dateConverter(commonReducer.startDate),
      endDate: dateConverter(commonReducer.endDate),
      profileId: isLineManager
        ? ""
        : commonReducer.selectedProjectObjTeam.profileId,
      viewBy: isLineManager ? "LM" : "TK",
      // appStatus: appStatus,
      personId: commonReducer.employeeId,
      userId: commonReducer.userId,
    });
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    commonReducer.selectedProjectObjTeam.profileId,
    commonReducer.lineManageForTeam,
  ]);

  const onSuccessProjectList = (data) => {
    setOriPagedata(data.data.data);
  };
  const onErrorProjectList = () => {};

  useEffect(() => {
    let filteredData = [...dashboardData];

    if (employeeFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        employeeFilterData.includes(item["employeeNumber"])
      );
    }

    if (departmentFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        departmentFilterData.includes(item["departmentName"])
      );
    }

    if (jobTypeFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        jobTypeFilterData.includes(item["jobTitle"])
      );
    }

    setTabledata(filteredData);
  }, [employeeFilterData, departmentFilterData, jobTypeFilterData]);

  return (
    <>
      <Box>
        <Grid container>
          <Box
            ml={2}
            onClick={() => {
              setEmployeeToggle(true);
            }}
          >
            <Typography variant="h7" className={classes.employee}>
              {!employeeFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Employee
            </Typography>
          </Box>
          <Box
            ml={2}
            onClick={() => {
              setDepartmentToggle(true);
            }}
          >
            <Typography variant="h7" className={classes.employee}>
              {!departmentFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Department
            </Typography>
          </Box>
          <Box
            ml={2}
            onClick={() => {
              setJobTypeToggle(true);
            }}
          >
            <Typography variant="h7" className={classes.employee}>
              {!jobTypeFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Job Title
            </Typography>
          </Box>
          <Box
            ml={2}
            onClick={() => {
              setJobTypeFilter(false);
              setDepaertmentFilter(false);
              setEmployeeFilter(false);
              setTabledata([...dashboardData]);
              setEmployeeFilterData([]);
              setDepartmentFilterData([]);
              setJobTypeFilterData([]);
              setClearFilter(false);
            }}
          >
            <Typography variant="h7" className={classes.clearFilter}>
              {!clearFilter ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )}
              Clear Filter
            </Typography>
          </Box>
        </Grid>
      </Box>

      {employeeToggle && (
        <EmployeeFilterModal
          togglerhandler={setEmployeeToggle}
          //{...props}
          setEmployeeupdateData={setEmployeeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "employeeNumber")}
          employeeupdateData={employeeFilterData}
          type="Employee"
          employeeNameMappedKey="personName"
          employeeIdMappedKey="employeeNumber"
          employeeFilterHeader={["Employee Number", "Employee"]}
          setEmployeeFilter={setEmployeeFilter}
        />
      )}
      {departmentToggle && (
        <DepartmentFilterModal
          togglerhandler={setDepartmentToggle}
          //{...props}
          setEmployeeupdateData={setDepartmentFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "departmentId")}
          employeeupdateData={departmentFilterData}
          setDepaertmentFilter={setDepaertmentFilter}
        />
      )}
      {jobTypeToggle && (
        <JobfilterModal
          togglerhandler={setJobTypeToggle}
          //{...props}
          setEmployeeupdateData={setJobTypeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "jobTitleId")}
          employeeupdateData={jobTypeFilterData}
          setJobTypeFilter={setJobTypeFilter}
        />
      )}
    </>
  );
};

export default Filter;

const useStyles = makeStyles((theme) => ({
  // projectname: {
  //     color: "#6F6F6F",
  //     display: "inline-block ",
  //     margin: "10px 0px 0px 20px !important",
  //     textOverflow: "ellipsis ",
  //     overflow: "hidden ",
  //     width: "calc(100% - 190px)",
  //     whiteSpace: "nowrap ",
  //     verticalAlign: "sub ",
  // },
  dateWrap: {
    display: "flex",
    alignItems: "center !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  calendericon: {
    color: "#124590",
    cursor: "pointer",
    alignItems: "center ",
  },
  duration: {
    width: "140px ",
    marginLeft: "10px ",
  },
  filterData: {
    width: "170px ",
    marginLeft: "10px ",
  },
  calenderdropdown: {
    display: "flex ",
    alignItems: "center ",
    padding: "1.2px",
  },
  Wrap: {
    display: "flex",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px ",
      marginTop: "10px",
    },
  },
  daycolor: {
    backgroundColor: "#0572ce",
    color: "#fff",
    border: "1px solid #0572ce",
  },
  dateManage: {
    color: "#6F6F6F",
  },
  employee: {
    backgroundColor: "#124590 ",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  FilterAltIcon: {
    color: "white !important",
    fontSize: "large !important",
    marginRight: "10px",
  },
  clearFilter: {
    backgroundColor: "#f0ad4e",
    width: "130px",
    padding: "9.1px",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
  },
  grid4: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
  grid5: {
    color: "#124590",
    verticalAlign: "middle",
  },
  grid3: {
    padding: "10px",
    backgroundColor: "#FFF",
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
  },
  totalpersonboxtext3: {
    color: "#4a85c5 !important",
  },
  totalpersonboxtext4: {
    color: "#af3c66 !important",
  },
  totalpersonboxtext5: {
    color: "#ed6647 !important",
  },
  totalpersonboxtext6: {
    color: "#A0A0A0 !important",
  },
  totalpersonbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  projectTitle: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    // width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
}));
