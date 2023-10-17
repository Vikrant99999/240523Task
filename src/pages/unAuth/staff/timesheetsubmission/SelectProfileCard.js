import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import "react-datepicker/dist/react-datepicker.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DateWidget } from "../shared/datewidget";
import { ProfileModal } from "../shared/ProfileModal";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import {
  dashboardDateWidgetOption,
  FilterArray,
  setCardValueByType,
  _renderCardInfo,
} from "../../../contants";
import { updateState } from "../../../../redux/commonSlice";
import ProfileSelector from "../shared/ProfileSelector";
import { PAYCODES, sortPaycodes } from "../../../../utils/commonService";

export const SelectProfileCard = (props) => {
  const {
    pagedata,

    setEmployeeFilter,
    setAppStatus,

    setEmployeeupdateData,
    employeeupdateData,
    headerArr,
  } = props;
  let localHeaderArr = headerArr.filter(
    (option) =>
      option.fixed ||
      (!option.fixed && setCardValueByType(option.mappingKey, pagedata) > 0)
  );
  localHeaderArr = sortPaycodes(localHeaderArr);

  const useStyles = makeStyles((theme) => {
    let colorClasses = {};
    localHeaderArr.map((item) => {
      colorClasses[item.mappingKey] = {
        color: PAYCODES[item.mappingKey]?.color
          ? PAYCODES[item.mappingKey].color
          : "",
      };
    });

    return {
      ...colorClasses,
      paper: {
        //margin: "15px 0px 0 0px",
        borderRadius: "0px !important",
        border: "1px solid rgb(233, 233, 233)",
        backgroundColor: "white !important",
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
      container: {
        padding: "0px 20px",
      },
      body_text: {
        fontSize: "14px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
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
      startdate: {
        display: "flex",
        alignItems: "center !important",
        marginTop: "10px !important",
        fontSize: "14px !important",
        borderRadius: "0px !important",
      },
      totalpersonbox: {
        borderRight: "1px solid rgb(233, 233, 233)",
        textAlign: "center",
      },
      Wrap: {
        display: "flex",
        marginTop: "20px !important",
        "& p": {
          fontWeight: "bold",
          marginLeft: "10px",
          textAlign: "center",
          fontSize: "14px !important",
        },
      },

      filterData: {
        width: "180px !important",
        marginLeft: "10px !important",
      },
      employee: {
        backgroundColor: "#124590",
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
    };
  });
  const classes = useStyles();

  const dispatch = useDispatch();

  const [project, setProject] = useState(false);
  const [filter, setFilter] = useState(FilterArray[0]);

  const selectprojectclickhandler = () => {
    setProject(true);
  };

  const employeeclickhandler = () => {
    setEmployeeFilter(true);
  };
  const resetSelectedProfile = () => {
    dispatch(updateState({ selectedProjectObjTeam: {} }));
  };
  const clearFilter = () => {
    setFilter(FilterArray[0]);
    setEmployeeupdateData([]);
  };
  useEffect(() => {
    setAppStatus(filter.value);
  }, [filter]);

  return (
    <>
      <Grid container className={classes.container}>
        <ProfileSelector
          classes={classes}
          resetSelectedProfile={resetSelectedProfile}
          selectprojectclickhandler={selectprojectclickhandler}
          managerFlag={true}
        />
        <>
          <Grid item xs="12" className={classes.startdate}>
            <DateWidget
              durationFilter={false}
              {...props}
              dateWidgetOption={dashboardDateWidgetOption}
            />
            <CustomAutoComplete
              id="filter"
              required
              options={FilterArray}
              getoptionlabelkey="label"
              selectedvalue={filter}
              onChange={(_event, newData) => {
                setFilter(newData);
              }}
              className={classes.filterData}
            />
            <Box ml={2} onClick={employeeclickhandler}>
              <Typography variant="h7" className={classes.employee}>
                {!employeeupdateData.length ? (
                  <FilterAltIcon className={classes.FilterAltIcon} />
                ) : (
                  <FilterAltOffIcon className={classes.FilterAltIcon} />
                )}
                Employee
              </Typography>
            </Box>
            <Box ml={2} onClick={clearFilter}>
              <Typography variant="h7" className={classes.clearFilter}>
                {filter.id === 1 && employeeupdateData.length === 0 ? (
                  <FilterAltIcon className={classes.FilterAltIcon} />
                ) : (
                  <FilterAltOffIcon className={classes.FilterAltIcon} />
                )}
                Clear Filter
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs="12" className={classes.Wrap} rowGap={1}>
            <Grid item>
              <Box px={2} className={classes.totalpersonbox}>
                <Typography sx={{ color: PAYCODES.totalPerson.color }}>
                  {pagedata.length}
                </Typography>
                <Typography variant="h7">Total Person</Typography>
              </Box>
            </Grid>
            {localHeaderArr
              .map((option, index) => ({
                ...option,
                mappedKey: option.mappingKey,
                mapClass: `totalpersonboxtext${index}`,
              }))
              .map((option) => {
                return (
                  <Grid item>
                    {option.mappedKey == "regularHrs"
                      ? setCardValueByType(option.mappedKey, pagedata) === 0
                        ? ""
                        : _renderCardInfo(option, pagedata, classes)
                      : option.mappedKey == "lapsHours"
                      ? setCardValueByType(option.mappedKey, pagedata) === 0
                        ? ""
                        : _renderCardInfo(option, pagedata, classes)
                      : _renderCardInfo(option, pagedata, classes)}
                  </Grid>
                );
              })}
          </Grid>
        </>
      </Grid>

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
