import { Typography, Box } from "@material-ui/core";
import React from "react";
import { CustomButton } from "../../../../components/Button";
import { makeStyles } from "@material-ui/styles";
import { CustomTextField } from "../../../../components/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import WorkPlanModal from "./WorkPlanModal";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
const RotationRow = ({
  handleDelete,
  WorkPlanData,
  onChangeRowData,
  index,
  data,
  setErrorProps,
  setIsLoadingBut,
  setFlg,
  setWorkPlan,
  setSequence,
  setIter1
  
}) => {
  const classes = useStyles();
  const [openWorkPlanModal, setOpenWorkPlanModal] = useState(false);
  const [iteration,setIteration]=useState("")
  const [submitFlag, setSubmitFlag] = useState(false);
  const [Sequence1, setSequence1] = useState("");
  const [WorkPlan1, setWorkPlan1] = useState(""); 
  const onChangeRowDataDummy=(e,index)=>{

    // handleLimits();
    setIteration(e.target.value)
    setIter1(e.target.value)
    onChangeRowData(e,index)
  }
  const handleSequence=(e,index)=>{
    onChangeRowData(e,index);
    setSequence(e.target.value)
    setSequence1(e.target.value)
  }
  console.log(Sequence1,"Sequence1");
  const handleworkPlan=(e,index)=>{
    onChangeRowData(e,index);
    setWorkPlan(e.target.value)
  }
  const handleChangeWorkPlan = (iitem) => {
    let e = {
      target: {
        name: "workPlanDto",
        value: iitem,
      },
    };
    onChangeRowData(e, index);
  };
  // const handleLimits=()=>{
  //   if (iteration > 99) {
  //     setErrorProps({
  //       snackbarFlag: true,
  //       msz: "Please enter Iteration value between 0 to 99 !",
  //       type: "error",
  //     });
  //     setSubmitFlag(true);

  //     return;
  //   }
  // }
  return (
    <>
      <Box className={classes.pagedatamainbox}>
        <Box
          style={{
            width: "100px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DoNotDisturbOnIcon
            style={{
              color: "#f24b3f",
              fontWeight: "bold",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(index)}
          />
        </Box>
        <Box style={{ width: "200px" }}>
          <CustomTextField
            name={"workPlanDto.workPlanName"}
            value={data?.workPlanDto?.workPlanName}
            
            onChange={(e) => handleworkPlan(e, index)}
            endIcon={
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenWorkPlanModal(true)}
              />
            }
          />
        </Box>
        <Box style={{ width: "150px", marginLeft: "5px" }}>
          <CustomTextField
            name={"sequence"}
            value={data?.sequence}
            onChange={(e) => handleSequence(e, index)}
            // error={Sequence1=="" ? submitFlag : ""}
          />
        </Box>
        <Box style={{ width: "150px", marginLeft: "5px" }}>
          <CustomTextField
            name={"iteration"}
            value={data?.iteration}
            onChange={(e) => onChangeRowDataDummy(e, index)}
            error={iteration>99 ? true : ""}
          />
          {console.log(iteration,submitFlag)}
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD1}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD2}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD3}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD4}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD5}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD6}
          </Typography>
        </Box>
        <Box
          style={{
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              overflow: "hidden",
              marginLeft: "5px",
            }}
          >
            {data?.workPlanDto?.workDurationNameD7}
          </Typography>
        </Box>
      </Box>
      {openWorkPlanModal && (
        <WorkPlanModal
          handleClose={() => setOpenWorkPlanModal(false)}
          toggleHandler={setOpenWorkPlanModal}
          WorkPlanData={WorkPlanData}
          handleChangeWorkPlan={handleChangeWorkPlan}
        />
      )}
    </>
  );
};

export default RotationRow;
const useStyles = makeStyles((theme) => ({
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    padding: "5px 0px",
  },
}));
