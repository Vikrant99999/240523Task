import { apiConstant } from "./apiConstants";
import { manageUser } from "./gatewatProxy";
import { Request } from "./service";

export const loginUser = (params) => {
  return Request(apiConstant.login, "Post", params, false, {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  });
};
export const projectList = (params) => {
  return Request(apiConstant.projectList, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const productivityData = (params) => {
  return Request(apiConstant.productivityData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const dashboardList = (params) => {
  return Request(apiConstant.dashboardList, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const getDetailById = (params) => {
  return Request(apiConstant.timehseetById, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const payrollTtimehseetById = (params) => {
  return Request(apiConstant.payrollTtimehseetById, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const savePersonTimesheet = (params) => {
  return Request(apiConstant.savePersonTimesheet, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const saveRosterProfile = (params) => {
  return Request(apiConstant.saveRosterProfile, "Put", params, false, {
    "Content-Type": "application/json",
  });
};

export const deletePersonTimesheet = (params) => {
  return Request(apiConstant.deletePersonTimesheet, "Delete", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllProject = (params) => {
  return Request(apiConstant.getAllProject, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllTask = (params) => {
  return Request(apiConstant.getAllTask, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getAllExpenditure = (params) => {
  return Request(apiConstant.getAllExpenditure, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getTeamList = (params) => {
  return Request(apiConstant.getTeamList, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const getprofileist = (params) => {
  return Request(
    `${apiConstant.getprofileist}/${params.userId}`,
    "get",
    {},
    false,
    { "Content-Type": "application/json" }
  );
};

export const getRequestList = (params) => {
  return Request(apiConstant.getRequestList, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getRequestTypeList = (params) => {
  return Request(apiConstant.getRequestTypeList, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getResionList = (params) => {
  return Request(apiConstant.getResionList, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const createRequestData = (params) => {
  return Request(apiConstant.createRequestData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const submitPersonTimesheet = (params) => {
  return Request(apiConstant.submitPersonTimesheet, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const getSourceRoaster = (params) => {
  return Request(apiConstant.getSourceRoaster, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getDestinationRoster = (params) => {
  return Request(apiConstant.getDestinationRoster, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getRequestDetails = (params) => {
  return Request(apiConstant.getRequestDetails, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const approveHistoryDetails = (params) => {
  return Request(apiConstant.approveHistoryDetails, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getDepartments = (params) => {
  return Request(apiConstant.getDepartments, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getPayCodes = (params) => {
  return Request(apiConstant.getPayCodes, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getJobs = (params) => {
  return Request(apiConstant.getJobs, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getJobsData = (params) => {
  return Request(apiConstant.getJobs, "get", params, false, {
    "Content-Type": "application/json",
  }).then((res) => res.data.data);
};

export const getallroasterdata = (params) => {
  return Request(apiConstant.getallRoasterProfileData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getallemployeedata = (params) => {
  return Request(
    apiConstant.getallRoasterEmpDetailTableData,
    "Post",
    params,
    false,
    { "Content-Type": "application/json" }
  );
};

export const workDuration = (params) => {
  return Request(apiConstant.getWorkDurationData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getallStaffData = (params) => {
  return Request(apiConstant.getAddStaffData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const workLocation = (params) => {
  return Request(apiConstant.getWorkLocationList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const onCall = (params) => {
  return Request(apiConstant.getOnCallLovList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Emergency = (params) => {
  return Request(apiConstant.getEmergencyList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Option1 = (params) => {
  return Request(apiConstant.postOption, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const Department = (params) => {
  return Request(apiConstant.getDepartMentList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const GetAllTimesheetMaster = (params) => {
  return Request(apiConstant.allTimesheetMaster, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const JobTitle = (params) => {
  return Request(apiConstant.getJobTitleList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const DutyManager = (params) => {
  return Request(apiConstant.getDutyManagerList, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const Option2 = (params) => {
  return Request(apiConstant.postOption2, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const DeleteRosterProfile = (params) => {
  return Request(apiConstant.DeleteRoster, "Delete", params, false, {
    "Content-Type": "application/json",
  });
};
export const GetSingleShift = (params) => {
  // window.alert(params)
  return Request(
    apiConstant.getUpdateSingleShift +
      "/" +
      params.loginUserId +
      "/" +
      params.personRosterPivoteId +
      "/" +
      params.personRosterId,
    "get",
    {},
    false,
    { "Content-Type": "application/json" }
  );
};

export const WorkDurationSummaryData = (params) => {
  return Request(apiConstant.getSummaryData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const WorkDurationCategory = (params) => {
  return Request(apiConstant.getWorkDurationCategory, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const BussinessUnitData = (params) => {
  return Request(apiConstant.getBussinessUnitData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const LegalEntityData = (params) => {
  return Request(apiConstant.getLegalEntityData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const DepartmentLovData = (params) => {
  return Request(apiConstant.getDepartmentLov, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetWorkDurationDetail = (params) => {
  // window.alert(params)
  return Request(
    apiConstant.getDetailData + "/" + params.workDurationId,
    "get",
    {},
    false,
    { "Content-Type": "application/json" }
  );
};

export const DeleteWorkDuration = (params) => {
  // window.alert(params)
  return Request(
    apiConstant.DeleteWorkDurationData + "/" + params.workDurationId,
    "Delete",
    {},
    false,
    { "Content-Type": "application/json" }
  );
};

export const CreateWorkDuration = (params) => {
  return Request(apiConstant.createWorkDuration, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const GetWorkDurationCriteriaDetail = (params) => {
  // window.alert(params)

  return Request(
    apiConstant.getCriteriaDetail + "/" + params.workDurationId,

    "get",

    {},

    false,

    { "Content-Type": "application/json" }
  );
};

export const GetDemandTemplate = (params) => {
  return Request(apiConstant.getDemandTemplats, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetDemandId = (params) => {
  return Request(
    apiConstant.getDemandId + "/" + params.demandId,
    "get",
    params,
    false,
    { "Content-Type": "application/json" }
  );
};

export const getEmployeeSuggestions = (params) => {
  return Request(apiConstant.getEmployeeSuggestions, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const CreateEmployeeSuggestions = (params) => {
  return Request(apiConstant.createEmployeeSuggestions, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const GenerateRotaShifts = (params) => {
  return Request(apiConstant.generateRotaShifts, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const CreateFlexRota = (params) => {
  return Request(apiConstant.createFlexRota, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetWorkRotation = (params) => {
  return Request(
    apiConstant.getworkRotation + "/" + params.userId,
    "get",
    false,
    { "Content-Type": "application/json" }
  );
};

export const GetWorkRotationDet = (params) => {
  return Request(
    apiConstant.getWorkRotationDet + "/" + params.workRotationId,
    "get",
    false,
    { "Content-Type": "application/json" }
  );
};
export const getWorkPlan = (params) => {
  return Request(apiConstant.getWorkPlanDetail, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getDemandbyTempID = (params) => {
  return Request(apiConstant.getDemandTempDetail, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const createWorkPlan = (params) => {
  return Request(apiConstant.postWorkPlan, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const updateWorkPlan = (params) => {
  return Request(apiConstant.updateWorkPlan, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const deleteworkPlan = (id, params) => {
  return Request(
    `${apiConstant.deleteWorkPlanDetail}/${id}`,
    "Delete",
    params,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getWorkRotataion = (params) => {
  return Request(apiConstant.getWorkRotationData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getWorkRotataionById = (params) => {
  return Request(
    apiConstant.getWorkRotationDataById + "/" + params.workRotationId,
    "get",
    params,
    {
      "Content-Type": "application/json",
    }
  );
};
export const createWorkRotation = (params) => {
  return Request(apiConstant.createWorkRotationData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const updateWorkRotation = (params) => {
  return Request(apiConstant.updateWorkRotationData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const deleteworkRotation = (id, params) => {
  return Request(
    `${apiConstant.deleteWorkRotationData}/${id}`,
    "Delete",
    params,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getSplitShiftdata = (params) => {
  return Request(apiConstant.getSplitShiftTableData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getSplitSelectShift = (params) => {
  return Request(apiConstant.getSplitShiftSelectData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetSplitShiftData = (id, params) => {
  return Request(`${apiConstant.getSplitSelectData}/${id}`, "get", params, {
    "Content-Type": "application/json",
  });
};
export const CreateSplitShift = (params) => {
  return Request(apiConstant.createSplitShiftData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const UpdateSplitShift = (params) => {
  return Request(apiConstant.UpdateSplitShiftData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const deleteSplitShift = (id, params) => {
  return Request(
    `${apiConstant.deleteSplitShiftData}/${id}`,
    "Delete",
    params,
    {
      "Content-Type": "application/json",
    }
  );
};

export const getSplitShiftById = (params) => {
  return Request(
    apiConstant.getSplitShiftTableDatabyId + "/" + params.spliShiftId,
    "get",
    params,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getManageTeamData = (params) => {
  return Request(apiConstant.getManageTeamTableData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getManageTeamDataById = (params) => {
  return Request(
    apiConstant.getManageTeamTableDataById + "/" + params.teamId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getValueFromListData = (params) => {
  return Request(
    apiConstant.getMangeTeamOpenFromValueList,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const createManageTeam = (params) => {
  return Request(apiConstant.createTeam, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const updateManageTeam = (params) => {
  return Request(apiConstant.updateTeam, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const getTeamTableData = (params) => {
  return Request(
    apiConstant.manageTeamMemberTableData + "/" + params.userId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const createManageTeamMember = (params) => {
  return Request(apiConstant.createTeamMember, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const deleteTeamById = (id, params) => {
  return Request(`${apiConstant.deleteTeam}/${id}`, "Delete", params, {
    "Content-Type": "application/json",
  });
};
export const PersonRosterDataWithDate = (params) => {
  return Request(
    apiConstant.personRosterDataWithDate,
    "Delete",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getDemandTemp = (params) => {
  return Request(
    apiConstant.getDemandTempData + "/" + params.userId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getDemandTemplateById = (params) => {
  return Request(
    apiConstant.getDemandTempDataById + "/" + params.id,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getCitizen = (params) => {
  return Request(apiConstant.getCitizenShipData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getSkill = (params) => {
  return Request(apiConstant.getSkillData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const createDemandTemplate = (params) => {
  return Request(apiConstant.createDemandTempData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const updateDemandTemplate = (params) => {
  return Request(apiConstant.updateDemandTempData, "Post", params, false, {
    "Content-Type": "application/json",
  });
};
export const getProfileById = (params) => {
  return Request(
    apiConstant.getallProfileData + "/" + params.userId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getDepartmentById = (params) => {
  return Request(
    apiConstant.getDepartMentData +
      "/" +
      params.userId +
      "/ " +
      params.profileId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getJobTitleById = (params) => {
  // window.alert(
  //   "/" + params.userId + "/ " + params.name + "/" + params.departmentId
  // );
  var addUrl =
    "/" + params.userId + "/" + params.name + "/" + params.departmentId;
  return Request(apiConstant.getJobTitleData + addUrl, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getJobTitleByProfileId = (params) => {
  // window.alert(
  //   "/" + params.userId + "/ " + params.name + "/" + params.departmentId
  // );
  var addUrl = "/" + params.userId + "/" + params.name + "/" + params.profileId;
  return Request(apiConstant.getJobTitleData + addUrl, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getWorkLocationById = (params) => {
  return Request(
    apiConstant.getWorkLocationData +
      "/" +
      params.userId +
      "/ " +
      params.profileId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};

export const ValidateRoster = (params) => {
  return Request(apiConstant.validateRoster, "Post", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetMonth = (params) => {
  return Request(apiConstant.getMonthdata, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetCostCenter = (params) => {
  return Request(apiConstant.getCostCenterView, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetPersonView = (params) => {
  return Request(apiConstant.getPersonView, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const GetEmployeeDetail = (params) => {
  return Request(
    apiConstant.getEmployeeDetail + "/" + params.personId,
    "get",
    false,
    {
      "Content-Type": "application/json",
    }
  );
};

export const timeZone = (params) => {
  return Request(apiConstant.getTimeZoneData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const payrollAudit = (params) => {
  return Request(apiConstant.payrollAudit, "post", params, false, {
    "Content-Type": "application/json",
  });
};
export const needCorrection = (params) => {
  return Request(apiConstant.needCorrection, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const submitPayrollAudit = (params) => {
  return Request(apiConstant.submitPayrollAudit, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const submitReadyForPayroll = (params) => {
  return Request(apiConstant.submitReadyForPayroll, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const history = (params) => {
  return Request(apiConstant.history, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const getLineData = (params) => {
  return Request(apiConstant.lineData, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const saveViewData = (params) => {
  return Request(apiConstant.viewSave, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const createRule = (params) => {
  return Request(apiConstant.createVactionRule, "post", params, false, {
    "Content-Type": "application/json",
  });
};
export const updateRule = (params) => {
  return Request(apiConstant.updateVacationRule, "post", params, false, {
    "Content-Type": "application/json",
  });
};
export const taskData = (params) => {
  return Request(apiConstant.taskData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const EmployeeVacatioRuleData = (params) => {
  return Request(apiConstant.userData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const SearchEmployeeData = (params) => {
  return Request(apiConstant.searchUser, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const VacatioRuleData = (params) => {
  return Request(
    apiConstant.vacationRule + "/" + params.userId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const AddAccessModal = (params) => {
  return Request(apiConstant.searchUser, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const manageAccessRoleGetData = (params) => {
  return Request(apiConstant.manageAccessRoleGet, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getTaskGroup = (params) => {
  console.log(params);
  return Request(
    apiConstant.taskGroupGet + "/" + params.id,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};

export const getTaskGroupDetails = (params) => {
  return Request(apiConstant.taskGroupGet, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const userList = (params) => {
  // window.alert(params)
  return Request(apiConstant.userList + "/" + params.id, "get", {}, false, {
    "Content-Type": "application/json",
  });
};

export const saveUserRole = (params) => {
  return Request(apiConstant.saveUserRole, "post", params, false, {
    "Content-Type": "application/json",
  });
};

export const deleteRole = (params) => {
  return Request(
    apiConstant.deleteRole + "/" + params.id,
    "delete",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
// Manage User
export const getScheduleProfileData = (params) => {
  return Request(apiConstant.getScheduleProfileData, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getScheduleEmpData = (params) => {
  return Request(
    apiConstant.getScheduleEmpData + "/" + params.profileId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getScheduleUserData = (params) => {
  return Request(
    apiConstant.getScheduleUserData + "/" + params.profileId,
    "get",
    params,
    false,
    {
      "Content-Type": "application/json",
    }
  );
};
export const getProfileCriteria = (params) => {
  return Request(apiConstant.getProfileCriteria, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getScheduleJobTitle = (params) => {
  return Request(apiConstant.getScheduleJobTitle, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getScheduleJobFamily = (params) => {
  return Request(apiConstant.getScheduleJobFamily, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getEmployeeCategoryData = (params) => {
  return Request(apiConstant.getEmployeeCatogery, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getDepartmentData = (params) => {
  return Request(apiConstant.getDepartmentDetail, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getSubDepartmentData = (params) => {
  return Request(apiConstant.getSubDepartmentDetail, "get", params, false, {
    "Content-Type": "application/json",
  });
};

export const getPayrollData = (params) => {
  return Request(apiConstant.getPayrollDetails, "get", params, false, {
    "Content-Type": "application/json",
  });
};
export const getReligionData = (params) => {
  return Request(apiConstant.getReligionDetails, "get", params, false, {
    "Content-Type": "application/json",
  });
};

// export const resetPassword = (params) => {
//     return Request(`${apiConstant.reset_password}?reset_password_token=${params.token}`, 'Post', params.params, true);
// }

// export const updateEmployee = (params) => {
//     return Request(`${apiConstant.employees}/${params.id}`, 'Put', params.params, true)
// }

// export const deleteDepartmentInConfigrution = (id) => commonDeleteService(id, 'departmentInConf');

// http://114.79.159.250:9003/manage/scheduler/profile/api/get/user/profile/details -- MANAGE SCHEDULE
