import React, { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../components/CustomDialog";
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { CustomTextField } from "../../../../../components/TextField";
import { CustomButton } from "../../../../../components/Button";
import CustomCheckBox from "../../../../../components/CustomCheckBox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AbcOutlined } from "@mui/icons-material";

export const ProfileFilterModal = (props) => {
  const classes = useStyles();
  const {
    togglerhandler,
    setEmployeeupdateData,
    oriPagedata,
    employeeupdateData,
    setDepaertmentFilter,
  } = props;

  console.log("oriPagedata", oriPagedata);

  const [employee, setEmployee] = useState(true);
  const [icon, setIcon] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [selecAllFlag, setSelecAllFlag] = useState(false);
  const [searchObj, setSearchObj] = useState({
    name: "",
  });
  // console.log(filterData,"employee");
  const handleClose = () => { 
    togglerhandler(false);
  };

  const iconclickhanlder = () => {
    setIcon(!icon);
  };

  useEffect(() => {
    var localArray = [];
    if (oriPagedata) {
      if (employeeupdateData.length > 0) {
        console.log("1");
        localArray = oriPagedata.map((item) => ({
          ...item,
          checked: employeeupdateData.includes(item.profile),
        }));
      } else {
        console.log("2");
        localArray = oriPagedata.map((item) => ({ ...item, checked: false }));
      }
      setFilterData(localArray);
    }
  }, [oriPagedata]);

  console.log("filterData", filterData);

  const onChangeCheck = (value, currentIndex) => {
    console.log("value", value, currentIndex);
    var localArray = filterData?.map((option, index) => {
      return index == currentIndex ? { ...option, checked: value } : option;
    });
    setFilterData(localArray);
  };

  const filterclickhandler = () => {
    var localArray = filterData
      ?.filter((option) => option.checked)
      .map((option) => option.profileName);
    setEmployeeupdateData(localArray);
    var localArr = filterData.find((val) => {
      return val.checked == true;
    });
    localArr ? setDepaertmentFilter(true) : setDepaertmentFilter(false);
    togglerhandler(false);
  };

  const commonlogic = () => {
    var localArray = [];
    if (employeeupdateData?.length > 0) {
      localArray = oriPagedata?.map((item) => ({
        ...item,
        checked: employeeupdateData.includes(item.profileName),
      }));
    } else {
      localArray = oriPagedata?.map((item) => ({ ...item, checked: false }));
    }
    setFilterData(localArray);
  };

  useEffect(() => {
    if (filterData.length > 0) {
      var localArray = filterData?.map((item, index) => ({
        ...item,
        checked: selecAllFlag,
      }));
      setFilterData(localArray);
    }
  }, [selecAllFlag]);

  const searchHandler = () => {
    var localArr =
      searchObj?.name?.length == 0
        ? commonlogic()
        : oriPagedata?.filter((item) =>
            item["profile"]
              ?.toLowerCase()
              ?.includes(searchObj?.name?.toLowerCase())
          );
    setFilterData(localArr);
  };
  const resetAllFields = () => {
    setSearchObj({ name: "" });
  };
  const resetHandler = () => {
    resetAllFields();
    commonlogic();
  };

  return (
    <CustomDialog
      maxWidth="sm"
      dialogTitle="Filter By Profile"
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
                    Profile
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
                  />
                </Box>
              </Grid>
            </Grid>
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
              onClick={searchHandler}
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                fontSize: "12px",
                float: "right",
                margin: "15px 3px",
              }}
            />
          </Box>
        </Box>
      ) : null}
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs="1"></Grid>
        <Grid item xs="9">
          <Box fontWeight="bold" p={1}>
            <Typography fontSize="14px">Profile</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.scrollable}>
        <Grid container className="data-table">
          {filterData?.length > 0 &&
            filterData.map((item, index) => {
              const abc = item?.profile;
              const value = abc?.split();
              console.log(value);
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
                  <Grid item xs="9">
                    {console.log({item:item})}
                    <Typography fontSize="14px">{item?.profileName}</Typography>
                  </Grid>
                  {/* <Grid item xs='3'>
                            <Box>
                                <Typography fontSize='14px'>{item?.fullName}</Typography>
                            </Box>
                        </Grid> */}
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Grid container justifyContent="flex-end">
        <Box py={2}>
          <CustomButton
            btnText={selecAllFlag ? "UnSelect All" : "Select All"}
            variant="contained"
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
              marginRight: 10,
            }}
            onClick={() => setSelecAllFlag(!selecAllFlag)}
          />
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

const useStyles = makeStyles(() => ({
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
