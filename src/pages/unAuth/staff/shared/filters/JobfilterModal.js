import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../components/CustomDialog";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { CustomTextField } from "../../../../../components/TextField";
import { CustomButton } from "../../../../../components/Button";
import CustomCheckBox from "../../../../../components/CustomCheckBox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { color } from "@mui/system";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export const JobfilterModal = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    togglerhandler,
    setEmployeeupdateData,
    oriPagedata,
    employeeupdateData,
    setJobTypeFilter,
  } = props;

  const [employee, setEmployee] = useState(true);
  const [icon, setIcon] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [searchObj, setSearchObj] = useState({
    name: "",
    id: "",
  });

  const handleClose = () => {
    togglerhandler(false);
  };

  const iconclickhanlder = () => {
    setIcon(!icon);
  };

  useEffect(() => {
    var localArray = [];
    if (oriPagedata) {
      if (employeeupdateData?.length > 0) {
        // console.log("employeeupdateData", employeeupdateData);
        // console.log("oriPagedata", oriPagedata);
        // console.log("1");
        localArray = oriPagedata?.map((item, index) => ({
          ...item,
          checked: employeeupdateData?.includes(item.jobTitle),
        }));
      } else {
        console.log("2");
        localArray = oriPagedata?.map((item, index) => ({
          ...item,
          checked: false,
        }));
      }
      console.log("localArray", localArray);
      setFilterData(localArray);
    }
  }, [oriPagedata]);

  const onChangeCheck = (value, currentIndex) => {
    var localArray = filterData?.map((option, index) => {
      return index == currentIndex ? { ...option, checked: value } : option;
    });
    setFilterData(localArray);
  };

  const filterclickhandler = () => {
    var localArray = filterData
      ?.filter((option) => option.checked)
      .map((option) => option.jobTitle);
    setEmployeeupdateData(localArray);
    var localArr = filterData.find((val) => {
      return val.checked == true;
    });
    localArr ? setJobTypeFilter(true) : setJobTypeFilter(false);
    togglerhandler(false)
  };

  const commonlogic = () => {
    var localArray = [];
    if (employeeupdateData?.length > 0) {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: employeeupdateData.includes(item.jobTitle),
      }));
    } else {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: false,
      }));
    }
    setFilterData(localArray);
  };
  const resetAllFields = () => {
    console.log("hilaolao");
    setSearchObj({ name: "" });
  };
  const resetHandler = () => {
    resetAllFields();
    commonlogic();
  };
  const searchHandler = () => {
    var localArr =
      searchObj?.name?.length == 0
        ? commonlogic()
        : oriPagedata?.filter((item) =>
            item["jobTitle"]
              ?.toLowerCase()
              ?.includes(searchObj?.name?.toLowerCase())
          );
    setFilterData(localArr);
  };

  return (
    <CustomDialog
      maxWidth="sm"
      dialogTitle="Filter By Job Titles"
      open="true"
      handleClose={handleClose}
    >
      <Grid container alignItems="center">
        <Box className="cursor-pointer">
          {icon ? (
            <ArrowDropDownIcon
              onClick={iconclickhanlder}
              className={classes.iconmanage}
            />
          ) : (
            <ArrowRightIcon
              onClick={iconclickhanlder}
              className={classes.iconmanage}
            />
          )}
        </Box>
        <Typography variant="h7" color="#252525">
          <Box fontWeight="bold" p="10px">
            Search
          </Box>
        </Typography>
      </Grid>
      {icon ? (
        <Box pb={2}>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs="3">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Job Titles
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="9">
                <Box>
                  <CustomTextField
                    type="text"
                    value={searchObj.name}
                    onChange={(e) =>
                      setSearchObj({ ...searchObj, name: e.target.value })
                    }
                    // onChange={(e) => searchByInput('employeeNumber', e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <CustomButton
            variant="contained"
            btnText="Reset"
            onClick={resetHandler}
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
              float: "right",
              margin: "15px 3px",
            }}
          />
          <CustomButton
            variant="contained"
            btnText="Search"
            onClick={searchObj.name!=""?searchHandler:""}
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
              float: "right",
              margin: "15px 3px",
            }}
          />
        </Box>
      ) : null}
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs="1"></Grid>
        <Grid item xs="4">
          <Box fontWeight="bold" p={1}>
            <Typography fontSize="14px">Job Title</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.scrollable}>
        <Grid container className="data-table">
          {filterData?.length > 0 &&
            filterData.map((item, index) => {
              return (
                <Grid
                  container
                  alignItems="center"
                  className={classes.bordermanage}
                >
                  <Grid item xs="1">
                    <CustomCheckBox
                      check={item.checked}
                      onChangeCheck={onChangeCheck}
                      currentIndex={index}
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Box>
                      <Typography fontSize="14px">{item?.jobTitle}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Grid container justifyContent="flex-end">
        <Box py={2}>
          <CustomButton
            btnText="Filter"
            variant="contained"
            startIcon={
              employee ? (
                <FilterAltIcon className={classes.FilterAltIcon} />
              ) : (
                <FilterAltOffIcon className={classes.FilterAltIcon} />
              )
            }
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
            onClick={filterclickhandler}
          />
        </Box>
      </Grid>
    </CustomDialog>
  );
};

const useStyles = makeStyles((theme) => ({
  FilterAltIcon: {
    color: "#fff",
    fontSize: "large",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
  },
  iconmanage: {
    display: "flex",
    alignItems: "center",
  },
  scrollable: {
    height: "calc(100vh - 570px)",
    overflow: "auto",
  },
}));
