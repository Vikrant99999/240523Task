import {
  Typography,
  Grid,
  Box,
  Autocomplete,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CustomDialog } from "../../../components/CustomDialogMini";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { CustomTextField } from "../../../components/TextField";
import { makeStyles } from "@material-ui/styles";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { CustomButton } from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import moment from "moment";
import { dateConverter } from "../../../utils/commonService";
import { WorkDurationCategory } from "../../../services/api";
import ProgressLoader from "./Loader";
import {
  BussinessUnitData,
  LegalEntityData,
  DeleteWorkDuration,
  GetWorkDurationDetail,
  CreateWorkDuration,
  GetWorkDurationCriteriaDetail,
} from "../../../services/api";
import { useQuery, useMutation } from "react-query";
import SearchIcon from "@mui/icons-material/Search";
import { _formatTime } from "../../contants";
import { CustomAutoComplete } from "../../../components/CustomAutoComplete";
import DepartmentLOVModal from "./DepartmentLOVModal";
import DetailRow from "./DetailRow";
// import { Category } from '@material-ui/icons';
import { DepartmentLovData } from "../../../services/api";
import { validateDate } from "@mui/x-date-pickers/internals";
import DeleteWorkDurationModal from "./DeleteWorkDurationModal";
// import { parse } from "date-fns/esm";

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

