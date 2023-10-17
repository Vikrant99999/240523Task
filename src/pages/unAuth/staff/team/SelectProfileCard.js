import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import "react-datepicker/dist/react-datepicker.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { ProfileModal } from "../shared/ProfileModal";
import { DateWidget } from "../shared/datewidget";
import {
  uniqueArrByKey,
  setCardValueByType,
  teamDateWidgetOption,
  teamSelectCardInfo,
  teamViolationCardInfo,
  _renderCardInfo,
  _renderViolationCardInfo
} from "../../../contants";
import { updateState } from "../../../../redux/commonSlice";
import ProfileSelector from "../shared/ProfileSelector"; 

export const SelectProfileCard = (props) => {
  const {
    oriPagedata,
    tableData,
    setEmployeeFilter,
    employeeFilter,
    setFilterPopUpType,
    setDepaertmentFilter,
    setJobTypeFilter,
    jobTypeFilter,
    departmentFilter,
    setTabledata,
    setEmployeeFilterData,
    setDepartmentFilterData,
    setJobTypeFilterData,
    setEmployeeToggle,
    setDepartmentToggle,
    setJobTypeToggle,
  } = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  const commonReducer = useSelector((state) => state.commonReducer);

  const [clearFilter, setClearFilter] = useState(false);
  const [project, setProject] = useState(false);

  const selectprojectclickhandler = () => {
    setProject(true);
  };

  const selectLMclickhandler = () => {
    dispatch(
      updateState({
        // lineManageForTeam: !commonReducer.lineManageForTeam,
        selectedProjectObjTeam: {},
      })
    );
  };

  useEffect(() => {
    if (employeeFilter || jobTypeFilter || departmentFilter) {
      setClearFilter(true);
    }
  }, [employeeFilter, jobTypeFilter, departmentFilter]);

  const employeeclickhandler = () => {
    setEmployeeToggle(true);
    setFilterPopUpType("employee");
  };

  const departmentclickhandler = () => {
    setDepartmentToggle(true);
    setFilterPopUpType("department");
  };

  const jobtypeclickhandler = () => {
    setJobTypeToggle(true);
    setFilterPopUpType("jobtitle");
  };

  const clearfilterclickhandler = () => {
    setFilterPopUpType("");
    setJobTypeFilter(false);
    setDepaertmentFilter(false);
    setEmployeeFilter(false);
    setTabledata([...oriPagedata]);
    setEmployeeFilterData([]);
    setDepartmentFilterData([]);
    setJobTypeFilterData([]);
    setClearFilter(false);
  };

  return (
    <>
      <Box className={classes.paper}>
        <Grid
          container
          p={2}
          justifyContent="space-between"
          borderBottom="1px solid rgb(233, 233, 233)"
        >
          <Grid
            item
            xs={12}
            style={{
              marginLeft: "5px",
              marginBottom: "20px",
            }}
          >
            <ProfileSelector
              classes={classes}
              resetSelectedProfile={selectLMclickhandler}
              selectprojectclickhandler={selectprojectclickhandler}
              managerFlag={true}
            />
          </Grid>
           

          <Grid item xs="12" className={classes.dateWrap}>
            <DateWidget durationFilter={true} {...props} dateWidgetOption={teamDateWidgetOption} />

            <Box>
              <Grid container>
                <Box ml={2} onClick={employeeclickhandler}>
                  <Typography variant="h7" className={classes.employee}>
                    {!employeeFilter ? (
                      <FilterAltIcon className={classes.FilterAltIcon} />
                    ) : (
                      <FilterAltOffIcon className={classes.FilterAltIcon} />
                    )}
                    Employee
                  </Typography>
                </Box>
                <Box ml={2} onClick={departmentclickhandler}>
                  <Typography variant="h7" className={classes.employee}>
                    {!departmentFilter ? (
                      <FilterAltIcon className={classes.FilterAltIcon} />
                    ) : (
                      <FilterAltOffIcon className={classes.FilterAltIcon} />
                    )}
                    Department
                  </Typography>
                </Box>
                <Box ml={2} onClick={jobtypeclickhandler}>
                  <Typography variant="h7" className={classes.employee}>
                    {!jobTypeFilter ? (
                      <FilterAltIcon className={classes.FilterAltIcon} />
                    ) : (
                      <FilterAltOffIcon className={classes.FilterAltIcon} />
                    )}
                    Job Title
                  </Typography>
                </Box>
                <Box ml={2} onClick={clearfilterclickhandler}>
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
          </Grid>

          <Grid item xs="12" className={classes.Wrap} mt="10px">
            <Box px={2} borderRight="1px solid rgb(233, 233, 233)">
              <Typography style={{fontSize: "20px"}} color="#3CAF85">{uniqueArrByKey(tableData, "personId").length}</Typography>
              <Typography variant="h7">Total Person</Typography>
            </Box>
            {teamSelectCardInfo.map((option) => _renderCardInfo(option, tableData, classes))}
            {teamViolationCardInfo.map((option) => _renderViolationCardInfo(option, tableData, classes))}
          </Grid>
        </Grid>
      </Box>
      {project && (
        <ProfileModal
          togglerHandler={setProject}
          reducerKeyFromParent="selectedProjectObjTeam"
          parent="team"
          selectProfileMapKey="profileName"
        />
      )}
    </>
  );
};

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
