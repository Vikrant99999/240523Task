import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

import { Box, Grid } from "@material-ui/core";
import { Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../../../components/Button";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { updateState } from "../../../../redux/commonSlice";
import { rosterDateWidgetOption } from "../../../contants";
import { DateWidget } from "../../staff/shared/datewidget";
import ProfileSelector from "../../staff/shared/ProfileSelector";
import GenerateFormDemand from "./GenerateFormDemand";
import RoasterDetailModal from "./RoasterDetailModal";
import RotaSelect from "./RotaSelect";
import { isPreviousURLMatched } from "../../../../utils/commonService";
import { useEffect } from "react";
import { PersonRosterDataWithDate } from "../../../../services/api";
import DeleteModal from "./DeleteModal";
import { useMutation } from "react-query";
import ValidateRosterModal from "./ValidateRosterModal";

const SelectRoasterProfile = (props) => {
  const classes = useStyles();
  const {
    oriPagedata,
    filterByViewBy,
    viewBy,
    setViewBy,
    checked,
    changeDelete,
    setChangeDelete,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [profile, setProfile] = useState(false);
  const [status, setStatus] = React.useState(0);
  const [isLoadingBut, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPreviousURLMatched(commonReducer)) {
      dispatch(updateState({ selectedSummary: summaryKeys.totalSchHours }));
    }
  }, []);

  const { mutate: DeletePersonData } = useMutation(PersonRosterDataWithDate, {
    onSuccess: (data, context, variables) => onCreateRequest(data),
    onError: (data, context, variables) => onErrorRequest(data),
  });

  const onCreateRequest = (data) => {
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Shift(s) deleted successfully",
      type: "success",
    });
    setChangeDelete(!changeDelete);
    setIsLoading(false);
    setStatus(0);
  };

  const onErrorRequest = (data) => {
    setIsLoading(false);
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "Unable to delete Shift(s)",
      type: "error",
    });
  };

  const SelectProfileClickHandler = () => {
    setProfile(true);
  };

  const resetSelectedProfile = () => {
    dispatch(updateState({ selectedProjectObj: {} }));
  };

  const ViewByFilterValue = (newData) => {
    setViewBy(newData);
  };
  const openForms = (e) => {
    setStatus(e);
  };
  const isProfileNotSelected = () => {
    return Object.keys(commonReducer?.selectedProjectObj).length === 0
      ? true
      : false;
  };
  const isProfileSelected = () => {
    return Object.keys(commonReducer?.selectedProjectObj).length > 0
      ? true
      : false;
  };
  const isUnPublished = () => {
    return commonReducer.selectedSummary === summaryKeys.underPublish;
  };
  const isPublished = () => {
    return commonReducer.selectedSummary === summaryKeys.publish;
  };

  const summaryKeys = {
    totalSchHours: "totalSchHours",
    draft: "draft",
    pendingApproval: "pendingApproval",
    correction: "correction",
    underPublish: "underPublish",
    publish: "publish",
    onCall: "onCall",
  };
  const summaryNumbers = [
    {
      label: "Total Sch Hrs",
      key: summaryKeys.totalSchHours,
      isAccessed: true,
    },
    {
      label: "Draft",
      key: summaryKeys.draft,
      style: { marginLeft: "10px" },
      isAccessed: isProfileSelected(),
    },
    {
      label: "Pending Approval",
      key: summaryKeys.pendingApproval,
      isAccessed: true,
    },
    { label: "Correction", key: summaryKeys.correction, isAccessed: true },
    { label: "Un Published", key: summaryKeys.underPublish, isAccessed: true },
    { label: "Published", key: summaryKeys.publish, isAccessed: true },
    { label: "On Call", key: summaryKeys.onCall, isAccessed: true },
  ];
  const isSummaryNumbers = (item) => "summaryNumbers" in item;
  const getClassName = (key, keyword) => {
    return key === commonReducer.selectedSummary
      ? "totalpersonboxtextSelected"
      : keyword === "number"
      ? "totalpersonboxtextNumber"
      : "totalpersonboxtextLabel";
  };
  const handleSummaryChange = (value) => {
    dispatch(updateState({ selectedSummary: value }));
  };

  const btnKeys = {
    publish: "publish",
    quickRoster: "quickRoster",
    rota: "rota",
    demand: "demand",
    delete: "delete",
    validate: "validate",
    import: "import",
  };

  const buttonsArr = [
    {
      label: "Publish",
      onClick: () => {},
      key: btnKeys.publish,
    },
    // {
    //   label: "Quick Roster",
    //   onClick: () => {},
    //   key: btnKeys.quickRoster,
    // },
    {
      label: "Rota",
      onClick: () => {
        openForms(2);
      },
      key: btnKeys.rota,
    },
    {
      label: "Demand",
      onClick: () => {
        openForms(1);
      },
      key: btnKeys.demand,
    },
    {
      label: "Delete",
      onClick: () => {
        let pid = [];
        for (
          let i = 0;
          i < oriPagedata?.personRosterData?.["Employee"].length;
          i++
        ) {
          if (checked[i] == true) {
            pid.push(oriPagedata?.personRosterData?.["Employee"][i].personId);
          }
        }
        if (pid.length == 0) {
          setSnakeBarProps({
            snackbarFlag: true,
            msz: "Select atleast one Employee!",
            type: "error",
          });
          return;
        }
        openForms(3);
      },
      key: btnKeys.delete,
    },
    {
      label: "Validate",
      onClick: () => {
        openForms(4);
      },
      key: btnKeys.validate,
    },
    {
      label: "Import",
      onClick: () => {},
      key: btnKeys.import,
    },
  ];
  const btnsVisible = {
    profileNotSelected: [btnKeys.validate],
    profileSelected: [
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
    unPublished: [
      btnKeys.publish,
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
    published: [
      btnKeys.publish,
      btnKeys.quickRoster,
      btnKeys.rota,
      btnKeys.demand,
      btnKeys.delete,
      btnKeys.validate,
      btnKeys.import,
    ],
  };

  let arr = [];
  if (isProfileNotSelected()) {
    arr = btnsVisible.profileNotSelected;
  } else if (isUnPublished()) {
    arr = btnsVisible.unPublished;
  } else if (isPublished()) {
    arr = btnsVisible.published;
  } else if (isProfileSelected()) {
    arr = btnsVisible.profileSelected;
  }
  return (
    <>
      <Grid container className={classes.maincontainer1}>
        <Grid container className={classes.container}>
          <ProfileSelector
            classes={classes}
            resetSelectedProfile={resetSelectedProfile}
            selectprojectclickhandler={SelectProfileClickHandler}
            managerFlag={false}
          />

          <Grid
            item
            xs="12"
            className={classes.startdate}
            justifyContent="space-between"
          >
            <Stack flexDirection={"row"} alignItems="center">
              <DateWidget
                durationFilter={true}
                {...props}
                dateWidgetOption={rosterDateWidgetOption}
              />
            </Stack>
            <Stack flexDirection="row">
              {buttonsArr
                .filter((item) => {
                  return arr.includes(item.key);
                })
                .map((item, index) => {
                  return (
                    <CustomButton
                      key={index}
                      // startIcon={<DoneIcon />}
                      btnText={item.label}
                      btnClass={{
                        backgroundColor: "#124590",
                        color: "#fff",
                        marginLeft: "10px",
                      }}
                      variant="contained"
                      onClick={item.onClick}
                    />
                  );
                })}
            </Stack>
          </Grid>

          <Grid item xs="12" className={classes.Wrap}>
            {summaryNumbers
              .filter((item) => item.isAccessed)
              .map((item, index) => {
                return (
                  <Box
                    px={3}
                    className={classes.totalpersonbox}
                    key={index}
                    onClick={() => {
                      handleSummaryChange(item.key);
                    }}
                  >
                    <Typography
                      className={`${classes[getClassName(item.key, "number")]}`}
                    >
                      {isSummaryNumbers(oriPagedata)
                        ? oriPagedata.summaryNumbers[item.key]
                        : 0}
                    </Typography>
                    <Typography
                      variant="h7"
                      className={`${classes[getClassName(item.key, "label")]}`}
                      {...item?.style}
                    >
                      {item?.label}{" "}
                    </Typography>
                  </Box>
                );
              })}

            <CustomAutoComplete
              id="Duration"
              required
              options={filterByViewBy}
              getoptionlabelkey="label"
              selectedvalue={viewBy}
              className={classes.filterData}
              onChange={(_event, newData) => {
                ViewByFilterValue(newData);
              }}
            />
            <CustomButton
              // startIcon={<DoneIcon />}
              btnText="Filter"
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
                height: "38px",
              }}
              variant="contained"
            />
            <CustomButton
              // startIcon={<DoneIcon />}
              btnText="Clear Filter"
              btnClass={{
                backgroundColor: "#124590",
                color: "#fff",
                marginLeft: "10px",
                height: "38px",
              }}
              variant="contained"
            ></CustomButton>
          </Grid>
        </Grid>
      </Grid>
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
      {profile && <RoasterDetailModal togglehandler={setProfile} />}
      {status == 1 && (
        <GenerateFormDemand
          setSnakeBarProps={setSnakeBarProps}
          setStatus1={setStatus}
          changeDelete={changeDelete}
          setChangeDelete={setChangeDelete}
        />
      )}
      {status == 2 && (
        <RotaSelect
          setSnakeBarProps={setSnakeBarProps}
          setStatus1={setStatus}
          status1={status}
          changeDelete={changeDelete}
          setChangeDelete={setChangeDelete}
        />
      )}
      {status == 3 && (
        <DeleteModal
          setStatus1={setStatus}
          isLoadingBut={isLoadingBut}
          checked={checked}
          setSnakeBarProps={setSnakeBarProps}
          setIsLoading={setIsLoading}
          DeletePersonData={DeletePersonData}
          oriPagedata={oriPagedata}
        />
      )}
      {status == 4 && <ValidateRosterModal setStatus1={setStatus} />}
    </>
  );
};

