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
import { filterArr } from "../../../../../utils/commonService";

export const EmployeeFilterModal = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    togglerhandler,
    setEmployeeupdateData,
    oriPagedata,
    employeeupdateData,
    employeeNameMappedKey,
    employeeIdMappedKey,
    employeeFilterHeader,
    type,
    setEmployeeFilter,
  } = props;
  const [employee, setEmployee] = useState(true);
  const [icon, setIcon] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [selecAllFlag, setSelecAllFlag] = useState(false);
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
        localArray = oriPagedata?.map((item, index) => ({
          ...item,
          checked: employeeupdateData.includes(item.employeeNumber),
        }));
      } else {
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
      ?.map((option) => option.employeeNumber);
    setEmployeeupdateData(localArray);
    setEmployeeFilter(true);
    // var localArr = filterData.find((val) => {
    //   return val.checked == true;
    // });
    togglerhandler(false);
  };

  const commonlogic = () => {
    var localArray = [];
    if (employeeupdateData?.length > 0) {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: employeeupdateData.includes(item.employeeNumber),
      }));
    } else {
      localArray = oriPagedata?.map((item, index) => ({
        ...item,
        checked: false,
      }));
    }
    setFilterData(localArray);
  };

  // useEffect(() => {
  //     if (selecAllFlag) {
  //         var localArray = filterData?.map((option, index) => ({ ...option, checked: selecAllFlag }))
  //         setFilterData(localArray)
  //     }
  // }, [selecAllFlag])

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
    // setSelecAllFlag(false);
    var keysArr = [
      { value: searchObj.id, key: employeeIdMappedKey },
      { value: searchObj.name, key: employeeNameMappedKey },
    ];
    console.log("kokokokoo");
    console.log(filterArr(oriPagedata, keysArr), "hihihii");
    setFilterData(filterArr(oriPagedata, keysArr));
  };

  const resetAllFields = () => {
    setSearchObj({ id: "", name: "" });
  };
  console.log(searchObj, "searchObj");
  const resetHandler = () => {
    // setSelecAllFlag(false);
    resetAllFields();
    commonlogic();
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };
  return (
    <CustomDialog
      maxWidth="sm"
      dialogTitle={`Filter By ${type}`}
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
              <Grid item xs="4">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Employee Number
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="8">
                <Box>
                  <CustomTextField
                    type="text"
                    value={searchObj.id}
                    onKeyDown={onKeyDown}
                    onChange={(e) =>
                      setSearchObj({ ...searchObj, id: e.target.value })
                    }
                    // onChange={(e) => searchByInput('employeeNumber', e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mb={2}>
            <Grid container alignItems="center">
              <Grid item xs="4">
                <Typography fontSize="14px">
                  <Box textAlign="right" mr={2}>
                    Employee
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs="8">
                <Box>
                  <CustomTextField
                    type="text"
                    value={searchObj.name}
                    onKeyDown={onKeyDown}
                    // onChange={(e) => searchByInput('fullName', e.target.value)}
                    onChange={(e) =>
                      setSearchObj({ ...searchObj, name: e.target.value })
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container justifyContent="flex-end">
            <Box mx="10px">
              {/* <CustomButton
                            btnText='Search'
                            variant='contained'
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                        /> */}
            </Box>
            {/* <Box>
                        <CustomButton
                            btnText='Reset'
                            variant='contained'
                            btnClass={{ backgroundColor: "#124590", color: "#fff", fontSize: "12px" }}
                            onClick={() => {
                                setSearchObj({ ...searchObj, 'name': "", id: "" })
                            }
                            }
                        />
                    </Box> */}
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
      ) : null}
      <Grid container mt="20px" className={classes.headermanage}>
        <Grid item xs={1} />
        {employeeFilterHeader?.map((option) => {
          return (
            <>
              <Grid item xs="4">
                {/* <CustomCheckBox
                                isChecked={true}
                                onChangeCheck={onChangeCheck}
                                currentIndex={1} */}
                {/* /> */}
                <Box fontWeight="bold" p={1}>
                  <Typography fontSize="14px">{option}</Typography>
                </Box>
              </Grid>
            </>
          );
        })}
      </Grid>
      <Box className={classes.scrollable}>
        {console.log("filterData", filterData)}
        <Grid container>
          {filterData?.length > 0 &&
            filterData?.map((item, index) => {
              return (
                <Grid
                  container
                  alignItems="center"
                  className={classes.bordermanage}
                >
                  {console.log("item.checked", typeof item.checked)}
                  <Grid item xs="1">
                    <CustomCheckBox
                      check={item.checked}
                      onChangeCheck={onChangeCheck}
                      currentIndex={index}
                    />
                  </Grid>
                  <Grid item xs="4">
                    <Box ml={1}>
                      <Typography fontSize="14px">
                        {item?.[employeeIdMappedKey]}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs="5">
                    <Box ml={1}>
                      <Typography fontSize="14px">
                        {item?.[employeeNameMappedKey]}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
          {filterData?.length == 0 && (
            <Grid
              container
              alignItems="center"
              className={classes.bordermanage}
            >
              <Grid
                item
                xs="12"
                style={{ marginLeft: "8px", fontSize: "17px" }}
              >
                No data to display.
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid container justifyContent="flex-end">
        <Box py={2}>
          {/* <CustomButton
            btnText={selecAllFlag ? "UnSelect All" : "Select All"}
            variant="contained"
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
              marginRight: 10,
            }}
            onClick={() => setSelecAllFlag(!selecAllFlag)}
          /> */}
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
    alignItems: "center",
  },
  iconmanage: {
    display: "flex",
    alignItems: "center",
  },
  scrollable: {
    height: "400px",
    overflow: "auto",
  },
}));
