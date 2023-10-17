import React from "react";
import { Header } from "../../layout/Header";
import { Grid, Box, Typography } from "@mui/material";

const UserControl = () => {
  return (
    <>
      <Header />
      <Grid item container style={{ margin: "10px" }}>
        <Grid item xs="12">
          <Box>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "Inter",
              }}
            >
              User Control
            </Typography>
          </Box>
        </Grid>
        <Grid
          container
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.125)",
            margin: "5px 0",
          }}
        ></Grid>
      </Grid>
    </>
  );
};

export default UserControl;
