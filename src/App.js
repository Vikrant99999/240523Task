import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { Team } from "./pages/unAuth/staff/team";
import Dashboard from "./pages/unAuth/Dashboard";
import { AgencyTimesheet } from "./pages/unAuth/staff/agencytimesheet";
import { TimesheetSubmission } from "./pages/unAuth/staff/timesheetsubmission";
import { SpotRoaster } from "./pages/unAuth/roaster/spotroster";
import TimesheetReport from "./pages/unAuth/reports/timesheet";
import EmployeeTimesheetReport from "./pages/unAuth/reports/employeetimesheet";
import RosterDetailReport from "./pages/unAuth/reports/rosterdetail";
import RequestStatusReport from "./pages/unAuth/reports/requeststatus";
import ManageWorkDuration from "./pages/unAuth/rosterSettings/ManageWorkDuration";
import ManageWorkPlan from "./pages/unAuth/rosterSettings/manageWorkPlan/Index";
import { updateState } from "./redux/commonSlice";
import { ActiveSessionProvider } from "active-session-library";
import ManagerDashboard from "./pages/unAuth/staff/managerdashboard/Index";
import ManageWorkRotation from "./pages/unAuth/rosterSettings/ManageWorkRotation";
import SplitShift from "./pages/unAuth/rosterSettings/SplitShift";
import UserControl from "./pages/unAuth/acessControl/UserControl";
import ManageAccessRole from "./pages/unAuth/acessControl/ManageAccessRole";
import ManageSchedulerProfile from "./pages/unAuth/acessControl/ManageSchedulerProfile";
import ProductivityDashboard from "./pages/unAuth/staff/productivity_dashboard/Index";
import UserPreferences from "./pages/unAuth/SelfServices/UserPreferences";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "./redux/commonSlice";
import VacationRules from "./pages/unAuth/SelfServices/VacationRules";
import DemandTemplates from "./pages/unAuth/rosterRules/Index";
import IndexMT from "./pages/unAuth/manageteam/IndexMT";
import IndexPR from "./pages/unAuth/staff/payroll/IndexPR";
import { CustomSnackbar } from "./components/CustomSnackbar";
import skipLogin from "./redux/skipLogin";
import ValidatePopup from "./pages/unAuth/roaster/spotroster/ValidatePopup";
import { useState } from "react";

const AppName = "Evosys - Smart Scheduling";

const getRoutesForUser = () => {
  return (
    <>
      <Route path="/dashboard" element={<Dashboard title={"Dashboard"} />} />
      <Route path="/team" element={<Team title={"Team"} />} />
      <Route
        path="/agencytimesheet"
        element={<AgencyTimesheet title={"Agency Timesheet"} />}
      />
      <Route
        path="/timesheetsubmission"
        element={<TimesheetSubmission title={"Timesheet Submission"} />}
      />
      <Route path="/roster" element={<SpotRoaster title={"Rosters"} />} />
      <Route
        path="/manageworkduration"
        element={<ManageWorkDuration title={"Manage Work Duration"} />}
      />
      <Route
        path="/manageworkplan"
        element={<ManageWorkPlan title={"Manage Work Plans"} />}
      />
      <Route
        path="/managerdashboard"
        element={<ManagerDashboard title={"Manager Dashboard"} />}
      />
      <Route
        path="/manageworkrotation"
        element={<ManageWorkRotation title={"Manage Work Rotations"} />}
      />
      <Route
        path="/DemandTemplates"
        element={<DemandTemplates title={"Demand Templates"} />}
      />
      <Route path="/manageteam" element={<IndexMT title={"Manage Team"} />} />
      <Route path="/payroll" element={<IndexPR title={"Payroll Audit"} />} />
      <Route
        path="/timesheetreport"
        element={<TimesheetReport title={"Timesheet Report"} />}
      />
      <Route
        path="/employeetimesheetreport"
        element={
          <EmployeeTimesheetReport title={"Employee Timesheet Report"} />
        }
      />
      <Route
        path="/requeststatusreport"
        element={<RequestStatusReport title={"Request Status Report"} />}
      />
      <Route
        path="/rosterdetailreport"
        element={<RosterDetailReport title={"Roster Detail Report"} />}
      />
      <Route
        path="/splitshift"
        element={<SplitShift title={"Split Shift"} />}
      />
      <Route
        path="/usercontrol"
        element={<UserControl title={"User Control"} />}
      />
      <Route
        path="/manageaccessrole"
        element={<ManageAccessRole title={"Manage Access Role"} />}
      />
      <Route
        path="/manageschedulerprofile"
        element={<ManageSchedulerProfile title={"Manage Scheduler Profile"} />}
      />
      <Route
        path="/productivityDashboard"
        element={<ProductivityDashboard title={"Productivity Dashboard"} />}
      />
      <Route
        path="/userpreferences"
        element={<UserPreferences title={"User Preferences"} />}
      />
      <Route
        path="/vacationrules"
        element={<VacationRules title={"Vacation Rules"} />}
      />
    </>
  );
};

const App = () => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snakeBarProps, setSnakeBarProps] = useState({});

  const logout = () => {
    dispatch(resetState());
    navigate("/", { replace: true });
  };

  const setSnake = () => {
    setSnakeBarProps({
      snackbarFlag: true,
      msz: "User Logged out due to Inactivity!",
      type: "error",
      onClosed: logout,
    });
  };

  return (
    <>
      {commonReducer.access_token ? (
        <>
          {/* <ActiveSessionProvider
            timeout={100000}
            events={["click", "mousemove", "keydown", "scroll", "drag"]}
            postAction={setSnake}
          ></ActiveSessionProvider> */}
          <Routes>
            <Route path="*" element={<Navigate to="/dashboard" />} />
            {getRoutesForUser()}
          </Routes>
          {/* {Object.keys(snakeBarProps).length > 0 && (
            <CustomSnackbar
              {...snakeBarProps}
              setSnakeBarProps={setSnakeBarProps}
            />
          )} */}
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<LoginPage title={AppName} />} />
        </Routes>
      )}
    </>
  );
};

export default App;
