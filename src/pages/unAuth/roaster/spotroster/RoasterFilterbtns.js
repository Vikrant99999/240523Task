import React from 'react'
import { Grid,Box, Typography } from '@mui/material'
import { CustomButton } from '../../../../components/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from '@material-ui/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const useStyles=makeStyles(theme=>({
    mainContainer:{
        width:"100%",
     display:"flex",
     flexDirection:"row",
     justifyContent:"space-between"
    },
    ButtonsGrid:{
      
        padding:"5px",
        borderRight: "1px solid rgb(233, 233, 233)",
        
       
    },
}))

const RoasterFilterbtns = () => {
    const classes=useStyles();


  return (
    <Box className={classes.mainContainer}>
  <Grid container>
   
    {/* <Grid className={classes.ButtonsGrid}>
       <CustomButton
        btnText="View"
        variant="contained"
        endIcon={<ArrowDropDownIcon/> }
        btnClass={{ backgroundColor: "#ffff", color: "black", fontSize: "14px" }}
        
       />

        </Grid> */}
        <Grid className={classes.ButtonsGrid} style={{margin:"5px",display:"flex",justifyContent:"space-evenly"}}>
       <CustomButton
        btnText="New"
        variant="contained"
        startIcon={<FilterAltIcon/> }
        btnClass={{ backgroundColor: "#124590", color: "white", fontSize: "14px", }}
        
       />

      
       
       <CustomButton
        btnText="Updated"
        variant="contained"
        startIcon={<FilterAltIcon/> }
        btnClass={{ backgroundColor: "#5BB75B", color: "white", fontSize: "14px",marginLeft:"5px" }}
        
       />
       <CustomButton
        btnText="Export To Excel"
        variant="contained"
        startIcon={<FileUploadIcon/>}
        btnClass={{ backgroundColor: "#ffff", color: "black", fontSize: "14px",marginLeft:"5px" }}
        
       />

</Grid>


{/* <Grid style={{marginTop:"7px"}}>
       <CustomButton
        btnText="Detach"
        variant="contained"
        // endIcon={<ArrowDropDownIcon/> }
        btnClass={{ backgroundColor: "#ffff", color: "black", fontSize: "14px", }}
        
       />

        </Grid> */}
  </Grid>
  <Grid style={{display:"flex",marginTop:"10px"}}>
    <Grid>
    <Typography
       
        variant="contained"
       
        style={{  color: "black", fontSize: "19px",marginLeft:"7px",padding:"3px" }}
        
       >Actual</Typography>
    </Grid>
    <Grid>
    <Typography
       
        variant="contained"
       
        style={{ backgroundColor: "#f2bba5", color: "black", fontSize: "19px",marginLeft:"7px",padding:"3px" }}
        
       >Absence</Typography>
    </Grid>
    <Grid>
    <Typography
       
        variant="contained"
       
        style={{ backgroundColor: "#f2efb3", color: "black", fontSize: "19px",marginLeft:"7px",padding:"3px" }}
        
       >Request</Typography>
    </Grid>
    <Grid>
    <Typography
       
        variant="contained"
       
        style={{ backgroundColor: "#dcf2ce", color: "black", fontSize: "19px",marginLeft:"7px",padding:"3px" }}
        
       >Holiday</Typography>
       {/* <Typography></Typography> */}
    </Grid>
  </Grid>
  </Box>
  
  )
}

export default RoasterFilterbtns
