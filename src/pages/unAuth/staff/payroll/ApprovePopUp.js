import { makeStyles } from "@material-ui/styles";
import { Grid } from "@mui/material";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { useMutation } from "react-query";
import { Alert, AlertTitle } from "@mui/material";
import {
  submitPayrollAudit,
  submitReadyForPayroll,
} from "../../../../services/api";

import React, { useEffect, useState } from "react";

const ApprovePopUp = (props) => {
  const {
    open,
    handleClose,
    setErrorProps,
    setIsloading,
    handleFilterClick,
    selectedFilter,
    setAllChecked,
    setSelectedFilter,
  } = props;
  const [flag1, setFlag1] = useState(false); // [1
  const [flag2, setFlag2] = useState(false); // [1
  const title = "Approve";
  const [comments, setComments] = useState("");
  const { mutate: CreateAuditData, isLoading: isLoad } = useMutation(
    submitPayrollAudit,

    {
      refetchQueries: [{ query: submitPayrollAudit }],

      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
    }
  );
  useEffect(() => {
    if (isLoad) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [isLoad, setIsloading]);

  const { mutate: CreateAuditData2, isLoading: loadReadyForPayroll } =
    useMutation(submitReadyForPayroll, {
      refetchQueries: [{ query: submitReadyForPayroll }],

      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
    });
  useEffect(() => {
    if (loadReadyForPayroll) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [loadReadyForPayroll, setIsloading]);
  const onSuccessCreateRequest = (data, context, variables) => {
    console.log(data);
    setErrorProps({
      snackbarFlag: true,
      msz: "Succesfully Submitted Data!",
      type: "success",
    });
    setAllChecked(false);
    if (selectedFilter === "needCorrection") {
      handleFilterClick("underAudit");
      setSelectedFilter("underAudit");
      return;
    }
    handleFilterClick(selectedFilter);
  };
  const submitHandler = () => {
    if (props.subButton == "PendingToSubmit") {
      if (props.submitData.length == 0) {
        setFlag2(true);
        return;
      }
      if (comments.length == 0) {
        setFlag1(true);
      } else {
        let temp = {
          userId: 300000003286180,
          payrollAuditId: props.submitData,
          action: "SUBMIT",
          comments: comments,
        };
        CreateAuditData(temp);
        handleClose();
      }
    } else if (props.subButton == "NeedCorrection") {
      console.log(22);
      if (props.submitData.length == 0) {
        setFlag2(true);
        return;
      }
      if (comments.length == 0) {
        setFlag1(true);
      } else {
        let temp = {
          userId: 300000003286180,
          payrollAuditId: props.submitData,
          action: "RMI",
          comments: comments,
        };
        CreateAuditData2(temp);
        handleClose();
      }
    } else if (props.subButton == "ReadyForPayroll") {
      if (props.submitData.length == 0) {
        setFlag2(true);
        return;
      }
      if (comments.length == 0) {
        setFlag1(true);
      } else {
        let temp = {
          userId: 300000003286180,
          payrollAuditId: props.submitData,
          action: "Approved",
          comments: comments,
        };
        CreateAuditData2(temp);
        handleClose();
      }
    }
  };
  const classes = useStyles();
  const commentHandler = (e) => {
    setComments(e.target.value);
  };
  //   console.log("data", flag);
  return (
    <CustomDialog
      dialogTitle={title}
      handleClose={handleClose}
      open={open}
      maxWidth="sm"
    >
      {(flag1 || flag2) && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          <AlertTitle>Error</AlertTitle>
          {flag2 && <div>Select atleast one Item</div>}
          {flag1 && <div>Cannot submit without any comments</div>}
        </Alert>
      )}

      <div className={classes.commentsCSS}>
        <div>Comments</div>
        <textarea
          style={{ width: "50%" }}
          onChange={commentHandler}
          value={comments}
          rows="5"
          cols="50"
        ></textarea>
        {/* <CustomTextField
          style={{ width: "50%" }}
          onChange={commentHandler}
          value={comments}
        /> */}
      </div>
      <Grid className={classes.selectButton}>
        <CustomButton
          btnText="Submit"
          btnClass={{
            backgroundColor: "#124590",
            color: "#fff",
            margin: "10px 3px",
          }}
          onClick={submitHandler}
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
    </CustomDialog>
  );
};

export default ApprovePopUp;
const useStyles = makeStyles((theme) => ({
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
  selectButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  commentsCSS: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));
