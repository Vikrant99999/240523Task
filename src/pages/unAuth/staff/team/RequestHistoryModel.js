import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { CustomDialog } from "../../../../components/CustomDialog";
import { approveHistoryDetails } from "../../../../services/api";
import { dateConverter } from "../../../../utils/commonService";
import { checkNull } from "../../../contants";

export const RequestHistoryPreview = (props) => {
  const classes = useStyles();
  const { togglerHandler, requestIconData } = props;

  const [requestHistoryData, setRequestHistoryData] = useState([]);

  const handleClose = () => {
    togglerHandler(false);
  };

  useEffect(() => {
    approveHistoryMutate({ personRequestId: requestIconData?.personRequestId });
  }, []);

  const { mutate: approveHistoryMutate } = useMutation(approveHistoryDetails, {
    onSuccess: (data, context, variables) =>
      onSuccessapproveHistory(data, context, variables),
    onError: (data, context, variables) =>
      onErrorapproveHistory(data, context, variables),
  });

  const onSuccessapproveHistory = (data) => {
    if (data) {
      setRequestHistoryData(data?.data?.data);
    }
  };
  const onErrorapproveHistory = (data) => { };

  return (
    <CustomDialog
      maxWidth="md"
      dialogTitle="Request Details"
      open="true"
      handleClose={handleClose}
    >
      <Grid container>
        <Grid item xs="7" className={classes.wrap}>
          <Grid container alignItems="center">
            <Grid item xs="3">
              <Typography fontSize="14px">
                <Box textAlign="right" mr={2}>
                  Request Type
                </Box>
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography fontSize="14px">
                <Box ml={2}>{requestIconData?.requestName}</Box>
              </Typography>
            </Grid>
          </Grid>
          <Box>
            {requestIconData?.requestName == "Official Permission" ||
              requestIconData?.requestName == "Punch Request" ||
              requestIconData?.requestName == "Official Permission" ? (
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Reason
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography fontSize="14px">
                    <Box ml={2}>
                      {checkNull(requestIconData?.requestReason)}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            {requestIconData?.requestName == "Change Day Off" ||
              requestIconData?.requestName == "Punch Request" ||
              requestIconData?.requestName == "Shift Time Change" ||
              requestIconData?.requestName == "Swap Shift Request" ? (
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Effective Date
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography fontSize="14px">
                    <Box ml={2}>
                      {dateConverter(
                        moment(requestIconData?.createdOn).format(
                          "DD-MM-YYYY (ddd)"
                        )
                      )}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            {requestIconData?.requestName == "Official Permission" ||
              requestIconData?.requestName == "Personal Permission" ? (
              <>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Start Date
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box ml={2}>
                        {moment(requestIconData?.dateStart).format(
                          "DD-MM-YYYY (ddd)"
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        End Date
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box ml={2}>
                        {moment(requestIconData?.dateEnd).format(
                          "DD-MM-YYYY (ddd)"
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {requestIconData?.requestName == "Change Day Off" ||
              requestIconData?.requestName == "Official Permission" ||
              requestIconData?.requestName == "Personal Permission" ||
              requestIconData?.requestName == "Punch Request" ||
              requestIconData?.requestName == "Shift Time Change" ? (
              <>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Time Start
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box ml={2}>
                        {moment(requestIconData?.timeStart).format(
                          "hh:mm A"
                        )}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Time End
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box ml={2}>
                        {moment(requestIconData?.timeEnd).format("hh:mm A")}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {requestIconData?.requestName == "Shift Time Change" ? (
              <>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        New Time Start
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        {requestIconData?.newTimeStart}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        New Time End
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box textAlign="right" ml={2}>
                        {requestIconData?.newTimeEnd}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {requestIconData?.requestName == "Swap Shift Request" ? (
              <>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Source Roster
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box textAlign="right" ml={2}>
                        {requestIconData?.spersonRosterId}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Destination Roster
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box textAlign="right" ml={2}>
                        {requestIconData?.dpersonRosterId}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {requestIconData?.requestName == "Change Day Off" ||
              requestIconData?.requestName == "Official Permission" ||
              requestIconData?.requestName == "Personal Permission" ||
              requestIconData?.requestName == "Punch Request" ||
              requestIconData?.requestName == "Shift Time Change" ||
              requestIconData?.requestName == "Swap Shift Request" ? (
              <Grid container alignItems="center">
                <Grid item xs="3">
                  <Typography fontSize="14px">
                    <Box textAlign="right" mr={2}>
                      Comments
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography fontSize="14px">
                    <Box ml={2}>{checkNull(requestIconData?.comments)}</Box>
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            {requestIconData?.requestName == "Official Permission" ||
              requestIconData?.requestName == "Personal Permission" ? (
              <>
                <Grid container alignItems="center">
                  <Grid item xs="3">
                    <Typography fontSize="14px">
                      <Box textAlign="right" mr={2}>
                        Specific Days
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography fontSize="14px">
                      <Box ml={2}>{requestIconData?.specificDays === "S" ? "Y": "__"}</Box>
                    </Typography>
                  </Grid>
                </Grid>
                {requestIconData?.specificDays === "S" ?
                  <Box ml={18}>
                    <Grid container justifyContent="space-between">
                      <Box display="flex">
                        <Typography>Mon:</Typography>
                        <Typography>{requestIconData?.mon}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Tue:</Typography>
                        <Typography>{requestIconData?.tue}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Wed:</Typography>
                        <Typography>{requestIconData?.wed}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Thu:</Typography>
                        <Typography>{requestIconData?.thu}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Fri:</Typography>
                        <Typography>{requestIconData?.fri}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Sat:</Typography>
                        <Typography>{requestIconData?.sat}</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography>Sun:</Typography>
                        <Typography>{requestIconData?.sun}</Typography>
                      </Box>
                    </Grid>
                  </Box> : null}
              </>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs="5">
          <Box p="2px 10px 0px 5px">
            <Box border="1px solid #D6DFE6" padding={2} borderRadius="4px">
              <Box color="#2a99d1">
                <Typography variant="h6">Attachment(s)</Typography>
              </Box>
              <Box mt={2} border="1px solid #979991">
                
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box m={2}>
        <Typography className={classes.fontweightmanage}>
          Approval History
        </Typography>
        <Box>
          <Grid container className={classes.headermanagetable}>
            <Grid item xs="3">
              <Box>
                <Typography fontSize="14px">Employee</Typography>
              </Box>
            </Grid>
            <Grid item xs="2">
              <Typography fontSize="14px">Action</Typography>
            </Grid>
            <Grid item xs="2">
              <Typography fontSize="14px">ActionType</Typography>
            </Grid>
            <Grid item xs="2">
              <Typography fontSize="14px">Comments</Typography>
            </Grid>
            <Grid item xs="2">
              <Typography fontSize="14px">Date</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {requestHistoryData?.length > 0 &&
        requestHistoryData?.map((item) => {
          return (
            <Box p="0px 20px 0px 20px">
              <Grid container className={classes.rowmanagetable}>
                <Grid item xs="3">
                  <Box>
                    <Typography fontSize="14px">{item?.fullName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs="2">
                  <Typography fontSize="14px">{item?.actionTaken}</Typography>
                </Grid>
                <Grid item xs="2">
                  <Typography fontSize="14px">
                    {item?.transactionStatus}
                  </Typography>
                </Grid>
                <Grid item xs="2">
                  <Typography fontSize="14px">{item?.comments}</Typography>
                </Grid>
                <Grid item xs="2">
                  {item?.createdOn ?
                    <Typography fontSize="14px">
                      {moment(item?.createdOn).format("DD-MM-YYYY")}
                    </Typography> : null}
                </Grid>
              </Grid>
            </Box>
          );
        })}
    </CustomDialog>
  );
};

const useStyles = makeStyles(() => ({
  wrap: {
    "& p": {
      padding: "7px 0px 7px 0px",
    },
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F2F4F7",
    padding: "3px",
    "& p": {
      fontWeight: "bold",
      paddingLeft: "5px",
    },
  },
  headermanagetable: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    fontSize: "14px",
    "& p": {
      borderLeft: "1px solid #D6DFE6",
      textAlign: "left",
      fontSize: "14px",
      padding: "10px",
      fontWeight: "bold",
    },
  },
  rowmanagetable: {
    borderBottom: "1px solid #E9E9E9",
    padding: "3px",
  },
  fontweightmanage: {
    fontWeight: "bold",
  },
}));
