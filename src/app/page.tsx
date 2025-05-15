import Triangle from "./assets/svgs/sharp-triangle.svg";

export default function Home() {
  return (
    <div className="flex flex-col h-[94vh] p-4 justify-center ">
      <div className="absolute w-[60vh] h-[60vh] rotate-45 left-0 translate-x-[-60%] -z-1 border border-gray-400 border-dotted"></div>
      <div className="absolute w-[60vh] h-[60vh] rotate-45 right-0 -translate-x-[-60%] -z-1 border border-gray-400 border-dotted ">
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 relative ml-20">
          <div className="relative flex justify-center items-center p-2 border border-black border-solid rotate-45">
            <img
              className="w-[12px] h-[12px] -translate-x-[2px] translate-y-[2px] -rotate-225"
              src={Triangle.src}
              alt=""
            />
          </div>
          <div className="uppercase">discover a.i</div>
        </div>
        <div className="flex h-100 justify-center items-center max-w-[400px] text-center text-8xl ">
          {" "}
          Sophisticated skincare
        </div>

        <div className="flex items-center gap-4 relative mr-20">
          <div className="uppercase">take test</div>
          <div className="relative flex justify-center items-center p-2 border border-black border-solid rotate-45 ">
            <img
              className="w-[12px] h-[12px] translate-x-[2px] -translate-y-[2px] -rotate-45"
              src={Triangle.src}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="uppercase text-xs max-w-[260px] absolute bottom-16 left-16">
        skinstic developed an a.i. that creates a highly-personalized routine
        tailored to what your skin needs
      </div>
    </div>
  );
}
