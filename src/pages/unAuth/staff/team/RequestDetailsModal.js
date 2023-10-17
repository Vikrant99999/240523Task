import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import moment from "moment";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { getRequestList } from "../../../../services/api";
import { RequestCreateModal } from "./RequestCreateModal";
import { RequestHistoryPreview } from "./RequestHistoryModel";
import { requestDetailtableHeader } from "../../../contants";
import { Tooltip } from "@mui/material";

export const RequestDetailsModal = (props) => {
  const classes = useStyles();
  const { togglerHandler, setSnakeBarProps, dataArr, oriPagedata, item } =
    props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [createRequest, setCreateRequest] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [requestIconData, setRequestIconData] = useState({});
  const [requesPreview, setRequesPreview] = useState(false);

  useEffect(() => {
    requestListMutate({ personId: commonReducer.personId });
  }, []);

  const { mutate: requestListMutate } = useMutation(getRequestList, {
    onSuccess: (data, context, variables) =>
      onSuccessProjectList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProjectList(data, context, variables),
  });

  const onSuccessProjectList = (data) => {
    if (data) {
      setRequestData(data?.data?.data);
    }
  };
  const onErrorProjectList = (data) => {};

  const handleClose = () => {
    togglerHandler(false);
  };

  const createrequesthandler = () => {
    setCreateRequest(true);
  };

  const refetchFunction = () => {
    requestListMutate({ personId: commonReducer.personId });
  };

  const requestDetaisClickHandler = (item) => {
    setRequestIconData(item);
    setRequesPreview(true);
  };

  return (
    <>
      <CustomDialog
        maxWidth="md"
        dialogTitle="Requests"
        open="true"
        handleClose={handleClose}
      >
        <Grid container>
          <Box>
            <CustomButton
              btnText="Create Request"
              variant="contained"
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                fontSize: "12px",
              }}
              startIcon={<NoteAddIcon />}
              onClick={createrequesthandler}
            />
          </Box>
        </Grid>
        <Box mt={2}>
          <Grid container className={classes.headermanage}>
            {requestDetailtableHeader.map((option) => {
              return (
                <Grid item xs={option.width}>
                  <Typography fontSize="14px">{option.label}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Grid className="data-table data-table">
          {requestData?.length > 0 &&
            requestData?.map((item) => {
              return (
                <Box mt={4}>
                  <Grid container className={classes.headerdata}>
                    <Grid item xs="1" className={classes.checkboxParent}>
                      <Typography fontSize="14px">
                        <Tooltip title="View Request">
                        <MarkunreadMailboxIcon
                          className={classes.checkboxicon}
                          onClick={() => requestDetaisClickHandler(item)}
                        />
                        </Tooltip>
                      </Typography>
                    </Grid>
                    <Grid item xs="2">
                      <Box>
                        <Typography fontSize="14px">
                          {item.requestName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs="2">
                      <Typography fontSize="14px">
                        {moment(item.dateStart).format("DD-MM-YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item xs="2">
                      <Typography fontSize="14px">
                        {moment(item.dateEnd).format("DD-MM-YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item xs="2">
                      <Typography fontSize="14px">{item.timeHour}</Typography>
                    </Grid>
                    <Grid item xs="2">
                      <Typography fontSize="14px">
                        {moment(item.createdOn).format("DD-MM-YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item xs="1">
                      <Typography fontSize="14px">{item.status}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Grid>
      </CustomDialog>
      {createRequest && (
        <RequestCreateModal
          togglerhandler={setCreateRequest}
          refetchFunction={refetchFunction}
          setSnakeBarProps={setSnakeBarProps}
          dataArr={dataArr}
          oriPagedata={oriPagedata}
          item={item}
        />
      )}
      {requesPreview && (
        <RequestHistoryPreview
          togglerHandler={setRequesPreview}
          requestIconData={requestIconData}
        />
      )}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    fontSize: "14px",
    "& p": {
      // borderRight: '1px solid #979991',
      textAlign: "center",
      fontSize: "14px",
      padding: "10px",
    },
  },
  headerdata: {
    borderBottom: "1px solid #E9E9E9",
    padding: "1px",
    fontSize: "14px",
    "& p": {
      // borderRight: '1px solid #979991',
      paddingLeft: "5px",
      textAlign: "center",
      fontSize: "14px",
    },
  },
  checkboxicon: {
    color: "#124590 !important",
    fontSize: "large !important",
    cursor: "pointer !important",
  },
  checkboxParent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
