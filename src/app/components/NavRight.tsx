import Triangle from "../assets/svgs/sharp-triangle.svg"

interface NavRightProps {
    name: string;
}
export default function NavRight ({name}: NavRightProps) {

    return (
                <div className="group flex items-center gap-4 relative">
          <div className="uppercase font-semibold">{name}</div>
          <div className="group-hover:scale-110 group-active:scale-95 relative flex justify-center items-center p-2 border border-black border-solid rotate-45 transition-all duration-600">
            <img
              className="w-[12px] h-[12px] translate-x-[2px] -translate-y-[2px] -rotate-45"
              src={Triangle.src}
              alt=""
            />
          </div>
        </div>
    )
}