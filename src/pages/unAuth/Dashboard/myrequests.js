import React, { useState } from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import { CustomButton } from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import data from "./myrequests.json";
import { Grid, Box, makeStyles, Typography } from "@material-ui/core";
import { RequestCreateModal } from "./RequestModal";

const Index = () => {
  const classes = useStyles();

  console.log(data);

  const [requestData, setRequestData] = useState(data.data);
  const [requestModal, setRequestModal] = useState(false);

  const togglerhandler = () => {
    setRequestModal((prev) => !prev);
  };

  return (
    <>
      <CustomPanel title="My Requests">
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
              onClick={togglerhandler}
            />
          </Box>
        </Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Status
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Request Type
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Start Date
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  End Date
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Time/Hour
                </Typography>
              </Box>
              <Box style={{ width: "15%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Creation Date
                </Typography>
              </Box>
            </Box>
            <Box style={{ maxHeight: "45vh" }}>
              {requestData.map((item, index) => {
                return (
                  <Box className={classes.pagedatamainbox}>
                    <Box className={classes.status}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.status}
                      </Typography>
                    </Box>
                    <Box className={classes.common}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.requestType}
                      </Typography>
                    </Box>
                    <Box className={classes.common}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.startDate}
                      </Typography>
                    </Box>
                    <Box className={classes.common}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.endDate}
                      </Typography>
                    </Box>
                    <Box className={classes.common}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.th}
                      </Typography>
                    </Box>
                    <Box className={classes.common}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                        }}
                      >
                        {item.creationDate}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </CustomPanel>
      {requestModal && <RequestCreateModal togglerhandler={togglerhandler} />}
    </>
  );
};

export default Index;

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
    // maxHeight: "350px",
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
    width: "100%",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    paddingLeft: "3px",
  },
  status: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  common: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
