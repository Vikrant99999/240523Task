import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { productivityData } from "../../../../services/api";
import { dateConverterForProductivity } from "../../../../utils/commonService";
import { MainPage } from "../../../layout/MainPage";
import ProdTable from "./ProdTable";
import ProductivityChart from "./ProductivityChart";
import { SelectProfileCard } from "./SelectProfileCard";
import SummaryData from "./SummaryData";

const ProductivityDashboard = (props) => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);

  const [TableData, setTabledata] = useState([]);
  const [SummaryTitle, setSummaryTitle] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  const { mutate: dataMutate, isLoading: isLoadProdData } = useMutation(
    productivityData,
    {
      onSuccess: (data, context, variables) =>
        onSuccess(data, context, variables),
      onError: (data, context, variables) => onError(data, context, variables),
    }
  );

  const onSuccess = (data, context, variables) => {
    const summaryTitle = [];
    const weekTitle = [];
    if (commonReducer.dateRangeType === "weeks") {
      for (let i = 0; i < 3; i++) {
        weekTitle.push(
          `${moment(commonReducer.startDate, "DD-MM-YYYY")
            .add(i, "w")
            .format("DD MMM")} - 
         ${moment(commonReducer.endDate, "DD-MM-YYYY")
           .add(i, "w")
           .format("DD MMM")}`
        );
      }
    } else {
      for (let i = 0; i < 3; i++) {
        weekTitle.push(
          `${moment(commonReducer.startDate, "DD-MM-YYYY")
            .add(i, "M")
            .format("DD MMM")} - 
         ${moment(commonReducer.endDate, "DD-MM-YYYY")
           .add(i, "M")
           .endOf("month")
           .format("DD MMM")}`
        );
      }
    }

    const newData = data?.data?.map((item, index) => {
      // setDepartmentName(item?.departmentName);
      // setJobTitle(item?.jobTitle);
      const rowsTitle = [];

      const weekData = [];
      for (let i = 1; i <= 3; i++) {
        let p = "p" + i;
        let string = item[p];
        if (string == null) {
          weekData.push([]);
          continue;
        }
        let splitString = string
          .split(",")
          .map((stringItem) => {
            const [departmentName, roleName, hoursType, hoursNumber] =
              stringItem.split("~");

            if (!rowsTitle.includes(hoursType)) {
              rowsTitle.push(hoursType);
            }

            if (!summaryTitle.includes(hoursType)) {
              summaryTitle.push(hoursType);
            }

            return {
              departmentName,
              roleName,
              [hoursType]: parseFloat(hoursNumber),
            };
          })
          .reduce((acc, item) => {
            const { departmentName, roleName, ...hours } = item;
            const existingItem = acc.find(
              (i) =>
                i.departmentName === departmentName && i.roleName === roleName
            );
            if (existingItem) {
              Object.keys(hours).forEach((key) => {
                existingItem[key] = (existingItem[key] || 0) + hours[key];
              });
            } else {
              acc.push(item);
            }
            return acc;
          }, []);
        weekData.push(splitString);
      }

      const finalData = [];
      weekData.forEach((item, index) => {
        item.forEach((i, ind) => {
          const { departmentName, roleName, ...rest } = i;
          let search = finalData.findIndex(
            (row) =>
              row.departmentName === departmentName && row.roleName === roleName
          );
          if (search !== -1) {
            finalData[search].weeklyData[index] = {
              ...finalData[search].weeklyData[index],
              ...rest,
            };
          } else {
            let obj = {
              departmentName,
              roleName,
            };
            obj.weeklyData = [];
            for (let i = 0; i <= 2; i++) {
              obj.weeklyData.push(weekTitle[i]);
              if (index === i) {
                obj.weeklyData[i] = {
                  ...obj.weeklyData[i],
                  ...rest,
                };
              }
            }
            finalData.push(obj);
          }
        });
      });

      const { p1, p2, p3, ...rest } = item;
      return {
        ...rest,
        data: finalData,
        weekTitle,
        rowsTitle,
      };
    });
    const index = newData.findIndex((o) => o.userId === commonReducer.userId);
    if (index !== -1) {
      const filteredData = newData.filter(
        (item) => item.userId !== commonReducer.userId
      );
      filteredData.unshift(newData[index]);
      setTabledata(filteredData);
      setDashboardData(filteredData);
      setSummaryTitle(summaryTitle);
    }
  };
  const onError = (data, context, variables) => {};

  useEffect(() => {
    dataMutate({
      userId: commonReducer.userId,
      startDate: dateConverterForProductivity(commonReducer.startDate),
      effectiveDate: dateConverterForProductivity(commonReducer.startDate),
      endDate: dateConverterForProductivity(commonReducer.endDate),
      profileId: isLineManager
        ? "null"
        : commonReducer.selectedProjectObjTeam.profileId,
      viewedBy: isLineManager ? "LM" : "TK",
      dateRangeType: commonReducer.dateRangeType === "weeks" ? "W" : null,
    });
  }, [
    dataMutate,
    commonReducer.startDate,
    commonReducer.endDate,
    //commonReducer.dateRangeType,
    commonReducer.userId,
    isLineManager,
    commonReducer.employeeId,
    commonReducer.selectedProjectObjTeam.profileId,
  ]);

  return (
    <MainPage pageName={props.title} isLoading={isLoadProdData}>
      <SelectProfileCard
        dashboardData={dashboardData}
        setTabledata={setTabledata}
      />

      <ProductivityChart
        dashboardData={dashboardData}
        setTabledata={setTabledata}
      />

      <SummaryData tableData={TableData} summaryTitles={SummaryTitle} />

      <ProdTable dashboardData={TableData} />
    </MainPage>
  );
};

export default ProductivityDashboard;
