import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomButton } from "../../../../components/Button";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import {
  getSplitShiftdata
} from "../../../../services/api";
import { MainPage } from "../../../layout/MainPage";
import SplitShiftModal from "./SplitShiftModal";

const SplitShift = (props) => {
  const classes = useStyles();

  const [openShift, setOpenShift] = useState(false);
  const [errorProps, setErrorProps] = useState({});
  const [splitShiftData, setSplitShiftData] = useState([]);
  const [editData, setEditData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [clicked, setClicked] = useState(-1);

  const openNewShift = async (item) => {
    setEditData(item);
    setOpenShift(true);
  };

  const handleClose = () => {
    setOpenShift(false);
  };

  const { data: getAllSplitShift, refetch: getAllProjectRefetch } = useQuery(
    ["getSplitShift"],
    () => getSplitShiftdata(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllSplitShift) {
      setSplitShiftData(getAllSplitShift?.data?.data);
      setIsLoading1(false);
    }
  }, [getAllSplitShift]);

  useEffect(() => {
    if (!isLoading1) {
      setIsLoading(false);
    }
  }, [isLoading1]);

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <Grid
        container
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.125)",
          margin: "5px 0",
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
            onClick={() => openNewShift()}
          />
        </Box>
      </Grid>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <Box style={{ width: "5%", marginLeft: "10px" }}>
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
            <Box style={{ width: "25%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Split Shift
              </Typography>
            </Box>
            <Box style={{ width: "25%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Shifts
              </Typography>
            </Box>
          </Box>
          <Box style={{ maxHeight: "45vh", marginTop: "35px" }}>
            {splitShiftData?.length > 0 &&
              splitShiftData?.map((item, index) => {
                let saved = false;
                if (clicked == item.spliShiftId) {
                  saved = true;
                } else if (clicked == item.splitShiftName) {
                  saved = true;
                }
                return (
                  <>
                    <Box
                      className={classes.pagedatamainbox}
                      onClick={() => setClicked(item.spliShiftId)}
                      style={{
                        backgroundColor: `${saved ? "lightblue" : ""}`,
                      }}
                    >
                      <Box className={classes.ActionBox}>
                        <EditIcon
                          className={classes.EditIcon}
                          onClick={() => {
                            openNewShift(item);
                          }}
                        />
                      </Box>
                      <Box className={classes.split}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            width: "39ch",
                            whiteSpace:"nowrap",
                            textOverflow:"ellipsis",
                            overflow:"hidden"
                            // fontWeight: "bold",
                          }}
                        >
                          {item?.splitShiftName}
                        </Typography>
                      </Box>
                      <Box className={classes.shift}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            width: "39ch",
                            whiteSpace:"nowrap",
                            textOverflow:"ellipsis",
                            overflow:"hidden"
                            // fontWeight: "bold",
                          }}
                        >
                          {item.shifts}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              })}
          </Box>
        </Box>
      </Box>
      {
        openShift && (
          <SplitShiftModal
            open={openShift}
            handleClose={handleClose}
            classes={classes}
            setErrorProps={setErrorProps}
            getAllProjectRefetch={getAllProjectRefetch}
            editData={editData}
            toggleHandler={setOpenShift}
          />
        )
      }
      {
        Object.keys(errorProps).length > 0 && (
          <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
        )
      }
    </MainPage>
  );
};

const useStyles = makeStyles((theme) => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    // maxHeight: "350px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    // width: "100%",
    verticalAlign: "top",
    overflowY: "scroll",
    overflowX: "scroll"
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
  EditIcon: {
    color: "#124590",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  ActionBox: {
    width: "5%",
    display: "flex",
    alignItems: "center",
  },
  split: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    wordWrap: "break-word",
  },
  shift: {
    width: "25%",
    display: "flex",
    alignItems: "center",
  },
  textField: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));

export default SplitShift;
