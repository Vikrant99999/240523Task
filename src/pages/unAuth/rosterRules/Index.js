import { Box, Button, Grid, Typography } from "@mui/material";
// import { Stack, Typography, CircularProgress } from "@mui/material";

import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
// import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { DataGrid } from "@mui/x-data-grid";
import { CustomButton } from "../../../components/Button";
// import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { MainPage } from "../../layout/MainPage";
import DemTempEdit from "./DemTempEdit";
import { useQuery } from "react-query";
// import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import moment from "moment/moment";
import Tooltip from "@mui/material/Tooltip";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import {
  getCitizen,
  getDemandTemp,
  getSkill,
  getWorkPlan,
  getWorkRotataion,
} from "../../../services/api";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import { CustomTextField } from "../../../components/TextField";
import { useSelector } from "react-redux";
function Index(props) {
  const [title, setTitle] = useState("");
  const commonReducer = useSelector((state) => state.commonReducer);

  useEffect(() => {
    setTitle(props.title);
  }, []);
  document.title = title;
  const [status, setStatus] = React.useState(0);

  const classes = useStyles();
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({}));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  // for grid
  const [expanded, setExpanded] = React.useState("panel1");
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [data, setData] = React.useState([]);
  const [newModal, setNewModal] = React.useState(false);
  const [expireModal, setExpireModal] = React.useState(false);
  const [errorProps, setErrorProps] = React.useState({});
  const [DemandTempData, setDemandTempData] = useState([]);
  const [dupdata, setDupdata] = React.useState([]);

  const [editData, setEditData] = useState();
  const [WorkPlanData, setWorkPlanData] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  const [demandTempId, setDemandId] = useState("");
  const [skillData, setSkillData] = useState([]);
  const [citizenData, setCitizenData] = useState([]);
  const handleClose = () => {
    setNewModal(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const changeWork = (e) => {
    setQuery(e.target.value);
  };

  const changeProfile = (e) => {
    setQuery2(e.target.value);
  };

  const searchFilter = () => {
    var dumm = DemandTempData?.filter(filterQuery);
    setDupdata(dumm);
    setClicked(-1);
  };

  const resetFilter = () => {
    setDupdata(DemandTempData);
    setQuery("");
    setQuery2("");
    setClicked(-1);
  };

  const filterQuery = (item) => {
    if (query2 == "" && query != "") {
      if (
        item?.demandTemplateName
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return item;
      }
    } else if (query == "" && query2 != "") {
      if (
        item?.profile.toString().toLowerCase().includes(query2.toLowerCase())
      ) {
        return item;
      }
    } else return item;
  };

  const openDemandTempModal = (item) => {
    setEditData(item);
    setStatus(true);
  };

  //Api for get Demand Template
  const { data: getDemandTemplate, refetch: getAllProjectRefetch } = useQuery(
    ["getDemandTemp", commonReducer.userId],
    () => getDemandTemp({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getDemandTemplate) {
      setDemandTempData(getDemandTemplate?.data?.data);
      setDupdata(getDemandTemplate?.data?.data);

      setIsLoading1(false);
    }
  }, [getDemandTemplate]);

  //Api for skill data
  const { data: getSkillData } = useQuery(["getSkillData"], () => getSkill(), {
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (getSkillData) {
      setSkillData(getSkillData?.data?.data);
      setIsLoading2(false);
    }
  }, [getSkillData]);
  //Api for skill data
  const { data: getCitizenData } = useQuery(
    ["getCitizenData"],
    () => getCitizen(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getCitizenData) {
      setCitizenData(getCitizenData?.data?.data);
      setIsLoading3(false);
    }
  }, [getCitizenData]);

  useEffect(() => {
    if (!isLoading1 && !isLoading2 && !isLoading3) {
      setIsLoading(false);
    }
  }, [isLoading1, isLoading2, isLoading3]);

  return (
    <>
      <MainPage pageName={props.title} isLoading={isLoading}>
        <Grid style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            style={{ width: "100%", padding: "20px" }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              style={{ marginTop: "20px", width: "100%" }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  marginLeft: "5px",
                  fontWeight: "bolder",
                  width: "100% ",
                }}
              >
                Search
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                item
                xs={7}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px",
                  justifyContent: "space-around",
                }}
              >
                <Grid>
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" "}
                      Template Name
                    </Typography>

                    <CustomTextField
                      value={query}
                      // autoFocus={true}
                      onChange={(e) => changeWork(e)}
                      style={{ marginLeft: "10px" }}
                    />
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" "}
                      Profile
                    </Typography>

                    <CustomTextField
                      value={query2}
                      // autoFocus={true}
                      onChange={(e) => changeProfile(e)}
                      style={{ marginLeft: "10px" }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container className={classes.selectbutton}>
                <Grid item padding={"2px"}>
                  <CustomButton
                    btnText="Search"
                    variant="contained"
                    onClick={searchFilter}
                    btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                  />
                </Grid>
                <Grid item padding={"2px"}>
                  <CustomButton
                    btnText="Reset"
                    variant="contained"
                    onClick={resetFilter}
                    btnClass={{ backgroundColor: "#124590", color: "#fff" }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid
          style={{ display: "flex", flexDirection: "column", margin: "15px" }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              borderTop: "1px solid grey",
            }}
          >
            <Box style={{ alignContent: "center", margin: "13px" }}>
              <CustomButton
                variant="contained"
                btnText="New"
                btnClass={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  backgroundColor: "#124590",
                  color: "#fff",
                }}
                startIcon={<AddIcon className={classes.addIcon} />}
                onClick={() => openDemandTempModal()}
              />
            </Box>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box className={classes.mainbox}>
              <Box className={classes.innermainbox}>
                <Box className={classes.innerboxworkduration}>
                  <Box style={{ width: "9%" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        // textAlign: "start",
                        marginLeft: 10,
                      }}
                    >
                      Actions
                    </Typography>
                  </Box>
                  <Box style={{ width: "24.7%" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      Template Name
                    </Typography>
                  </Box>
                  <Box style={{ width: "12%" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      Valid From
                    </Typography>
                  </Box>
                  <Box style={{ width: "12%" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      Valid To
                    </Typography>
                  </Box>
                  <Box style={{ width: "8%" }}>
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
                </Box>
                <Box style={{ maxHeight: "30vh", marginTop: "35px" }}>
                  {dupdata?.length > 0 &&
                    dupdata?.map((item) => {
                      let saved = false;
                      if (clicked == item.demandTemplateId) {
                        saved = true;
                      } else if (clicked == item.demandTemplateName) {
                        saved = true;
                      }
                      return (
                        <>
                          <Box
                            className={classes.pagedatamainbox}
                            onClick={() => setClicked(item.demandTemplateId)}
                            style={{
                              backgroundColor: `${saved ? "lightblue" : ""}`,
                            }}
                          >
                            <Box className={classes.ActionBox}>
                              <Tooltip title="View/Edit">
                                <EditIcon
                                  className={classes.EditIcon}
                                  onClick={() =>
                                    openDemandTempModal(item)
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="Copy">
                                <FileCopyIcon
                                  className={classes.CopyIcon}
                                  onClick={() => openDemandTempModal({...item, isCopy: true})}
                                />
                              </Tooltip>
                              {/* <Tooltip title="Export">
                              <ImportExportIcon
                                className={classes.ExportIcon}
                              />
                            </Tooltip> */}
                            </Box>
                            <Box className={classes.demTemp}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {item?.demandTemplateName}
                              </Typography>
                            </Box>
                            <Box className={classes.start}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {item?.validFrom}
                              </Typography>
                            </Box>
                            <Box className={classes.num}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {item?.validTo}
                              </Typography>
                            </Box>
                            <Box className={classes.flag}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {item?.profile}
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MainPage>
      {status == 1 && (
        <DemTempEdit
          setStatus1={setStatus}
          demandTempId={clicked}
          editData={editData}
          setErrorProps={setErrorProps}
          citizenData={citizenData}
          skillData={skillData}
          getAllProjectRefetch={getAllProjectRefetch}
        />
      )}
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </>
  );
}
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
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // paddingRight: "10px",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "16px",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  searchBtnText: {
    fontSize: "14px",
    fontFamily: "Inter",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  SearchTextField: {
    marginLeft: "10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    //maxHeight: "350px",

    // overflow: "scroll"
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
    position: "fixed",
    width: "94%",
    position: "absolute",
    // marginRight: "50px"
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
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  CopyIcon: {
    // color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "#124590",
  },
  ExportIcon: {
    // color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "#124590",
  },
  ExpireIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "8.5%",
    display: "flex",
    alignItems: "center",
  },
  demTemp: {
    width: "25%",
    display: "flex",
    alignItems: "center",
  },
  start: {
    width: "12%",
    display: "flex",
    alignItems: "center",
  },
  num: {
    width: "12%",
    display: "flex",
    alignItems: "center",
  },
  flag: {
    width: "8%",
    display: "flex",
    alignItems: "center",
  },
  expiry: {
    width: "12%",
    display: "flex",
    alignItems: "center",
  },
  TimeStartBox: {
    width: "7%",
    display: "flex",
    alignItems: "center",
  },
  TimeEndBox: {
    width: "7%",
    display: "flex",
    alignItems: "center",
  },
  DurationBox: {
    width: "8%",
    display: "flex",
    alignItems: "center",
  },
  DurationCategoryBox: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
}));

export default Index;
