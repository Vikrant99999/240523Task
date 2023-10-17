import { makeStyles } from "@material-ui/styles";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomButton } from "../../../../components/Button";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { CustomTextField } from "../../../../components/TextField";
import { getWorkPlan, getWorkRotataion } from "../../../../services/api";
import { MainPage } from "../../../layout/MainPage";
import NewRotationModal from "./NewRotationModal";
import ExpireModal from "./ExpireModal";
import Tooltip from "@mui/material/Tooltip";

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

const DUMMY_DATA = [
  {
    id: 1,
    rotation: "1st On Call",
    startFrom: "21-Mar-2021",
    num: 1,
    flag: true,
    expiry: "24-Feb-2022",
  },
  {
    id: 2,
    rotation: "20210328",
    startFrom: "28-Mar-2021",
    num: 1,
    flag: true,
    expiry: "24-Jan-2023",
  },
  {
    id: 3,
    rotation: "30May21 Test",
    startFrom: "30-May-2021",
    num: 1,
    flag: true,
    expiry: "24-Jan-2023",
  },
];

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ManageWorkRotation = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [query, setQuery] = React.useState("");
  const [query2, setQuery2] = React.useState("");
  const [data, setData] = React.useState([]);
  const [newModal, setNewModal] = React.useState(false);
  const [expireModal, setExpireModal] = React.useState(false);
  const [errorProps, setErrorProps] = React.useState({});
  const [workRotationData, setWorkRotationData] = useState([]);
  const [dupdata, setDupdata] = React.useState([]);

  const [editData, setEditData] = useState("");
  // console.log(editData, "editData");
  const [WorkPlanData, setWorkPlanData] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const handleClose = () => {
    setNewModal(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const changeWork = (e) => {
    setQuery(e.target.value);
    //setQuery2("");
  };

  const searchFilter = () => {
    var dumm = workRotationData?.filter(filterQuery);
    setDupdata(dumm);
    // if (dumm.length == 0) {
    //   ({
    //     snackbarFlag: true,
    //     msz: "No Detail found with specified filter!",
    //     type: "error",
    //   });
    // }
    setClicked(-1);
  };

  const resetFilter = () => {
    setDupdata(workRotationData);
    setQuery("");
    setClicked(-1);
  };

  const filterQuery = (item) => {
    if (query != "") {
      if (
        item?.workrotationName
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

  const openWorkRotationModal = (item) => {
    setEditData(item);
    setNewModal(true);
  };

  const openExpireModal = (item) => {
    setEditData(item);
    setExpireModal(true);
  };

  //Api for get work rotation
  const { data: getAllWorkRotation, refetch: getAllProjectRefetch } = useQuery(
    ["getWorkRotation"],
    () => getWorkRotataion(),
    {
      enabled: true,
      retry: false,
    }
  );
console.log(getAllWorkRotation,"hello");
  useEffect(() => {
    if (getAllWorkRotation) {
      setWorkRotationData(getAllWorkRotation?.data?.data);
      setDupdata(getAllWorkRotation?.data?.data);

      setIsLoading1(false);
    }
  }, [getAllWorkRotation]);
 
  //API for get work plan api
  const { data: getAllWorkPlan } = useQuery(
    ["getWorkPlan"],
    () => getWorkPlan(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllWorkPlan) {
      setWorkPlanData(getAllWorkPlan?.data?.data);
      setIsLoading2(false);
    }
  }, [getAllWorkPlan]);
  useEffect(() => {
    if (!isLoading1 && !isLoading2) {
      setIsLoading(false);
    }
  }, [isLoading1, isLoading2]);
  console.log(WorkPlanData,"workplandata");
  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <Box style={{ margin: "10px" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                margin: "20px 40px",
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
                    Work Rotation
                  </Typography>

                  <CustomTextField
                    value={query}
                    onChange={(e) => changeWork(e)}
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
      <Grid>
        <Grid
          container
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            margin: "10px",
          }}
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
              onClick={() => openWorkRotationModal()}
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
                ></Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Work Rotation
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
                  Start From
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
                  No. of Rotation
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
                  Forever Flag
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
                  Expiry Date
                </Typography>
              </Box>
            </Box>
            <Box style={{ maxHeight: "45vh", marginTop: "35px" }}>
              {dupdata?.length > 0 &&
                dupdata?.map((item) => {
                  let saved = false;
                  if (clicked == item.workRotationId) {
                    saved = true;
                  } else if (clicked == item.workrotationName) {
                    saved = true;
                  }
                  return (
                    <>
                      <Box
                        className={classes.pagedatamainbox}
                        onClick={() => setClicked(item.workRotationId)}
                        style={{
                          backgroundColor: `${saved ? "lightblue" : ""}`,
                        }}
                      >
                        <Box className={classes.ActionBox}>
                          <Tooltip title="View/Edit">
                            <EditIcon
                              className={classes.EditIcon}
                              onClick={() => openWorkRotationModal(item)}
                            />
                          </Tooltip>
                        </Box>
                        <Box className={classes.rotation}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.workrotationName}
                          </Typography>
                        </Box>
                        <Box className={classes.start}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.startDate}
                          </Typography>
                        </Box>
                        <Box className={classes.num}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.iterations}
                          </Typography>
                        </Box>
                        <Box className={classes.flag}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.foreverFlag}
                          </Typography>
                        </Box>
                        {item?.expiryDate == null ? (
                          <Box className={classes.ActionBox}>
                            <Tooltip title="Expire">
                              <AccessTimeFilledIcon
                                className={classes.ExpireIcon}
                                onClick={() => openExpireModal(item)}
                              />
                            </Tooltip>
                          </Box>
                        ) : (
                          <Box className={classes.expiry}>
                            <Typography
                              style={{ fontSize: "14px", fontFamily: "Inter" }}
                            >
                              {moment(item?.expiryDate).format("DD-MMM-YYYY")}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Grid>
      {newModal && (
        <NewRotationModal
          editData={editData}
          open={newModal}
          handleClose={handleClose}
          setErrorProps={setErrorProps}
          WorkPlanData={WorkPlanData}
          toggleHandler={setNewModal}
          getAllProjectRefetch={getAllProjectRefetch}
        />
      )}
      {expireModal && (
        <ExpireModal
          editData={editData}
          open={expireModal}
          handleClose={() => setExpireModal(false)}
          setErrorProps={setErrorProps}
          WorkPlanData={WorkPlanData}
          toggleHandler={setExpireModal}
          getAllProjectRefetch={getAllProjectRefetch}
        />
      )}
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </MainPage>
  );
};

export default ManageWorkRotation;

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
    paddingRight: "10px",
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
    width: "96%",
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
  ExpireIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  rotation: {
    width: "15%",
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
