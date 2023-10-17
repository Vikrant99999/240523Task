import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Header } from "./Header";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/commonSlice";
import { updatePreviousURL } from "../../utils/commonService";

export const MainPage = ({ pageName, children, isLoading, noheader }) => {
  const dispatch = new useDispatch();

  useEffect(() => {
    document.title = pageName;
    updatePreviousURL(dispatch, updateState);
  }, []);

  return (
    <>
      {noheader ? null : <Header />}
      <Grid container>
        <Grid item xs="12">
          <Box
            style={{
              border: "2px solid #EDEDED",
              elevation: 2,
              margin: "10px",
              padding: "10px",
              minHeight: 200,
            }}
          >
            <>
              <Stack
                flexDirection="row"
                gap={3}
                mb={1}
                style={{ marginTop: 10 }}
              >
                <Typography
                  component={"div"}
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: "20px",
                  }}
                >
                  {pageName}
                </Typography>
                <Loader isLoading={isLoading} />
              </Stack>
              {children}
            </>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
