import { Box, Typography } from "@material-ui/core";
import packagejson from "../../package.json";
import React from "react";

export const AppVersion = () => {
  return (
    <Box style={{paddingLeft: 20, paddingBottom: 10}}>
      <Typography style={{ margin: "2px", color: "grey", fontSize: "12px" }}>{"Version " + packagejson.version}</Typography>
    </Box>
  );
};
