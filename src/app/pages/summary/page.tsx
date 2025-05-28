"use client";

import CircleProgressBar from "@/app/components/CircleProgressBar";
import NavLeft from "@/app/components/NavLeft";
import NavRight from "@/app/components/NavRight";
import TempComponent from "@/app/components/TempComponent";
import { useEffect, useState } from "react";
import { useImageApi } from "@/app/hooks/ImageApiContext";

export default function SummaryPage() {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const { demographics, loading } = useImageApi();
  const [highlightedItemKey, setHighlightedItemKey] = useState<string | null>(
    null
  );

  const [activeDemoCat, setActiveDemoCat] = useState<"race" | "age" | "sex">(
    "race"
  );
  const [selectedRaceDetails, setSelectedRaceDetails] = useState<{
    key: string;
    percentage: number;
  } | null>(null);
  const [selectedAgeDetails, setSelectedAgeDetails] = useState<{
    key: string;
    percentage: number;
  } | null>(null);
  const [selectedGenderDetails, setSelectedGenderDetails] = useState<{
    key: string;
    percentage: number;
  } | null>(null);

  const findMaxInCategory = (
    data: Record<string, number | undefined> | undefined
  ): { key: string; percentage: number } | null => {
    if (!data) return null;
    let maxKey: string | null = null;
    let maxValue = -1;

    for (const [key, value] of Object.entries(data)) {
      const numValue = Number(value);
      if (
        typeof numValue === "number" &&
        !isNaN(numValue) &&
        numValue > maxValue
      ) {
        maxValue = numValue;
        maxKey = key;
      }
    }
    return maxKey ? { key: maxKey, percentage: maxValue * 100 } : null;
  };

  useEffect(() => {
    if (loading || !demographics) {
      setHighlightedItemKey(null);
      setCurrentPercentage(0);
      return;
    }

    let dataToScan: Record<string, number | undefined> | undefined;
    let currentSelectedDetailsForCategory: {
      key: string;
      percentage: number;
    } | null = null;
    let setSelectedDetailsForCategoryCallback: React.Dispatch<
      React.SetStateAction<{ key: string; percentage: number } | null>
    >;

    switch (activeDemoCat) {
      case "race":
        dataToScan = demographics.race;
        currentSelectedDetailsForCategory = selectedRaceDetails;
        setSelectedDetailsForCategoryCallback = setSelectedRaceDetails;
        break;
      case "age":
        dataToScan = demographics.age;
        currentSelectedDetailsForCategory = selectedAgeDetails;
        setSelectedDetailsForCategoryCallback = setSelectedAgeDetails;
        break;
      case "sex":
        dataToScan = demographics.gender;
        currentSelectedDetailsForCategory = selectedGenderDetails;
        setSelectedDetailsForCategoryCallback = setSelectedGenderDetails;
        break;
      default:
        return;
    }
    if (currentSelectedDetailsForCategory) {
      setHighlightedItemKey(currentSelectedDetailsForCategory.key);
      setCurrentPercentage(currentSelectedDetailsForCategory.percentage);
    } else if (dataToScan) {
      const maxItem = findMaxInCategory(dataToScan);
      if (maxItem) {
        setHighlightedItemKey(maxItem.key);
        setCurrentPercentage(maxItem.percentage);
        setSelectedDetailsForCategoryCallback(maxItem);
      } else {
        setHighlightedItemKey(null);
        setCurrentPercentage(0);
        setSelectedDetailsForCategoryCallback(null);
      }
    } else {
      setHighlightedItemKey(null);
      setCurrentPercentage(0);
      setSelectedDetailsForCategoryCallback(null);
    }
  }, [
    demographics,
    loading,
    activeDemoCat,
    selectedRaceDetails,
    selectedAgeDetails,
    selectedGenderDetails,
  ]);

  const handleItemClick = (itemKey: string, percentageNum: number) => {
    const detailsToSet = { key: itemKey, percentage: percentageNum };
    switch (activeDemoCat) {
      case "race":
        setSelectedRaceDetails(detailsToSet);
        break;
      case "age":
        setSelectedAgeDetails(detailsToSet);
        break;
      case "sex":
        setSelectedGenderDetails(detailsToSet);
        break;
    }
  };

  const handleDemographicsCategoryChange = (
    category: "race" | "age" | "sex"
  ) => {
    setActiveDemoCat(category);
  };
  return (
    <>
      <div className="flex flex-col md:pt-0 pt-20 pb-40 justify-between items-start h-[92vh]">
        <div className="ml-8 text-sm">
          <h3 className="font-semibold">A.I. ANALYsis</h3>
          <h3 className="sm:text-5xl text-3xl">DEMOGRAPHICS</h3>
          <h3>PREDICTED RACE & AGE</h3>
        </div>
        <div className="flex md:flex-row flex-col  w-[100%] justify-center p-8 pb-40 items-start gap-3">
          <div className="lg:w-[12%] md:w-[20%] w-[100%] flex flex-col gap-2">
            <div
              onClick={() => handleDemographicsCategoryChange("race")}
              tabIndex={0}
              className={`${
                activeDemoCat === "race" && selectedRaceDetails
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-100 text-black hover:bg-gray-300"
              } p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize `}
            >
              <h3>{selectedRaceDetails?.key}</h3>
              <h3>RACE</h3>
            </div>
            <div
              onClick={() => handleDemographicsCategoryChange("age")}
              tabIndex={0}
              className={`${
                activeDemoCat === "age" && selectedAgeDetails
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-100 text-black hover:bg-gray-300"
              } p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize `}
            >
              <h3>{selectedAgeDetails?.key}</h3>
              <h3>AGE</h3>
            </div>
            <div
              onClick={() => handleDemographicsCategoryChange("sex")}
              tabIndex={0}
              className={`${
                activeDemoCat === "sex" && selectedGenderDetails
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-100 text-black hover:bg-gray-300"
              } p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize `}
            >
              <h3>{selectedGenderDetails?.key}</h3>
              <h3>SEX</h3>
            </div>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 border border-x-0 border-b-0 lg:w-[65%] md:w-[50%] w-[100%] md:gap-16 gap-4">
            <h2 className="text-3xl md:block hidden capitalize">
              {activeDemoCat}: {highlightedItemKey}
            </h2>
            <div className="flex md:justify-end justify-center w-full">
              <CircleProgressBar
                percentage={currentPercentage}
                size={400}
                strokeWidth={5}
                circleColor="#d8d8d8"
                progressColor="black"
                className="w-full max-w-xs md:max-w-md lg:max-w-lg aspect-square"
              />
            </div>
            <h3 className="flex justify-center text-center text-gray-500 md:hidden">
              If A.I estimate is wrong, select the correct one
            </h3>
          </div>
          <div className="lg:w-[23%] md:w-[30%] w-[100%] h-full bg-gray-100 border border-x-0 border-b-0">
            <div className="flex justify-between p-4 font-semibold">
              <h3 className="uppercase">{activeDemoCat}</h3>
              <h3>A.I. CONFIDENCE</h3>
            </div>
            {activeDemoCat === "race" &&
              Object.entries(demographics?.race ?? {}).map((item, index) => {
                const rawValue = Number(item[1]);
                const isValidNumber =
                  typeof rawValue === "number" && !isNaN(rawValue);
                const percentageNum = isValidNumber ? rawValue * 100 : 0;

                return (
                  <TempComponent
                    key={index}
                    itemKey={item[0]}
                    ethnicity={item[0]}
                    percentage={percentageNum}
                    isHighlighted={item[0] === highlightedItemKey}
                    onItemsClick={handleItemClick}
                  />
                );
              })}
            {activeDemoCat === "age" &&
              Object.entries(demographics?.age ?? {}).map((item, index) => {
                const rawValue = Number(item[1]);
                const isValidNumber =
                  typeof rawValue === "number" && !isNaN(rawValue);
                const percentageNum = isValidNumber ? rawValue * 100 : 0;

                return (
                  <TempComponent
                    key={index}
                    itemKey={item[0]}
                    ethnicity={item[0]}
                    percentage={percentageNum}
                    isHighlighted={item[0] === highlightedItemKey}
                    onItemsClick={handleItemClick}
                  />
                );
              })}
            {activeDemoCat === "sex" &&
              Object.entries(demographics?.gender ?? {}).map((item, index) => {
                const rawValue = Number(item[1]);
                const isValidNumber =
                  typeof rawValue === "number" && !isNaN(rawValue);
                const percentageNum = isValidNumber ? rawValue * 100 : 0;

                return (
                  <TempComponent
                    key={index}
                    itemKey={item[0]}
                    ethnicity={item[0]}
                    percentage={percentageNum}
                    isHighlighted={item[0] === highlightedItemKey}
                    onItemsClick={handleItemClick}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex bg-white w-full justify-between  p-8 sm:text-[16px] text-[12px] md:static fixed md:bottom-auto bottom-0">
          <NavLeft
            defaulted={false}
            currentLink="/pages/select"
            name={"Back"}
          />
          <h3 className="text-gray-500 md:block hidden">
            If A.I estimate is wrong, select the correct one
          </h3>
          <NavRight currentLink={"/"} name={"Home"} />
        </div>
      </div>
    </>
  );
}
