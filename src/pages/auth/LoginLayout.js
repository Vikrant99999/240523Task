import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
//import { useNavigate } from 'react-router-dom';
import { getErrorMsz } from "../../utils/validator";
import { afterValidate } from "../../utils/commonService";
import { CustomSnackbar } from "../../components/CustomSnackbar";
import { CustomTextField } from "../../components/TextField";
import { CustomButton } from "../../components/Button";
import { loginUser } from "../../services/api";
import { useMutation } from "react-query";
import { updateState } from "../../redux/commonSlice";
import { useDispatch } from "react-redux";

export const LoginLayout = (props) => {
  const { setSnakeBarProps } = props;
  //const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [submitFlag, setSubmitFlag] = useState(false);

  const [pagedata, setPagedata] = useState({
    username: "",
    loginpassword: "",
  });

  const { mutate: loginUserMutate, isLoading: approveLoading } = useMutation(
    loginUser,
    {
      onSuccess: (data, context, variables) =>
        onSuccessmasterapprove(data, context, variables),
      onError: (data, context, variables) =>
        onErrormasterapprove(data, context, variables),
    }
  );

  const onSuccessmasterapprove = (data) => {
    console.log("data :>> ", data.data.data);
    if (data.data) {
      dispatch(updateState({ ...data.data.data }));
      //Navigate("/dashboard", { replace: true })
    }
  };

  const onErrormasterapprove = (data) => {
    console.log("data :>> ", data);
    if (data && data.response) {
      setSnakeBarProps({
        snackbarFlag: true,
        msz: data.response.data.status.description,
        type: "error",
      });
    }
  };

  const checkvalidation = () => {
    loginUserMutate({
      username: pagedata.username,
      password: pagedata.loginpassword,
    });
  };

  const loginclickhandler = () => {
    afterValidate(checkvalidation, setSnakeBarProps);
    setSubmitFlag(true);
  };

  return (
    <Paper
      elevation={4}
      style={{
        borderRadius: "20px",
        width: "85%",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <Grid item style={{ padding: "0px 30px 10px 30px" }}>
        <Typography
          style={{ color: "#124590", fontSize: "60px", fontFamily: "Khand" }}
        >
          Login
        </Typography>
        <Grid item style={{ padding: "10px 0px 10px 0px" }}>
          <CustomTextField
            type="text"
            inputLabel="Username"
            value={pagedata?.username}
            onChange={(event) =>
              setPagedata({ ...pagedata, username: event.target.value })
            }
            required
            error={
              submitFlag && getErrorMsz("username", pagedata?.username) != ""
            }
            errorMsz={getErrorMsz("username", pagedata?.username)}
          />
        </Grid>
        <Grid item style={{ padding: "10px 0px 10px 0px" }}>
          <CustomTextField
            type="password"
            inputLabel="Password"
            value={pagedata?.loginpassword}
            onChange={(event) =>
              setPagedata({ ...pagedata, loginpassword: event.target.value })
            }
            required
            error={
              submitFlag &&
              getErrorMsz("password", pagedata?.loginpassword) != ""
            }
            errorMsz={getErrorMsz("password", pagedata?.loginpassword)}
          />
        </Grid>
        <Grid style={{ padding: "20px 0px 20px 0px" }}>
          <CustomButton
            variant="contained"
            btnText="login"
            fullWidth
            color="primary"
            onClick={loginclickhandler}
            btnClass={{ backgroundColor: "#124590" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "38px 20px 7px 20px",
        }}
      >
        <Grid item>
          <Typography
            style={{ color: "#717171", fontFamily: "Inter", fontSize: "14px" }}
          >
            Powered by
          </Typography>
          <img width="80%" src="/ews/assets/nine.svg" alt="Image" />
        </Grid>
        <Grid item>
          <Typography
            style={{ color: "#717171", fontFamily: "Inter", fontSize: "14px" }}
          >
            Managed by
          </Typography>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <img
              width="60%"
              src="/ews/assets/imageten.svg"
              alt="Image"
              style={{ display: "flex", justifyContent: "center" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
