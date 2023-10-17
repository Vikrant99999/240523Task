import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'; import { Grid } from '@mui/material';

export const ErrorFallback = (props) => {
      const { componentStack, error } = props;
      const [displayError, updateDisplay] = useState(false)
      // const commonReducer = useSelector((state) => state.commonReducer);

      return <>
            <Box>
                  <Grid style={{ justifyContent: "center", height: "calc(100vh - 60px)" }}>
                        <Grid item xs={12}>
                              <Box style={{ display: "flex", justifyContent: "center", paddingTop: "10%" }}>
                                    {/* <img className='auth-logo' src="../../../assets/BusinessPointLogo.png" alt="LOGO" /> */}
                                    <img className='auth-logo' src={`${window.localStorage.getItem('local_url_dark')}`} alt="LOGO" />
                              </Box>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center" style={{ marginTop: "100px" }}>
                              <Grid item xs={8}>
                                    <Typography variant='h4' style={{ color: "red", display: "flex", justifyContent: 'center' }}>Oops! Something went wrong</Typography>
                                    <Typography variant='h4' style={{ color: "red", display: "flex", justifyContent: 'center' }}>Please choose a suitable option to proceed</Typography>
                                    <Box width={1} marginY={5} textAlign="center">
                                          <Button variant="contained" onClick={() => { window.location.reload(); }} style={{ marginRight: 10 }}>Refresh</Button>
                                          <Button variant="contained" onClick={() => updateDisplay(true)}>Load details</Button>
                                    </Box>
                                    {/* <Typography variant='h6' style={{ cursor: "pointer", display: "flex", justifyContent: 'center', textDecoration: "underline" }} onClick={refreshclickhandler}>Please Refresh</Typography> */}
                              </Grid>
                              <Grid item xs={8}>
                                    {(displayError) ?
                                          <div style={{ maxHeight: 140, overflowY: 'auto' }}>
                                                <details style={{ whiteSpace: "pre-wrap" }}>
                                                      {error && error.toString()}
                                                      <hr />
                                                      {componentStack}
                                                </details>
                                          </div> : null}
                              </Grid>
                        </Grid>
                  </Grid>
            </Box>
      </>

};

