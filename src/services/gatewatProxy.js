import ip from "./ip";

const buildServiceUrl = (port, endpoint) => {
  return `http://${ip}:${port}/ews/${endpoint}/`;
};
const buildServiceUrl1 = (port, endpoint) => {
  return `http://${ip}:${port}/${endpoint}/`;
};
const loginServiceUrl = (port) => {
  return `http://4.193.33.154:${port}/`;
};
const manageDash = (port) => {
  return `http://${ip}:${port}/ews/dashboard/`;
};
// const loginDasboardService = loginServiceUrl(9009);
const loginDasboardService = buildServiceUrl(9090, "timesubmission");

const rosterService = buildServiceUrl(9091, "roster");
const teamsService = buildServiceUrl(9092, "teams");
const rosterSettingService = buildServiceUrl(
  9096,
  "rosters-setting/v1/manage-work-duration"
);
const timesheetsService = buildServiceUrl(9099, "timesubmission");
const rosterSettingWorkPlanService = buildServiceUrl(
  9096,
  "rosters-setting/v1/manage-work-plans"
);
const demandTemplateDetailbyId = buildServiceUrl(
  9096,
  "rosters-setting/v1/demandTemplate"
);
const rosterSettingWorkRotationService = buildServiceUrl(
  9096,
  "rosters-setting/v1/workrotation"
);
const rosterSettingSplitShiftService = buildServiceUrl(
  9096,
  "rosters-setting/v1/splitShift"
);
const rosterSettingDemandTemplateService = buildServiceUrl(
  9096,
  "rosters-setting/v1/demandTemplate"
);
const ManageSchedulerProfile = buildServiceUrl1(
  9003,
  "manage/scheduler/profile/api"
);
const selfService = buildServiceUrl(9093, "selfservice");
const manageTeamService = "http://152.67.4.57:9010/ews/roster/teams/";
const managerDashboard = manageDash(9098);
const accessControl = buildServiceUrl1(9001, "manage/access/role");

const productivityDashboard = manageDash(9098);
//  "http://114.79.159.250:9098/ews/dashboard/dashboard/project/employee/productivity/data"

const payrollAudit =
  "http://114.79.159.250:9020/ews/payrollAudit/payroll/audit/data";
const needCorrection =
  "http://114.79.159.250:9020/ews/payrollAudit/rmi/list/data";

const submitPayrollAudit =
  "http://114.79.159.250:9020/ews/payrollAudit/submit/pay/audit/data";
const submitReadyForPayroll =
  "http://114.79.159.250:9020/ews/payrollAudit/action/pay/audit/data";
const lineData = "http://114.79.159.250:9020/ews/payrollAudit/get/linedata";
const history =
  "http://114.79.159.250:9020/ews/payrollAudit/approval/history/data";
const viewSave =
  "http://114.79.159.250:9020/ews/payrollAudit/save/payroll/audit/data";

export {
  loginDasboardService,
  rosterService,
  teamsService,
  rosterSettingService,
  managerDashboard,
  rosterSettingDemandTemplateService,
  timesheetsService,
  rosterSettingWorkPlanService,
  demandTemplateDetailbyId,
  rosterSettingWorkRotationService,
  rosterSettingSplitShiftService,
  manageTeamService,
  productivityDashboard,
  selfService,
  payrollAudit,
  submitPayrollAudit,
  lineData,
  history,
  viewSave,
  needCorrection,
  submitReadyForPayroll,
  accessControl,
  ManageSchedulerProfile,
};