export default SelectRoasterProfile;

const useStyles = makeStyles((theme) => ({
  maincontainer1: {
    //backgroundColor: "#f5f5f5",
  },
  paper: {
    //margin: "15px 0px 15px 0px",
    borderRadius: "0px !important",
    border: "1px solid rgb(233, 233, 233)",
    backgroundColor: "white !important",
    width: "100%",
  },
  container: {
    padding: "0px 16px 16px 16px",
  },
  body_text: {
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  projectname: {
    color: "#6F6F6F !important",
    display: "inline-block !important",
    marginLeft: "20px !important",
    marginTop: "10px !important",
    textOverflow: "ellipsis !important",
    overflow: "hidden !important",
    width: "calc(100% - 190px)",
    whiteSpace: "nowrap !important",
    fontSize: "14px !important",
    verticalAlign: "sub !important",
  },
  startdate: {
    display: "flex",
    alignItems: "center !important",
    marginTop: "10px !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
  },
  totalpersonbox: {
    borderRight: "1px solid rgb(233, 233, 233)",
    cursor: "pointer",
  },
  Wrap: {
    display: "flex",
    marginTop: "20px !important",
    // borderBottom: "1px solid rgb(233, 233, 233)",
    "& p": {
      fontWeight: "bold",
      marginLeft: "10px",
      textAlign: "center",
      fontSize: "14px !important",
    },
  },
  totalpersonboxtextNumber: {
    fontSize: "18px",
    color: "#000",
    fontWeight: "bold",
  },
  totalpersonboxtextLabel: {
    color: "#8a8888",
  },
  totalpersonboxtextSelected: {
    color: "#0572ce",
  },
  tablebox: {
    marginTop: "10px",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "10px !important",
  },
  projectTitle: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
}));
