import React from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { Box, Grid, Typography } from "@mui/material";
import { CustomButton } from "../../../components/Button";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
import { getScheduleEmpData } from "../../../services/api";
import { useEffect } from "react";
import { useState } from "react";

const FilteredEmployeelist = (props) => {
  const { toggleHandler, editData } = props;
  console.log(editData, "editData");
  const [filteredData, setFilteredData] = useState();
  const handleClose = () => {
    toggleHandler(false);
  };

  const { data: getFilteredData } = useQuery(
    ["getFilteredData", editData?.profileId],
    () => getScheduleEmpData({ profileId: editData?.profileId }),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getFilteredData) {
      setFilteredData(getFilteredData?.data?.data);
    }
  }, [getFilteredData]);

  return (
    <CustomDialog
      maxWidth="xl"
      dialogTitle="Verified Employee List"
      open={true}
      handleClose={handleClose}
    >
      <Grid>
        <Box>
          <CustomButton btnText="Export To excel">
            <CSVLink data={filteredData} separator={";"}>
              Export To excel
            </CSVLink>
          </CustomButton>
        </Box>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Employee Number
            </Typography>
          </Box>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Employee
            </Typography>
          </Box>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Email Address
            </Typography>
          </Box>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Department
            </Typography>
          </Box>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Job
            </Typography>
          </Box>
          <Box
            style={{
              width: "40%",
              borderTop: "3px solid #ededed",
              borderLeft: "3px solid #ededed",
              borderRight: "3px solid #ededed",
              borderBottom: "3px solid #ededed",
              padding: "2px",
            }}
          >
            <Typography
              style={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Work Location
            </Typography>
          </Box>
        </Box>
        {filteredData?.length > 0 ? (
          filteredData?.map((data) => (
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.employeeNumber}
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.personName}
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.emailAddress}
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.departmentName}
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.jobTitle}
                </Typography>
              </Box>
              <Box
                style={{
                  width: "40%",
                  borderTop: "3px solid #ededed",
                  borderLeft: "3px solid #ededed",
                  borderRight: "3px solid #ededed",
                  borderBottom: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {data?.locationName}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            No Data to display
          </Typography>
        )}
      </Grid>
    </CustomDialog>
  );
};

export default FilteredEmployeelist;
