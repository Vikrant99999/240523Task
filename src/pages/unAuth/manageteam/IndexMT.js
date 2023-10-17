import {
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
// import { Stack, Typography, CircularProgress } from "@mui/material";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
// import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import LaunchIcon from "@material-ui/icons/Launch";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomTextField } from "../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../components/Button";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../layout/Header";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
// import EditIcon from "@material-ui/icons/Edit";
import { blue } from "@material-ui/core/colors";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { FormControlLabel, IconButton } from "@material-ui/core";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { MainPage } from "../../layout/MainPage";
import ManageTeamModal from "./ManageTeamModal";
import ManageTeamMemberModal from "./EmployeeModal";
import LandingPageTable from "./LandingPageTable";
import {
  getManageTeamData,
  getManageTeamDataById,
  getTeamTableData,
  workDuration,
} from "../../../services/api";
import { useSelector } from "react-redux";
// import DemTempEdit from "./DemTempEdit";

export default function IndexMT(props) {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);

  const [status, setStatus] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState();
  const [workDurationArr, setWorkDurationArr] = useState();
  // const [employeeArr, setEmployeeArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [oriPagedata, setOriPagedata] = useState([]);
  const [employeeFilterData, setEmployeeFilterData] = useState([]);
  const [departmentFilterData, setDepartmentFilterData] = useState([]);
  const [jobTypeFilterData, setJobTypeFilterData] = useState([]);
  const [profileFilterData, setProfileFilterData] = useState([]);
  const [teamFilterData, setTeamFilterData] = useState([]);
  const [TableData, setTabledata] = useState([]);
  const [employeeToggle, setEmployeeToggle] = useState(false);
  const [jobTypeToggle, setJobTypeToggle] = useState(false);
  const [departmentToggle, setDepartmentToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [employeeFilter, setEmployeeFilter] = useState(false);

  const [departmentFilter, setDepaertmentFilter] = useState(false);

  const [jobTypeFilter, setJobTypeFilter] = useState(false);
  const [profileFilter, setProfileFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState(false);
  const [teamToggle, setTeamToggle] = useState(false);
  const [filterPopUpType, setFilterPopUpType] = useState("");
  const openEdit = async (item) => {
    setEditData(item);
    // const id = editData?.teamId;

    setOpenTeamModal(true);

    // if (editData != undefined) {
    //   const getDatabyId = await getManageTeamDataById(id);
    //   setPageData(getDatabyId?.data?.data);
    // }
  };
  // const teamId = editData?.teamId;

  const handleEditClick = (e) => {
    setStatus(e);
  };

  const { data: getManageTeam, refetch: getAllProjectRefetch } = useQuery(
    ["getManageTeam"],
    () => getManageTeamData(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getManageTeam) {
      setRows(getManageTeam?.data?.data);

      setIsLoading1(false);
    }
  }, [getManageTeam]);
  const { data: getAllWorkDuration } = useQuery(
    ["getworkDuration"],
    () => workDuration(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllWorkDuration) {
      const data = getAllWorkDuration?.data?.data.map((el) => {
        return {
          id: el.workDurationId,
          label: el.workDurationCode,
          value: el.workDurationCode,
        };
      });
      setWorkDurationArr(data);
      setIsLoading2(false);
    }
  }, [getAllWorkDuration]);

  const { data: getEmployeeTeam, refetch: getAllProjectRefetchEmployee } =
    useQuery(
      ["getEmployeeTeam", commonReducer.userId],
      () => getTeamTableData({ userId: commonReducer.userId }),
      {
        enabled: true,
        retry: false,
      }
    );

  useEffect(() => {
    if (getEmployeeTeam) {
      // window.alert("hello");
      // console.log(getEmployeeTeam?.data?.data, "oripageData");

      setOriPagedata(getEmployeeTeam?.data?.data);

      setIsLoading3(false);
    }
  }, [getEmployeeTeam]);

  useEffect(() => {
    if (!isLoading1 && !isLoading2 && !isLoading3) {
      setIsLoading(false);
    }
  }, [isLoading1, isLoading2, isLoading3]);

  useEffect(() => {
    let filteredData = [...oriPagedata];

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
    if (profileFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        profileFilterData.includes(item["profileName"])
      );
    }
    if (teamFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        teamFilterData.includes(item["teamName"])
      );
    }
    setTabledata(filteredData);
  }, [
    employeeFilterData,
    departmentFilterData,
    jobTypeFilterData,
    profileFilterData,
    teamFilterData,
    oriPagedata,
  ]);

  return (
    <>
      <MainPage pageName={props.title} isLoading={isLoading}>
        <Grid
          style={{ display: "flex", flexDirection: "column", margin: "15px" }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            }}
          >
            <Box style={{ alignContent: "center", marginTop: "10px" }}>
              <CustomButton
                startIcon={
                  <AddIcon style={{ fontWeight: "800", color: "#60AA60" }} />
                }
                btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                btnText="Team"
                onClick={() => openEdit()}
              />

              <CustomButton
                startIcon={
                  <AddIcon style={{ fontWeight: "800", color: "#60AA60" }} />
                }
                btnClass={{
                  backgroundColor: "#124590",
                  color: "#fff",
                  marginLeft: "5px",
                }}
                btnText="Employee"
                onClick={() => handleEditClick(3)}
              />
            </Box>
          </Grid>

          <Grid style={{ marginTop: "20px" }}>
            <LandingPageTable
              rows={rows}
              openEdit={openEdit}
              editData={editData}
            />
          </Grid>
        </Grid>
      </MainPage>
      {openTeamModal && (
        <ManageTeamModal
          toggleHandler={setOpenTeamModal}
          workDurationArr={workDurationArr}
          editData={editData}
          getAllProjectRefetch={getAllProjectRefetch}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
      {status === 3 && (
        <ManageTeamMemberModal
          toggleHandler={setStatus}
          // employeeArr={employeeArr}
          rows={rows}
          // setEmployeeArr={setEmployeeArr}
          getAllProjectRefetchEmployee={getAllProjectRefetchEmployee}
          setSnakeBarProps={setSnakeBarProps}
          oriPagedata={oriPagedata}
          setOriPagedata={setOriPagedata}
          employeeFilterData={employeeFilterData}
          setEmployeeFilterData={setEmployeeFilterData}
          departmentFilterData={departmentFilterData}
          setDepartmentFilterData={setDepartmentFilterData}
          jobTypeFilterData={jobTypeFilterData}
          setJobTypeFilterData={setJobTypeFilterData}
          teamFilterData={teamFilterData}
          setTeamFilterData={setTeamFilterData}
          profileFilterData={profileFilterData}
          setProfileFilterData={setProfileFilterData}
          TableData={TableData}
          setTabledata={setTabledata}
          employeeToggle={employeeToggle}
          setEmployeeToggle={setEmployeeToggle}
          jobTypeToggle={jobTypeToggle}
          setJobTypeToggle={setJobTypeToggle}
          departmentToggle={departmentToggle}
          setDepartmentToggle={setDepartmentToggle}
          profileToggle={profileToggle}
          setProfileToggle={setProfileToggle}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          departmentFilter={departmentFilter}
          setDepaertmentFilter={setDepaertmentFilter}
          jobTypeFilter={jobTypeFilter}
          setJobTypeFilter={setJobTypeFilter}
          profileFilter={profileFilter}
          setProfileFilter={setProfileFilter}
          teamFilter={teamFilter}
          setTeamFilter={setTeamFilter}
          teamToggle={teamToggle}
          setTeamToggle={setTeamToggle}
          filterPopUpType={filterPopUpType}
          setFilterPopUpType={setFilterPopUpType}
        />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  maincontainer1: {
    backgroundColor: "#f5f5f5",
  },
  paper: {
    margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
    width: "100%",
  },
  container: {
    padding: "20px",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  grid2: {
    background: "white",
  },
  startdate: {
    display: "flex",
    alignItems: "center !important",
    marginTop: "10px !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  totalpersonbox: {
    borderRight: "1px solid rgb(233, 233, 233)",
    cursor: "pointer",
  },
  Wrap: {
    display: "flex",
    marginTop: "20px !important",
    // borderBottom: "1px solid rgb(233, 233, 233)",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px !important",
    },
  },
  totalpersonboxtext1: {
    color: "#3CAF85 !important",
  },
  totalpersonboxtext2: {
    color: "#47BDEF !important",
    textAlign: "center",
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
  tablebox: {
    marginTop: "10px",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
  },
  projectTitle: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
    width: "100%",
    border: "1px solid rgb(233, 233, 233)",
    // padding: "39px !important",
    marginTop: "25px!important",
    padding: "25px!important",
    borderRadius: "0px !important",
    backgroundColor: "white !important",
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
