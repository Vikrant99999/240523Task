import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'; import { Grid } from '@material-ui/core';
import { CustomFooter } from '../components/CustomFooter';
import { unAuthConstant } from './unauth/unAuthConstant';
import { Link, useNavigate } from 'react-router-dom';
import { customTheme as theme } from '../theme/customTheme';
import { resetState, updateState } from '../redux/commonSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const PageNotFound = (props) => {
  const footer = unAuthConstant.footerText.title
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonReducer = useSelector((state) => state.commonReducer);
  
   // const { componentStack, error } = props;
   // const [displayError, updateDisplay] = useState(false)
     const logout = ()=> {
        if(!commonReducer.counter_flag == true) {
            window.localStorage.removeItem('token');
            dispatch(updateState({ 
                
                  isLogged: false,
                  user: {},
                  //  organisation_id: null,
                  token: null,
                  organisation_id: null,
                  organisation_name: "",
                  employee_id: null,
                  leave_id:null,
                  employee_photo: "",
                  logo_url: "",
                  candidate_id: null,
                  interview_id: null,
                  position_id: null,
                  departmentArr: [],
                  genderArr: [],
                  candidateStatus: "",
                  newRoleDepartment: null,
                  is_admin: null,
                  login_time: null,
                  counter_flag: false,
                  counter_disable: false,
                  shift_duration: 600,
                  shift_extention: 0,
                  full_name: "",
                  offerLetterFlag: false,
             }));
           // dispatch(resetState())
        }
        navigate('/');
       
     }
    return <>
          <Box>
                <Grid style={{ justifyContent: "center", height: "calc(100vh - 60px)" }}>
                      <Grid item xs={12}>
                            <Box style={{ display: "flex", justifyContent: "center", paddingTop: "10%" }}>
                                  {/* <img className='auth-logo' src="../../../assets/BusinessPointLogo.png" alt="LOGO" /> */}
                                  <img className='auth-logo' src={commonReducer.product_logo} alt="LOGO" />
                            </Box>
                      </Grid>
                      <Grid container item xs={12} justifyContent="center" style={{ marginTop: "100px" }}>
                            <Grid item xs={8}>
                                  <Typography variant='h4' align='justify' style={{ color: "red", display: "flex", justifyContent: 'center' }}><Box mb={5} >Oops! Something went wrong</Box></Typography>
                                  <Typography variant='subtitle2' align='justify' style={{ display: "flex", justifyContent: 'center' }}>
                                    <Box>The page that you are looking for was not found. Either the page does not exist or it might be restricted. Please return to <Link style={{ color: 'red' }}  to='/dashboard'>Dashboard</Link> or <Box component='span' style={{textDecorationLine: 'underline', color: 'red', cursor: 'pointer' }} onClick = {logout} >Login </Box>as admin to request the page again. If your shift has not ended, you will be redirected to your dashboard and you may logout after your shift ends. 
                                    </Box>
                                  </Typography>
                                  <Box width={1} marginY={5} textAlign="center">
                                        {/* <Button variant="contained" onClick={() => { window.location.reload(); }} style={{ marginRight: 10 }}>Refresh</Button>
                                        <Button variant="contained" onClick={() => updateDisplay(true)}>Load details</Button> */}
                                  </Box>
                                  {/* <Typography variant='h6' style={{ cursor: "pointer", display: "flex", justifyContent: 'center', textDecoration: "underline" }} onClick={refreshclickhandler}>Please Refresh</Typography> */}
                            </Grid>
                            {/* <Grid item xs={8}>
                                  {(displayError) ?
                                        <div style={{ maxHeight: 140, overflowY: 'auto' }}>
                                              <details style={{ whiteSpace: "pre-wrap" }}>
                                                    {error && error.toString()}
                                                    <hr />
                                                    {componentStack}
                                              </details>
                                        </div> : null}
                            </Grid> */}
                      </Grid>
                </Grid>
          </Box>
          <CustomFooter footerText={footer} />
    </>

};

