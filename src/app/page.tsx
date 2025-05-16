"use client";
import { useRef, useEffect } from "react";
import Triangle from "./assets/svgs/sharp-triangle.svg";

export default function Home() {
  const leftTriggerRef = useRef<HTMLDivElement>(null);
  const rightTriggerRef = useRef<HTMLDivElement>(null);
  const sophisticatedTextRef = useRef<HTMLDivElement>(null);
  const leftDiamondRef = useRef<HTMLDivElement>(null);
  const rightDiamondRef = useRef<HTMLDivElement>(null);
  const spanRef =  useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lT = leftTriggerRef.current;
    const rT = rightTriggerRef.current;
    const lD = leftDiamondRef.current;
    const rD = rightDiamondRef.current;
    const sp = spanRef.current;
    const sText = sophisticatedTextRef.current;
    if (lT && rT && lD && rD && sp && sText) {
      const handleLeftHoverEnter = () => {
        sText.style.transition = "all 0.6s ease-in-out";
        sText.style.transform = "translateX(15vw)";
        sp.style.transition = 'all 0.6s ease-in-out'
        sp.style.transform = 'translateX(7rem)'
        rT.style.transition = "opacity 0.6s ease-in-out";
        rT.style.opacity = "0";
        rD.style.transition = "opacity 0.6s ease-in-out";
        rD.style.opacity = "0";
      };
      const handleLeftHoverLeave = () => {
        sText.style.transform = "translateX(0)";
        sText.style.textAlign = "center";
        rT.style.transition = "opacity 0.6s ease-in-out";
        rD.style.transition = "opcacity 0.6s ease-in-out";
        sp.style.transform = 'translateX(0)'
        rT.style.opacity = "1";
        rD.style.opacity = "1";

      };
      const handleRightHoverEnter = () => {
        sText.style.transition = "all 0.6s ease-in-out";
        sText.style.transform = "translateX(-15vw)";
        lT.style.transition = "opacity 0.6s ease-in-out";
        lD.style.transition = "opacity 0.6s ease-in-out";
        sp.style.transition = 'all 0.6s ease-in-out'
        sp.style.transform = 'translateX(-7rem)'
        lT.style.opacity = "0";
        lD.style.opacity = "0";
      };
      const handleRightHoverLeave = () => {
        sText.style.transform = "translateX(0)";
        sText.style.textAlign = "center";
        sp.style.transform = 'translateX(0)';
        lT.style.opacity = "1";
        lD.style.opacity = "1";

      };
      lT.addEventListener("mouseenter", handleLeftHoverEnter);
      lT.addEventListener("mouseleave", handleLeftHoverLeave);
      rT.addEventListener("mouseenter", handleRightHoverEnter);
      rT.addEventListener("mouseleave", handleRightHoverLeave);

      return () => {
        lT.removeEventListener("mouseenter", handleLeftHoverEnter);
        lT.removeEventListener("mouseleave", handleLeftHoverLeave);
        rT.removeEventListener("mouseenter", handleRightHoverEnter);
        rT.removeEventListener("mouseleave", handleRightHoverLeave);
      };
    }
  }, []);

  return (
    <div className="no-Xscroll flex flex-col h-[93vh] p-4 justify-center ">
      <div ref={leftDiamondRef} className="absolute w-[60vh] h-[60vh] rotate-45 left-0 translate-x-[-60%] -z-1 border border-gray-400 border-dotted"></div>
      <div ref={rightDiamondRef} className="absolute w-[60vh] h-[60vh] rotate-45 right-0 -translate-x-[-60%] -z-1 border border-gray-400 border-dotted "></div>

      <div className="flex justify-between items-center">
        {/* 3. Attach the ref to the left trigger div */}
        <div
          ref={leftTriggerRef}
          className="flex items-center gap-4 relative ml-20"
        >
          <div className="relative flex justify-center items-center p-2 border border-black border-solid rotate-45">
            {/* Assuming Triangle.src is the correct way to get the image URL */}
            <img
              className="w-[12px] h-[12px] -translate-x-[2px] translate-y-[2px] -rotate-225"
              src={Triangle.src}
              alt=""
            />
          </div>
          <div className="uppercase">discover a.i</div>
        </div>

        {/* 3. Attach the ref to the target sophisticated text div */}
        <div
          ref={sophisticatedTextRef}
          className="flex flex-col h-100 justify-center items-center max-w-[800px] text-center text-8xl"
        >
          {" "}
          Sophisticated <span ref={spanRef} >skincare</span>
        </div>

        {/* 3. Attach the ref to the right trigger div */}
        <div
          ref={rightTriggerRef}
          className="group flex items-center gap-4 relative mr-20"
        >
          <div className="uppercase">take test</div>
          <div className="relative flex justify-center items-center p-2 border border-black border-solid rotate-45 ">
            {/* Assuming Triangle.src is the correct way to get the image URL */}
            <img
              className="w-[12px] h-[12px] translate-x-[2px] -translate-y-[2px] -rotate-45"
              src={Triangle.src}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="uppercase text-xs max-w-[260px] absolute bottom-16 left-16">
        skinstic developed an a.i. that creates a highly-personalized routine
        tailored to what your skin needs
      </div>
    </div>
  );
}
