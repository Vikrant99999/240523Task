import React, { useState } from "react";
import { Header } from "../../layout/Header";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { CustomButton } from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VacationRuleModal from "./VacationRuleModal";
import { useQuery } from "react-query";
import {
  EmployeeVacatioRuleData,
  VacatioRuleData,
  taskData,
} from "../../../services/api";
import { MainPage } from "../../layout/MainPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import { Tooltip } from "@material-ui/core";

const VacationRules = () => {
  const classes = useStyles();

  const commonReducer = useSelector((state) => state.commonReducer);

  const [openRule, setOpenRule] = useState(false);
  const [data, setData] = useState();
  const [vacationRule, setVacationRule] = useState();
  const [taskDataArr, setTaskDataArr] = useState({
    taskArray: [],
    taskObj: {},
    taskId: "",
  });
  const [editData, setEditData] = useState();
  const [user, setUser] = useState();
  const [errorProps, setErrorProps] = React.useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [clicked, setClicked] = useState(-1);

  const openNewRule = () => {
    setOpenRule(true);
  };

  const handleClose = () => {
    setOpenRule(false);
  };
  const { data: getVacationRule, refetch: getAllProjectRefetch } = useQuery(
    ["getVacationRule", commonReducer.userId],
    () => VacatioRuleData({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getVacationRule) {
      setVacationRule(getVacationRule?.data?.data);

      setIsLoading(false);
    }
  }, [getVacationRule]);

  const { data: getTask } = useQuery(["getTask"], () => taskData(), {
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (getTask) {
      setTaskDataArr({
        ...taskDataArr,
        taskArray: getTask?.data?.data,
        taskObj: {},
      });
      setIsLoading3(false);
    }
  }, [getTask]);

  useEffect(() => {
    if (!isLoading && !isLoading3) {
      setIsLoading2(false);
    }
  }, [isLoading, isLoading3]);

  const handleOpenModal = (item) => {
    setOpenRule(true);
    setEditData(item);
  };
  return (
    <MainPage pageName="Vacation Rules" isLoading={isLoading2}>
      <Grid container xs="12">
        <Grid
          container
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            margin: "5px 0",
          }}
        >
          <Box style={{ margin: "10px" }}>
            <Tooltip title={"Add Vacation"}>
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
              onClick={() => handleOpenModal()}
              />
              </Tooltip>
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
                    // textAlign: "start",
                    marginLeft: 10,
                  }}
                >
                  Action
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "start",
                    marginLeft: 5,
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
                    textAlign: "start",
                    marginLeft: 10,
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
                    textAlign: "start",
                    marginLeft: 5,
                  }}
                >
                  Task
                </Typography>
              </Box>
              <Box className={classes.date}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    // textAlign: "start",
                    marginLeft: 12,
                  }}
                >
                  Action Type
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "start",
                    marginLeft: 10,
                  }}
                >
                  To User
                </Typography>
              </Box>
            </Box>
            <Box style={{ maxHeight: "40vh", marginTop: "35px" }}>
              {vacationRule?.length > 0 ? (
                vacationRule?.map((item, index) => {
                  let saved = false;
                  if (clicked == item.vacationRuleId) {
                    saved = true;
                  }
                  return (
                    <Box
                      className={classes.pagedatamainbox}
                      onClick={() => setClicked(item.vacationRuleId)}
                      style={{
                        backgroundColor: `${saved ? "lightblue" : ""}`,
                      }}
                    >
                      <Box
                        className={classes.ActionBox}
                        onClick={() => {
                          handleOpenModal(item);
                        }}
                      >
                        <Tooltip title={"View/Edit"}>
                        <EditIcon
                          className={classes.EditIcon}
                          style={{ cursor: "pointer", marginLeft: 10 }}
                        />
                        </Tooltip>
                      </Box>
                      <Box className={classes.date}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginLeft: 5,
                          }}
                        >
                          {moment(item?.startDate).format("DD-MMM-YYYY")}
                        </Typography>
                      </Box>
                      <Box className={classes.date}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginLeft: 10,
                          }}
                        >
                          {moment(item?.endDate).format("DD-MMM-YYYY")}
                        </Typography>
                      </Box>
                      <Box className={classes.task}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginLeft: 5,
                          }}
                        >
                          {item?.taskName}
                        </Typography>
                      </Box>
                      <Box className={classes.date}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginLeft: 17,
                          }}
                        >
                          {item?.actionType}
                        </Typography>
                      </Box>
                      <Box className={classes.user}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            marginLeft: 17,
                          }}
                        >
                          {item?.fullName}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box className={classes.pagedatamainbox}>
                  {" "}
                  <Typography>No Data to display</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      {openRule && (
        <VacationRuleModal
          open={openRule}
          handleClose={handleClose}
          toggleHandler={setOpenRule}
          taskDataArr={taskDataArr}
          setTaskDataArr={setTaskDataArr}
          setErrorProps={setErrorProps}
          getAllProjectRefetch={getAllProjectRefetch}
          editData={editData}
          user={user}
        />
      )}
      {Object.keys(errorProps).length > 0 && (
        <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
      )}
    </MainPage>
  );
};

const useStyles = makeStyles((theme) => ({
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
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
    position: "fixed",
    width: "96%",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  date: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  task: {
    width: "20%",
    display: "flex",
    alignItems: "center",
  },
  user: {
    width: "15%",
    display: "flex",
    alignItems: "center",
  },
}));

export default VacationRules;
