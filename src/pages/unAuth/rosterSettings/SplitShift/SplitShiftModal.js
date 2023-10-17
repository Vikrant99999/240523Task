import React, { useState, useEffect } from "react";
import { CustomDialog } from "../../../../components/CustomDialog";
import { Typography, Grid, Box, Autocomplete, TextField } from "@mui/material";
import { CustomTextField } from "../../../../components/TextField";
import { CustomButton } from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

import { makeStyles } from "@material-ui/styles";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import {
  getSplitSelectShift,
  GetSplitShiftData,
  CreateSplitShift,
  UpdateSplitShift,
  deleteSplitShift,
  getSplitShiftById,
} from "../../../../services/api";
import { useMutation, useQuery } from "react-query";
import ProgressLoader from "../Loader";
import DeleteShiftModal from "./DeleteShiftModal";

const DUMMY_DATA = [
  "D10 06:00 AM Duration[12:00AM - 12:00PM] WS",
  "D10 06:00 AM Duration[12:00AM - 12:00PM] WS",
  "D10 06:00 AM Duration[12:00AM - 12:00PM] WS",
];

const dummy_shift_data = [
  {
    duration: "D10 8:00 AM Duration",
    timeStart: "12:00AM",
    timeEnd: "12:00PM",
    timeDuration: "00:00",
  },
  {
    duration: "D10 8:00 AM Duration",
    timeStart: "12:00AM",
    timeEnd: "12:00PM",
    timeDuration: "00:00",
  },
];

