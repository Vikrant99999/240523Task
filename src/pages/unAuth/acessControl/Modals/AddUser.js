import { Typography, Box, TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../../../../components/TextField";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import SearchIcon from "@material-ui/icons/Search";
import UserModal from "../../SelfServices/UserModal";
import { userRoleMock } from "../../rosterRules/Utils";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useSelector } from "react-redux";

const AddUser = (props) => {
  const { handleDeleteCriteria, number, addUser, setAddUser, item, index } =
    props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [openEmployee, setOpenEmployee] = useState(false);
  const [userRoleType, setuserRoleType] = useState({
    userRoleTypeArray: userRoleMock,
    userRoleTypeObj: {},
    userType: "",
  });
  const handleOpenEmployeeModal = () => {
    setOpenEmployee(true);
  };
  console.log(addUser, "addUser");
  const handleChangeUser = (iitem) => {
    const changeval = [...addUser];
    let rData = changeval[index];
    rData["userId"] = iitem.userId;
    rData["fullName"] = iitem.fullName;
    rData["createdBy"] = commonReducer.userId;
    rData["lastUpdatedBy"] = commonReducer.userId;
    setAddUser(changeval);
  };
  const handleChangeCheckBox = (e) => {
    const changeval = [...addUser];
    let rData = changeval[index];
    rData["canCreate"] = e ? "Y" : "N";
    setAddUser(changeval);
  };
  const handleUserRole = (index, val, e) => {
    const changeRow = [...addUser];
    for (let i = 0; i < userRoleType?.userRoleTypeArray.length; i++) {
      if (userRoleType?.userRoleTypeArray[i].userType == val) {
        changeRow[index].userType = userRoleType?.userRoleTypeArray[i].userType;
      }
    }
    setAddUser(changeRow);
  };
  return (
    <>
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
        <Box
          style={{
            width: "10%",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
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
        <Box
          style={{
            width: "62%",
            borderLeft: "3px solid #ededed",
            padding: "2px",
          }}
        >
          <CustomTextField
            value={item?.fullName}
            endIcon={
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenEmployeeModal()}
              />
            }
          />
        </Box>
        <Box
          style={{
            width: "62%",
            borderLeft: "3px solid #ededed",
            padding: "2px",
          }}
        >
          <Autocomplete
            defaultValue={item?.userRole}
            id="Citizenship"
            required
            options={
              userRoleType?.userRoleTypeArray?.length > 0
                ? userRoleType?.userRoleTypeArray?.map(
                    (option) => option?.userType
                  )
                : []
            }
            style={{ marginLeft: "10px" }}
            onChange={(e, value) => {
              handleUserRole(index, value, e);
            }}
            popupIcon={
              <ArrowDropDownIcon fontSize="large" style={{ marginRight: 0 }} />
            }
            renderInput={(params) => <TextField {...params} />}
            disableClearable
          />
        </Box>
        <Box
          style={{
            width: "25%",
            borderLeft: "3px solid #ededed",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomCheckBox check={true} disabled={true} />
        </Box>
        <Box
          style={{
            width: "34%",
            borderLeft: "3px solid #ededed",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomCheckBox
            check={item?.canCreate === "Y" ? true : false}
            onChangeCheck={(e) => {
              handleChangeCheckBox(e);
            }}
          />
        </Box>
        <Box
          style={{
            width: "23%",
            borderLeft: "3px solid #ededed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DoDisturbOnIcon
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "24px",
              textAlign: "center",
            }}
            onClick={handleDeleteCriteria}
          />
        </Box>
      </Box>
      {openEmployee && (
        <UserModal
          toggleHandler={setOpenEmployee}
          handelEmployeechange={handleChangeUser}
          // user={user}
          open={openEmployee}
        />
      )}
    </>
  );
};

export default AddUser;
