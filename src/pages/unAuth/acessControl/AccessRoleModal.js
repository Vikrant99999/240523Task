import React, { useState } from "react";
import { CustomDialog } from "../../../components/CustomDialog";
import { Box, Grid, Typography } from "@mui/material";
import { CustomTextField } from "../../../components/TextField";
import { CustomButton } from "../../../components/Button";
import CustomCheckBox from "../../../components/CustomCheckBox";
import { useQuery, useMutation } from "react-query";
import { CustomSnackbar } from "../../../components/CustomSnackbar";
import {
  getTaskGroup,
  userList,
  getTaskGroupDetails,
  saveUserRole,
  deleteRole,
} from "../../../services/api";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserModal from "../SelfServices/UserModal";

const AccessRoleModal = (props) => {
  const { toggleHandler, editData, getRolesRefetch, setErrorProps } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [isLoading, setIsLoading] = useState(true);
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [userModaldialog, setUserModaldialog] = useState(false);
  const [index, setIndex] = useState();
  const [checkBoxedArray, setCheckBoxedArray] = useState([]);

  const [groupData, setGroupData] = useState([]);
  const [roleName, setRoleName] = useState(
    editData == undefined ? "" : editData?.roleName
  );
  const [checkStatus, setCheckStatus] = useState({
    foreverFlag:
      editData == undefined ? false : editData?.enabled == "Y" ? true : false,
  });
  const [addRow, setAddRow] = useState([]);

  const handleAddRow = () => {
    const AddCriteria = [...addRow, []];

    setAddRow(AddCriteria);
  };
  const handleDeleteCriteria = (index) => {
    var deletevalCriteria = [...addRow];
    deletevalCriteria.splice(index, 1);
    setAddRow(deletevalCriteria);
  };
  const handleClose = () => {
    toggleHandler(false);
  };

  const onSuccessSaveUserRole = (data, context, variables) => {
    console.log(data);
    getRolesRefetch();
    handleClose();
    setErrorProps({
      snackbarFlag: true,
      type: "success",
      msz: "User Role Saved Successfully",
    });
  };

  const onErrorSaveUserRole = (data, context, variables) => {};

  const { data: getaccessgroupdata, refetch: getAllProjectRefetch } = useQuery(
    ["getaccessgroupdata"],
    () =>
      editData !== undefined
        ? getTaskGroup({ id: editData?.userTaskRoleId })
        : getTaskGroupDetails(),
    {
      enabled: true,
      retry: false,
    }
  );

  const onSuccessDeleteRole = (data, context, variables) => {
    console.log(data);
    getRolesRefetch();
    handleClose();
    setErrorProps({
      snackbarFlag: true,
      type: "success",
      msz: "User Role Deleted Successfully",
    });
  };

  const onErrorDeleteRole = (data, context, variables) => {};

  const { mutate: mutateDeleteRole } = useMutation(deleteRole, {
    onSuccess: (data, context, variables) =>
      onSuccessDeleteRole(data, context, variables),
    onError: (data, context, variables) =>
      onErrorDeleteRole(data, context, variables),
  });

  const { mutate: mutateSaveUserRole } = useMutation(saveUserRole, {
    onSuccess: (data, context, variables) =>
      onSuccessSaveUserRole(data, context, variables),
    onError: (data, context, variables) =>
      onErrorSaveUserRole(data, context, variables),
  });

  const { data: userListData } = useQuery(
    ["userList", editData?.userTaskRoleId],
    () => userList({ id: editData?.userTaskRoleId }),
    {
      enabled: true,
      retry: false,
    }
  );

  // const {data: getTaskGroupDetails} = useQuery(
  //   ["getTaskGroupDetails"],
  //   () => getTaskGroupDetails(),
  //   {
  //     enabled: true,
  //     retry: false
  //   }
  // );

  console.log(groupData);

  useEffect(() => {
    if (getaccessgroupdata) {
      let arr = getaccessgroupdata?.data?.data.sort((data1, data2) =>
        data1.groupName.localeCompare(data2.groupName)
      );
      setGroupData(arr);
    }
  }, [getaccessgroupdata]);

  useEffect(() => {
    if (userListData) {
      if (editData != undefined) {
        setAddRow(userListData?.data?.data);
      }

      // setIsLoading1(false);
    }
  }, [userListData]);

  const canCreateHandler = (e, item) => {
    setCheckBoxedArray((prev) => {
      let index = prev.findIndex((i) => i.taskId === item.taskId);
      if (index > -1) {
        prev[index] = { ...prev[index], canCreate: e ? "Y" : "N" };
      } else {
        prev.push({
          taskId: item.taskId,
          createdBy: commonReducer?.userId,
          lastUpdatedBy: commonReducer?.userId,
          canCreate: e ? "Y" : "N",
          readOnly: item.readOnly,
        });
      }
      return prev;
    });
  };

  const readOnlyHandler = (e, item) => {
    setCheckBoxedArray((prev) => {
      let index = prev.findIndex((i) => i.taskId === item.taskId);
      if (index > -1) {
        prev[index] = { ...prev[index], readOnly: e ? "Y" : "N" };
      } else {
        prev.push({
          taskId: item.taskId,
          createdBy: commonReducer?.userId,
          lastUpdatedBy: commonReducer?.userId,
          canCreate: item.canCreate,
          readOnly: e ? "Y" : "N",
        });
      }
      return prev;
    });
  };

  const saveHandler = () => {
    if (editData === undefined) {
      if (roleName === "") {
        setSnakeBarProps({
          snackbarFlag: true,
          msz: "Role Name is required",
          type: "error",
        });
        return;
      }
      mutateSaveUserRole({
        roleName: roleName,
        enabled: checkStatus.foreverFlag ? "Y" : "N",
        createdBy: commonReducer?.userId,
        lastUpdatedBy: commonReducer?.userId,
        taskDetailsLine: checkBoxedArray,
        userDetails: addRow,
      });
    }
  };

  const deleteHandler = () => {
    mutateDeleteRole({
      id: editData?.userTaskRoleId,
    });
  };

  const openUserModal = (index) => {
    setUserModaldialog(true);
    setIndex(index);
  };

  const handleChangeUser = (iitem) => {
    const changeval = [...addRow];
    let rData = changeval[index];
    rData["userId"] = iitem.userId;
    rData["fullName"] = iitem.fullName;
    rData["createdBy"] = commonReducer.userId;
    rData["lastUpdatedBy"] = commonReducer.userId;
    setAddRow(changeval);
  };
  return (
    <Grid>
      <CustomDialog
        maxWidth="lg"
        dialogTitle="User Role"
        open="true"
        handleClose={handleClose}
      >
        <Grid xs="12" style={{ display: "flex", flexDirection: "row" }}>
          <Grid xs="8">
            <Grid
              style={{
                border: "3px solid #ededed",
                padding: "5px",
                margin: "5px",
              }}
            >
              <Box>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "Inter",
                    fontWeight: "bolder",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#124590",
                  }}
                >
                  User Role
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid ml={1}>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Role Name*
                    </Typography>
                  </Grid>
                  <Grid xs="3" ml={3}>
                    <CustomTextField
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </Grid>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid ml={1}>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bolder",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Enabled ?
                    </Typography>
                  </Grid>
                  <Grid xs="3" ml={3.8}>
                    <CustomCheckBox
                      check={checkStatus.foreverFlag}
                      onChangeCheck={(e) =>
                        setCheckStatus({ ...checkStatus, foreverFlag: e })
                      }
                    />
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid
              style={{
                border: "3px solid #ededed",
                padding: "5px",
                margin: "5px",
              }}
            >
              <Box style={{ height: "46.75vh" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "Inter",
                    fontWeight: "bolder",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "#124590",
                  }}
                >
                  Task
                </Typography>
                <Box
                  style={{
                    border: "3px solid #ededed",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box style={{ width: "20%", padding: "2px" }}>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    >
                      Group
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "40%",
                      borderLeft: "3px solid #ededed",
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
                      Task
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      borderLeft: "3px solid #ededed",
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
                      Full Access ?
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      borderLeft: "3px solid #ededed",
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
                      Read only ?
                    </Typography>
                  </Box>
                </Box>
                <Grid style={{ height: "40.75vh", overflowY: "auto" }}>
                  {groupData.length > 0 &&
                    groupData.map((item, index) => {
                      let groupName = item.groupName;
                      if (index !== 0) {
                        if (
                          groupData[index].groupName ===
                          groupData[index - 1].groupName
                        ) {
                          groupName = "";
                        }
                      }
                      return (
                        <Box style={{ height: "7vh" }}>
                          <Box
                            style={{
                              border: "3px solid #ededed",
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Box style={{ width: "21.3%", padding: "2px" }}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                  fontWeight: "bold",
                                }}
                              >
                                {groupName}
                              </Typography>
                            </Box>
                            <Box
                              style={{
                                width: "42.7%",
                                borderLeft: "3px solid #ededed",
                                padding: "2px",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.taskName}
                              </Typography>
                            </Box>
                            <Box
                              style={{
                                width: "21%",
                                borderLeft: "3px solid #ededed",
                                padding: "2px",
                              }}
                            >
                              <CustomCheckBox
                                check={item.canCreate === "Y" ? true : false}
                                onChangeCheck={(e) => {
                                  canCreateHandler(e, item);
                                }}
                              />
                            </Box>
                            <Box
                              style={{
                                width: "19%",
                                borderLeft: "3px solid #ededed",
                                padding: "2px",
                              }}
                            >
                              <CustomCheckBox
                                check={item.readOnly === "Y" ? true : false}
                                onChangeCheck={(e) => {
                                  readOnlyHandler(e, item);
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid
            xs="4"
            style={{
              border: "3px solid #ededed",
              padding: "5px",
              margin: "5px",
            }}
          >
            <Typography
              style={{
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: "bolder",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#124590",
              }}
            >
              Add User in Role
            </Typography>
            <Box>
              <CustomButton
                btnText="Add User"
                btnClass={{ color: "#fff", backgroundColor: "#124590" }}
                onClick={handleAddRow}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                border: "3px solid #ededed",
                padding: "2px",
                marginTop: "5px",
              }}
            >
              <Box style={{ width: "10%", padding: "2px" }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  #
                </Typography>
              </Box>
              <Box
                style={{
                  width: "70%",
                  borderLeft: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  User
                </Typography>
              </Box>
              <Box
                style={{
                  width: "20%",
                  borderLeft: "3px solid #ededed",
                  padding: "2px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  Action
                </Typography>
              </Box>
            </Box>
            <Box style={{ height: "50vh", overflowY: "scroll" }}>
              {addRow?.length > 0 &&
                addRow?.map((item, index) => {
                  let number = index + 1;
                  return (
                    <>
                      <Box
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          padding: "2px",
                        }}
                      >
                        <Box style={{ width: "11%", padding: "12px" }}>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              textAlign: "center",
                            }}
                          >
                            {number}
                          </Typography>
                        </Box>
                        <Box style={{ width: "72%" }}>
                          <CustomTextField
                            style={{ margin: "3px" }}
                            value={item?.fullName}
                            endIcon={
                              <SearchIcon
                                onClick={() => {
                                  openUserModal(index);
                                }}
                                style={{ cursor: "pointer" }}
                              />
                            }
                          />
                        </Box>
                        <Box
                          style={{
                            width: "16%",
                            padding: "7px",
                            alignItems: "center",
                          }}
                        >
                          <DoDisturbOnIcon
                            onClick={handleDeleteCriteria}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              marginLeft: "12px",
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Grid>
        </Grid>
        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          padding="5px"
        >
          <Grid>
            <CustomButton
              btnText="Save"
              btnClass={{ color: "#fff", backgroundColor: "#124590" }}
              onClick={saveHandler}
            />
          </Grid>
          {editData !== undefined && (
            <Grid ml={1}>
              <CustomButton
                btnText="Delete"
                btnClass={{ color: "#fff", backgroundColor: "#124590" }}
                onClick={deleteHandler}
              />
            </Grid>
          )}
          <Grid ml={1}>
            <CustomButton
              btnText="Cancel"
              onClick={handleClose}
              btnClass={{ color: "#fff", backgroundColor: "#124590" }}
            />
          </Grid>
        </Grid>
      </CustomDialog>
      {userModaldialog && (
        <UserModal
          toggleHandler={setUserModaldialog}
          handelEmployeechange={handleChangeUser}
          open={userModaldialog}
        />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </Grid>
  );
};

export default AccessRoleModal;
