import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CustomTextField } from "../../../../components/TextField";
import { CustomButton } from '../../../../components/Button/index';
import { CustomDialog } from '../../../../components/CustomDialog';

const ExpireModal = (props) => {
  const { toggleHandler } = props;


  const expireWorkRotation = () => {

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify([

    // ]);

    // var requestOptions = {
    //   method: 'DELETE',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://182.72.11.106:9091/ews/roster/personRosterData", requestOptions)
    //   .then(response => setDeleteRoster(response))
    //   .then(result => console.log(result));

    toggleHandler(false)

  }


  return (
    <CustomDialog maxWidth="s" dialogTitle="Expire Work Rotation" open="true" handleClose={() => {
      toggleHandler(false)
    }} >
      <Grid container style={{
        justifyContent: "center",
        height: 300,
      }}>

        <Grid
          xs="6"
          style={{
           
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "center"
            }}
          >
            <Box textAlign="center">Expiry Date</Box>
          </Typography>
        </Grid>
        <Grid item xs="6">
          <Box style={{  }}>
            <DatePicker
              className="dateManage"
              dateFormat="dd-MMM-yyyy"
              //selected={startDate}
              //onChange={(date) => setStartDate(date)}
              renderInput={(params) => {
                return <CustomTextField {...params} />;
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid style={{ display: "flex", justifyContent: "flex-end ", marginTop: "10px" }}>
        <CustomButton
          btnText="Expire"
          onClick={expireWorkRotation}
          btnClass={{ backgroundColor: "#124590", color: "#fff" }}
        />
      </Grid>
    </CustomDialog>
  )
}

export default ExpireModal
