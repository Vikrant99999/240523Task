import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export const CustomBox = (props) => {
  const { className, itemId, selectedItemId, hoveredItemId, setHoveredItemId, children } = props;

  //const [hoveredItemId, setHoveredItemId] = useState();

  return (
    <Box className={className}
      onMouseEnter={() => setHoveredItemId(itemId)}
      onMouseLeave={() => setHoveredItemId(null)}
      style={{
        backgroundColor: itemId === selectedItemId
          ? "lightblue"
          : itemId === hoveredItemId
            ? "#ededed"
            : "#fff"
      }}>
      {children}
    </Box>
  );
};
