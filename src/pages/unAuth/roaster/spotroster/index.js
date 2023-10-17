import React, { useState } from "react";
import { MainPage } from "../../../layout/MainPage";
import RoasterFilterbtns from "./RoasterFilterbtns";
import RoasterPersonDetailTable from "./RoasterPersonDetailTable";
import SelectRoasterProfile from "./SelectRoasterProfile";

export const SpotRoaster = (props) => {
  const filterByViewBy = [
    { id: 1, label: "Employee", value: "Employee" },
    { id: 2, label: "Department", value: "Department" },
    { id: 3, label: "Job Title", value: "Job Title" },
    { id: 3, label: "Work Location", value: "Work Location" },
    { id: 4, label: "Shift Time", value: "Shift Time" },
  ];
  const [viewBy, setViewBy] = useState(filterByViewBy[0]);

  const [oriPagedata, setOriPagedata] = useState({});
  const [pagedata, setPagedata] = useState();
  const [employeeupdateData, setEmployeeupdateData] = useState([]);
  const [apprvStatus, setApprvStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = React.useState([]);
  const [changeDelete, setChangeDelete] = useState(0);

  return (
    <MainPage pageName={props.title} isLoading={isLoading}>
      <SelectRoasterProfile
        oriPagedata={oriPagedata}
        employeeupdateData={employeeupdateData}
        setEmployeeupdateData={setEmployeeupdateData}
        setViewBy={setViewBy}
        viewBy={viewBy}
        filterByViewBy={filterByViewBy}
        checked={checked}
        setChangeDelete={setChangeDelete}
        changeDelete={changeDelete}
      />

      <RoasterFilterbtns />

      <RoasterPersonDetailTable
        pagedata={pagedata}
        setPagedata={setPagedata}
        oriPagedata={oriPagedata}
        setOriPagedata={setOriPagedata}
        apprvStatus={apprvStatus}
        viewBy={viewBy}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        checked={checked}
        setChecked={setChecked}
        changeDelete={changeDelete}
        setApprvStatus={setApprvStatus}
      />
    </MainPage>
  );
};
