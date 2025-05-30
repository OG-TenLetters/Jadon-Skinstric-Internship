"use client";
import { useRef, useEffect } from "react";
import Triangle from "./assets/svgs/sharp-triangle.svg";
import Link from "next/link";
import NavRight from "./components/NavRight";
import NavLeft from "./components/NavLeft";
import { useImageApi } from "./hooks/ImageApiContext";
import Image from "next/image";

export default function Home() {
  const leftTriggerRef = useRef<HTMLDivElement>(null);
  const rightTriggerRef = useRef<HTMLDivElement>(null);
  const sophisticatedTextRef = useRef<HTMLDivElement>(null);
  const leftDiamondRef = useRef<HTMLDivElement>(null);
  const rightDiamondRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);
  const { demographics } = useImageApi();

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
        sp.style.transition = "all 0.6s ease-in-out";
        sp.style.transform = "translateX(6rem)";
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
        sp.style.transform = "translateX(0)";
        rT.style.opacity = "1";
        rD.style.opacity = "1";
      };
      const handleRightHoverEnter = () => {
        sText.style.transition = "all 0.6s ease-in-out";
        sText.style.transform = "translateX(-15vw)";
        lT.style.transition = "opacity 0.6s ease-in-out";
        lD.style.transition = "opacity 0.6s ease-in-out";
        sp.style.transition = "all 0.6s ease-in-out";
        sp.style.transform = "translateX(-6rem)";
        lT.style.opacity = "0";
        lD.style.opacity = "0";
      };
      const handleRightHoverLeave = () => {
        sText.style.transform = "translateX(0)";
        sText.style.textAlign = "center";
        sp.style.transform = "translateX(0)";
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
    <div className="no-Xscroll flex flex-col h-[93vh] p-4 justify-center lg:items-stretch items-center">
      <div
        ref={leftDiamondRef}
        className="absolute md:w-[60vh] md:h-[60vh] w-[32vh] h-[32vh] rotate-45 lg:left-0 lg:translate-x-[-60%] left-[50%] translate-x-[-50%] lg:scale-100 scale-85 -z-1 border border-gray-400 border-dotted"
      ></div>
      <div
        ref={rightDiamondRef}
        className="absolute md:w-[60vh] md:h-[60vh] w-[32vh] h-[32vh] rotate-45 lg:right-0 lg:-translate-x-[-60%] lg:scale-100 right-[50%] translate-x-[50%] scale-70 -z-1 border border-gray-400 border-dotted "
      ></div>

      <div className="flex  lg:justify-between items-center justify-center">
        <div
          className={`${demographics === null ? "opacity-30" : "opacity-100"}`}
        >
          <div ref={leftTriggerRef} className="ml-24 lg:block hidden">
            <NavLeft
              defaulted={false}
              currentLink={demographics === null ? "" : "pages/summary"}
              name="Discover A.I."
            />
          </div>
        </div>
        <div
          ref={sophisticatedTextRef}
          style={{
            animation: "var(--animation-fade-in-delay)",
            animationDelay: "50ms",
          }}
          className="opacity-0 lg:flex lg:flex-col justify-center items-center lg:max-w-[800px] md:max-w-[600px] max-w-[300px] text-center xl:text-8xl lg:text-7xl sm:max-w-[600px] md:text-6xl text-3xl block"
        >
          Sophisticated <span ref={spanRef}>skincare</span>
        </div>

        <div className="mr-24 lg:block hidden" ref={rightTriggerRef}>
          <NavRight currentLink={"/pages/testing"} name="Take Test" />
        </div>
      </div>
      <div
        style={{
          animation: "var(--animation-fade-in-delay)",
          animationDelay: "100ms",
        }}
        className="opacity-0 lg:uppercase lg:text-black text-[#919292] my-4 sm:text-sm text-xs max-w-[260px] lg:font-normal font-bold lg:absolute lg:bottom-4 lg:left-20 lg:text-left static text-center"
      >
        Skinstic developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </div>

      <div className="lg:hidden block">
        <Link
          href="/pages/testing"
          style={{ animation: "var(--animation-fade-in-delay)" }}
          className="hover:scale-105 hover:active:scale-100 opacity-0 lg:hidden items-center gap-4 transition-all duration-300 relative flex justify-center"
        >
          <div className="uppercase font-bold sm:text-sm text-xs">
            enter experience
          </div>
          <div className="relative flex justify-center items-center p-2 border border-black border-solid rotate-45 transition-all duration-600 md:scale-100 sm:scale-90 scale-70">
            <Image
              width={12}
              height={12}
              className="w-[12px] h-[12px] translate-x-[2px] -translate-y-[2px] -rotate-45"
              src={Triangle.src}
              alt=""
            />
          </div>
        </Link>
        <div
          style={{
            animation: "var(--animation-fade-in-delay)",
            animationDelay: "100ms",
          }}
          className={`${
            demographics === null ? "hidden" : ""
          } opacity-0 sm:hover:scale-105 hover:scale-85 transition-scale duration-300 text-sm sm:scale-100 scale-80 font-bold mt-3`}
        >
          <NavLeft
            defaulted={false}
            currentLink="/pages/summary"
            name="Back To Summary"
          />
        </div>
      </div>
    </div>
  );
}
