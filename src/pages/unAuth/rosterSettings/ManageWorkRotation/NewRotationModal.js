import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Autocomplete, TextField } from "@mui/material";
import { CustomTextField } from "../../../../components/TextField";
import { CustomDialog } from "../../../../components/CustomDialog";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import { makeStyles } from "@material-ui/styles";
import DatePicker from "react-datepicker";
import SearchIcon from "@material-ui/icons/Search";
import "react-datepicker/dist/react-datepicker.css";
import { CustomButton } from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import RotationRow from "./RotationRow";
import moment from "moment";
import {
  deleteworkRotation,
  createWorkRotation,
  updateWorkRotation,
  getWorkRotataionById,
} from "../../../../services/api";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { dateConverter } from "../../../../utils/commonService";
import ProgressLoader from "../Loader";
import DeleteRotationModal from "./DeleteRotationModal";

const NewRotationModal = (props) => {
  const {
    open,
    handleClose,
    setErrorProps,
    editData,
    WorkPlanData,
    setSnakeBarProps,
    toggleHandler,
    getAllProjectRefetch,
    rowDataValue,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const classes = useStyles();
  // console.log(editData, "editData");
  let date = editData?.startDate;
  console.log(date, "my date");
  const [startDate, setStartDate] = React.useState(
    editData === undefined
      ? null
      : new Date(moment(editData?.startDate).format("DD-MMM-YYYY"))
  );
  console.log(startDate, "startDate");
  const [workRotation, setWorkRotation] = useState(
    editData == undefined ? " " : editData?.workrotationName
  );
  const [noRotation, setNoRotation] = useState(
    editData == undefined ? 5 : editData?.iterations
  );
  const [iter1, setIter1] = useState("");
  const [Sequence, setSequence] = useState("");
  const [WorkPlan, setWorkPlan] = useState("");
  const [checkStatus, setCheckStatus] = useState({
    foreverFlag:
      editData == undefined
        ? false
        : editData?.foreverFlag == "Y"
        ? true
        : false,
  });

  const [val, setVal] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // console.log(workPlanRowData, "workPlanRowData");
  useEffect(() => {
    const condition = WorkPlanData.every((obj) =>
      val.includes((id) => obj.workPlanId === id)
    );
    console.log(condition, "condition");
  }, []);

  const handleAdd = () => {
    if (workRotation == " ") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Work Rotation!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    
    if (startDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the start from date value!",
        type: "error",
      });
      return;
    }
    if (noRotation > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter Rotation value between 0 to 99 !",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    
    const valList = [...val];
    valList.push({});
    setVal(valList);
  };

  const handleDelete = (index) => {
    const deleteval = [...val];
    deleteval.splice(index, 1);
    setVal(deleteval);
  };
  const [iteration,setIteration]=useState("1")
  const onChangeRowData = (e, index) => {
    const changeval = [...val];
    let rData = changeval[index];
    const { name, value } = e.target;
    rData[name] = value;
    setVal(changeval);
    setIteration(changeval[0].iteration)
    // console.log(iteration,"iteration");
  };

  const effectiveDateChange = (effectiveDatevalue) => {
    setStartDate(effectiveDatevalue);
  };

  //Api for create work Rotation
  const { mutate: CreateWorkRotationMutate } = useMutation(createWorkRotation, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully added new Work Rotation!",
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

      toggleHandler(true);
    }
  };
  const saveHandler = () => {
    if (iter1 > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter Iteration value between 0 to 99 !",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (workRotation == " ") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Work Rotation!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (Sequence == "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Sqeuence!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (iter1 == "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Iteration!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (WorkPlan == "") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter any value in work plan!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (startDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the start from date value!",
        type: "error",
      });
      return;
    }
    if (noRotation > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter value between 0 to 99 !",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    
    if (iteration > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter value of Iteration between 0 to 99 !",
        type: "error",
      });
      setFlg(true)
      return;
    }
    var pdata = {
      forverFlag: checkStatus.foreverFlag == true ? "Y" : "N",
      numberOfrotation: noRotation,
      userId: commonReducer.userId,
      startFrom: dateConverter(moment(startDate).format("DD-MM-YYYY")),
      workRotationName: workRotation,
      workRotationLineList: getWorkRotationLineList(),
    };
    // console.log(pdata, "pdata");
    setIsLoadingBut(true);
    CreateWorkRotationMutate(pdata);
  };

  const getWorkRotationLineList = () => {
    return [...val].map((val) => ({
      iteration: val.iteration,
      sequence: val.sequence,
      workPlanId: val.workPlanDto?.workPlanId,
    }));
  };

  //Api for create work Rotation
  const { mutate: updateWorkRotationMutate } = useMutation(updateWorkRotation, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully updated Work Rotation!",
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
  const updateHandler = () => {
    if (workRotation == " ") {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the Work Rotation!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (startDate == null) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter the start from date value!",
        type: "error",
      });
      return;
    }
    if (noRotation > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter value between 0 to 99 !",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (iteration > 99) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Please enter value of Iteration between 0 to 99 !",
        type: "error",
      });
      setFlg(true);

      return;
    }
    var pdata = {
      workRotationId: editData?.workRotationId,
      forverFlag: checkStatus.foreverFlag == true ? "Y" : "N",
      numberOfrotation: noRotation,
      userId: commonReducer.userId,
      startFrom: dateConverter(moment(startDate).format("DD-MM-YYYY")),
      workRotationName: workRotation,
      workRotationLineList: getWorkRotationLineList(),
    };
    setIsLoadingBut(true);

    updateWorkRotationMutate(pdata);
  };

  const deleteWorkRotationValue = async () => {
    const id = editData?.workRotationId;
    // console.log("WorkPlan Deleted successfully with " + editData?.workPlanId);
    const deleteApi = await deleteworkRotation(id);
    console.log(deleteApi, "deleteApi");
    if (deleteApi.status == 200 || deleteApi.status == 201) {
      setErrorProps({
        snackbarFlag: true,
        msz: "Succesfully deleted  Work Rotation!",
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
    () => getWorkRotataionById({ workRotationId: editData?.workRotationId }),
    {
      enabled: true,
      retry: false,
    }
  );
  console.log(getAllSingleData, "getAllSingleData");
  useEffect(() => {
    if (getAllSingleData) {
      if (editData != undefined) {
        setVal(getAllSingleData?.data?.data?.workRotationLineList);
      }
    }
  }, [getAllSingleData]);
  const [flg,setFlg]=useState(false)
  console.log(flg,"flaggg");
  return (
    <>
      <CustomDialog
        open={open}
        maxWidth="lg"
        dialogTitle="Work Rotation"
        handleClose={handleClose}
      >
        <Grid style={{ marginBottom: "30px" }}>
          <Grid xs="6">
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Work Rotation</Box>
                </Typography>
              </Grid>
              <Grid xs="5">
                {editData?.expiryDate == null ? (
                  <CustomTextField
                    type="text"
                    required
                    value={workRotation}
                    style={{ marginLeft: "10px" }}
                    onChange={(e) => setWorkRotation(e.target.value)}
                    error={workRotation == " " ? submitFlag : ""}
                  />
                ) : (
                  <CustomTextField
                    value={editData?.workrotationName}
                    style={{ marginLeft: "10px" }}
                  />
                )}
              </Grid>
            </Box>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*Start From</Box>
                </Typography>
              </Grid>
              <Grid xs="5" style={{ marginLeft: "10px" }}>
                {editData?.expiryDate == null ? (
                  <DatePicker
                    className="dateManage"
                    dateFormat="dd-MMM-yyyy"
                    selected={startDate}
                    onChange={effectiveDateChange}
                  />
                ) : (
                  <DatePicker
                    className="dateManage"
                    dateFormat="dd-MMM-yyyy"
                    value={editData?.startDate}
                  />
                )}
              </Grid>
            </Box>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">*No. of Rotation</Box>
                </Typography>
              </Grid>
              <Grid xs="2">
                {editData?.expiryDate == null ? (
                  <CustomTextField
                    type="text"
                    required
                    value={noRotation}
                    style={{
                      marginLeft: "10px",
                    }}
                    onChange={(e) => setNoRotation(e.target.value)}
                    error={noRotation > 99 ? submitFlag : ""}
                  />
                ) : (
                  <CustomTextField
                    value={editData?.iterations}
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                )}
              </Grid>
            </Box>
            <Box className={classes.textField}>
              <Grid item xs="3">
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box textAlign="right">Forever Flag</Box>
                </Typography>
              </Grid>
              <Grid style={{ marginLeft: "10px" }}>
                {editData?.expiryDate == null ? (
                  <CustomCheckBox
                    check={checkStatus.foreverFlag}
                    onChangeCheck={(e) =>
                      setCheckStatus({ ...checkStatus, foreverFlag: e })
                    }
                  />
                ) : (
                  <CustomCheckBox
                    check={editData?.foreverFlag == "Y" ? true : false}
                  />
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid>
            <Grid
              container
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.125)",
                margin: "10px",
              }}
            >
              <Box style={{ margin: "10px" }}>
                {editData?.expiryDate == null ? (
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
                    onClick={() => handleAdd()}
                  />
                ) : null}
              </Box>
            </Grid>

            <Box className={classes.mainbox}>
              <Box className={classes.innermainbox}>
                <Box className={classes.innerboxworkduration}>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </Typography>
                  </Box>
                  <Box style={{ width: "200px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Work Plan
                    </Typography>
                  </Box>
                  <Box style={{ width: "150px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Sequence
                    </Typography>
                  </Box>
                  <Box style={{ width: "150px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Iteration
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Sun
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Mon
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Tue
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Wed
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Thu
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Fri
                    </Typography>
                  </Box>
                  <Box style={{ width: "100px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      Sat
                    </Typography>
                  </Box>
                </Box>
                <Box style={{ maxHeight: "45vh", marginTop: "5px" }}>
                  {val?.length > 0 ? (
                    val?.map((data, index) => {
                      return (
                        <>
                          <RotationRow
                            index={index}
                            handleDelete={handleDelete}
                            setErrorProps={setErrorProps}
                            setIsLoadingBut={setIsLoadingBut}
                            setFlg={setFlg}
                            onChangeRowData={onChangeRowData}
                            WorkPlanData={WorkPlanData}
                            data={data}
                            setIter1={setIter1}
                            setWorkPlan={setWorkPlan}
                            setSequence={setSequence}
                          />
                        </>
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
                      No Data To Display
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          {editData?.expiryDate == null ? (
            editData == undefined ? (
              <Grid
                xs="12"
                className={classes.placer}
                style={{ marginTop: "20px" }}
              >
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
                  onClick={!isLoadingBut && !flg && saveHandler}
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
              <Grid
                xs="12"
                className={classes.placer}
                style={{ marginTop: "20px" }}
              >
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
                  onClick={!isLoadingBut && !flg  && updateHandler}
                />
                <CustomButton
                  btnText="Delete"
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
                  onClick={() => setOpenDeleteModal(true)}
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
            )
          ) : (
            <Grid
              xs="12"
              className={classes.placer}
              style={{ marginTop: "20px" }}
            >
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
        <DeleteRotationModal
          deleteWorkRotationValue={deleteWorkRotationValue}
          toggleHandler={setOpenDeleteModal}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    display: "flex",
    alignItems: "center",
    margin: "15px 10px",
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
    height: "150px",
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
  workplan: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
    background: "lightblue",
  },
  sequence: {
    width: "14%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
  },
  week: {
    width: "8%",
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid #E9E9E9",
  },
  placer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default NewRotationModal;
