"use client";
import NavLeft from "@/app/components/NavLeft";
import CameraIcon from "../../assets/svgs/camera.svg";
import GalleryIcon from "../../assets/svgs/gallery.svg";
import Vector from "../../assets/svgs/vector.svg";
import { useEffect, useRef, useState } from "react";

export default function ResultsPage() {
  const [isModal, setIsModal] = useState(false);


  const showModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
    <div className="flex flex-col justify-between items-start h-[93vh]">
      <div className="ml-8 uppercase font-semibold text-sm">
        To Start Analysis
      </div>
      <div className="flex w-full h-full justify-around ">
        <div
          className={`${
            isModal && "opacity-50"
          }  transition-opacity duration-300 absolute right-8`}
        >
          <h3 className="text-xs mb-2">Preview</h3>
          <div className="border border-gray-300 w-32 h-32"></div>
        </div>
        <div className="flex justify-center items-center w-50 h-full relative">
          <div className="animate-rotate-slow1 w-50 h-50 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-25 pointer-events-none"></div>
          <div className="animate-rotate-slow2 w-60 h-60 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-50 opacity-15 pointer-events-none"></div>
          <div className="animate-rotate-slow3 w-70 h-70 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-55 opacity-10 pointer-events-none"></div>
          <div className="animate-rotate-slow4 w-80 h-80 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-60 opacity-7 pointer-events-none"></div>
          <div className="text-center relative">
            {isModal ? (
              <div className="absolute top-0 left-0 translate-x-40 translate-y-4 bg-gray-900">
                <h3 className="uppercase text-white text-sm font-semibold w-80 p-4 pb-8 border border-x-0 border-t-0 border-white">
                  Allow A.I. to access you camera?
                </h3>
                <div className="uppercase text-xs py-2 px-4 flex gap-x-8 justify-end">
                  <h3
                    onClick={() => closeModal()}
                    className="text-[#b6c0c4] hover:brightness-80 transition-brightness duration-150 cursor-pointer"
                  >
                    Deny
                  </h3>
                  <h3 className="text-white hover:brightness-80 transition-brightness duration-150 cursor-pointer">
                    Allow
                  </h3>
                </div>
              </div>
            ) : null}

            <img
              onClick={() => showModal()}
              className="hover:scale-105 transition-scale duration-300 ease-in-out cursor-pointer"
              src={CameraIcon.src}
            />
            <img
              className="absolute top-0 right-0 translate-y-[-36px] translate-x-[36px] -z-1"
              src={Vector.src}
              alt=""
            />
            <h3 className="absolute text-left uppercase text-xs top-0 right-0 translate-y-[-64px] translate-x-[152px]">
              Allow A.I. <br /> to scan your face
            </h3>
          </div>
        </div>
        <div
          className={` ${
            isModal && "opacity-50 pointer-events-none"
          } flex justify-center  transition-opacity duration-300 items-center w-50% h-full relative`}
        >
          <div className="animate-rotate-slow1 w-50 h-50 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-25 pointer-events-none"></div>
          <div className="animate-rotate-slow2 w-60 h-60 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-50 opacity-15 pointer-events-none"></div>
          <div className="animate-rotate-slow3 w-70 h-70 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-55 opacity-10 pointer-events-none"></div>
          <div className="animate-rotate-slow4 w-80 h-80 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-60 opacity-7 pointer-events-none"></div>
          <div className="text-center relative">
            <img
              className="hover:scale-105 transition-scale duration-300 ease-in-out cursor-pointer"
              src={GalleryIcon.src}
            />
            <img
              className="absolute rotate-180 bottom-0 left-0 translate-y-[20px] translate-x-[-48px] -z-1"
              src={Vector.src}
              alt=""
            />
            <h3 className="absolute text-right uppercase text-xs bottom-0 left-0 translate-y-[52px] translate-x-[-160px] ">
              Allow A.I. <br /> access to Gallery
            </h3>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between pb-8 px-8">
        <NavLeft name={"Back"} />
      </div>
    </div>

    




</>
  );
}