const SplitShiftModal = (props) => {
  const {
    open,
    handleClose,
    setErrorProps,
    editData,
    getAllProjectRefetch,
    toggleHandler,
    rowData,
  } = props;

  const classes = useStyles();

  const [shiftData, setShiftData] = useState(
    editData == undefined ? "" : editData?.splitShiftName
  );

  const [splitShiftData, setSplitShiftData] = useState([]);
  const [workDuration, setWorkDuration] = useState({});
  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const [val, setVal] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { data: getAllSplitShift } = useQuery(
    ["getSplitSelectShift"],
    () => getSplitSelectShift(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllSplitShift) {
      setSplitShiftData(getAllSplitShift?.data?.data);
      // setIsLoading2(false);
    }
  }, [getAllSplitShift]);

  const addShifts = async () => {
    if (shiftData === "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter split shift",
        type: "error",
      });
      return;
    }
    const addApi = await GetSplitShiftData(workDuration?.workDurationId);
    let workDurationDetail = addApi?.data?.data;
    if (workDurationDetail) {
      let valList = [...val];
      if (
        valList.filter((e) => e.workDurationId === workDuration?.workDurationId)
          .length > 0
      ) {
        setErrorProps({
          snackbarFlag: true,
          msz: "Duplicate Shift is not allowed",
          type: "error",
        });
        return;
      }

      valList.push(workDurationDetail);
      setVal(valList);
    }
    return;
  };
  const removeList = (index) => {
    const deleteval = [...val];
    deleteval.splice(index, 1);
    setVal(deleteval);
  };
  //Api for create Split Shift
  const { mutate: CreateSplitShiftMutate } = useMutation(CreateSplitShift, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully added new Split Shift!",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      // console.log(error?.response?.data?.status?.description, "error");
      setErrorProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };
  const saveHandler = () => {
    if (shiftData === "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter split shift",
        type: "error",
      });
      return;
    }
    let valList = [...val];
    if (valList.length === 0) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please add shift",
        type: "error",
      });
      return;
    }
    var pData = {
      splitShift: shiftData,
      splitShiftWorkInfoDto: [...val],
    };
    setIsLoadingBut(true);
    CreateSplitShiftMutate(pData);
  };
  //Api for create Split Shift
  const { mutate: UpdateSplitShiftMutate } = useMutation(UpdateSplitShift, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully updated new Split Shift!",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      // console.log(error?.response?.data?.status?.description, "error");
      setErrorProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };
  const UpdateHandler = () => {
    if (shiftData === "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter split shift",
        type: "error",
      });
      return;
    }
    let valList = [...val];
    if (valList.length === 0) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please add shift",
        type: "error",
      });
      return;
    }
    var pData = {
      spliShiftId: editData?.spliShiftId,
      splitShift: shiftData,
      splitShiftWorkInfoDto: [...val],
    };
    setIsLoadingBut(true);

    UpdateSplitShiftMutate(pData);
  };
  const deleteShifts = async () => {
    const id = editData?.spliShiftId;
    const deleteApi = await deleteSplitShift(id);
    if (deleteApi.status == 200 || deleteApi.status == 201) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully deleted  split shift!",
        type: "success",
      });
      toggleHandler(false);
      getAllProjectRefetch();
    } else {
      setErrorProps({
        snackbarFlag: true,
        msz: "Something went wrong!",
        type: "error",
      });
      toggleHandler(true);
    }
  };
  const { data: getAllSingleData } = useQuery(
    ["getAllSingleData"],
    () => getSplitShiftById({ spliShiftId: editData?.spliShiftId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllSingleData) {
      if (editData != undefined) {
        setVal(getAllSingleData?.data?.data?.splitShiftWorkInfoDto);
      }
    }
  }, [getAllSingleData]);
  return (
    <>
      <CustomDialog
        dialogTitle="Split Shift"
        open={open}
        handleClose={handleClose}
        maxWidth="md"
      >
        <Grid style={{ height: "fit-content" }}>
          <Grid xs="7">
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Split Shift</Box>
                </Typography>
              </Grid>
              <Grid xs="5">
                <CustomTextField
                  type="text"
                  required
                  style={{ marginLeft: "10px" }}
                  value={shiftData}
                  onChange={(e) => setShiftData(e.target.value)}
                />
              </Grid>
            </Box>
            <Box className={classes.textField} style={{ paddingLeft: 25 }}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Select Shift</Box>
                </Typography>
              </Grid>
              <Grid xs="9" style={{ marginLeft: "10px" }}>
                <Autocomplete
                  id="select shift"
                  options={splitShiftData}
                  getOptionLabel={(option) => option?.workDurationNameDesc}
                  disableClearable
                  renderInput={(params) => <TextField {...params}></TextField>}
                  onChange={(event, newValue) => {
                    setWorkDuration(newValue);
                  }}
                />
              </Grid>
              <Grid xs="1" style={{ margin: "10px" }}>
                <CustomButton
                  variant="contained"
                  btnText="Add"
                  btnClass={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    backgroundColor: "#124590",
                    color: "#fff",
                  }}
                  onClick={addShifts}
                  startIcon={<AddIcon className={classes.addIcon} />}
                />
              </Grid>
            </Box>
          </Grid>
          <Box className={classes.mainbox}>
            <Box className={classes.innermainbox}>
              <Box className={classes.innerboxworkduration}>
                <Box style={{ width: "30%", paddingLeft: 5 }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    Work Duration
                  </Typography>
                </Box>
                <Box style={{ width: "20%", paddingLeft: 5 }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    Time Start
                  </Typography>
                </Box>
                <Box style={{ width: "20%", paddingLeft: 5 }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    Time End
                  </Typography>
                </Box>
                <Box style={{ width: "20%", paddingLeft: 5 }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    Duration
                  </Typography>
                </Box>
                <Box style={{ width: "5%", paddingLeft: 5 }}>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                    }}
                  >
                    Remove
                  </Typography>
                </Box>
              </Box>
              {val?.length > 0 ? (
                val?.map((data, index) => {
                  return (
                    <Grid container style={{ padding: "5px 0px" }}>
                      <Box style={{ width: "30%", paddingLeft: 3 }}>
                        <CustomTextField
                          type="text"
                          value={data?.workDurationName}
                        />
                      </Box>
                      <Box style={{ width: "20%", paddingLeft: 3 }}>
                        <CustomTextField type="text" value={data?.timeStart} />
                      </Box>
                      <Box style={{ width: "20%", paddingLeft: 3 }}>
                        <CustomTextField type="text" value={data?.timeEnd} />
                      </Box>
                      <Box style={{ width: "20%", paddingLeft: 3 }}>
                        <CustomTextField
                          type="text"
                          value={data?.timeDuration}
                        />
                      </Box>
                      <Box
                        style={{
                          paddingLeft: 3,
                          width: "8%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                          //border: "1px solid #e9e9e9",
                        }}
                      >
                        <CancelIcon
                          style={{
                            fontSize: "22px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => removeList(index)}
                        />
                      </Box>
                    </Grid>
                  );
                })
              ) : (
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    padding: "5px",
                  }}
                >
                  No data to display
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            className={classes.textField}
            style={{ justifyContent: "flex-end" }}
          >
            <Grid item xs="1">
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Box textAlign="right">Total Shift Hours</Box>
              </Typography>
            </Grid>
            <Grid xs="1">
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Box textAlign="right">
                  {val.reduce(
                    (accumulator, object) =>
                      accumulator + parseFloat(object.timeDuration),
                    0
                  )}
                </Box>
              </Typography>
            </Grid>
          </Box>
          {editData == undefined ? (
            <Grid item xs="12" className={classes.placer}>
              <Box style={{ marginTop: "10px" }}>
                <ProgressLoader isLoading={isLoadingBut} size={25} />
              </Box>

              <CustomButton
                btnText="Save"
                variant="contained"
                btnClass={
                  isLoadingBut
                    ? {
                        backgroundColor: "white",
                        color: "grey",
                        border: "solid 1px grey",
                        margin: "10px 3px",
                      }
                    : {
                        backgroundColor: "#124590",
                        color: "#fff",
                        margin: "10px 3px",
                      }
                }
                onClick={!isLoadingBut && saveHandler}
              />
              <CustomButton
                btnText="Cancel"
                variant="contained"
                btnClass={{
                  margin: "10px 3px",
                  backgroundColor: "#124590",
                  color: "#fff",
                }}
                onClick={handleClose}
              />
            </Grid>
          ) : (
            <Grid item xs="12" className={classes.placer}>
              <Box style={{ marginTop: "10px" }}>
                <ProgressLoader isLoading={isLoadingBut} size={25} />
              </Box>
              <CustomButton
                btnText="Save"
                variant="contained"
                btnClass={
                  isLoadingBut
                    ? {
                        backgroundColor: "white",
                        color: "grey",
                        border: "solid 1px grey",
                        margin: "10px 3px",
                      }
                    : {
                        backgroundColor: "#124590",
                        color: "#fff",
                        margin: "10px 3px",
                      }
                }
                onClick={!isLoadingBut && UpdateHandler}
              />
              <CustomButton
                btnText="Delete"
                variant="contained"
                btnClass={{ margin: "10px 3px" }}
                onClick={() => setOpenDeleteModal(true)}

                // onClick={deleteShifts}
              />
              <CustomButton
                btnText="Cancel"
                variant="contained"
                btnClass={{
                  margin: "10px 3px",
                  backgroundColor: "#124590",
                  color: "#fff",
                }}
                onClick={handleClose}
              />
            </Grid>
          )}
        </Grid>
      </CustomDialog>
      {openDeleteModal && (
        <DeleteShiftModal
          deleteShifts={deleteShifts}
          toggleHandler={setOpenDeleteModal}
          shiftName={editData?.splitShiftName}
        />
      )}
    </>
  );
};

export default SplitShiftModal;

const useStyles = makeStyles((theme) => ({
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
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    height: "35px",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    overflow: "scroll",
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
  time: {
    display: "flex",
    alignItems: "center",
    width: "20%",
  },
  duration: {
    display: "flex",
    alignItems: "center",
    width: "25%",
  },
  placer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
