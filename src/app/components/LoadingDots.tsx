import Image from "next/image";
import Dot from "../assets/svgs/circle.svg";

export default function LoadingDots() {
  return (
    <div className="flex justify-center gap-2">
      <Image
        width={1.5}
        height={1.5}
        className="animate-small-jiggle w-1.5 h-1.5"
        src={Dot.src}
        alt=""
      />
      <Image
        width={1.5}
        height={1.5}
        className="animate-big-jiggle w-1.5 h-1.5"
        src={Dot.src}
        alt=""
      />
      <Image
        width={1.5}
        height={1.5}
        className="animate-small-jiggle-delay w-1.5 h-1.5"
        src={Dot.src}
        alt=""
      />
    </div>
  );
}
