import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CustomButton } from "../../../../components/Button";
import { CustomDialog } from "../../../../components/CustomDialog";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OptionRoaster from "./OptionRoaster";
import Option2Roster from "./Option2Roster";
import Option1rota from "./Option1rota";
import Option3rota from "./Option3rota";
import Option2rota from "./Option2rota";

const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      // backgroundColor: "blue",
      background: "none!important",
      height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "black!important",
      // borderTop:"blue",
      background: "white!important",
      borderRadius: "0px!important",
      borderTop: "3px solid blue!important",
    },
  },
  AssignHeaderContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    color: "#5BB75B",
  },
  cancelIconStyle: {
    color: "#f51414",
  },
  BtnStyleOn: {
    color: "#fff",
    backgroundColor: "#124590",
  },

  BtnStyleOff: {
    color: "#fff",
    backgroundColor: "#dbdbd",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const classes2= useStyles2();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const RotaSelect = (props) => {
  const classes = useStyles();

  const { togglehandler, openAnotherShift, close, data, setResult,setStatus1, status1, setSnakeBarProps, changeDelete, setChangeDelete } = props;
  const [status, setStatus] = React.useState(1);
  const [workDet, setWorkdet] = useState([]);
  const [empname, setEmpName] = useState("");
  const [depname, setDepName] = useState("");
  const [jobname, setJobName] = useState("");
  const [locname, setLocName] = useState("");

  // const handleClose = () => {
  //   if (openAnotherShift) {
  //     close(false);
  //   }
  //   togglehandler(false);
  // };
  const handleClose = () => {
    setWorkdet([]);
    setStatus1(0);
  };

  const CloseForm = (e) => {
    setChangeDelete(!changeDelete);
    setStatus1(0);
  };
  const [titlepp, setTittlepp] = useState("Rota");
  const btnClick = (e) => {
    if (e == 1) setTittlepp("Rota");
    else if (e == 2) setTittlepp("Flex Rota");
    else setTittlepp("Rotation Detail");
    setStatus(e);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <CustomDialog
        maxWidth="xl"
        dialogTitle={titlepp}
        open="true"
        handleClose={handleClose}
      >
        <Grid item xs="12" className={classes.AssignHeaderContent}>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            TabIndicatorProps={{ sx: { backgroundColor: "green" } }}

            // aria-label="basic tabs example"
            // textColor="secondary"
            // indicatorColor="primary"
          >
            <Tab label="Rota" {...a11yProps(0)} />
            <Tab label="Flex Rota" {...a11yProps(1)} />
            {/* <Tab label="Rotational Detail" {...a11yProps(2)} /> */}
          </Tabs>
        </Grid>
        {/* <Grid>
          {status === 1 && (
            <Option1rota
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose={handleClose}
              setResult={setResult}
              workDet={workDet}
              setWorkdet={setWorkdet}
              CloseForm={CloseForm}
              setSnakeBarProps={setSnakeBarProps}
            />
          )}
          {status === 2 && (
            <Option2rota
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose1={handleClose}
              setResult={setResult}
              CloseForm={CloseForm}
              setSnakeBarProps={setSnakeBarProps}
            />
          )}
          {status === 3 && (
            <Option3rota status={status} defaultPerson={props.defaultPerson} />
          )}
        </Grid> */}
        <Grid>
          <TabPanel value={value} index={0}>
            <Option1rota
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose={handleClose}
              setResult={setResult}
              workDet={workDet}
              setWorkdet={setWorkdet}
              CloseForm={CloseForm}
              setSnakeBarProps={setSnakeBarProps}
              empname={empname}
              setEmpName={setEmpName}
              depname={depname}
              setDepName={setDepName}
              jobname={jobname}
              setJobName={setJobName}
              locname={locname}
              setLocName={setLocName}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Option2rota
              status={status}
              togglehandler={togglehandler}
              defaultPerson={props.defaultPerson}
              handleClose1={handleClose}
              setResult={setResult}
              CloseForm={CloseForm}
              setSnakeBarProps={setSnakeBarProps}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Option3rota status={status} defaultPerson={props.defaultPerson} />
          </TabPanel>
        </Grid>
      </CustomDialog>
    </>
  );
};

export default RotaSelect;
