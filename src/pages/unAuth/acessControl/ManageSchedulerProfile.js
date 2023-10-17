import React, { useEffect, useState } from "react";
import { Header } from "../../layout/Header";
import { Grid, Box, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import { CustomButton } from "../../../components/Button";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import FilteredEmployeelist from "./FilteredEmployeelist";
import Addprofilemodal from "./ManageProfileModal";
import {
  getScheduleEmpData,
  getScheduleProfileData,
} from "../../../services/api";
import { useQuery } from "react-query";
import { MainPage } from "../../layout/MainPage";

import moment from "moment";
import ManageProfileModal from "./ManageProfileModal";
import ProfileModal from "./Modals/ProfileModal";

const ManageSchedulerProfile = () => {
  const classes = useStyles();

  const [data, setData] = useState();
  const [openEmployeeList, setOpenEmployeeList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [editData, setEditData] = useState();
  const [clicked, setClicked] = useState(-1);
  const [dupdata, setDupdata] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [openProfileSearch, setOpenProfileSearch] = useState(false);
  const handleOpenModal = (item) => {
    setOpenProfile(true);
    setEditData(item);
  };
  const handleOpenFilterModal = (item) => {
    setOpenEmployeeList(true);
    setEditData(item);
  };
  const handleClose = () => {
    setOpenProfile(false);
  };

  const changeWork = (e) => {
    setQuery(e.target.value);
    //setQuery2("");
  };

  const searchFilter = () => {
    var dumm = data?.filter(filterQuery);
    setDupdata(dumm);

    setClicked(-1);
  };

  const resetFilter = () => {
    setDupdata(data);
    setQuery("");
    setClicked(-1);
  };

  const filterQuery = (item) => {
    if (query != "") {
      if (
        item?.profileName.toString().toLowerCase().includes(query.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };
  const { data: getProfileData, refetch: getAllProjectRefetch } = useQuery(
    ["getProfileData"],
    () => getScheduleProfileData(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getProfileData) {
      setData(getProfileData?.data?.data);
      setDupdata(getProfileData?.data?.data);
      // setIsLoading1(false);
    }
  }, [getProfileData]);

  return (
    <>
      <MainPage pageName="Manage Profile">
        <Grid
          item
          container
          style={{ margin: "10px", flexDirection: "column" }}
        >
          <Grid item style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Box style={{ marginTop: "10px" }}>
                <Typography
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Profile
                </Typography>
              </Box>
              <Box style={{ padding: "10px" }}>
                <CustomTextField
                  style={{ width: "210px" }}
                  value={query}
                  onChange={(e) => changeWork(e)}
                  endIcon={
                    <SearchIcon
                      onClick={() => setOpenProfileSearch(true)}
                      style={{ cursor: "pointer" }}
                    />
                  }
                />
              </Box>
            </Box>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Box style={{ marginTop: "10px" }}>
                <Typography
                  style={{
                    padding: "10px",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  User
                </Typography>
              </Box>
              <Box style={{ padding: "10px" }}>
                <CustomTextField
                  style={{ width: "210px" }}
                  endIcon={
                    <SearchIcon
                      style={{ cursor: "pointer" }}
                      onClick={searchFilter}
                    />
                  }
                />
              </Box>
            </Box>
            <CustomButton
              btnText="Go"
              variant="contained"
              btnClass={{ margin: "10px" }}
            />
          </Grid>
          <Grid item>
            <Box>
              <CustomButton
                onClick={() => handleOpenModal()}
                btnText="New"
                variant="contained"
                btnClass={{ margin: "10px" }}
                startIcon={
                  <AddIcon
                    style={{
                      color: "#60AA60",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  />
                }
              />
            </Box>
          </Grid>
          <Grid
            container
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.125)",
              margin: "5px 0",
            }}
          ></Grid>
          <Box className={classes.mainbox}>
            <Box className={classes.innermainbox}>
              <Box className={classes.innerboxworkduration}>
                <Box style={{ width: "5%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </Typography>
                </Box>
                <Box style={{ width: "15%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Profile
                  </Typography>
                </Box>
                <Box style={{ width: "10%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Start Date
                  </Typography>
                </Box>
                <Box style={{ width: "10%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    End Date
                  </Typography>
                </Box>
                <Box style={{ width: "20%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Owners
                  </Typography>
                </Box>
                <Box style={{ width: "20%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Last Updated By
                  </Typography>
                </Box>
                <Box style={{ width: "20%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Last Updated On
                  </Typography>
                </Box>
                <Box style={{ width: "10%" }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                    }}
                  >
                    Filtered Workforce
                  </Typography>
                </Box>
              </Box>
              <Box style={{ maxHeight: "45vh" }}>
                {dupdata?.length > 0 &&
                  dupdata?.map((item, index) => {
                    let saved = false;
                    if (clicked == item.profileId) {
                      saved = true;
                    } else if (clicked == item.profileName) {
                      saved = true;
                    }
                    return (
                      <>
                        <Box className={classes.pagedatamainbox}>
                          <Box className={classes.ActionBox}>
                            <EditIcon
                              className={classes.EditIcon}
                              onClick={() => handleOpenModal(item)}
                            />
                          </Box>
                          <Box className={classes.profile}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            >
                              {item?.profileName}
                            </Typography>
                          </Box>
                          <Box className={classes.common}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            >
                              {moment(item?.startDate).format("DD-MMM-YYYY")}
                            </Typography>
                          </Box>
                          <Box className={classes.common}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            >
                              {moment(item?.endDate).format("DD-MMM-YYYY")}
                            </Typography>
                          </Box>
                          <Box className={classes.owners}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            >
                              {item?.owners}
                            </Typography>
                          </Box>
                          <Box className={classes.owners}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            ></Typography>
                          </Box>
                          <Box className={classes.owners}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            ></Typography>
                          </Box>
                          <Box className={classes.icon}>
                            <InfoIcon
                              onClick={() => handleOpenFilterModal(item)}
                              style={{
                                color: "#71b7f9",
                                cursor: "pointer",
                                fontSize: "22px",
                              }}
                            />
                          </Box>
                        </Box>
                      </>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Grid>
      </MainPage>
      {openEmployeeList && (
        <FilteredEmployeelist
          toggleHandler={setOpenEmployeeList}
          editData={editData}
        />
      )}
      {openProfile && (
        <ManageProfileModal handleClose={handleClose} editData={editData} />
      )}
      {openProfileSearch && (
        <ProfileModal profileData={data} toggleHandler={setOpenProfileSearch} />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    margin: "5px",
    maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "scroll",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    // position: "fixed",
    width: "98.1%",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  EditIcon: {
    color: "#124590",
    fontSize: "16px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  common: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: "15%",
    display: "flex",
    alignItems: "center",
  },
  owners: {
    width: "20%",
    display: "flex",
    alignItems: "center",
  },
}));

export default ManageSchedulerProfile;
