import { Grid, Typography, Box, Autocomplete, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomButton } from "../../../components/Button";
import { CustomDialog } from "../../../components/CustomDialog";
import { makeStyles } from "@material-ui/styles";
import { CustomTextField } from "../../../components/TextField";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { CustomAutoComplete } from "../../../components/CustomAutoComplete";
import DurationTable from "./DurationTable";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { openDays } from "./Utils";
import {
  createManageTeam,
  deleteTeamById,
  getManageTeamDataById,
  getValueFromListData,
  updateManageTeam,
  workDuration,
} from "../../../services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProgressLoader from "../rosterSettings/Loader";
import DeleteModal from "./DeleteModal";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
const ManageTeamModal = (props) => {
  const {
    toggleHandler,
    workDurationArr,
    editData,
    getAllProjectRefetch,
    setSnakeBarProps,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  // console.log(editData, "editData");
  const [expanded, setExpanded] = React.useState("panel1");
  // const [pageData, setPageData] = useState();
  // console.log(editData == undefined ? "" : editData?.teamName, "pageData");

  // // const [pagedata, setPagedata] = useState();
  const [teamName, setTeamName] = useState(
    editData == undefined ? "" : editData?.teamName
  );
  const [isLoadingBut, setIsLoadingBut] = useState(false);

  const [check, setCheck] = useState({
    enable:
      editData == undefined ? false : editData?.enabled == "Y" ? true : false,
  });
  const [maxWeek, setMaxWeeks] = useState(
    editData == undefined ? null : editData?.maxWeeks
  );
  const [maxHours, setMaxHours] = useState(
    editData == undefined ? null : editData?.maxHours
  );
  const [earlyWeeks, setEarlyWeeks] = useState(
    editData == undefined ? null : editData?.earlyWeeks
  );

  const [valueFomList, setValueFromList] = useState({
    valueFomArray: [],
    valueFom: {},
    valueFomId: "",
    valueFromName: "",
  });
  // console.log(valueFomList, "valueFomList");
  const [days, setDays] = useState({
    openFromArray: openDays,
    openFromobj: {},
    openFromId: "",
  });

  const [workDurationArrSelected, setWorkDurationArrSelected] = useState(
    editData == undefined ? [] : editData?.workDurationIds
  );
  const [workDurationIds, setWorkDurationIds] = useState(
    editData == undefined ? [] : editData?.workDurationIds
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCheck = (checked, optionId) => {
    let arr = [...workDurationArrSelected];
    let ind = arr.indexOf(optionId);
    if (ind > -1) {
      arr.splice(ind, 1);
    } else {
      arr.push(optionId);
    }
    setWorkDurationArrSelected(arr);
  };

  const classes = useStyles();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClose = () => {
    toggleHandler(false);
  };

  const { data: getValueFromList } = useQuery(
    ["getValueFromList"],
    () => getValueFromListData(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getValueFromList) {
      setValueFromList({
        ...valueFomList,
        valueFomArray: getValueFromList?.data?.data,
        valueFom: {},
      });

      // setIsLoading1(false);
    }
  }, [getValueFromList]);
  //Api for create team
  const { mutate: CreateManageTeamMutate } = useMutation(createManageTeam, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Team Saved Successfully !",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to create team",
        type: "error",
      });

      toggleHandler(true);
    }
  };
  const saveHandler = () => {
    if (teamName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Team Name!",
        type: "error",
      });
      return;
    }
    if (valueFomList.valueFomId == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Self-Scheduling Open From in RosterTeamsVO is required",
        type: "error",
      });

      return;
    }
    if (days.openFromId == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Self-Scheduling Open Days in RosterTeamsVO is required.",
        type: "error",
      });
      return;
    }
    if (maxWeek == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "How many maximum weeks employee can do self-scheduling? in RosterTeamsVO is required",
        type: "error",
      });

      return;
    }
    // if (!Number.isInteger(maxWeek)) {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value in Max Week must be a number",
    //     type: "error",
    //   });
    //   return;
    // }
    if (maxHours == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Max hours employee can self-schedule in a week? in RosterTeamsVO is required",
        type: "error",
      });

      return;
    }
    // if (typeof maxHours != "number") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value must be a number",
    //     type: "error",
    //   });
    //   return;
    // }

    if (earlyWeeks == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "How early employee can self-schedule?(Weeks) in RosterTeamsVO is required",
        type: "error",
      });
      return;
    }
    // if (typeof earlyWeeks != "number") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value must be a number",
    //     type: "error",
    //   });
    //   return;
    // }

    var pdata = {
      usedId: commonReducer?.userId,
      teamName: teamName,
      enable: check.enable == true ? "Y" : "N",
      openFormId: valueFomList.valueFomId,
      openForm: valueFomList.valueFromName,
      openDays: days.openFromId,
      maxWeeks: maxWeek,
      maxHours: maxHours,
      earlyWeeks: earlyWeeks,
      workDurationIds: workDurationArrSelected,
    };
    setIsLoadingBut(true);
    CreateManageTeamMutate(pdata);
  };
  //Api for update team
  const { mutate: UpdateManageTeamMutate } = useMutation(updateManageTeam, {
    onSuccess: (data, context, variables) =>
      onSuccessUpdateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Team updated Successfully !",
        type: "success",
      });

      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to update team",
        type: "error",
      });

      toggleHandler(true);
    }
  };
  const updateHandler = () => {
    if (teamName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Team Name!",
        type: "error",
      });
      return;
    }
    // if (valueFomList.valueFomId == "") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "Self-Scheduling Open From in RosterTeamsVO is required",
    //     type: "error",
    //   });

    //   return;
    // }
    // if (days.openFromId == "") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "Self-Scheduling Open Days in RosterTeamsVO is required.",
    //     type: "error",
    //   });
    //   return;
    // }
    if (maxWeek == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "How many maximum weeks employee can do self-scheduling? in RosterTeamsVO is required",
        type: "error",
      });

      return;
    }
    if (maxHours == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Max hours employee can self-schedule in a week? in RosterTeamsVO is required",
        type: "error",
      });

      return;
    }
    if (earlyWeeks == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "How early employee can self-schedule?(Weeks) in RosterTeamsVO is required",
        type: "error",
      });
      return;
    }
    // if (typeof maxHours != "number") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value must be a number",
    //     type: "error",
    //   });
    //   return;
    // }
    // if (typeof earlyWeeks != "number") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value must be a number",
    //     type: "error",
    //   });
    //   return;
    // }
    // if (typeof maxWeek != "number") {
    //   setSnakeBarProps({
    //     snackbarFlag: true,
    //     msz: "The value must be a number",
    //     type: "error",
    //   });
    //   return;
    // }
    var pdata = {
      teamId: editData?.teamId,
      usedId: commonReducer?.userId,
      teamName: teamName,
      enable: check.enable == true ? "Y" : "N",
      openFormId: valueFomList.valueFomId,
      openForm: valueFomList.valueFromName,
      openDays: days.openFromId,
      maxWeeks: maxWeek,
      maxHours: maxHours,
      earlyWeeks: earlyWeeks,
      workDurationIds: workDurationArrSelected,
    };
    setIsLoadingBut(true);
    UpdateManageTeamMutate(pdata);
  };
  const deleteTeam = async () => {
    const id = editData?.teamId;
    // console.log("WorkPlan Deleted successfully with " + editData?.workPlanId);
    const deleteApi = await deleteTeamById(id);
    setIsLoadingBut(true);

    console.log(deleteApi, "deleteApi");
    if (deleteApi.status == 200 || deleteApi.status == 201) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully deleted  Team!",
        type: "success",
      });

      toggleHandler(false);
      getAllProjectRefetch();
    } else {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Something went wrong!",
        type: "error",
      });
      toggleHandler(true);
    }
  };

  // const { data: getManageTeamById } = useQuery(
  //   ["getManageTeam", editData?.teamId],
  //   () =>
  //     getManageTeamDataById({
  //       teamId: editData == undefined ? null : editData?.teamId,
  //     }),
  //   {
  //     enabled: true,
  //     retry: false,
  //   }
  // );

  // useEffect(() => {
  //   if (getManageTeamById) {
  //     setPageData(getManageTeamById?.data?.data);

  //     // setIsLoading1(false);
  //   }
  // }, [getManageTeamById]);
  return (
    <>
      <CustomDialog
        dialogTitle="Manage Team"
        maxWidth="lg"
        open="true"
        handleClose={handleClose}
      >
        <Grid container>
          <Grid item xs="12" className={classes.mainGrid}>
            <Grid xs="8">
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "end",
                    }}
                  >
                    Team Name
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <CustomTextField
                    style={{ marginLeft: "10px" }}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </Grid>
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "end",
                    }}
                  >
                    Enabled?
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <CustomCheckBox
                    check={check.enable}
                    onChangeCheck={(e) => setCheck({ ...check, enable: e })}
                  />
                </Grid>
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "end",
                    }}
                  >
                    Self Scheduling Open From *
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <Autocomplete
                    defaultValue={editData?.openForm}
                    id="Value From"
                    required
                    options={
                      valueFomList?.valueFomArray?.length > 0
                        ? valueFomList?.valueFomArray?.map((option) => {
                            return {
                              label: option?.meaning,
                              value: option?.valueFromId,
                            };
                          })
                        : []
                    }
                    renderInput={(params) => <TextField {...params} />}
                    style={{ marginLeft: "10px" ,width:"10.7em" }}
                    // options={[]}
                    getoptionlabel="label"
                    // Value={}
                    onChange={(_event, newData) => {
                      setValueFromList({
                        ...valueFomList,
                        valueFom: newData,
                        valueFomId: newData.value,
                        valueFromName: newData.label,
                      });
                    }}
                    popupIcon={
                      <ArrowDropDownIcon
                        fontSize="large"
                        style={{ marginRight: 0 }}
                      />
                    }
                    disableClearable
                  />
                </Grid>
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "end",
                    }}
                  >
                    Self Scheduling Open Days
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <Autocomplete
                    defaultValue={editData?.openDays}
                    id="Open From"
                    required
                    options={
                      days?.openFromArray?.length > 0
                        ? days?.openFromArray?.map((option) => {
                            return {
                              label: option?.value,
                              value: option?.id,
                            };
                          })
                        : []
                    }
                    style={{ marginLeft: "10px" ,width:"10.7em"}}
                    // options={[]}
                    getoptionlabel="label"
                    onChange={(_event, newData) => {
                      setDays({
                        ...days,
                        openFromobj: newData,
                        openFromId: newData.value,
                      });
                    }}
                    popupIcon={
                      <ArrowDropDownIcon
                        fontSize="large"
                        style={{ marginRight: 0 }}
                      />
                    }
                    renderInput={(params) => <TextField {...params} />}
                    disableClearable
                  />
                </Grid>
                {/* <CustomAutoComplete /> */}
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textAlign: "end",
                    }}
                  >
                    How many maximum weeks employee can do self-scheduling?
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <CustomTextField
                    type="number"
                    style={{ marginLeft: "10px", textAlign: "right" }}
                    value={maxWeek}
                    onChange={(e) => {setMaxWeeks(e.target.value)
                    console.log(maxWeek,typeof(maxWeek))}}
                  />
                </Grid>
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textAlign: "end",
                    }}
                  >
                    Max hours employee can self-schedule in a week?
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <CustomTextField
                    type="number"
                    style={{ marginLeft: "10px", textAlign: "right" }}
                    value={maxHours}
                    onChange={(e) => setMaxHours(e.target.value)}
                  />
                </Grid>
              </Box>
              <Box className={classes.contentBox}>
                <Grid xs="5">
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "bold",
                      textAlign: "end",
                    }}
                  >
                    How early employee can self-schedule?( Weeks)
                  </Typography>
                </Grid>
                <Grid xs="3">
                  <CustomTextField
                    type="number"
                    style={{ marginLeft: "10px", textAlign: "right" }}
                    value={earlyWeeks}
                    onChange={(e) => setEarlyWeeks(e.target.value)}
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid xs="4">
              <Box className={classes.shiftsBox}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Applicable Shifts
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item style={{ margin: "10px" }}>
                      <DurationTable
                        workDurationArr={workDurationArr}
                        workDurationArrSelected={workDurationArrSelected}
                        workDurationIds={workDurationIds}
                        handleCheck={handleCheck}
                      />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {editData == undefined ? (
          <Grid className={classes.selectButton}>
            <Box style={{ marginTop: "10px" }}>
              <ProgressLoader isLoading={isLoadingBut} size={25} />
            </Box>
            <CustomButton
              btnText="Save"
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
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                margin: "10px 3px",
              }}
              onClick={handleClose}
            />
          </Grid>
        ) : (
          <Grid className={classes.selectButton}>
            <Box style={{ marginTop: "10px" }}>
              <ProgressLoader isLoading={isLoadingBut} size={25} />
            </Box>
            <CustomButton
              btnText="Save"
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
              onClick={!isLoadingBut && updateHandler}
            />
            <CustomButton
              btnText="Delete"
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
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                margin: "10px 3px",
              }}
              onClick={handleClose}
            />
          </Grid>
        )}
      </CustomDialog>
      {openDeleteModal && (
        <DeleteModal
          toggleHandler={setOpenDeleteModal}
          deleteTeam={deleteTeam}
        />
      )}
    </>
  );
};

export default ManageTeamModal;
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: "flex",
    flexDirection: "row",
  },
  contentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5px",
    marginRight: "50px",
  },
  shiftsBox: {
    border: "1px solid rgba(0, 0, 0, 0.125)",
  },
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
}));
