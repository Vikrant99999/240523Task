import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomButton } from "../../../../components/Button";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { getWorkPlan, workDuration } from "../../../../services/api";
import { MainPage } from "../../../layout/MainPage";
import ManageWorkPlanModal from "./ManageWorkPlanModal";
import { modalDayMock } from "./utils";

const ManageWorkPlan = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [workDurationArr, setWorkDurationArr] = useState();
  const [editData, setEditData] = useState("");
  const [modalHeaderData, setModalHeaderData] = useState(modalDayMock);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [WorkPlanData, setWorkPlanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [clicked, setClicked] = useState(-1);

  const openWorkPlanModal = (item) => {
    setEditData(item);
    setOpen(true);
  };
  const { data: getAllWorkDuration } = useQuery(
    ["getworkDuration"],
    () => workDuration(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllWorkDuration) {
      const data = getAllWorkDuration?.data?.data.map((el) => {
        return {
          id: el.workDurationId,
          label: el.workDurationCode,
          value: el.workDurationCode,
        };
      });
      setWorkDurationArr(data);
      setIsLoading1(false);
    }
  }, [getAllWorkDuration]);

  //API for get work plan api
  const { data: getAllWorkPlan, refetch: getAllProjectRefetch } = useQuery(
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

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <Grid
        container
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)", margin: "5px" }}
      >
        <Box style={{ margin: "10px" }}>
          <CustomButton
            variant="contained"
            // onClick={openNewModal}
            btnText="New"
            btnClass={{
              fontSize: "14px",
              fontFamily: "Inter",
              backgroundColor: "#124590",
              color: "#fff",
            }}
            startIcon={<AddIcon className={classes.addIcon} />}
            onClick={() => openWorkPlanModal()}
          />
        </Box>
      </Grid>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <Box style={{ width: "10%" }}>
              <Typography></Typography>
            </Box>
            <Box style={{ width: "20%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Work Plan
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
                Active
              </Typography>
            </Box>
          </Box>

          <Box style={{ maxHeight: "60vh", marginTop: 40 }}>
            {WorkPlanData?.length > 0 &&
              WorkPlanData?.map((item) => {
                let saved = false;
                if (clicked == item.workPlanId) {
                  saved = true;
                } else if (clicked == item.workPlanName) {
                  saved = true;
                }
                return (
                  <>
                    <Box
                      className={classes.pagedatamainbox}
                      onClick={() => setClicked(item.workPlanId)}
                      style={{
                        backgroundColor: `${saved ? "lightblue" : ""}`,
                      }}
                    >
                      <Box className={classes.ActionBox}>
                        <Tooltip title="View/Edit" >
                        <EditIcon
                          className={classes.EditIcon}
                          onClick={() => openWorkPlanModal(item)}
                        />
                        </Tooltip>
                      </Box>
                      <Box className={classes.WorkPlan}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.workPlanName}
                        </Typography>
                      </Box>
                      <Box style={{ width: "10%" }}>
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          {item?.active}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              })}
          </Box>
        </Box>
      </Box>
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
      {open && (
        <ManageWorkPlanModal
          toggleHandler={setOpen}
          modalHeaderData={modalHeaderData}
          workDurationArr={workDurationArr}
          editData={editData}
          setSnakeBarProps={setSnakeBarProps}
          getAllProjectRefetch={getAllProjectRefetch}
          setWorkDurationArr={setWorkDurationArr}
        />
      )}
    </MainPage>
  );
};

export default ManageWorkPlan;
const useStyles = makeStyles((theme) => ({
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
    marginLeft: "10px",
  },
  ActionBox: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  WorkPlan: {
    width: "20%",
    display: "flex",
    alignItems: "center",
  },
}));
