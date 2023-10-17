import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MainPage } from "../../../layout/MainPage";
import { EmployeeFilterModal } from "../shared/filters/EmployeeFilterModal";
import { EmployeeTable } from "./EmployeeTable";
import { SelectProfileCard } from "./SelectProfileCard";

export const TimesheetSubmission = (props) => {
  const employeeFilterHeader = ["Employee Number", "Employee"];

  const [projectDetailObj, setprojectDetailObj] = useState({});
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [oriPagedata, setOriPagedata] = useState([]);
  const [pagedata, setPagedata] = useState([]);
  const [headerArr, setHeaderArr] = useState([]);
  const [appStatus, setAppStatus] = useState("");
  const [employeeupdateData, setEmployeeupdateData] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    if (employeeupdateData.length > 0) {
      var localArr = oriPagedata?.filter((item) =>
        employeeupdateData.includes(item.employeeNumber)
      );
      setPagedata(localArr);
    } else {
      setPagedata([...oriPagedata]);
    }
  }, [employeeupdateData, oriPagedata]);
 

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
        employeeupdateData={employeeupdateData}
        setEmployeeupdateData={setEmployeeupdateData}
        setEmployeeFilter={setEmployeeFilter}
        employeeFilter={employeeFilter}
        headerArr={headerArr}
        setHeaderArr={setHeaderArr}
      />

      <EmployeeTable
        setPagedata={setPagedata}
        setOriPagedata={setOriPagedata}
        pagedata={pagedata}
        appStatus={appStatus}
        isLoading={isLoading}
        handleLoading={setLoading}
        headerArr={headerArr}
        setHeaderArr={setHeaderArr}

      />

      {employeeFilter && (
        <EmployeeFilterModal
          togglerhandler={setEmployeeFilter}
          oriPagedata={oriPagedata}
          employeeupdateData={employeeupdateData}
          setEmployeeupdateData={setEmployeeupdateData}
          employeeNameMappedKey="fullName"
          employeeIdMappedKey="employeeNumber"
          type="Employee"
          employeeFilterHeader={employeeFilterHeader}
        />
      )}
    </MainPage>
  );
};

