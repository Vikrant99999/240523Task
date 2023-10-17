import { Box } from "@material-ui/core";
import CachedIcon from "@mui/icons-material/Cached";
import React from "react";

export const RefreshButton = () => {
  const refresh = () => window.location.reload(true)

  return (
    <Box style={{ paddingLeft: 15 }}>
      <CachedIcon
        onClick={refresh}
        style={{ marginLeft: "2px", cursor: "pointer" }}
      />
    </Box>
  );
};
