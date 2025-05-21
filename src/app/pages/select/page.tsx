"use client";

import NavLeft from "@/app/components/NavLeft";
import NavRight from "@/app/components/NavRight";
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
      <div className="flex flex-col justify-between items-start h-[93vh]">
        <div className="ml-8 text-sm">
          <h3 className="font-semibold">A.I. ANALYsis</h3>
          <h3>A.I. HAS ESTIMATED THE FOLLOWING:</h3>
          <h3>*FIX ESTIMATE INFORMATION IF NEEDED*</h3>
        </div>
        <div className="flex w-[100%] justify-center items-center">
          <div className="font-semibold rotate-45 grid gap-2 grid-cols-2 grid-rows-2">
            <div
              ref={smallDiamond}
              className={`transition-all duration-300 opacity-0 scale-90 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-100 h-100 border border-dashed -z-1
                ${isTopSelectHovered ? "opacity-1 scale-100" : "opacity-0 scale-90"}`}
            ></div>
            <div
              ref={mediumDiamond}
              className={`opacity-0 scale-90 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-120 h-120 border border-dashed -z-1
                ${
                  isLeftSelectHovered || isRightSelectHovered
                    ? "animate-fade-zoom-in"
                    : "animate-fade-zoom-in-reverse"
                }`}
            ></div>
            <div
              ref={largeDiamond}
              className={`opacity-0 scale-90 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-140 h-140 border border-dashed -z-1
                ${isBottomSelectHovered ? "animate-fade-zoom-in" : "animate-fade-zoom-in-reverse"}`}
            ></div>
            <div
              ref={topSelect}
              onMouseEnter={() => setIsTopSelectHovered(true)}
              onMouseLeave={() => setIsTopSelectHovered(false)}
              className="w-40 h-40 bg-[#d8dadd] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45">DEMOGRAPHICs</p>
            </div>
            <div
              ref={rightSelect}
              onMouseEnter={() => setIsRightSelectHovered(true)}
              onMouseLeave={() => setIsRightSelectHovered(false)}
              className="w-40 h-40 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45">SKIN TYPE DETAILs</p>
            </div>
            <div
              ref={leftSelect}
              onMouseEnter={() => setIsLeftSelectHovered(true)}
              onMouseLeave={() => setIsLeftSelectHovered(false)}
              className="w-40 h-40 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45">
                COSMETIC
                <br /> CONCERNs
              </p>
            </div>
            <div
              ref={bottomSelect}
              onMouseEnter={() => setIsBottomSelectHovered(true)}
              onMouseLeave={() => setIsBottomSelectHovered(false)}
              className="w-40 h-40 bg-[#ebebeb] hover:bg-[#c1c3c9] flex justify-center items-center"
            >
              <p className="-rotate-45">WEATHER</p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between pb-8 px-8">
          <NavLeft
            defaulted={true}
            currentLink="/pages/results"
            name={"Back"}
          />
          <NavRight currentLink="" name={"Get summary"} />
        </div>
      </div>
    </>
  );
}
