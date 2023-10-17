import React, { useEffect } from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { MainPage } from "../../layout/MainPage";
import { useState } from "react";
import { CustomButton } from "../../../components/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/styles";
import AccessRoleModal from "./AccessRoleModal";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import { manageAccessRoleGetData } from "../../../services/api";
import { useQuery } from "react-query";

const ManageAccessRole = (props) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(-1);
  const [openRule, setOpenRule] = useState(false);
  const [editData, setEditData] = useState();
  const [errorProps, setErrorProps] = useState({});
  const [getAccessRoleData, setAccessRoleData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const handleOpen = (item) => {
    setOpenRule(true);
    setEditData(item);
  };

  const { data: getManageAccessRole, refetch: getAllProjectRefetch } = useQuery(
    ["getManageAccessRole"],
    () => manageAccessRoleGetData(),
    {
      enabled: true,
      retry: false,
    }
  );

  useEffect(() => {
    if (getManageAccessRole) {
      setAccessRoleData(getManageAccessRole?.data?.data);

      setIsLoading1(false);
    }
  }, [getManageAccessRole]);

  console.log(getAccessRoleData);

  useEffect(() => {
    if (!isLoading1) {
      setIsLoading(false);
    }
  }, [isLoading1]);

  return (
    <>
      <MainPage pageName={props.title} isLoading={isLoading}>
        <Grid
          container
          style={{ borderTop: "1px solid rgba(0, 0, 0, 0.125)", margin: "5px" }}
        >
          <Box style={{ margin: "10px" }}>
            <CustomButton
              variant="contained"
              onClick={() => handleOpen()}
              btnText="New"
              btnClass={{
                fontSize: "14px",
                fontFamily: "Inter",
                backgroundColor: "#124590",
                color: "#fff",
              }}
              startIcon={<AddIcon className={classes.addIcon} />}
            />
          </Box>
        </Grid>
        <Box className={classes.mainbox}>
          <Box className={classes.innermainbox}>
            <Box className={classes.innerboxworkduration}>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </Typography>
              </Box>
              <Box style={{ width: "20%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Role Name
                </Typography>
              </Box>
              <Box style={{ width: "10%" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  Enabled
                </Typography>
              </Box>
            </Box>
            <Box style={{ maxHeight: "60vh", marginTop: 40 }}>
              {getAccessRoleData?.length > 0 &&
                getAccessRoleData?.map((item) => {
                  let saved = false;
                  if (clicked == item?.userTaskRoleId) {
                    saved = true;
                  } else if (clicked == item?.roleName) {
                    saved = true;
                  }
                  return (
                    <>
                      <Box
                        className={classes.pagedatamainbox}
                        onClick={() => setClicked(item.userTaskRoleId)}
                        style={{
                          backgroundColor: `${saved ? "lightblue" : ""}`,
                        }}
                      >
                        <Box className={classes.ActionBox}>
                          <Tooltip title="View/Edit">
                            <EditIcon
                              className={classes.EditIcon}
                              onClick={() => handleOpen(item)}
                            />
                          </Tooltip>
                        </Box>
                        <Box className={classes.WorkPlan}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.roleName}
                          </Typography>
                        </Box>
                        <Box style={{ width: "10%" }}>
                          <Typography
                            style={{ fontSize: "14px", fontFamily: "Inter" }}
                          >
                            {item?.enabled}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
        </Box>
        {openRule && (
          <AccessRoleModal
            toggleHandler={setOpenRule}
            editData={editData}
            getRolesRefetch={getAllProjectRefetch}
          />
        )}
        {Object.keys(errorProps).length > 0 && (
          <CustomSnackbar {...errorProps} setSnakeBarProps={setErrorProps} />
        )}
      </MainPage>
    </>
  );
};

export default ManageAccessRole;
const useStyles = makeStyles((theme) => ({
  addIcon: {
    color: "#60AA60",
    fontWeight: "bold",
    fontSize: "16px",
  },
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    //margin: "5px",
    //maxHeight: "350px",

    // overflow: "scroll"
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "scroll",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "absolute",
    width: "96%",
    // marginRight: "50px"
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
  },
  EditIcon: {
    color: "#124590",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  ActionBox: {
    width: "10%",
    display: "flex",
    alignItems: "center",
  },
  WorkPlan: {
    width: "20%",
    display: "flex",
    alignItems: "center",
  },
}));
