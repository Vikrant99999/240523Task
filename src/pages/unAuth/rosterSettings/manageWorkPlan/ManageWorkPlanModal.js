import { Typography, Grid, Box, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomTextField } from "../../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import CustomWorkDurationDropdown from "../CustomWorkDurationDropdown";
import { CustomButton } from "../../../../components/Button";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useState } from "react";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import {
  createWorkPlan,
  deleteworkPlan,
  updateWorkPlan,
} from "../../../../services/api";
import DeleteWorkDurationModal from "../DeleteWorkDurationModal";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import ProgressLoader from "../Loader";

const ManageWorkPlanModal = (props) => {
  const {
    toggleHandler,
    modalHeaderData,
    workDurationArr,
    editData,
    setSnakeBarProps,
    getAllProjectRefetch,
  } = props;
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);

  const [WorkPlan, setWorkPlan] = useState(
    editData == undefined ? "" : editData?.workPlanName
  );
  console.log(WorkPlan);

  const [checkStatus, setCheckStatus] = useState({
    Active:
      editData == undefined ? false : editData.active == "Y" ? true : false,
  });
  // const [durationDays, setDurationDays] = useState({
  //   Sun: editData == undefined ? " " : editData.Sun,
  // });
  const [days, setDays] = useState({});
  const [submitFlag, setSubmitFlag] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const getWorkDurationLabel = (id) => {
    const wdArray = workDurationArr.filter((item) => item.id == id);
    if (wdArray.length) {
      return wdArray[0].label;
    } else {
      return "";
    }
  };
  useEffect(() => {
    if (editData != undefined) {
      setDays({
        D1: editData?.d1,
        D2: editData?.d2,
        D3: editData?.d3,
        D4: editData?.d4,
        D5: editData?.d5,
        D6: editData?.d6,
        D7: editData?.d7,
      });
    }
  }, [editData]);

  const handleClose = () => {
    toggleHandler(false);
  };
  //Api for create work plan
  const { mutate: CreateWorkPlanMutate } = useMutation(createWorkPlan, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully added new Work Plan!",
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
      setSnakeBarProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };
  const saveWorkPlan = () => {
    if (WorkPlan == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work Plan!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (checkStatus.Active == false) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Active is required!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (Object.values(days).length === 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please select atleast one shift",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    var pdata = {
      userId: commonReducer.userId,
      active: checkStatus.Active == true ? "Y" : "N",
      workPlanName: WorkPlan,
      workDurationIdD1: days.D1 == undefined ? null : days.D1,
      workDurationIdD2: days.D2 == undefined ? null : days.D2,
      workDurationIdD3: days.D3 == undefined ? null : days.D3,
      workDurationIdD4: days.D4 == undefined ? null : days.D4,
      workDurationIdD5: days.D5 == undefined ? null : days.D5,
      workDurationIdD6: days.D6 == undefined ? null : days.D6,
      workDurationIdD7: days.D7 == undefined ? null : days.D7,
    };
    setIsLoadingBut(true);
    CreateWorkPlanMutate(pdata);
  };
  //api for update work plan
  const { mutate: UpdateWorkPlanMutate } = useMutation(updateWorkPlan, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully updated  Work Plan!",
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
      setSnakeBarProps({
        snackbarFlag: true,
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
      setIsLoadingBut(false);
      toggleHandler(true);
    }
  };
  const UpdateWorkPlan = () => {
    if (WorkPlan == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work Plan!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (checkStatus.Active == false) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Active is required!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (Object.values(days).length === 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please select atleast one shift",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    var pdata = {
      userId: commonReducer.userId,
      active: checkStatus.Active == true ? "Y" : "N",
      workPlanName: WorkPlan,
      workPlanId: editData?.workPlanId,

      workDurationIdD1: days.D1 == undefined ? null : days.D1,
      workDurationIdD2: days.D2 == undefined ? null : days.D2,
      workDurationIdD3: days.D3 == undefined ? null : days.D3,
      workDurationIdD4: days.D4 == undefined ? null : days.D4,
      workDurationIdD5: days.D5 == undefined ? null : days.D5,
      workDurationIdD6: days.D6 == undefined ? null : days.D6,
      workDurationIdD7: days.D7 == undefined ? null : days.D7,
    };
    setIsLoadingBut(true);
    UpdateWorkPlanMutate(pdata);
  };
  const deleteWorkPlanValue = async () => {
    const id = editData?.workPlanId;
    console.log("WorkPlan Deleted successfully with " + editData?.workPlanId);
    const deleteApi = await deleteworkPlan(id);
    console.log(deleteApi, "deleteApi");
    if (deleteApi.status == 201) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully deleted  Work Plan!",
        type: "success",
      });
      setIsLoadingBut(false);

      toggleHandler(false);

      getAllProjectRefetch();
    } else {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Something went wrong!",
        type: "error",
      });
      setIsLoadingBut(false);

      toggleHandler(true);
    }
    setIsLoadingBut(true);
  };
  const workDurationArrCopy = [...workDurationArr];
  workDurationArrCopy.unshift({ id: "2517", label: " ", value: " " });
  console.log(workDurationArrCopy, "workDurationArrCopy");
  const [value6,setValue6]=useState("")
  // useEffect(()=>{
  //   setValue6(workDurationArrCopy)
  // },[])
  return (
    <>
      <CustomDialog
        maxWidth="lg"
        dialogTitle="Work Plan"
        open="true"
        handleClose={handleClose}
      >
        <Grid container>
          <Grid item xs="12">
            <Grid xs="5">
              <Box className={classes.TextFieldBox}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  *Work Plan
                </Typography>
                <CustomTextField
                  style={{ marginLeft: "10px" }}
                  value={WorkPlan}
                  onChange={(e) => setWorkPlan(e.target.value)}
                  error={WorkPlan == "" ? submitFlag : ""}
                />
              </Box>
            </Grid>
            <Grid style={{ display: "flex", alignItems: "center" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginLeft: "25px",
                }}
              >
                *Active
              </Typography>
              <Box style={{ marginLeft: "10px" }}>
                <CustomCheckBox
                  check={checkStatus.Active}
                  onChangeCheck={(e) =>
                    setCheckStatus({ ...checkStatus, Active: e })
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
              {modalHeaderData?.map((value) => {
                return (
                  <Box style={{}}>
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
                      {value?.label}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        textAlign: "center",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {value?.shift}
                    </Typography>
                    <Tooltip title={getWorkDurationLabel(days[value.duration])} >
                    <CustomWorkDurationDropdown
                      style={{ margin: "5px" }}
                      value={getWorkDurationLabel(days[value.duration])}
                      options={workDurationArrCopy.map(
                        (option) => option.label
                      )}
                      onChange={(event, newData,e) => {
                        for (let i in workDurationArrCopy) {
                          if (workDurationArrCopy[i].label === newData) {
                            setDays({
                              ...days,
                              [value.duration]: parseInt(
                                workDurationArrCopy[i].id
                              ),
                            });
                          }
                        }
                        setValue6(getWorkDurationLabel(days[value.duration]))
                      }}
                    />
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Grid className={classes.BtnGroup}>
          <Box>
            {editData == undefined ? (
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <ProgressLoader isLoading={isLoadingBut} size={25} />
                <CustomButton
                  btnText="Submit"
                  onClick={!isLoadingBut && saveWorkPlan}
                  btnClass={
                    isLoadingBut
                      ? {
                          backgroundColor: "white",
                          color: "grey",
                          border: "solid 1px grey",
                          marginLeft: "10px",
                        }
                      : {
                          backgroundColor: "#124590",
                          color: "#fff",
                          marginLeft: "10px",
                        }
                  }
                />
                <CustomButton
                  btnText="Cancel"
                  onClick={handleClose}
                  btnClass={{
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                />
              </Grid>
            ) : (
              <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
                <ProgressLoader isLoading={isLoadingBut} size={25} />
                <CustomButton
                  btnText="Submit"
                  onClick={!isLoadingBut && UpdateWorkPlan}
                  btnClass={
                    isLoadingBut
                      ? {
                          backgroundColor: "white",
                          color: "grey",
                          border: "solid 1px grey",
                          marginLeft: "10px",
                        }
                      : {
                          backgroundColor: "#124590",
                          color: "#fff",
                          marginLeft: "10px",
                        }
                  }
                />
                <CustomButton
                  btnText="Delete"
                  onClick={() => setOpenDelete(true)}
                  btnClass={{
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                />
                <CustomButton
                  btnText="Cancel"
                  onClick={handleClose}
                  btnClass={{
                    backgroundColor: "#124590",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                />
              </Grid>
            )}
          </Box>
        </Grid>
      </CustomDialog>

      {openDelete && (
        <DeleteWorkDurationModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          deleteWorkPlanValue={deleteWorkPlanValue}
          isLoadingBut={isLoadingBut}
        />
      )}
    </>
  );
};

export default ManageWorkPlanModal;

const useStyles = makeStyles((theme) => ({
  TextFieldBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    // minWidth: "150%",
    margin: "5px",
    overflow: "scroll",
    //minHeight: "220px",
  },
  innermainbox: {
    display: "inline-block",
    //minWidth: "150%",

    verticalAlign: "top",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff !important",
  },
  BtnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "15px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  EditIcon: {
    color: "#124590",
    fontSize: "16px",
    cursor: "pointer",
  },
  iconStyle: {
    color: "#5BB75B",
  },
  cancelIconStyle: {
    color: "#f51414",
  },
  typo1: { fontSize: "14px", fontFamily: "Inter", fontWeight: "bold" },
  typo2: { fontSize: "14px", fontFamily: "Inter" },
}));
