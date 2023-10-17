import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { CustomSnackbar } from "../../../../components/CustomSnackbar";
import { uniqueArrByKey } from "../../../contants";
import { MainPage } from "../../../layout/MainPage";
import { DepartmentFilterModal } from "../shared/filters/DepartmentFilterModal";
import { EmployeeFilterModal } from "../shared/filters/EmployeeFilterModal";
import { JobfilterModal } from "../shared/filters/JobfilterModal";
import { EmployeeTable } from "./EmployeeTable";
import { RequestDetailsModal } from "./RequestDetailsModal";
import { SelectProfileCard } from "./SelectProfileCard";

export const Team = (props) => {
  const employeeFilterHeader = ["Employee Number", "Employee"];

  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [employeeFilter, setEmployeeFilter] = useState(false);
  const [employeeToggle, setEmployeeToggle] = useState(false);
  const [employeeFilterData, setEmployeeFilterData] = useState([]);
  const [departmentFilter, setDepaertmentFilter] = useState(false);
  const [departmentToggle, setDepartmentToggle] = useState(false);
  const [departmentFilterData, setDepartmentFilterData] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState(false);
  const [jobTypeToggle, setJobTypeToggle] = useState(false);
  const [jobTypeFilterData, setJobTypeFilterData] = useState([]);
  const [requsetFilter, setRequsetFilter] = useState(false);
  const [TableData, setTabledata] = useState([]);
  const [oriPagedata, setOriPagedata] = useState([]);
  const [pagedata, setPagedata] = useState([]);

  const [filterPopUpType, setFilterPopUpType] = useState("");
  const [projectDetailObj, setprojectDetailObj] = useState({});
  const [appStatus, setAppStatus] = useState("");
  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let filteredData = [...oriPagedata];

    if (employeeFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        employeeFilterData.includes(item["employeeNumber"])
      );
    }

    if (departmentFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        departmentFilterData.includes(item["departmentName"])
      );
    }

    if (jobTypeFilterData?.length > 0) {
      filteredData = filteredData?.filter((item) =>
        jobTypeFilterData.includes(item["jobTitle"])
      );
    }
 
    setTabledata(filteredData);
  }, [
    employeeFilterData,
    departmentFilterData,
    jobTypeFilterData,
    oriPagedata,
  ]);

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <SelectProfileCard
        setprojectDetailObj={setprojectDetailObj}
        projectDetailObj={projectDetailObj}
        setStartDateRange={setStartDateRange}
        startDateRange={startDateRange}
        setEndDateRange={setEndDateRange}
        endDateRange={endDateRange}
        pagedata={pagedata}
        setAppStatus={setAppStatus}
        oriPagedata={oriPagedata}
        tableData={TableData}
        employeeFilterData={employeeFilterData}
        setEmployeeFilterData={setEmployeeFilterData}
        setEmployeeFilter={setEmployeeFilter}
        employeeFilter={employeeFilter}
        setEmployeeToggle={setEmployeeToggle}
        departmentFilterData={departmentFilterData}
        setDepartmentFilterData={setDepartmentFilterData}
        setDepaertmentFilter={setDepaertmentFilter}
        setDepartmentToggle={setDepartmentToggle}
        departmentFilter={departmentFilter}
        jobTypeFilterData={jobTypeFilterData}
        setJobTypeFilterData={setJobTypeFilterData}
        setJobTypeFilter={setJobTypeFilter}
        setJobTypeToggle={setJobTypeToggle}
        jobTypeFilter={jobTypeFilter}
        setFilterPopUpType={setFilterPopUpType}
        setTabledata={setTabledata}
      />

      <EmployeeTable
        setPagedata={setPagedata}
        setOriPagedata={setOriPagedata}
        oriPagedata={oriPagedata}
        pagedata={pagedata}
        appStatus={appStatus}
        filterData={TableData}
        setSnakeBarProps={setSnakeBarProps}
        setIsLoading={setIsLoading}
      />

      {employeeToggle && (
        <EmployeeFilterModal
          togglerhandler={setEmployeeToggle}
          {...props}
          setEmployeeupdateData={setEmployeeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "employeeNumber")}
          employeeupdateData={employeeFilterData}
          type="Employee"
          employeeNameMappedKey="personName"
          employeeIdMappedKey="employeeNumber"
          employeeFilterHeader={employeeFilterHeader}
          setEmployeeFilter={setEmployeeFilter}
        />
      )}
      {departmentToggle && (
        <DepartmentFilterModal
          togglerhandler={setDepartmentToggle}
          {...props}
          setEmployeeupdateData={setDepartmentFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "departmentId")}
          employeeupdateData={departmentFilterData}
          setDepaertmentFilter={setDepaertmentFilter}
        />
      )}
      {jobTypeToggle && (
        <JobfilterModal
          togglerhandler={setJobTypeToggle}
          {...props}
          setEmployeeupdateData={setJobTypeFilterData}
          oriPagedata={uniqueArrByKey(oriPagedata, "jobTitleId")}
          employeeupdateData={jobTypeFilterData}
          setJobTypeFilter={setJobTypeFilter}
        />
      )}
      {requsetFilter && (
        <RequestDetailsModal {...props} togglerhandler={setRequsetFilter} />
      )}
      {Object.keys(snakeBarProps).length > 0 && (
        <CustomSnackbar
          {...snakeBarProps}
          setSnakeBarProps={setSnakeBarProps}
        />
      )}
    </MainPage>
  );
};
