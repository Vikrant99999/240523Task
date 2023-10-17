import React from "react";
import { CustomDialog } from "../../../../components/CustomDialog";
import { Grid, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomButton } from "../../../../components/Button";

const ViewDetailModal = (props) => {
  const { toggleHandler, item, selectMonth } = props;
  console.log(item, "item");
  const handleClose1 = () => {
    toggleHandler(false);
  };
  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };
  var tooltip;
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    console.log(payload, "payload");
    for (const bar of payload)
      if (bar.dataKey === tooltip)
        return (
          <div style={{ background: "#fff" }}>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
            >
              Series{" "}
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {bar.name}{" "}
              </span>
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
              }}
            >
              Value{" "}
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {bar.value >= 1000
                  ? `${(bar.value / 1000).toFixed(3)}k`
                  : bar.value}
              </span>
            </Typography>
          </div>
        );
    return null;
  };
  return (
    <CustomDialog
      dialogTitle={
        "Detail Charts for " + item.employeeName + " of month " + selectMonth
      }
      maxWidth="sm"
      open="true"
      handleClose={handleClose1}
    >
      <Grid>
        <Typography
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Inter",
            margin: 10,
          }}
        >
          {item.departmentName}
        </Typography>
        <ResponsiveContainer width={550} height={250}>
          <BarChart
            data={item.chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickCount={7} tickFormatter={formatYAxisTick} />
            <Tooltip content={<CustomTooltip />} />

            <Legend layout="horizontal" verticalAlign="top" />
            <Bar
              dataKey="Scheduled"
              stroke="#2B76A5"
              fill="#2B76A5"
              // background={{ stroke: "8884d8", fill: "#8884d8" }}
              w
              barSize={30}
              isAnimationActive={true}
              onMouseOver={() => (tooltip = "Scheduled")}
            />
            <Bar
              dataKey="Actual"
              stroke="#82ca9d"
              fill="#82ca9d"
              barSize={30}
              // background={{ stroke: "#82ca9d", fill: "#82ca9d" }}
              isAnimationActive={true}
              onMouseOver={() => (tooltip = "Actual")}
            />
          </BarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          btnText="Ok"
          btnClass={{ color: "#fff", backgroundColor: "#124590" }}
          onClick={handleClose1}
        />
      </Grid>
    </CustomDialog>
  );
};

export default ViewDetailModal;
