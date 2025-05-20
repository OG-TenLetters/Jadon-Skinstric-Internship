import NavLeft from "@/app/components/NavLeft";
import NavRight from "@/app/components/NavRight";
import Link from "next/link";
import CameraIcon from "../../assets/svgs/camera.svg"
import GalleryIcon from "../../assets/svgs/gallery.svg"
import Vector from "../../assets/svgs/vector.svg"

export default function ResultsPage () {

    return (
    <div className="flex flex-col justify-between items-start h-[93vh]">
      <div className="ml-8 uppercase font-semibold text-sm">
        To Start Analysis
      </div>
      <div className="flex w-full h-full justify-around ">
        <div className="absolute right-8">
            <h3 className="text-xs mb-2">Preview</h3>
            <div className="border border-gray-300 w-32 h-32"></div>
        </div>
      <div className="flex justify-center items-center w-50% h-full relative">
        <div className="animate-rotate-slow1 w-50 h-50 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-25 pointer-events-none"></div>
        <div className="animate-rotate-slow2 w-60 h-60 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-50 opacity-15 pointer-events-none"></div>
        <div className="animate-rotate-slow3 w-70 h-70 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-55 opacity-10 pointer-events-none"></div>
        <div className="animate-rotate-slow4 w-80 h-80 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-60 opacity-7 pointer-events-none"></div>
        <div className="text-center relative">
            <img className="hover:scale-105 transition-scale duration-300 ease-in-out" src={CameraIcon.src} />
            <img className="absolute top-0 right-0 translate-y-[-36px] translate-x-[36px] -z-1" src={Vector.src} alt="" />
            <h3 className="absolute text-left uppercase text-xs top-0 right-0 translate-y-[-64px] translate-x-[152px]">
                Allow A.I. <br /> to scan your face
            </h3>
        </div>
      </div>
      <div className="flex justify-center items-center w-50% h-full relative">
        <div className="animate-rotate-slow1 w-50 h-50 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-25 pointer-events-none"></div>
        <div className="animate-rotate-slow2 w-60 h-60 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-50 opacity-15 pointer-events-none"></div>
        <div className="animate-rotate-slow3 w-70 h-70 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-55 opacity-10 pointer-events-none"></div>
        <div className="animate-rotate-slow4 w-80 h-80 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-60 opacity-7 pointer-events-none"></div>
        <div className="text-center relative">
            <img className="hover:scale-105 transition-scale duration-300 ease-in-out" src={GalleryIcon.src} />
            <img className="absolute rotate-180 bottom-0 left-0 translate-y-[20px] translate-x-[-48px] -z-1" src={Vector.src} alt="" />
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
    )
}