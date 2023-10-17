import React from 'react';
import { Box, Grid } from '@mui/material';
import LoStepper from '../../../components/LoStepper';
import MobileStepper from '../../../components/MobileStepper';
import MobileHeader from '../../../components/MobileHeader';
import { responsiveStype } from '../../../theme/responsive';

export const OnboardingLayout = (props) => {

    return <Box sx={responsiveStype.OnboardingLayout.MainWarpper}>
        <Grid container className="height_100">
            <Grid item xs={12} lg={7} sx={responsiveStype.default.hide_mobile}>
                <Box width={1} height={1} sx={{ backgroundColor: "#4545A5" }}>
                    <Box width={1} py={10} ml={10}>
                        <img src='../images/brand.svg'  className="width_30"/>
                    </Box>
                    <LoStepper activeStep={props.stepperIndex} />
                </Box>
            </Grid>
            <Grid item xs={12} sx={responsiveStype.default.hide_desktop}>
                <MobileHeader />
                <MobileStepper activeStep={props.stepperIndex} />
            </Grid>
            <Grid xs={12} lg={5}>
                <Grid container xs={12} lg={12} direction="row" justifyContent="center" alignItems="center" className="height_100">
                    <Grid xs="10">
                        {props.children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
}
