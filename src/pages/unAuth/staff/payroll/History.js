import { makeStyles } from "@material-ui/styles";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { useMutation } from "react-query";
import { history } from "../../../../services/api";
import moment from "moment";
import { useSelector } from "react-redux";
import { CustomTextField } from "../../../../components/TextField";

import React, { useEffect, useState } from "react";

const History = (props) => {
  const { data } = props;
  const title = "History";

  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);

  //   console.log(historyData.plistDataDTOS);

  const commonReducer = useSelector((state) => state.commonReducer);

  const onSuccess = (data, context, variables) => {
    console.log("data", data);
    setHistoryData(data?.data?.data.historyListDetails);
  };
  const onError = () => {};

  const { mutate: historyMutate, isLoading: lineDataLoading } = useMutation(
    history,
    {
      onSuccess: (data, context, variables) =>
        onSuccess(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );

  const dateConverter = (date) => {
    return moment(date, "DD-MM-YYYY").format("DD-MMM-YYYY");
  };

  useEffect(() => {
    console.log(data.payrollAuditId);
    historyMutate({
      payrollAuditId: data.payrollAuditId,
      userId: "300000003286180",
      // payrollAuditId: "1261",
      // startDate: "01-Apr-2022",
      // endDate:"30-Apr-2022"
    });
  }, [
    data.payrollAuditId,
    commonReducer.startDate,
    commonReducer.endDate,
    historyMutate,
  ]);

  return (
    <Box className={classes.mainbox}>
      <Box className={classes.innermainbox}>
        <Box className={classes.innerboxworkduration}>
          <Box style={{ width: "30%", marginLeft: "10px" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              User Name
            </Typography>
          </Box>
          <Box style={{ width: "20%", marginLeft: "10px" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Actions
            </Typography>
          </Box>
          <Box style={{ width: "20%", marginLeft: "10px" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Comments
            </Typography>
          </Box>
          <Box style={{ width: "20%", marginLeft: "10px" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              Action Date
            </Typography>
          </Box>
        </Box>
        <Grid style={{ maxHeight: "200px", overflowY: "auto" }}>
          {historyData.length > 0 &&
            historyData.map((data, index) => {
              return (
                <Box
                  style={{ display: "flex" }}
                  className={classes.pagedatamainbox}
                >
                  <Box
                    style={{
                      width: "30%",
                      display: "flex",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {data.userName}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      display: "flex",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {data.action}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      display: "flex",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {data.Comments}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      display: "flex",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                      }}
                    >
                      {data.actionDate}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default History;
const useStyles = makeStyles((theme) => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    padding: 6,
    //height: "35px",
    // "&:hover": {
    //   backgroundColor: "#ededed",
    // },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    minHeight: "fit-content",
  },
  innermainbox: {
    display: "inline-block",
    minWidth: "100%",
    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
}));
