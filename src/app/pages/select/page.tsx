"use client";

import NavLeft from "@/app/components/NavLeft";
import NavRight from "@/app/components/NavRight";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SelectPage() {
  const topSelect = useRef<HTMLDivElement>(null);
  const bottomSelect = useRef<HTMLDivElement>(null);
  const leftSelect = useRef<HTMLDivElement>(null);
  const rightSelect = useRef<HTMLDivElement>(null);
  const smallDiamond = useRef<HTMLDivElement>(null);
  const mediumDiamond = useRef<HTMLDivElement>(null);
  const largeDiamond = useRef<HTMLDivElement>(null);

  const [isTopSelectHovered, setIsTopSelectHovered] = useState(false);
  const [isLeftSelectHovered, setIsLeftSelectHovered] = useState(false);
  const [isRightSelectHovered, setIsRightSelectHovered] = useState(false);
  const [isBottomSelectHovered, setIsBottomSelectHovered] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between items-start md:pt-0 pt-20 h-[93vh]">
        <div className="ml-8 text-sm">
          <h3 className="font-semibold">A.I. ANALYsis</h3>
          <h3>A.I. HAS ESTIMATED THE FOLLOWING:</h3>
          <h3>*FIX ESTIMATE INFORMATION IF NEEDED*</h3>
        </div>
        <div className="flex w-[100%] justify-center items-center">
          <div className="font-semibold rotate-45 grid gap-2 grid-cols-2 grid-rows-2">
            <div
              ref={smallDiamond}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:w-110 sm:h-110 w-80 h-80 border-2 border-dashed -z-1 diamond-transition
                ${isTopSelectHovered ? "diamond-hovered" : ""}`}
            ></div>
            <div
              ref={mediumDiamond}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:w-130 sm:h-130 w-100 h-100 border-2 border-dashed -z-1 diamond-transition
                ${
                  isLeftSelectHovered || isRightSelectHovered
                    ? "diamond-hovered"
                    : ""
                }`}
            ></div>
            <div
              ref={largeDiamond}
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:w-150 sm:h-150 w-120 h-120 border-2 border-dashed -z-1 diamond-transition
                ${isBottomSelectHovered ? "diamond-hovered" : ""}`}
            ></div>
            <Link href={"/pages/summary"}>
              <div
                ref={topSelect}
                onMouseEnter={() => setIsTopSelectHovered(true)}
                onMouseLeave={() => setIsTopSelectHovered(false)}
                className="hover:scale-105 transition-all duration-300 sm:w-45 sm:h-45 w-28 h-28 bg-[#d8dadd] hover:bg-[#c1c3c9] flex justify-center items-center"
              >
                <p className="-rotate-45 sm:text-lg text-xs">DEMOGRAPHICs</p>
              </div>
            </Link>
            <div
              ref={rightSelect}
              onMouseEnter={() => setIsRightSelectHovered(true)}
              onMouseLeave={() => setIsRightSelectHovered(false)}
              className="cursor-not-allowed sm:w-45 sm:h-45 w-28 h-28 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45 sm:text-lg text-xs">SKIN TYPE DETAILs</p>
            </div>
            <div
              ref={leftSelect}
              onMouseEnter={() => setIsLeftSelectHovered(true)}
              onMouseLeave={() => setIsLeftSelectHovered(false)}
              className="cursor-not-allowed sm:w-45 sm:h-45 w-28 h-28 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45 sm:text-lg text-xs">
                COSMETIC
                <br /> CONCERNs
              </p>
            </div>
            <div
              ref={bottomSelect}
              onMouseEnter={() => setIsBottomSelectHovered(true)}
              onMouseLeave={() => setIsBottomSelectHovered(false)}
              className="cursor-not-allowed sm:w-45 sm:h-45 w-28 h-28 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45 sm:text-lg text-xs">WEATHER</p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between pb-8 px-8 sm:text-[16px] text-[12px]">
          <NavLeft
            defaulted={false}
            currentLink="/pages/results"
            name={"Back"}
          />
          <NavRight currentLink={"/pages/summary"} name={"Get summary"} />
        </div>
      </div>
    </>
  );
}
