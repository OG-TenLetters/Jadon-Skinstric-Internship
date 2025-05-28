import ShiftingLotus from "@/app/components/ShiftingLotus";
import CameraIcon from "../../assets/svgs/camera.svg";
import CountdownProgressBar from "@/app/components/CountdownProgressBar";
import Image from "next/image";

export default function CameraPage() {
  return (
    <div className="overflow-hidden justify-center items-center flex flex-col h-[90vh] mb-4 relative">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-rotate-fastest">
        <ShiftingLotus />
      </div>
      <div className="flex flex-col opacity-40">
        <Image
          className="scale-75"
          src={CameraIcon.src}
          width={CameraIcon.width}
          height={CameraIcon.height}
          alt="JAC"
        />
        <h3 className="text-sm font-semibold">SETTING UP CAMERA...</h3>
      </div>
      <div className="absolute text-center md:text-sm text-xs bottom-0 left-[50%] translate-x-[-50%] -translate-y-8 text-black uppercase font-semibold">
        <h2 className="mb-4"> to get better results, make sure to have</h2>
        <div className="flex md:gap-0 gap-6 justify-center">
          <h3 className="md:w-full w-16 text-center">◇ Neutral Expression</h3>
          <h3 className="md:w-full w-16 text-center">◇ Frontal Pose</h3>
          <h3 className="md:w-full w-16 text-center">◇ Adequate Lighting</h3>
        </div>
        <CountdownProgressBar currentLink="/pages/camera/capture" />
      </div>
    </div>
  );
}
