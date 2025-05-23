"use client";

import CircleProgressBar from "@/app/components/CircleProgressBar";
import NavLeft from "@/app/components/NavLeft";
import NavRight from "@/app/components/NavRight";
import RadioButton from "../../assets/images/radioButton.webp";
import ActiveRadioButton from "../../assets/images/activeRadioButton.webp";
import Image from "next/image";
import TempComponent from "@/app/components/TempComponent";
import { useState } from "react";
import { useImageApi } from "@/app/hooks/ImageApiContext";

export default function SummaryPage() {
    const [currentPercentage, setCurrentPercentage] = useState(0)
    const [currentData, setCurrentData] = useState([])
    const { demographics, loading ,error} = useImageApi()
    console.log(demographics)
  return (
    <>
      <div className="flex flex-col md:pt-0 pt-20 justify-between items-start h-[93vh]">
        <div className="ml-8 text-sm">
          <h3 className="font-semibold">A.I. ANALYsis</h3>
          <h3 className="sm:text-5xl text-3xl">DEMOGRAPHICS</h3>
          <h3>PREDICTED RACE & AGE</h3>
        </div>
        <div className="flex md:flex-row flex-col  w-[100%] justify-center p-8 items-start gap-3">
          <div className="lg:w-[12%] md:w-[20%] w-[100%] flex flex-col gap-2">
              <div
                tabIndex={0}
                className="focus:bg-black focus:text-white bg-gray-100 p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize "
              >
                <h3>Southeast asian</h3>
                <h3>RACE</h3>
              </div>
              <div
                tabIndex={0}
                className="focus:bg-black focus:text-white bg-gray-100 p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize "
              >
                <h3>50-59</h3>
                <h3>AGE</h3>
              </div>
              <div
                tabIndex={0}
                className="focus:bg-black focus:text-white bg-gray-100 p-4 flex flex-col justify-between md:h-[108px] border border-black border-x-0 border-b-0 font-bold hover:bg-gray-300 capitalize "
              >
                <h3>MALE</h3>
                <h3>SEX</h3>
              </div>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 border border-x-0 border-b-0 lg:w-[65%] md:w-[50%] w-[100%] md:gap-16 gap-4">
            <h2 className="text-3xl md:block hidden">Southeast Asian</h2>
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
              <h3>RACE</h3>
              <h3>A.I. CONFIDENCE</h3>
            </div>
            {/* {
              demographics?.age?.map((item, index) => (
                <TempComponent key={index} state={() => setCurrentPercentage(8)} ethnicity={"Southeast Asian"} percentage={8} />
              ))
            } */}
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
