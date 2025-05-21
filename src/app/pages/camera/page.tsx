import ShiftingLotus from "@/app/components/ShiftingLotus";
import CameraIcon from "../../assets/svgs/camera.svg";
import CountdownProgressBar from "@/app/components/CountdownProgressBar";

export default function () {
  return (
    <div className="overflow-hidden justify-center items-center flex flex-col h-[90vh] mb-4 relative">
      <ShiftingLotus />
      <div className="flex flex-col opacity-40">
        <img className="scale-75" src={CameraIcon.src} alt="" />
        <h3 className="text-sm font-semibold">SETTING UP CAMERA...</h3>
      </div>
      <div className="absolute text-center text-sm bottom-0 left-[50%] translate-x-[-50%] -translate-y-8 z-4 text-black uppercase">
        <h2 className="mb-4"> to get better results, make sure to have</h2>
        <div className="flex gap-8">
          <h3 className=" lg:w-full max-w-10">◇ Neutral Expression</h3>
          <h3>◇ Frontal Pose</h3>
          <h3>◇ Adequate Lighting</h3>
        </div>
        <CountdownProgressBar currentLink="/pages/camera/capture" />
      </div>
    </div>
  );
}
