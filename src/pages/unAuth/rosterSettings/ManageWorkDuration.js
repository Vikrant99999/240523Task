import { Grid, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomTextField } from "../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../components/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { WorkDurationSummaryData } from "../../../services/api";
import WorkDurationModalRosterSetting from "./WorkDurationModalRosterSetting";
import { useQuery } from "react-query";
import { Header } from "../../layout/Header";
import { WorkDurationCategory } from "../../../services/api";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import ProgressLoader from "./Loader";
import { MainPage } from "../../layout/MainPage";

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
}));

const ManageWorkDuration = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [open, setOpen] = React.useState(false);
  const [pagedata, setPagedata] = React.useState([]);
  const [dupdata, setDupdata] = React.useState([]);
  const [Data, setData] = useState([]);
  const [query, setQuery] = React.useState("");
  const [query2, setQuery2] = React.useState("");
  const [edit, setEdit] = React.useState("");
  const [category, setCategory] = useState([]);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [clicked, setClicked] = useState(-1);




  const openWorkDurationModal = (i, item) => {
    setEdit(item);
    setOpen(true);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



  const {
    data: getAllSummaryData,
    error: getAllProjectError,
    isloading: getAllProjectIsloading,
    refetch: getAllProjectRefetch,
  } = useQuery(["getAllSummaryCall"], () => WorkDurationSummaryData(), {
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (getAllSummaryData) {
      setPagedata(getAllSummaryData?.data?.data);
      setDupdata(getAllSummaryData?.data?.data);
      setIsLoading1(false);
    }
  }, [getAllSummaryData]);

  const {
    data: getAllCategoryData,
    error: getAllCategoryError,
    isloading: getAllCategoryIsloading,
  } = useQuery(["getAllCategoryData"], () => WorkDurationCategory(), {
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (getAllCategoryData) {
      setCategory(getAllCategoryData?.data?.data);
      setIsLoading2(false);
    }
  }, [getAllCategoryData]);

  useEffect(() => {
    if (!isLoading1 && !isLoading2) {
      setIsLoading(false);
    }
  }, [isLoading1, isLoading2]);

  const changeWork = (e) => {
    setQuery(e.target.value);
    //setQuery2("");
  };

  const changeTime = (e) => {
    setQuery2(e.target.value);
    //setQuery("");
  };

  const searchFilter = () => {
    var dumm = pagedata.filter(filterQuery).filter(filterQuery2);
    setDupdata(dumm);
    if (dumm.length == 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "No Detail found with specified filter!",
        type: "error",
      });
    }
    setClicked(-1);
  };

  const resetFilter = () => {
    setDupdata(pagedata);
    setQuery("");
    setQuery2("");
    setClicked(-1);
  };

  const filterQuery = (item) => {
    if (query != "") {
      if (
        item?.workDurationName
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };

  const filterQuery2 = (item) => {
    if (query2 != "") {
      var starttime = item.timeStart.split("T");
      var endtime = item.timeEnd.split("T");
      let starttimeend =
        parseInt(starttime[1][0] + starttime[1][1]) >= 12 ? " PM" : " AM";
      let endtimeend =
        parseInt(endtime[1][0] + endtime[1][1]) >= 12 ? " PM" : " AM";
      starttime = starttime + starttimeend;
      endtime = endtime + endtimeend;
      if (
        starttime.toString().toLowerCase().includes(query2.toLowerCase()) ||
        endtime.toString().toLowerCase().includes(query2.toLowerCase())
      ) {
        return item;
      }
    } else {
      return item;
    }
  };

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <Box style={{ margin: "10px" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                marginLeft: "5px",
                fontWeight: "bolder",
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
                    Work Duration Name
                  </Typography>

                  <CustomTextField
                    value={query}
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
                    Time
                  </Typography>

                  <CustomTextField
                    value={query2}
                    onChange={(e) => changeTime(e)}
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
      </Box>
      <Grid
        container
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)", margin: "5px" }}
      >
        <Box style={{ margin: "10px" }}>
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
            onClick={openWorkDurationModal}
          />
        </Box>
      </Grid>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <Box style={{ width: "5%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textAlign: "start",
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
                Work Duration Code
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
                Work Duration Name
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
                HCM Schedule
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
                Valid From
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
                Valid To
              </Typography>
            </Box>
            <Box style={{ width: "7%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Time Start
              </Typography>
            </Box>
            <Box style={{ width: "7%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Time End
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
                Duration
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
                Duration Category
              </Typography>
            </Box>
          </Box>
          <Box style={{ maxHeight: "45vh", marginTop: "35px" }}>
            {dupdata?.length > 0 &&
              dupdata?.map((item, i) => {
                var StartArr = item?.timeStart;
                var startTime = StartArr?.split("T");
                var EndArr = item?.timeEnd;
                var endTime = EndArr?.split("T");
                let starttimeend =
                  parseInt(startTime[1][0] + startTime[1][1]) >= 12
                    ? " PM"
                    : " AM";
                let endtimeend =
                  parseInt(endTime[1][0] + endTime[1][1]) >= 12
                    ? " PM"
                    : " AM";
                var cat;
                for (let i = 0; i < category.length; i++) {
                  if (
                    item.workDurationCategoryId ==
                    category[i].workDurationCategoryId
                  ) {
                    cat = category[i];
                  }
                }
                let saved = false;
                if (clicked == item.workDurationId) {
                  saved = true;
                } else if (clicked == item.workDurationName) {
                  saved = true;
                }

                return (
                  <>
                    <Box
                      className={classes.pagedatamainbox}
                      onClick={() => setClicked(item.workDurationId)}
                      style={{
                        backgroundColor: `${saved ? "lightblue" : ""}`,
                      }}
                    >
                      <Box className={classes.ActionBox}>
                        <EditIcon
                          className={classes.EditIcon}
                          onClick={() => openWorkDurationModal(i, item)}
                        />
                      </Box>
                      <Box className={classes.WorkDurationCodedataBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.workDurationCode}
                        </Typography>
                      </Box>
                      <Box className={classes.workDurationNameBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.workDurationName}
                        </Typography>
                      </Box>
                      <Box className={classes.HcmBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        ></Typography>
                      </Box>
                      <Box className={classes.ValidFromBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.validFrom}
                        </Typography>
                      </Box>
                      <Box className={classes.ValidToBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.validTo}
                        </Typography>
                      </Box>
                      <Box className={classes.TimeStartBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >{`${startTime?.[1]} ${starttimeend}`}</Typography>
                      </Box>

                      <Box className={classes.TimeEndBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >{`${endTime?.[1]} ${endtimeend}`}</Typography>
                      </Box>
                      <Box className={classes.DurationBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.duration}
                        </Typography>
                      </Box>
                      <Box className={classes.DurationCategoryBox}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {cat?.workDurationCategory}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              })}
          </Box>
        </Box>
      </Box>
      {open && (
        <WorkDurationModalRosterSetting
          setClicked={setClicked}
          setSnakeBarProps={setSnakeBarProps}
          toggleHandler={setOpen}
          edit={edit}
          resetFilter={resetFilter}
          getAllProjectRefetch={getAllProjectRefetch}
        />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </MainPage>
  );
};

export default ManageWorkDuration;

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
    // margin: "5px",
    // maxHeight: "350px",

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
    position: "absolute",
    width: "96%",
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
    fontSize: "16px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  WorkDurationCodedataBox: {
    width: "15%",
    display: "flex",
    alignItems: "center",
  },
  workDurationNameBox: {
    width: "15%",
    display: "flex",
    alignItems: "center",
  },
  HcmBox: {
    width: "12%",
    display: "flex",
    alignItems: "center",
  },
  ValidFromBox: {
    width: "8%",
    display: "flex",
    alignItems: "center",
  },
  ValidToBox: {
    width: "8%",
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