const WorkDurationModalRosterSetting = (props) => {
  const {
    toggleHandler,
    edit,
    getAllProjectRefetch,
    resetFilter,
    setSnakeBarProps,
    setClicked,
  } = props;
  var StartArr = edit?.timeStart;
  var EndArr = edit?.timeEnd;
  let starttimeend =
    parseInt(StartArr?.split("T")[1][0] + StartArr?.split("T")[1][1]) >= 12
      ? " PM"
      : " AM";
  let endtimeend =
    parseInt(EndArr?.split("T")[1][0] + EndArr?.split("T")[1][1]) >= 12
      ? " PM"
      : " AM";

  const changeTimeType = (stararr, startend) => {
    let convStart = parseInt(
      stararr?.split("T")[1][0] + stararr?.split("T")[1][1]
    );

    if (startend == " PM") {
      if (convStart > 12) {
        convStart = convStart - 12;
        if (convStart <= 9) {
          convStart = ("0" + convStart).toString();
        }
      }
    } else if (startend == " AM") {
      if (convStart <= 9) {
        convStart = ("0" + convStart).toString();
      }
    }
    return convStart;
  };
  const [startTimeDuration, setstartTimeDuration] = useState(
    changeTimeType(StartArr, starttimeend) +
      StartArr?.split("T")[1].substr(2) +
      starttimeend
  );
  console.log(startTimeDuration,"startTimeDuration");
  const [endTimeDuration, setendTimeDuration] = useState(
    changeTimeType(EndArr, endtimeend) +
      EndArr?.split("T")[1].substr(2) +
      endtimeend
  );
  console.log(edit);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [expanded1, setExpanded1] = React.useState("panel2");
  const [expanded2, setExpanded2] = React.useState("panel3");
  const [expanded3, setExpanded3] = React.useState("panel4");
  const [workDurationCode, setWorkDurationCode] = useState("");
  const [workDurationName, setWorkDurationName] = useState("");
  const [durationCriteria, setDurationCriteria] = useState();
  const [updateWorkDurationCode, setUpdateWorkDurationCode] = useState(
    edit?.workDurationCode
  );

  const [updateWorkDurationName, setUpdateWorkDurationName] = useState(
    edit?.workDurationName
  );
  const [submitFlag, setSubmitFlag] = useState(false);

  const [ValidFromDate, setValidFromDate] = useState();
  const [updateValidFromDate, setUpdateValidFromDate] = useState(
    new Date(edit?.validFrom)
  );
  // console.log(ValidFromDate);
  const [ValidToDate, setValidToDate] = useState();
  const [updateValidToDate, setUpdateValidToDate] = useState(
    new Date(edit?.validTo)
  );

  // console.log(ValidToDate);
  const [CheckDays, setCheckDays] = useState({
    mon: edit == undefined ? false : edit.mon == "Y" ? true : false,
    tue: edit == undefined ? false : edit.tue == "Y" ? true : false,
    wed: edit == undefined ? false : edit.wed == "Y" ? true : false,
    thu: edit == undefined ? false : edit.thu == "Y" ? true : false,
    fri: edit == undefined ? false : edit.fir == "Y" ? true : false,
    sat: edit == undefined ? false : edit.sat == "Y" ? true : false,
    sun: edit == undefined ? false : edit.sun == "Y" ? true : false,
  });
  const [category, setCategory] = useState([]);
  const [BussinessUnit, setBussinessUnit] = useState([]);
  const [LegalEntity, setLegalEntity] = useState([]);
  // console.log(mon:CheckDays.mon ? "Y" : "N",);
  const [val, setVal] = useState([]);
  console.log("prabhu", val);
  const [Criteria, setCriteria] = useState([]);
  const [onBlurFlag, setOnBlurFlag] = useState(
    edit == undefined ? false : true
  );
  const [startTime, setStartTime] = useState(null);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [endTime, setEndTime] = useState(null);

  const [endTimeCriteria, setEndTimeCriteria] = useState(null);
  const [index, setIndex] = useState();
  const [openDepartment, setOpenDepartment] = useState(false);
  const [deleteWorkDuration, setDeleteWorkDuration] = useState();
  const [workDurationDetailArr, setWorkDurationDetailArr] = useState();
  const [LovIndex, setLovIndex] = useState();
  const [departmentLov, setDepartmentLov] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [workDurationId, setWorkDurationId] = useState("");
  const [state1, setState1] = useState(-1);
  const [curIndex, setCurIndex] = useState(-1);
  const [durationcat, setDurationCat] = useState();
  const [enterDep, setenterDep] = useState("");
  const [isLoading, setIsLoading] = useState(edit == undefined ? false : true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [isLoading6, setIsLoading6] = useState(true);
  const [isLoading5, setIsLoading5] = useState(true);
  const [isLoadingBut, setIsLoadingBut] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    if (panel == "panel1") {
      setExpanded(newExpanded ? panel : false);
    } else if (panel == "panel2") {
      setExpanded1(newExpanded ? panel : false);
    } else if (panel == "panel3") {
      setExpanded2(newExpanded ? panel : false);
    } else if (panel == "panel4") {
      setExpanded3(newExpanded ? panel : false);
    }
  };

  const handleClose = () => {
    setIsLoading1(true);
    setIsLoading2(true);
    setIsLoading3(true);
    setIsLoading4(true);
    setIsLoading5(true);
    setIsLoading6(true);
    setIsLoading(true);
    toggleHandler(false);
  };

  const handleOpenDepartment = (index) => {
    setCurIndex(index);
    setOpenDepartment(true);
  };

  const ValidFromDateChange = (validFromDateValue) => {
    if (edit == undefined) {
      setValidFromDate(validFromDateValue);
    } else {
      setUpdateValidFromDate(validFromDateValue);
    }
  };

  const ValidToDateChange = (validToDateValue) => {
    if (edit == undefined) {
      setValidToDate(validToDateValue);
    } else {
      setUpdateValidToDate(validToDateValue);
    }
  };

  const dummyVal = {
    id: 1585,
    workDurationId: 2521,
    typeName: "S",
    effectDay: 1,
    startTime: "01-01-17",
    endTime: "01-01-17",
    duration: null,
  };
  const valMock = {
    // id: 1585,
    // workDurationId: 2521,
    typeName: "",
    effectDay: "",
    startTime: "",
    endTime: "",
    duration: null,
  };

  const endTimeVar = edit == undefined ? endTime : endTimeDuration;
  const startTimeVar = edit == undefined ? startTime : startTimeDuration;

  const handleAdd = () => {
    var validationCode =
      edit == undefined ? workDurationCode : updateWorkDurationCode;
    var validationName =
      edit == undefined ? workDurationName : updateWorkDurationName;
    var validateStartTime = edit == undefined ? startTime : startTimeDuration;
    console.log(validateStartTime, "validateStartTime");
    var validateEndTime = edit == undefined ? endTime : endTimeDuration;
    var validationFromDate =
      edit == undefined ? ValidFromDate : updateValidFromDate;

    if (validationCode == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (validationName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }

    if (validationFromDate == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the  Valid from date!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }

    if (validateStartTime == null) {
      console.log("validatestarttime");
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Time start is required!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (validateEndTime == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Time end is required!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    for (let i = 0; i < val.length; i++) {
      if (
        val[i].typeName == "" ||
        val[i].effectDay == "" ||
        val[i].startTime == ""
      ) {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: `Please enter all values in the row : ${i + 1}`,
          type: "error",
        });
        return;
      }
    }
    const newVal = { ...valMock };
    const valList = [...val, newVal];
    setVal(valList);
  };

  const handleDelete = (i) => {
    const deleteval = [...val];
    deleteval.splice(i, 1);
    setVal(deleteval);
  };

  const saveWorkDurationDetail = (item) => {
    let dup = [...val];

    const lastIndex = dup.length - 1;

    let finalData = [];

    if (lastIndex === 0) {
      const k = val.map((el) => {
        return { ...el, endTime: endTimeVar };
      });
      finalData = k;
    } else {
      const secondLastIndex = lastIndex - 1;
      let dupp = val;
      // if(item){
      //   dupp = item;
      // }
      // else{
      //   dupp = val;
      // }
      // const dupp = val;
      for (let i = 0; i < dupp.length; i++) {
        if (i == 0) {
          dupp[i] = { ...dupp[i], endTime: endTimeVar };
        } else if (i == dupp.length - 1) {
          dupp[i - 1] = { ...dupp[i - 1], endTime: dupp[i].startTime };
          dupp[i] = {
            ...dupp[i],
            endTime:
              dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
              "T" +
              endTimeVar,
          };
        } else {
          dupp[i - 1] = { ...dupp[i - 1], endTime: dupp[i].startTime };
          dupp[i] = { ...dupp[i], endTime: endTimeVar };
        }
      }
      // const l = val.map((el, i) => {
      //   if(i==0){
      //     return {...el, endTime: endTimeVar};
      //   }
      //   else{
      //     val[i-1]= {...val[i-1],endTime: val[i].starTime}
      //     return { ...el, endTime: endTimeVar };
      //   }
      //   // if (i === secondLastIndex) {
      //   //   return { ...el, endTime: val[lastIndex].startTime };
      //   // }
      //   // if (i === lastIndex) {
      //   //   return { ...el, endTime: endTimeVar };
      //   // }
      //   // return { ...el };
      // });

      finalData = dupp;
    }

    const dataWithDuration = finalData.map((el) => {
      const duration = timeDiff(el.startTime, el.endTime);
      return { ...el, duration };
    });

    setVal(dataWithDuration);
    setEndTimeCriteria(endTime);
  };

  const handleAddCriteria = () => {
    var validationCode =
      edit == undefined ? workDurationCode : updateWorkDurationCode;
    var validationName =
      edit == undefined ? workDurationName : updateWorkDurationName;
    var validateStartTime = edit == undefined ? startTime : startTimeDuration;
    console.log(validateStartTime, "validateStartTime");
    var validateEndTime = edit == undefined ? endTime : endTimeDuration;
    var validationFromDate =
      edit == undefined ? ValidFromDate : updateValidFromDate;

    if (validationCode == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    if (validationName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }

    if (validationFromDate == null) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the  Valid from date!",
        type: "error",
      });
      setSubmitFlag(true);

      return;
    }
    let value = {
      departmentName: "",
      businessUnitName: "",
      legalEntityName: "",
      departmentId: "",
      businessUnitId: "",
      legalEntityId: "",
      createdBy: 300000006565312,
      createdOn: "01-Jan-2022T01:12 PM",
      lastUpdatedBy: 300000006565312,
      lastUpdateDate: "01-Jan-2022T01:12 PM",
    };
    const AddCriteria = [...Criteria, value];
    setCriteria(AddCriteria);
  };

  const handleDeleteCriteria = (index) => {
    var deletevalCriteria = [...Criteria];
    deletevalCriteria.splice(index, 1);
    setCriteria(deletevalCriteria);
  };
  //save api

  const { mutate: CreateDurationMutate } = useMutation(CreateWorkDuration, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully added new Work Duration!",
        type: "success",
      });
      // resetFilter();
      setIsLoadingBut(false);
      toggleHandler(false);
      getAllProjectRefetch();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to create new Work Duration!",
        type: "error",
      });
      setIsLoading(false);
      toggleHandler(false);
    }
  };

  const saveWorkDuration = () => {
    const date1Array = moment(ValidFromDate).format("DD-MM-YYYY").split("-");
    const date2Array = moment(ValidToDate).format("DD-MM-YYYY").split("-");

    const month1 = monthNames.indexOf(date1Array[1]);
    const month2 = monthNames.indexOf(date2Array[1]);

    const d1 = new Date(date1Array[2], month1, date1Array[0]);
    const d2 = new Date(date2Array[2], month2, date2Array[0]);
    console.log(startTime);
    console.log(timeDiff(startTime, endTime));
    if (workDurationCode == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (workDurationName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      setSubmitFlag(true);
      return;
    }
    if (d1 > d2) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Valid to Date is lower than Valid from date!",
        type: "error",
      });
      return;
    }
    if (!endTime || !startTime) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Time!",
        type: "error",
      });
      return;
    }
    var timeDiff1 = timeDiff(startTime, endTime);
    if (timeDiff1 == 0 || timeDiff1 < 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please Enter Valid StartTime and EndTime",
        type: "error",
      });
      return;
    }
    if (!durationcat?.workDurationCategoryId) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please select the Work Duration Category",
        type: "error",
      });
      return;
    }
    if (val.length == 0) {
      // console.log("vinayak hello", val);
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter and save Work Duration Detail",
        type: "error",
      });
      return;
    }
    var workdetail = val;
    let dumCriteria = Criteria;
    for (let i = 0; i < dumCriteria.length; i++) {
      delete dumCriteria[i].businessUnitName;
      delete dumCriteria[i].departmentName;
      delete dumCriteria[i].legalEntity;
    }
    var dummy = {
      createdBy: 300000006565312,
      createdOn: "01-Jan-2022T01:12 PM",
      lastUpdatedBy: 300000006565312,
      lastUpdateDate: "01-Jan-2022T01:12 PM",
    };
    for (var i = 0; i < workdetail.length; i++) {
      if (
        // !workdetail[i].duration ||
        // workdetail[i].duration < 0 ||
        workdetail.effectDay == "" ||
        workdetail[i].endTime == "" ||
        workdetail[i].startTime == "" ||
        workdetail[i].startTime.split("T")[1].length == 0 ||
        workdetail[i].typeName == ""
      ) {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "Please enter and save Work Duration Detail",
          type: "error",
        });
        return;
      }
      if (!workdetail[i].endTime.includes("T")) {
        workdetail[i].endTime =
          dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
          "T" +
          workdetail[i].endTime;
      }
      workdetail[i] = { ...workdetail[i], ...dummy };
    }
    var pdata = {
      workDurationCode: workDurationCode,
      workDurationName: workDurationName,
      validFrom:
        dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        startTime,
      validTo:
        dateConverter(moment(ValidToDate).format("DD-MM-YYYY")) + "T" + endTime,
      timeStart:
        dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        startTime,

      timeEnd:
        dateConverter(moment(ValidToDate).format("DD-MM-YYYY")) + "T" + endTime,
      enterpriseId: 5,
      mon: CheckDays.mon == true ? "Y" : "N",
      tue: CheckDays.tue == true ? "Y" : "N",
      wed: CheckDays.wed == true ? "Y" : "N",
      thu: CheckDays.thu == true ? "Y" : "N",
      fri: CheckDays.fri == true ? "Y" : "N",
      sat: CheckDays.sat == true ? "Y" : "N",
      sun: CheckDays.sun == true ? "Y" : "N",
      colorCode: "#CCC",
      duration: durationTime(),
      workDurationCategoryId: durationcat.workDurationCategoryId,
      exceptionEvents: "",
      minWorkHrs: 17,
      maxWorkHrs: 17,
      workUnit: "W",
      workDurationCriteriaList: dumCriteria,
      workDurationDetailsList: workdetail,
    };
    console.log(pdata);
    setIsLoadingBut(true);
    setClicked(workDurationName);
    CreateDurationMutate(pdata);
  };

  //category api

  const {
    data: getAllCategoryData,
    error: getAllProjectError,
    isloading: getAllProjectIsloading,
  } = useQuery(
    ["getAllCategoryData"],
    () =>
      WorkDurationCategory({
        // setIsLoading:setIsLoading2
      }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getAllCategoryData) {
      setCategory(getAllCategoryData?.data?.data);
      setIsLoading2(false);

      for (let i = 0; i < getAllCategoryData?.data?.data.length; i++) {
        if (
          edit?.workDurationCategoryId ==
          getAllCategoryData?.data?.data[i].workDurationCategoryId
        ) {
          setDurationCat(getAllCategoryData?.data?.data[i]);
        }
      }
    }
  }, [getAllCategoryData]);

  //Bussiness Unit Api
  const { data: getAllBussinessData } = useQuery(
    ["getAllBussinessData"],
    () =>
      BussinessUnitData({
        // setIsLoading: setIsLoading3,
      }),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllBussinessData) {
      setBussinessUnit(getAllBussinessData?.data?.data);
      setIsLoading3(false);
    }
  }, [getAllBussinessData]);

  //LegalEntity Data Api
  const { data: getAllLegalEntityData } = useQuery(
    ["getAllLegalEntityData"],
    () =>
      LegalEntityData({
        // setIsLoading: setIsLoading4,
      }),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllLegalEntityData) {
      setLegalEntity(getAllLegalEntityData?.data?.data);
      setIsLoading4(false);
    }
  }, [getAllLegalEntityData]);

  useEffect(() => {
    if (
      !isLoading1 &&
      !isLoading2 &&
      !isLoading3 &&
      !isLoading4 &&
      !isLoading5 &&
      !isLoading6
    ) {
      setIsLoading(false);
    }
  }, [isLoading1, isLoading2, isLoading3, isLoading4, isLoading5, isLoading6]);

  const deleteWorkDurationData = async () => {
    setIsLoadingBut(true);
    var raw = "";
    var er = "no";
    var requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "http://182.72.11.106:9096/ews/rosters-setting/v1/manage-work-duration/delete" +
        "/" +
        edit?.workDurationId,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => {
        er = "error";
        console.log("error", error);
      });
    console.log(er);
    if (er == "no") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully Deleted!",
        type: "success",
      });
      toggleHandler(false);
      getAllProjectRefetch();
      setIsLoadingBut(false);
    } else {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to Delete! Please retry",
        type: "error",
      });
      setIsLoadingBut(false);
    }
  };

  //update api

  const { mutate: UpdateDuration } = useMutation(CreateWorkDuration, {
    onSuccess: (data, context, variables) =>
      onUpdateCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
  });

  const onUpdateCreateRequest = async (data) => {
    if (data) {
      // resetFilter()
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Succesfully updated the item!",
        type: "success",
      });
      setIsLoadingBut(false);
      toggleHandler(false);
      await getAllProjectRefetch();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Unable to Update the Item!",
        type: "error",
      });
      setIsLoadingBut(false);
      setIsLoading(false);
      // toggleHandler(false);
    }
  };

  const changeDepartment = (e, index) => {
    // var crit = Criteria
    setenterDep(e.target.value);
    // setCriteria(crit)
    // console.log(e.target.value,index)
  };

  const UpdateDurationData = () => {
    if (updateWorkDurationCode == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      return;
    }
    if (updateWorkDurationName == "") {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      return;
    }

    if (!startTimeDuration || !startTimeDuration) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter the Time!",
        type: "error",
      });
      return;
    }
    var timeDiff1 = timeDiff(startTimeDuration, endTimeDuration);
    if (timeDiff1 == 0 || timeDiff1 < 0) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please Enter Valid StartTime and EndTime",
        type: "error",
      });
      return;
    }
    if (!durationcat?.workDurationCategoryId) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please select the Work Duration Category",
        type: "error",
      });
      return;
    }
    if (val.length == 0) {
      // console.log("vinayak hello", val);
      setSnakeBarProps({
        snackbarFlag: true,
        msz: "Please enter and save Work Duration Detail",
        type: "error",
      });
      return;
    }
    var workdetail = val;
    var dumCriteria = [...Criteria];
    var buiunitname;
    var depname;
    var legalent;
    for (let i = 0; i < dumCriteria.length; i++) {
      dumCriteria[i].lastUpdateDate = "01-Jan-2022T01:12 PM";
      dumCriteria[i].createdOn = "01-Jan-2022T01:12 PM";
      buiunitname = dumCriteria[i].businessUnitName;
      depname = dumCriteria[i].departmentName;
      legalent = dumCriteria[i].legalEntity;
      delete dumCriteria[i].businessUnitName;
      delete dumCriteria[i].departmentName;
      delete dumCriteria[i].legalEntity;
      Criteria[i].businessUnitName = buiunitname;
      Criteria[i].departmentName = depname;
      Criteria[i].legalEntity = legalent;
    }
    var dummy = {
      createdBy: 300000006565312,
      createdOn:
        dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        "01:12 PM",
      lastUpdatedBy: 300000006565312,
      lastUpdateDate:
        dateConverter(moment(ValidToDate).format("DD-MM-YYYY")) +
        "T" +
        "01:12 PM",
    };
    for (var i = 0; i < workdetail.length; i++) {
      if (!workdetail[i].endTime.includes("T")) {
        workdetail[i].endTime =
          dateConverter(moment(ValidFromDate).format("DD-MM-YYYY")) +
          "T" +
          workdetail[i].endTime;
      }
      workdetail[i] = { ...workdetail[i], ...dummy };
      // workdetail[i].id = workdetail[i].workDurationId;
      // delete workdetail[i].workDurationId;
    }
    // console.log("vinayak", workdetail);
    // console.log(dumCriteria);
    var pdata = {
      id: edit?.workDurationId,
      workDurationCode: updateWorkDurationCode,
      workDurationName: updateWorkDurationName,
      validFrom:
        dateConverter(moment(updateValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        startTimeDuration,
      validTo:
        dateConverter(moment(updateValidToDate).format("DD-MM-YYYY")) +
        "T" +
        endTimeDuration,
      timeStart:
        dateConverter(moment(updateValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        startTimeDuration,
      timeEnd:
        dateConverter(moment(updateValidFromDate).format("DD-MM-YYYY")) +
        "T" +
        endTimeDuration,
      enterpriseId: 6,
      mon: CheckDays.mon == true ? "Y" : "N",
      tue: CheckDays.tue == true ? "Y" : "N",
      wed: CheckDays.wed == true ? "Y" : "N",
      thu: CheckDays.thu == true ? "Y" : "N",
      fri: CheckDays.fri == true ? "Y" : "N",
      sat: CheckDays.sat == true ? "Y" : "N",
      sun: CheckDays.sun == true ? "Y" : "N",
      colorCode: "#CCC",
      duration: durationTime(),
      workDurationCategoryId: durationcat.workDurationCategoryId,
      exceptionEvents: "",
      minWorkHrs: 17,
      maxWorkHrs: 17,
      workUnit: "W",
      workDurationCriteriaList: dumCriteria,
      workDurationDetailsList: val,
    };

    console.log(pdata);
    setIsLoadingBut(true);
    UpdateDuration(pdata);
  };

  //get workduration detail

  const { data: getWorkDurationDetail } = useQuery(
    ["getWorkDurtaionDetail"],
    () =>
      // edit
      // ?
      GetWorkDurationDetail({
        workDurationId: edit?.workDurationId,
        // setIsLoading: setIsLoading5,
      }),

    // : null,
    { enabled: true, retry: false }
  );
  useEffect(() => {
    if (getWorkDurationDetail) {
      setWorkDurationDetailArr(getWorkDurationDetail?.data?.data);
      if (edit != undefined) {
        console.log(getWorkDurationDetail?.data?.data);
        setVal(getWorkDurationDetail?.data?.data);
        setIsLoading5(false);
        // saveWorkDurationDetail(getWorkDurationDetail?.data?.data)
      }
    }
  }, [getWorkDurationDetail]);

  //get department
  const { data: getAllDepartmentData } = useQuery(
    ["getAllDepartmentData"],
    () =>
      // setIsLoading(true)
      DepartmentLovData({
        // setIsLoading: setIsLoading6,
      }),
    { enabled: true, retry: false }
  );

  useEffect(() => {
    if (getAllDepartmentData && departmentLov.length == 0) {
      setIsLoading6(false);
      setDepartmentLov(getAllDepartmentData?.data?.data);
    }
  }, [getAllDepartmentData]);

  const durationCategoryChange = (value) => {
    let cat;
    for (let i = 0; i < category.length; i++) {
      if (category[i].workDurationCategory == value) {
        cat = category[i];
      }
    }
    setDurationCat(cat);
  };

  const { data: getWorkDurationCriteriaDetail } = useQuery(
    ["getCriteriaDetail"],
    () =>
      // setIsLoading(true)
      GetWorkDurationCriteriaDetail({
        workDurationId: edit?.workDurationId,
        // setIsLoading: setIsLoading1
      }),
    { enabled: true, retry: false }
  );
  useEffect(() => {
    if (getWorkDurationCriteriaDetail) {
      setDurationCriteria(getWorkDurationCriteriaDetail?.data?.data);
      if (edit != undefined) {
        setCriteria(getWorkDurationCriteriaDetail?.data?.data);
        setIsLoading1(false);
        console.log(getWorkDurationCriteriaDetail?.data?.data);
      }
    }
  }, [getWorkDurationCriteriaDetail]);

  const handleChangeDepartment = (index, item, curIndex) => {
    setState1(index);
    let crit = Criteria;
    crit[curIndex].departmentName = item.departmentName;
    crit[curIndex].departmentId = item.departmentId;
    setCriteria(crit);
  };

  const resetChangeDepartment = () => {
    let crit = Criteria;
    crit[curIndex].departmentName = "";
    crit[curIndex].departmentId = "";
    setCriteria(crit);
  };

  const handleBuisiness = (index, value) => {
    let crit = Criteria;
    for (let i = 0; i < BussinessUnit.length; i++) {
      if (BussinessUnit[i].businessUnitName == value) {
        crit[index].businessUnitId = BussinessUnit[i].businessUnitId;
        crit[index].businessUnitName = value;
      }
    }
    setCriteria(crit);
  };

  console.log(val);

  const handleLegal = (index, value) => {
    let crit = Criteria;
    for (let i = 0; i < LegalEntity.length; i++) {
      if (LegalEntity[i].name == value) {
        crit[index].legalEntityId = LegalEntity[i].legalEntityId;
        crit[index].legalEntity = value;
      }
    }
    setCriteria(crit);
  };

  const createTimeObj = (time) => {
    var startTime = new Date();
    var parts = time.match(/(\d+):(\d+) (AM|PM)/);
    if (parts) {
      var hours = parseInt(parts[1]),
        minutes = parseInt(parts[2]),
        tt = parts[3];
      if (tt === "PM" && hours < 12) hours += 12;
      startTime.setHours(hours, minutes, 0, 0);
    }
    return startTime;
  };

  const timeDiff = (startTime, endTime) => {
    if (!startTime || !endTime) {
      return "";
    }
    const start = createTimeObj(startTime);
    const end = moment(createTimeObj(endTime));

    if (!start || !end) {
      return "";
    }

    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();

    return hours;
  };
  const durationTime = () => {
    if (startTimeVar && endTimeVar) {
      return Number(timeDiff(startTimeVar, endTimeVar)).toFixed(2);
    } else {
      return null;
    }
  };
  // const  = {
  //   customButtonsArr: [{}],
  // };
  // Number((6.688689).toFixed(1));
  // window.alert(Number(timeDiff(startTimeVar, endTimeVar)).toFixed(2));
  const validationStartTime = () => {
    if (startTime) {
      return submitFlag;
    } else {
      return setSubmitFlag(false);
    }

    if (edit == undefined) {
      if (onBlurFlag) {
        return _formatTime(startTime).errorMsz != "";
      }
    } else {
      return _formatTime(startTimeDuration).errorMsz != "";
    }
  };
  return (
    <>
      <CustomDialog
        maxWidth="lg"
        dialogTitle="Work Duration"
        open="true"
        handleClose={handleClose}
      >
        <Grid container>
          <Grid
            item
            xs="12"
            style={{
              display: "flex",
              flexDirection: "row",
              // minHeight: "80%",

              // backgroundColor: "red",
            }}
          >
            <Grid xs="6">
              <Box
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  margin: "5px",
                  border: "1px solid #EDEDED",
                }}
              >
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
                        marginRight: "5px",
                      }}
                    >
                      Work Duration
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Grid xs="8" style={{ marginLeft: "10px" }}>
                      <Box className={classes.workDurationBox}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          *Work Duration Code
                        </Typography>
                        <CustomTextField
                          type="text"
                          required
                          style={{ marginLeft: "8px" }}
                          value={
                            edit == undefined
                              ? workDurationCode
                              : updateWorkDurationCode
                          }
                          onChange={(e) => {
                            edit == undefined
                              ? setWorkDurationCode(e.target.value)
                              : setUpdateWorkDurationCode(e.target.value);
                          }}
                          error={workDurationCode == "" ? submitFlag : ""}
                        />
                      </Box>
                    </Grid>
                    <Grid xs="8" style={{ marginLeft: "10px" }}>
                      <Box className={classes.workDurationBox}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          *Work Duration Name{" "}
                        </Typography>
                        <CustomTextField
                          type="text"
                          required
                          style={{ marginLeft: "5px" }}
                          value={
                            edit == undefined
                              ? workDurationName
                              : updateWorkDurationName
                          }
                          onChange={(e) =>
                            edit == undefined
                              ? setWorkDurationName(e.target.value)
                              : setUpdateWorkDurationName(e.target.value)
                          }
                          error={workDurationName == "" ? submitFlag : ""}
                        />
                      </Box>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  margin: "5px",
                  border: "1px solid #EDEDED",
                }}
              >
                <Accordion
                  expanded={expanded1 === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Validity
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      // flex: 2,
                      display: "flex",
                      flexDirection: "row",
                      margin: "10px 0px 10px 50px",
                    }}
                  >
                    <Grid xs="5">
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            *Valid From
                          </Typography>
                        </Box>
                        <Box style={{ marginLeft: "10px" }}>
                          <DatePicker
                            className="dateManage"
                            selected={
                              edit == undefined
                                ? ValidFromDate
                                : updateValidFromDate
                            }
                            onChange={ValidFromDateChange}
                            dateFormat="dd-MMM-yyyy"
                            // onInputError={ValidFromDate ? submitFlag : ""}
                            renderInput={(params) => {
                              return (
                                <CustomTextField
                                  {...params}
                                  error={ValidFromDate ? submitFlag : ""}
                                />
                              );
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid xs="5">
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          margin: "5px",
                        }}
                      >
                        <Box>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            *Valid To
                          </Typography>
                        </Box>
                        <Box style={{ marginLeft: "10px" }}>
                          <DatePicker
                            className="dateManage"
                            selected={
                              edit == undefined
                                ? ValidToDate
                                : updateValidToDate
                            }
                            onChange={ValidToDateChange}
                            dateFormat="dd-MMM-yyyy"
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  margin: "5px",
                  border: "1px solid #EDEDED",
                }}
              >
                <Accordion
                  expanded={expanded2 === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "5px",
                        fontWeight: "bolder",
                      }}
                    >
                      {" "}
                      Days & Time
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "30vh",
                      // overflowY: "scroll",
                    }}
                  >
                    <Grid item xs="12" style={{}}>
                      <Grid>
                        <Box>
                          <Grid
                            container
                            item
                            xs="12"
                            justifyContent="space-around"
                            style={{ marginRight: "30px" }}
                          >
                            <CustomCheckBox
                              check={CheckDays.mon}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, mon: e })
                              }
                              label="Mon"
                            />
                            <CustomCheckBox
                              check={CheckDays.tue}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, tue: e })
                              }
                              label="Tue"
                            />
                            <CustomCheckBox
                              check={CheckDays.wed}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, wed: e })
                              }
                              label="Wed"
                            />
                            <CustomCheckBox
                              check={CheckDays.thu}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, thu: e })
                              }
                              label="Thu"
                            />
                            <CustomCheckBox
                              check={CheckDays.fri}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, fri: e })
                              }
                              label="Fri"
                            />
                            <CustomCheckBox
                              check={CheckDays.sat}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, sat: e })
                              }
                              label="Sat"
                            />
                            <CustomCheckBox
                              check={CheckDays.sun}
                              onChangeCheck={(e) =>
                                setCheckDays({ ...CheckDays, sun: e })
                              }
                              label="Sun"
                            />
                          </Grid>
                        </Box>
                      </Grid>
                      <Box className={classes.workDurationBox}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                          }}
                        >
                          *Time Start
                        </Typography>
                        <Grid xs="5">
                          <CustomTextField
                            type="text"
                            value={
                              edit == undefined ? startTime : startTimeDuration
                            }
                            onChange={(e) => {
                              setOnBlurFlag(false);
                              if (edit == undefined) {
                                setStartTime(e.target.value);
                              } else {
                                setstartTimeDuration(e.target.value);
                              }
                            }}
                            onBlur={(e) => {
                              setOnBlurFlag(true);
                              if (edit == undefined) {
                                setStartTime(
                                  _formatTime(e.target.value).formattedValue
                                );
                              } else {
                                setstartTimeDuration(
                                  _formatTime(e.target.value).formattedValue
                                );
                              }
                            }}
                            required={true}
                            error={
                              edit == undefined
                                ? onBlurFlag &&
                                  _formatTime(startTime).errorMsz != ""
                                : onBlurFlag &&
                                  _formatTime(startTimeDuration).errorMsz != ""
                              // validationStartTime
                            }
                            errorMsz={
                              edit == undefined
                                ? onBlurFlag && _formatTime(startTime).errorMsz
                                : onBlurFlag &&
                                  _formatTime(startTimeDuration).errorMsz
                            }
                            style={{ marginLeft: "12px" }}
                          />
                        </Grid>
                      </Box>
                      <Box className={classes.workDurationBox}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                            marginLeft: "5px",
                          }}
                        >
                          *Time End
                        </Typography>
                        <Grid xs="5">
                          <CustomTextField
                            type="text"
                            value={
                              edit == undefined ? endTime : endTimeDuration
                            }
                            onChange={(e) => {
                              setOnBlurFlag(false);
                              if (edit == undefined) {
                                setEndTime(e.target.value);
                              } else {
                                setendTimeDuration(e.target.value);
                              }
                            }}
                            onBlur={(e) => {
                              setOnBlurFlag(true);
                              if (edit == undefined) {
                                setEndTime(
                                  _formatTime(e.target.value).formattedValue
                                );
                              } else {
                                setendTimeDuration(
                                  _formatTime(e.target.value).formattedValue
                                );
                              }
                            }}
                            required={true}
                            error={
                              edit == undefined
                                ? onBlurFlag &&
                                  _formatTime(endTime).errorMsz != ""
                                : onBlurFlag &&
                                  _formatTime(endTimeDuration).errorMsz != ""
                            }
                            errorMsz={
                              edit == undefined
                                ? onBlurFlag && _formatTime(endTime).errorMsz
                                : onBlurFlag &&
                                  _formatTime(endTimeDuration).errorMsz
                            }
                            style={{ marginLeft: "15px" }}
                          />
                        </Grid>
                      </Box>
                      <Box className={classes.workDurationBox}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            marginLeft: "15px",
                          }}
                        >
                          Duration
                        </Typography>
                        <Grid xs="5">
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              marginLeft: "25px",
                              // border: "solid 1px black"
                            }}
                          >
                            {/* {edit == undefined ? "" : edit?.duration} */}
                            {onBlurFlag && durationTime()}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box
                        style={{
                          marginLeft: "-80px",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontFamily: "Inter",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Work Duration Category
                        </Typography>
                        <Grid xs="4.5">
                          <Autocomplete
                            id="Type Name"
                            disableClearable
                            required
                            value={durationcat?.workDurationCategory}
                            onChange={(e, value) => {
                              durationCategoryChange(value);
                            }}
                            options={
                              category?.length > 0 &&
                              category?.map(
                                (item, index) => item?.workDurationCategory
                              )
                            }
                            renderInput={(params) => <TextField {...params} />}
                            ListboxProps={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                            }}
                            style={{ marginLeft: "18px" }}
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
            <Grid
              xs="6"
              style={{
                margin: "0px 5px 5px 5px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  margin: "5px",
                  border: "1px solid #EDEDED",
                  padding: "5px",
                  // height: "20vh",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    padding: "5px",
                    backgroundColor: "#EBF3FF",
                  }}
                >
                  Work Duration Detail
                </Typography>
                <Grid
                  container
                  item
                  xs="12"
                  style={{ borderTop: "1px solid #EDEDED" }}
                >
                  <Box>
                    <CustomButton
                      btnText="New"
                      variant="contained"
                      onClick={() => handleAdd()}
                      startIcon={<AddIcon className={classes.addIcon} />}
                      btnClass={{
                        backgroundColor: "#124590",
                        color: "#fff",
                        fontSize: "14px",
                        margin: "5px",
                      }}
                    />
                    <CustomButton
                      btnText="Delete"
                      variant="contained"
                      onClick={(i) => handleDelete(i)}
                      startIcon={<DeleteIcon className={classes.deleteIcon} />}
                      btnClass={{
                        backgroundColor: "#124590",
                        color: "#fff",
                        fontSize: "14px",
                        margin: "5px",
                      }}
                    />
                  </Box>
                </Grid>
                <Box
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "5px",
                    // overflowY: "scroll",
                    // height: "20vh",
                  }}
                >
                  <Box
                    style={{
                      display: "inline-block",
                      width: "100%",
                      verticalAlign: "top",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex ",
                        flexDirection: "row",
                        padding: "5px 5px",
                        borderBottom: "1px solid #E9E9E9",
                        backgroundColor: "#F1F1F1",
                      }}
                    >
                      <Box style={{ width: "20%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Inter",
                            // margin: "2px",
                          }}
                        >
                          Type Name
                        </Typography>
                      </Box>
                      <Box style={{ width: "20%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Inter",
                            paddingLeft: "5px",
                            // margin: "2px",
                          }}
                        >
                          Effect Day
                        </Typography>
                      </Box>
                      <Box style={{ width: "20%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Inter",
                            paddingLeft: "5px",
                            // margin: "2px",
                          }}
                        >
                          Start Time
                        </Typography>
                      </Box>
                      <Box style={{ width: "20%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Inter",
                            paddingLeft: "10px",
                            // margin: "2px",
                          }}
                        >
                          End Time
                        </Typography>
                      </Box>
                      <Box style={{ width: "20%" }}>
                        <Typography
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Inter",
                            paddingLeft: "10px",
                            // margin: "2px",
                          }}
                        >
                          Duration
                        </Typography>
                      </Box>
                    </Box>
                    {val?.length > 0 ? (
                      val.map((item, index) => {
                        return (
                          <>
                            <DetailRow
                              val={val}
                              index={index}
                              item={item}
                              setVal={setVal}
                              endTimeCriteria={endTimeCriteria}
                              workDurationDetailArr={workDurationDetailArr}
                              starTime={ValidFromDate}
                              timeDiff={timeDiff}
                              edit={edit}
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

                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    padding: "5px",
                  }}
                >
                  <Box>
                    <CustomButton
                      btnText="Save Work Duration Detail"
                      onClick={() => saveWorkDurationDetail()}
                      variant="contained"
                      startIcon={<CheckIcon className={classes.addIcon} />}
                      btnClass={{
                        backgroundColor: "#124590",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                style={{
                  width: "100%",
                  margin: "5px",
                  border: "1px solid #EDEDED",
                  padding: "5px",
                }}
              >
                <Accordion
                  expanded={expanded3 === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    aria-controls="panel4d-content"
                    id="panel4d-header"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        marginLeft: "5px",
                        fontWeight: "bolder",
                        marginRight: "5px",
                      }}
                    >
                      Work Duration Criteria
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      container
                      item
                      xs="12"
                      style={{ borderTop: "1px solid #EDEDED" }}
                    >
                      <Box>
                        <CustomButton
                          btnText="New"
                          onClick={(i) => handleAddCriteria(i)}
                          variant="contained"
                          startIcon={<AddIcon className={classes.addIcon} />}
                          btnClass={{
                            backgroundColor: "#124590",
                            color: "#fff",
                            fontSize: "14px",
                            margin: "5px",
                          }}
                        />
                      </Box>
                      <Box
                        style={{
                          width: "100%",
                          marginTop: "5px",
                          padding: "5px",
                          // overflowY: "scroll",
                          // height: "30vh",
                        }}
                      >
                        <Box
                          style={{
                            display: "inline-block",
                            width: "100%",
                            verticalAlign: "top",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex ",
                              flexDirection: "row",
                              padding: "5px 0px",
                              borderBottom: "1px solid #E9E9E9",
                              backgroundColor: "#F1F1F1",
                            }}
                          >
                            <Box style={{ width: "30%" }}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  margin: "4px",
                                }}
                              >
                                Department
                              </Typography>
                            </Box>
                            <Box style={{ width: "30%" }}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  margin: "4px",
                                }}
                              >
                                Bussiness Unit
                              </Typography>
                            </Box>
                            <Box style={{ width: "30%" }}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  margin: "4px",
                                }}
                              >
                                Legal Entity
                              </Typography>
                            </Box>
                            <Box style={{ width: "10%" }}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  fontFamily: "Inter",
                                  margin: "4px",
                                }}
                              >
                                Action
                              </Typography>
                            </Box>
                          </Box>
                          {Criteria?.length > 0 ? (
                            Criteria?.map((data, index) => {
                              return (
                                <>
                                  <Box
                                    style={{
                                      display: "flex ",
                                      backgroundColor: "#fff ",
                                      padding: "2px",
                                      paddingLeft: 0,
                                      paddingTop: 5,
                                    }}
                                  >
                                    <Box style={{ width: "30%" }}>
                                      <CustomTextField
                                        value={
                                          data?.departmentName
                                          // ? data?.departmentName
                                          // : enterDep
                                        }
                                        onChange={(e) => {
                                          changeDepartment(e, index);
                                        }}
                                        endIcon={
                                          <SearchIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleOpenDepartment(index)
                                            }
                                          />
                                        }
                                      />
                                    </Box>
                                    <Box
                                      style={{
                                        width: "30%",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <Autocomplete
                                        id="Bussiness Unit"
                                        required
                                        disableClearable
                                        onChange={(e, val) => {
                                          handleBuisiness(index, val);
                                        }}
                                        defaultValue={data?.businessUnitName}
                                        // value={data?.businessUnitName}
                                        options={
                                          BussinessUnit?.length > 0 &&
                                          BussinessUnit?.map(
                                            (option) => option?.businessUnitName
                                          )
                                        }
                                        renderInput={(params) => (
                                          <TextField {...params} />
                                        )}
                                        ListboxProps={{
                                          fontSize: "14px",
                                          fontFamily: "Inter",
                                        }}
                                      />
                                    </Box>
                                    <Box
                                      style={{
                                        width: "30%",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <Autocomplete
                                        id="Legal Entity"
                                        required
                                        disableClearable
                                        defaultValue={data?.legalEntityName}
                                        // value={data?.legalEntityName}
                                        onChange={(e, value) => {
                                          handleLegal(index, value);
                                        }}
                                        options={
                                          LegalEntity?.length > 0 &&
                                          LegalEntity?.map(
                                            (option) => option?.name
                                          )
                                        }
                                        renderInput={(params) => (
                                          <TextField {...params} />
                                        )}
                                        ListboxProps={{
                                          fontSize: "14px",
                                          fontFamily: "Inter",
                                        }}
                                      />
                                    </Box>
                                    <Box
                                      style={{
                                        width: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <DeleteIcon
                                        className={classes.deleteIcon}
                                        onClick={() =>
                                          handleDeleteCriteria(index)
                                        }
                                      />
                                    </Box>
                                  </Box>
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
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {edit == undefined ? (
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // position: "fixed",
              // right: "10px",
              // bottom: "10px",
            }}
          >
            <ProgressLoader isLoading={isLoadingBut} size={25} />
            <CustomButton
              btnText="Save"
              onClick={!isLoadingBut && saveWorkDuration}
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
              onClick={!isLoadingBut && handleClose}
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
          </Grid>
        ) : (
          <Grid
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // position: "fixed",
              // right: "10px",
              // bottom: "2px",
            }}
          >
            <ProgressLoader isLoading={isLoadingBut} size={25} />
            <CustomButton
              btnText="Save"
              onClick={!isLoadingBut && UpdateDurationData}
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
              onClick={!isLoadingBut && handleClose}
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
          </Grid>
        )}
      </CustomDialog>
      {openDelete && (
        <DeleteWorkDurationModal
          toggleHandler={setOpenDelete}
          deleteWorkDurationData={deleteWorkDurationData}
          workDurationName={updateWorkDurationName}
          isLoadingBut={isLoadingBut}
          setIsLoadingBut={setIsLoadingBut}
        />
      )}

      {openDepartment && (
        <DepartmentLOVModal
          toggleHandler={setOpenDepartment}
          departmentLov={departmentLov}
          handleChangeDepartment={handleChangeDepartment}
          resetChangeDepartment={resetChangeDepartment}
          state1={state1}
          setState1={setState1}
          curIndex={curIndex}
          enterDep={enterDep}
          setenterDep={setenterDep}
        />
      )}
    </>
  );
};

export default WorkDurationModalRosterSetting;
const useStyles = makeStyles((theme) => ({
  workDurationBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px",
  },
  DaysCheckBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5px",
  },
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  deleteIcon: {
    color: "#f24b3f",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  disabledBut: {
    color: "grey",
    background: "white",
  },
}));
