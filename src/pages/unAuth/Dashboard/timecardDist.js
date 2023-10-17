import React, { useState, useEffect } from "react";
import { CustomPanel } from "../../../components/CustomPanel";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const example_data = [
  {
    schHrs: 160,
    prodHrs: 66.93,
    punchHrs: 66.93,
    offHrs: 0,
    nonProdHrs: 8,
    leaveHrs: 8,
    holidayHrs: 0,
    personalHrs: 0,
  },
];

const colors = ["#0f0", "#f00"];

const Index = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState("panel1");
  const [data, setData] = useState(example_data[0]);
  const [pieData, setPieData] = useState([]);
  const [punchData, setPunchData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const newData = [
      {
        name: "Productive Hrs",
        value: data.prodHrs,
      },
      {
        name: "Non-Productive Hrs",
        value: data.nonProdHrs,
      },
    ];
    const punchData = [
      {
        name: "Punch Hrs",
        value: data.punchHrs,
      },
    ];
    setPieData(newData);
    setPunchData(punchData);
  }, [data]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const mouseEnterHandler = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className={classes.box}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
        style={{ width: "100%" }}
      >
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            marginLeft: "5px",
            fontWeight: "bolder",
          }}
        >
          Timecard Distribution
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container xs="12">
          <Grid container item xs="3" style={{ padding: "5px" }}>
            <Grid item xs="10">
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                Scheduled Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  color: "green",
                }}
              >
                Productive Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  marginLeft: "5px",
                }}
              >
                Punch Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  marginLeft: "5px",
                }}
              >
                Official Person Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  color: "red",
                }}
              >
                Non Productive Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  marginLeft: "5px",
                }}
              >
                Leave Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  marginLeft: "5px",
                }}
              >
                Holiday Hrs
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                  marginLeft: "5px",
                }}
              >
                Personal Perm-Hrs
              </Typography>
            </Grid>
            <Grid item xs="2">
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.schHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.prodHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.punchHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.offHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.nonProdHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.leaveHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.holidayHrs}
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter",
                  margin: "3px 0",
                }}
              >
                {data.personalHrs}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs="9"
            style={{ padding: "10px", alignItems: "center" }}
          >
            <ResponsiveContainer width="50%" height="60%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height="60%">
              <PieChart>
                <Pie
                  data={punchData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#8884d8" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid #E5E5E5",
    padding: "10px",
    margin: "10px",
  },
}));
