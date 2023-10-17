import { Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";
import { MainPage } from "../pages/layout/MainPage";

export const CustomPanel = (props) => {
  const { title, children } = props;

  return (
    <MainPage pageName={title} noheader>
      {children}
    </MainPage>
  );
};
