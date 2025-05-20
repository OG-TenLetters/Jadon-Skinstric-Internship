"use client";

import { useRouter } from "next/navigation";
import Triangle from "../assets/svgs/sharp-triangle.svg";

interface NavLeftProps {
  name: string;
  empty?: () => void;
}

export default function NavLeft({ name, empty }: NavLeftProps) {
  const router = useRouter();
  const handleClick = () => {
    if (empty) {
        empty()
    } else {
      router.back();
    }
  };

  return (
    <div
    onClick={handleClick}
    className="group flex items-center gap-4 relative">
      <div className="group-hover:scale-110 group-active:scale-95 relative flex justify-center items-center p-2 border border-black border-solid rotate-45 transition-all duration-600  ">
        <img
          className="w-[12px] h-[12px] -translate-x-[2px] translate-y-[2px] -rotate-225"
          src={Triangle.src}
          alt=""
        />
      </div>
      <div className="uppercase font-semibold">{name}</div>
    </div>
  );
}
