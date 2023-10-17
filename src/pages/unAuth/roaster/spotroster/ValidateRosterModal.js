import React, { useState, useEffect } from "react";
import SelectSearch from "./SelectSearch";
import { makeStyles } from "@material-ui/styles";
import { CustomDialog } from "../../../../components/CustomDialog";
import { CustomButton } from "../../../../components/Button";
import ProgressLoader from "../../rosterSettings/Loader";
import { Grid, Typography, Box } from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomTextField } from "../../../../components/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomAutoComplete } from "../../../../components/CustomAutoComplete";
import { GetDemandTemplate } from "../../../../services/api";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { borderTopColor } from "@mui/system";
import DemandPopup from "./DemandLOVModal";
import { useMutation } from "react-query";
import { ValidateRoster, getDemandTemp } from "../../../../services/api";
import ValidatePopup from "./ValidatePopup";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import moment from "moment";
const ValidateRosterModal = (props) => {
  const classes = useStyles();

  //   const { setStatus1, deletePersonData, isLoadingBut } = props;
  const { setStatus1 } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const filterByViewBy = [
    { id: 1, label: "Data Entry", value: "Data Entry" },
    { id: 2, label: "Duty Change", value: "Duty Change" },
    {
      id: 3,
      label: "Not return back after leave",
      value: "Not return back after leave",
    },
  ];
  const [reason, setViewBy] = useState(filterByViewBy[0]);
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [comment, setComment] = useState("");
  const [select, setSelect] = useState(0);
  const [select1, setSelect1] = useState(0);
  const [demandLov, setDemandLov] = useState("");
  const [openDemand, setOpenDemand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state1, setState1] = useState(-1);
  const [selectDemand, setSelectDemand] = useState({});
  const [header, setHeader] = useState([]);
  const [masterMap, setmasterMap] = useState({});
  const [keys, setKeys] = useState("Job Validations");
  const [keys2, setKeys2] = useState("Hrs");
  const [openmas, setOpenmas] = useState(false);
  const [demandLoad, setDemandLoad] = useState(true);
  const [load, setload] = useState(0);
  const [openDet, setOpenDet] = useState(false);
  //   window.alert(workDurationName);

  useEffect(() => {
    console.log(commonReducer?.startDate);
    console.log(commonReducer?.endDate);
    const dateParts = commonReducer?.startDate.split("-");
    const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const date1 = new Date(isoDate);
    const formattedDate1 = `${date1
      .getDate()
      .toString()
      .padStart(2, "0")}-${date1.toLocaleString("default", {
      month: "short",
    })}-${date1.getFullYear()}`;
    console.log(date1);
    setfromdate(formattedDate1);
    const dateParts2 = commonReducer?.endDate.split("-");
    const isoDate2 = `${dateParts2[2]}-${dateParts2[1]}-${dateParts2[0]}`;
    const date2 = new Date(isoDate2);
    const formattedDate2 = `${date2
      .getDate()
      .toString()
      .padStart(2, "0")}-${date2.toLocaleString("default", {
      month: "short",
    })}-${date2.getFullYear()}`;
    settodate(formattedDate2);
  }, []);

  const handleClose1 = () => {
    setStatus1(0);
  };

  const customDialogProps = {
    maxWidth: "lg",
    dialogTitle: "Validate Roster",
    open: "true",
    handleClose: { handleClose1 },
  };
  const customButtonProps = {
    btnText: "Ok",
    variant: "contained",
    btnClass: {
      backgroundColor: "#124590",
      color: "#fff",
      fontSize: "12px",
    },
  };

  const customButtonProps1 = {
    btnText: "Cancel",
    variant: "contained",
  };

  const resetChangeDemand = () => {
    setSelectDemand();
  };

  const handleChangeDemand = (index, item) => {
    setSelectDemand(item);
    console.log(item)
    setLoading(true);
  };

  const {
    data: getAllDemandTemplates,
    error: getAllDemandtError,
    isloading: getAllDemandIsloading,
    // refetch: getAllDemandRefetch,
  } = useQuery(
    ["getAllDemandTemplates"],
    () => getDemandTemp({ userId: commonReducer.userId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllDemandTemplates) {
      console.log(getAllDemandTemplates?.data?.data, "data");
      setDemandLov(
        getAllDemandTemplates?.data?.data?.map((option) => {
          return {
            templateName: option?.demandTemplateName,
            validFrom: moment(option?.validFrom).format("DD-MMM-YYYY"),
            validTo: moment(option?.validTo).format("DD-MMM-YYYY"),
            demandTemplateId: option?.demandTemplateId,
            profile: option?.profile,
            profileId: option?.profileId
          };
        })
      );
      setDemandLoad(false)
    }
  }, [getAllDemandTemplates]);

  // const {
  //   data: getAllDemandTemplates,
  //   error: getAllDemandtError,
  //   isloading: getAllDemandIsloading,
  //   // refetch: getAllDemandRefetch,
  // } = useQuery(["getAllDemandTemplates"], () => GetDemandTemplate(), {
  //   enabled: true,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (getAllDemandTemplates) {
  //     console.log(getAllDemandTemplates?.data?.data);
  //     setDemandLov(getAllDemandTemplates?.data?.data);
  //   }
  // }, [getAllDemandTemplates]);

  useEffect(() => {
    if (selectDemand.demandTemplateId != undefined) {
      let pdata = {
        demandTemplateId: selectDemand?.demandTemplateId,
        fromDate: fromdate,
        toDate: todate,
        userId: commonReducer.userId,
      };
      console.log(pdata);
      setload(1);
      ValidateRos(pdata);
    }
  }, [selectDemand]);

  const { mutate: ValidateRos } = useMutation(ValidateRoster, {
    onSuccess: (data, context, variables) =>
      onSuccessGen(data, context, variables),
    onError: (data, context, variables) => onErrGen(data, context, variables),
  });

  const onSuccessGen = (data) => {
    if (data) {
      console.log(data?.data?.data);
      setHeader(data?.data?.data?.header);
      setmasterMap(data?.data?.data?.masterMap);
      setload(2);
    }
  };

  const onErrGen = (data) => {
    if (data) {
      console.log(data);
      setload(2);
    }
  };

  useEffect(() => {
    if (select1 == 0) {
      setKeys("Job Validations");
    } else if (select1 == 1) {
      setKeys("Department Validations");
    } else {
      setKeys("Location Validations");
    }
  }, [select1]);

  useEffect(() => {
    if (select == 0) {
      setKeys2("Hrs");
    } else if (select == 1) {
      setKeys2("Staffs");
    } else {
      setKeys2("Costs");
    }
  }, [select]);

  return (
    <>
      <CustomDialog {...customDialogProps} handleClose={handleClose1}>
        <Grid className={classes.fixrow}>
          <Typography
            onClick={() => {
              setSelect(0);
            }}
            style={select == 0 ? { fontWeight: "600", color: "blue" } : {}}
            className={classes.mainhead}
          >
            Hrs
          </Typography>
          <Typography
            onClick={() => {
              setSelect(1);
            }}
            style={select == 1 ? { fontWeight: "600", color: "blue" } : {}}
            className={classes.mainhead}
          >
            Staffs
          </Typography>
          <Typography
            onClick={() => {
              setSelect(2);
            }}
            style={select == 2 ? { fontWeight: "600", color: "blue" } : {}}
            className={classes.mainhead}
          >
            Cost
          </Typography>
          <Typography
            onClick={() => {
              setOpenDemand(true);
            }}
            style={
              selectDemand.demandTemplateId
                ? {
                    fontWeight: "600",
                    color: "white",
                    backgroundColor: "cornflowerblue",
                  }
                : {}
            }
            className={classes.mainhead2}
          >
            <FilterAltIcon />
            Demand Template
          </Typography>
          <ProgressLoader isLoading={demandLoad} size={25} />
        </Grid>
        <Grid className={classes.cont}>
          <Grid className={classes.fixrow}>
            <Typography
              onClick={() => {
                setSelect1(0);
              }}
              style={
                select1 == 0
                  ? {
                      border: "1px solid grey",
                      borderTop: "3px solid blue",
                      borderBottom: "none",
                    }
                  : {}
              }
              className={classes.bodhead}
            >
              Job Validations
            </Typography>
            <Typography
              onClick={() => {
                setSelect1(1);
              }}
              style={
                select1 == 1
                  ? {
                      border: "1px solid grey",
                      borderTop: "3px solid blue",
                      borderBottom: "none",
                    }
                  : {}
              }
              className={classes.bodhead}
            >
              Department Validations
            </Typography>
            <Typography
              onClick={() => {
                setSelect1(2);
              }}
              style={
                select1 == 2
                  ? {
                      border: "1px solid grey",
                      borderTop: "3px solid blue",
                      borderBottom: "none",
                    }
                  : {}
              }
              className={classes.bodhead}
            >
              Location Validations
            </Typography>
          </Grid>
          <Grid className={classes.cont2}>
            <Grid className={classes.undor}>
              <Typography className={classes.under}>Under Demand</Typography>
              <Typography className={classes.over}>Over Demand</Typography>
            </Grid>
            {load == 2 && masterMap[keys] ? (
              <>
                <Grid className={classes.cont3}>
                  {header.length > 0 &&
                    header.map((head, index) => {
                      if (index == 0) {
                        let word = "";
                        if (select1 == 0) {
                          word = "Job Title";
                        } else if (select1 == 1) {
                          word = "Department";
                        } else {
                          word = "Location";
                        }
                        return (
                          <Typography
                            style={{ fontWeight: "bold" }}
                            className={classes.cont3bodm}
                          >
                            {word}
                          </Typography>
                        );
                      } else {
                        return (
                          <Typography
                            style={{ fontWeight: "bold" }}
                            className={classes.cont3bod}
                          >
                            {head}
                          </Typography>
                        );
                      }
                    })}
                </Grid>
                <Grid className={classes.cont4}>
                  {masterMap[keys] &&
                    Object.keys(masterMap[keys]).map((obj) => {
                      let rows = [];
                      if (keys2 == "Hrs") {
                        rows.push("demandHour");
                        rows.push("scheduledHour");
                      } else if (keys2 == "Staffs") {
                        rows.push("demandFte");
                        rows.push("fte");
                      }
                      return (
                        <Grid className={classes.tab}>
                          <Typography
                            style={
                              obj == "Total Hrs"
                                ? { textAlign: "end", fontWeight: "bold" }
                                : {}
                            }
                            onClick={() => {
                              setOpenDet(true);
                            }}
                            className={
                              obj == "Total Hrs"
                                ? classes.cont3bodm
                                : classes.cont3bodmm
                            }
                          >
                            {obj}
                          </Typography>
                          {Object.keys(masterMap[keys][obj]).map((obj2) => {
                            if (
                              masterMap[keys][obj][obj2][rows[0]] !=
                                undefined &&
                              masterMap[keys][obj][obj2][rows[1]] != undefined
                            ) {
                              console.log(masterMap[keys][obj][obj2][rows[0]]);
                              console.log(masterMap[keys][obj][obj2][rows[1]]);
                              let num2 = masterMap[keys][obj][obj2][rows[0]];
                              let num1 = masterMap[keys][obj][obj2][rows[1]];
                              num2 = Number.isInteger(num2)
                                ? Math.round(num2)
                                : num2.toFixed(1);
                              num1 = Number.isInteger(num1)
                                ? Math.round(num1)
                                : num1.toFixed(1);
                              let sty = {};
                              if (num1 > num2) {
                                sty = {
                                  backgroundColor: "#E4D4E7",
                                };
                              } else if (num1 < num2) {
                                sty = {
                                  backgroundColor: "#FFCCBC",
                                };
                              }
                              return (
                                <Typography
                                  style={sty}
                                  className={classes.cont3bod}
                                >
                                  <Typography className={classes.cont3bod1}>
                                    {num1 + " "}
                                  </Typography>
                                  <Typography className={classes.cont3bod2}>
                                    {num2}
                                  </Typography>
                                </Typography>
                              );
                            } else {
                              return (
                                <Typography className={classes.cont3bod}>
                                  <Typography className={classes.cont3bod2}>
                                    0
                                  </Typography>
                                </Typography>
                              );
                            }
                            // return <Typography className={classes.cont3bod}>{`${masterMap[keys][obj][obj2].scheduledHour} `}</Typography>
                          })}
                        </Grid>
                      );
                    })}
                </Grid>
              </>
            ) : (
              <Grid className={classes.nodata}>
                {load == 1 ? (
                  <ProgressLoader isLoading={load == 1} />
                ) : (
                  <Typography>No data to display.</Typography>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </CustomDialog>
      {openDemand && (
        <DemandPopup
          toggleHandler={setOpenDemand}
          demandLov={demandLov}
          handleChangeDemand={handleChangeDemand}
          resetChangeDemand={resetChangeDemand}
          state1={state1}
          setState1={setState1}
        />
      )}
      {openDet && <ValidatePopup setStatus1={setOpenDet} />}
    </>
  );
};

export default ValidateRosterModal;

const useStyles = makeStyles((theme) => ({
  nodata: {
    marginLeft: "1.75em",
  },
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mainrow: {
    display: "flex",
    flexDirection: "row",
    margin: "15px",
  },
  maincont: {
    width: "100%",
  },
  mainhead: {
    padding: "0.5em 1em",
    borderRight: "1px solid grey",
    cursor: "pointer",
    color: "cornflowerblue",
  },
  mainhead2: {
    margin: "0 1em",
    padding: "0.5em 1em",
    cursor: "pointer",
    color: "cornflowerblue",
    border: "2px solid cornflowerblue",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "center",
  },
  bodhead: {
    cursor: "pointer",
    padding: "0.25em 0.75em",
    borderTop: "2px solid white",
  },
  cont: {
    marginTop: "1em",
  },
  cont2: {
    width: "100%",
    border: "1px solid grey",
  },
  cont3: {
    margin: "0 1.5em 0 1.5em",
    display: "flex",
    flexDirection: "row",
    border: "1px solid grey",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },
  cont4: {
    margin: "0 1.5em 1em 1.5em",
    display: "flex",
    flexDirection: "column",
    border: "1px solid grey",
  },
  fixrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid grey",
  },
  fixcol: {
    display: "flex",
    flexDirection: "column",
  },
  undor: {
    margin: "0.5em 1.5em 0.5em 1.5em",
    display: "flex",
    /* text-align: right; */
    flexDirection: "row-reverse",
    gap: "18px"
  },
  under: {
    backgroundColor: "#FFCCBC",
    padding: "0.25em",
    borderRadius: "5px",
  },
  over: {
    backgroundColor: "#E4D4E7",
    padding: "0.25em",
    marginLeft: "0.5em",
    borderRadius: "5px",
  },
  cont3bodm: {
    width: "30%",
    padding: "0.2em",
    borderRight: "2px solid blue",
  },
  cont3bodmm: {
    width: "30%",
    padding: "0.2em",
    borderRight: "2px solid blue",
    color: "cornflowerblue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cont3bod: {
    width: "10%",
    padding: "0.2em",
    borderRight: "1px solid grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  cont3bod1: {
    fontSize: "1em",
  },
  cont3bod2: {
    fontSize: "0.75em",
  },
  typo: {
    width: "100px",
    textAlign: "end",
    alignSelf: "center",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "12px !important",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
