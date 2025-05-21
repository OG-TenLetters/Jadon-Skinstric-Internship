"use client";

import { useRouter } from "next/navigation";
import Triangle from "../assets/svgs/sharp-triangle.svg";
import WhiteTriangle from "../assets/svgs/sharp-triangle-white.svg";

interface NavLeftProps {
  name: string;
  active: boolean;
  currentLink: string;
  triangleVariant?: "white" | "black";
}

export default function NavLeft({
  name,
  active,
  currentLink,
  triangleVariant = "black",
}: NavLeftProps) {
  const router = useRouter();
  const handleClick = () => {
    if (active === true) {
      router.push(currentLink);
    } else {
      router.back();
    }
  };

  const currentTriangeSrc =
    triangleVariant === "white" ? WhiteTriangle.src : Triangle.src;

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 relative cursor-pointer"
    >
      <div className="group-hover:scale-110 group-active:scale-95 relative flex justify-center items-center p-2 border border-current border-solid rotate-45 transition-all duration-600  ">
        <img
          className="w-[12px] h-[12px] -translate-x-[2px] translate-y-[2px] -rotate-225"
          src={currentTriangeSrc}
          alt=""
        />
      </div>
      <div className="uppercase font-semibold">{name}</div>
    </div>
  );
}
