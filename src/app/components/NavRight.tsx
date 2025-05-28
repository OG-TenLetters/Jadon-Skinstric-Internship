"use client";

import { useRouter } from "next/navigation";
import Triangle from "../assets/svgs/sharp-triangle.svg";
import Image from "next/image";

interface NavRightProps {
  name: string;
  currentLink: string;
}
export default function NavRight({ name, currentLink }: NavRightProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(currentLink);
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 relative cursor-pointer"
    >
      <div className="uppercase font-semibold">{name}</div>
      <div className="group-hover:scale-110 group-active:scale-95 relative flex justify-center items-center p-2 border border-black border-solid rotate-45 transition-all duration-600">
        <Image
          width={12}
          height={12}
          className="w-[12px] h-[12px] translate-x-[2px] -translate-y-[2px] -rotate-45"
          src={Triangle.src}
          alt=""
        />
      </div>
    </div>
  );
}
