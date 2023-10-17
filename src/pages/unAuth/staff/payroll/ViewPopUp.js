import { makeStyles } from "@material-ui/styles";
import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { CustomButton } from "../../../../components/Button";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { getLineData, saveViewData } from "../../../../services/api";
import History from "./History";

import React, { useEffect, useState } from "react";
import { HourCell, LabelCell } from "../productivity_dashboard/HourCell";

const options = [
  { id: "1", value: "Lapse Hours", label: "Lapse Hours" },
  { id: "2", value: "Regular Hours", label: "Regular Hours" },
];

const ViewPopUp = (props) => {
  const { open, handleClose, data, setErrorProps } = props;
  const title =
    data !== undefined ? `Payroll Audit for ${data.fullName}` : "Payroll Audit";
  const editable = data?.status === "Draft";

  const classes = useStyles();
  const [lineData, setLineData] = useState([]);
  const [saveList, setSaveList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLineData, setFetchLineData] = useState(true);
  const [dummyOptions, setDummyOptions] = useState(options);

  const commonReducer = useSelector((state) => state.commonReducer);

  const dateConverter = (date) => {
    return moment(date, "DD-MM-YYYY").format("DD-MMM-YYYY");
  };

  const convertDateToDateMonthYearFormat = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MM-YY");
  };

  const monthNameFormat = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MMM-YYYY");
  };

  const { data: getLineDataArr, refetch: getAllRefetch } = useQuery(
    ["getLineDataArr"],
    () =>
      getLineData({
        payrollAuditId: data?.payrollAuditId,
        // payrollAuditId: 1457,
        startDate: dateConverter(commonReducer.startDate),
        endDate: dateConverter(commonReducer.endDate),
      }),
    {
      enabled: true,
      retry: false,
    }
  );
  useEffect(() => {
    if (getLineDataArr) {
      setLineData(getLineDataArr?.data?.data);
      setFetchLineData(false);
    }
  }, [getLineDataArr]);

  const onSuccessSave = (data, context, variables) => {
    console.log(data.data.data);
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully saved data!",
        type: "success",
      });
    }
    setIsLoading(false);
    getAllRefetch();
    handleClose();
  };

  console.log(lineData);

  const onErrorSave = (data, context, variables) => {};

  const { mutate: saveViewDataMutate, isLoading: saveViewDataLoading } =
    useMutation(saveViewData, {
      onSuccess: (data, context, variables) =>
        onSuccessSave(data, context, variables),
      onError: (data, context, variables) =>
        onErrorSave(data, context, variables),
    });

  const submitData = () => {
    setIsLoading(true);
    console.log(saveList);
    saveViewDataMutate(saveList);
  };

  return (
    <CustomDialog
      dialogTitle={title}
      handleClose={handleClose}
      actions={{
        isSaving: isLoading,
        onSave: editable ? submitData : null,
        onCancel: handleClose,
      }}
      isLoading={fetchLineData}
      open={open}
      maxWidth="lg"
    >
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <Box style={{ width: "20%", marginLeft: "10px" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textAlign: "start",
                }}
              >
                Employee
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
                Job Title
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
                Location
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
                BusinessUnit
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
                LegalEntity
              </Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex", padding: 5 }}>
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
                {data.fullName}
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
                {data.jobTitle}
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
                {data.locationName}
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
                {data.businessUnitName}
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
                {data.legalEntity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid style={{ margin: "20px 0" }}>
        <History data={data} />
      </Grid>
      <Grid>
        <CustomButton
          btnText="Copy Hours"
          btnClass={{
            backgroundColor: "#124590",
            color: "#fff",
            margin: "10px 3px 0px 6px",
          }}
        />
      </Grid>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <LabelCell label={"Effective Date"} />

            <Box
              style={
                {
                  //width: "40%",
                  //marginLeft: "10px",
                }
              }
            >
              <Grid
                style={{
                  width: "100%",

                  borderBottom: "1px solid rgb(194 187 187)",
                  borderRight: "1px solid rgb(194 187 187)",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "start",
                    padding: 5,
                  }}
                >
                  Timesheet
                </Typography>
              </Grid>
              <Grid container>
                <LabelCell label={"Hours"} numeric />
                <LabelCell label={"Pay Code"} width={150} />
                <LabelCell label={"Comments"} width={200} />
              </Grid>
            </Box>
            <Box
              style={
                {
                  //width: "40%",
                  //marginLeft: "10px",
                }
              }
            >
              <Grid
                style={{
                  width: "100%",
                  borderBottom: "1px solid rgb(194 187 187)",
                  borderRight: "1px solid rgb(194 187 187)",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textAlign: "start",
                    padding: 5,
                  }}
                >
                  New Hours
                </Typography>
              </Grid>
              <Grid container>
                <LabelCell label={"Hours"} numeric />
                <LabelCell label={"Pay Code"} width={150} />
                <LabelCell label={"Comments"} width={200} />
              </Grid>
            </Box>
          </Box>
          <Grid style={{}}>
            {lineData.length > 0 &&
              lineData.map((item, index) => {
                const onHoursChange = (e) => {
                  let nHrs = e.target.value;
                  setSaveList((prev) => {
                    let temp = [...prev];
                    let filter = temp.findIndex(
                      (it) => it.payrollAuditLineId === item.payrollAuditLineId
                    );
                    if (filter > -1) {
                      temp[filter].nhours = Number(nHrs);
                      return temp;
                    }
                    temp.push({
                      payrollAuditLineId: item.payrollAuditLineId,
                      payrollAuditId: item.payrollAuditId,
                      effectiveDate: convertDateToDateMonthYearFormat(
                        item.effectiveDate
                      ),
                      ttsTimesheetId: item.ttsTimesheetId,
                      hours: item.hours,
                      payCodeId: item.payCodeId,
                      comments: item.comments,
                      createdBy: item.createdBy,
                      createdOn: "28-04-23",
                      lastUpdateBy: item.lastUpdatedBy,
                      lastUpdatedOn: "28-04-23",
                      nhours: Number(nHrs),
                      nPayCodeId: item.payCodeId,
                      nComments: item.ncomments,
                    });
                    return temp;
                  });
                };

                const onPayCodeChange = (e) => {
                  let nPayCodeId = e.target.value;
                  setSaveList((prev) => {
                    let temp = [...prev];
                    let filter = temp.findIndex(
                      (it) => it.payrollAuditLineId === item.payrollAuditLineId
                    );
                    if (filter > -1) {
                      temp[filter].nPayCodeId = nPayCodeId;
                      return temp;
                    }
                    temp.push({
                      payrollAuditLineId: item.payrollAuditLineId,
                      nhours: item.nhours,
                      nPayCodeId: item.payCodeId,
                      nComments: item.ncomments,
                      payrollAuditId: item.payrollAuditId,
                      effectiveDate: convertDateToDateMonthYearFormat(
                        item.effectiveDate
                      ),
                      ttsTimesheetId: item.ttsTimesheetId,
                      hours: item.hours,
                      payCodeId: item.payCodeId,
                      comments: item.comments,
                      createdBy: item.createdBy,
                      createdOn: "28-04-23",
                      lastUpdateBy: item.lastUpdatedBy,
                      lastUpdatedOn: "28-04-23",
                    });
                    return temp;
                  });
                };

                const onCommentsChange = (e) => {
                  let nComments = e.target.value;
                  setSaveList((prev) => {
                    let temp = [...prev];
                    let filter = temp.findIndex(
                      (it) => it.payrollAuditLineId === item.payrollAuditLineId
                    );
                    if (filter > -1) {
                      temp[filter].nComments = nComments;
                      return temp;
                    }
                    temp.push({
                      payrollAuditLineId: item.payrollAuditLineId,
                      nhours: item.nhours,
                      nPayCodeId: item.payCodeId,
                      nComments: nComments,
                      payrollAuditId: item.payrollAuditId,
                      effectiveDate: convertDateToDateMonthYearFormat(
                        item.effectiveDate
                      ),
                      ttsTimesheetId: item.ttsTimesheetId,
                      hours: item.hours,
                      payCodeId: item.payCodeId,
                      comments: item.comments,
                      createdBy: item.createdBy,
                      createdOn: "28-04-23",
                      lastUpdateBy: item.lastUpdatedBy,
                      lastUpdatedOn: "28-04-23",
                    });
                    return temp;
                  });
                };

                return (
                  <Box
                    key={item.itempayrollAuditLineId}
                    style={{ dispaly: "flex" }}
                    className={classes.pagedatamainbox}
                  >
                    <HourCell hour={monthNameFormat(item?.effectiveDate)} />

                    <Box
                      style={
                        {
                          //width: "40%",
                          //marginLeft: "10px",
                        }
                      }
                    >
                      <Grid container style={{ height: "100%" }}>
                        <HourCell
                          hour={(Math.floor(item.hours * 100) / 100).toFixed(2)}
                          numeric
                        />
                        <HourCell
                          hour={item.payCodeName}
                          width={150}
                          editable
                        />
                        <HourCell hour={item.comments} width={200} editable />
                      </Grid>
                    </Box>

                    <Box
                      style={
                        {
                          // width: "40%",
                          // display: "flex",
                          // marginLeft: "10px",
                        }
                      }
                    >
                      <Grid container>
                        <HourCell
                          hour={(Math.floor(item.nhours * 100) / 100).toFixed(
                            2
                          )}
                          numeric
                          onChange={editable ? onHoursChange : null}
                        />
                        <HourCell
                          hour={item.payCodeName}
                          width={150}
                          onChange={editable ? onHoursChange : null}
                        />
                        <HourCell
                          hour={item.ncomments}
                          width={200}
                          onChange={editable ? onCommentsChange : null}
                        />
                      </Grid>
                    </Box>
                  </Box>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default ViewPopUp;
const useStyles = makeStyles((theme) => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    //height: "46px",
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
    //padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  align: {
    display: "flex",
    alignItems: "center",
  },
}));
