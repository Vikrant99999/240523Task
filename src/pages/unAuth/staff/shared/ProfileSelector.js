import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../../../components/Button";
import { updateState } from "../../../../redux/commonSlice";
import { isPreviousURLMatched } from "../../../../utils/commonService";
import { ProfileModal } from "./ProfileModal";

const ProfileSelector = (props) => {
  const { managerFlag } = props;
  const classes = useStyles();

  const commonReducer = useSelector((state) => state.commonReducer);
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);
  const [project, setProject] = useState(false);
  const dispatch = new useDispatch();

  const selectprojectclickhandler = () => {
    setProject(true);
  };

  const resetSelectedProfile = () => {
    dispatch(
      updateState({
        // lineManageForTeam: !commonReducer.lineManageForTeam,
        selectedProjectObjTeam: {},
      })
    );
  };

  useEffect(() => {
    if (!isPreviousURLMatched(commonReducer)) {
      const key = "previous_url";
      var currentPath = window.location.origin + window.location.pathname;
      if (managerFlag) {
        dispatch(
          updateState({ [key]: currentPath, selectedProjectObjTeam: {} })
        );
      } else {
        dispatch(updateState({ [key]: currentPath, selectedProjectObj: {} }));
      }
    }
  }, []);
  return (
    <>
      <Stack flexDirection="row" gap={1} alignItems="baseline">
        {resetSelectedProfile && managerFlag && (
          <CustomButton
            btnText="Line Manager"
            variant="contained"
            onClick={resetSelectedProfile}
            className={isLineManager ? classes.selectedButton : ""}
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        )}
        {selectprojectclickhandler && (
          <CustomButton
            btnText="select Profile"
            variant="contained"
            onClick={selectprojectclickhandler}
            className={
              managerFlag ? (!isLineManager ? classes.selectedButton : "") : ""
            }
            btnClass={{
              backgroundColor: "#124590",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        )}
        {/* {Object.keys(commonReducer.selectedProjectObjTeam).length > 0 && ( */}
        <Typography
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
            marginLeft: "5px",
            fontWeight: "800",
          }}
        >
          {" "}
          {managerFlag
            ? Object.keys(commonReducer.selectedProjectObjTeam).length > 0
              ? commonReducer?.selectedProjectObjTeam?.profileName + " "
              : ""
            : commonReducer?.selectedProjectObj?.profileName
            ? commonReducer?.selectedProjectObj?.profileName + " "
            : ""}
        </Typography>
        {/* )} */}
      </Stack>

      {project && (
        <ProfileModal
          togglerHandler={setProject}
          reducerKeyFromParent="selectedProjectObjTeam"
          parent="team"
          selectProfileMapKey="profileName"
        />
      )}
    </>
  );
};
export default ProfileSelector;

const useStyles = makeStyles((theme) => ({
  selectedButton: {
    backgroundColor: "rgb(6 102 243) !important",
  },
}));
