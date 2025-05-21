import Dot from "../assets/svgs/circle.svg";


export default function LoadingDots () {

    return (
            <div className="flex justify-center gap-2">
              <img
                className="animate-small-jiggle w-1.5 h-1.5"
                src={Dot.src}
                alt=""
              />
              <img
                className="animate-big-jiggle w-1.5 h-1.5"
                src={Dot.src}
                alt=""
              />
              <img
                className="animate-small-jiggle-delay w-1.5 h-1.5"
                src={Dot.src}
                alt=""
              />
            </div>
    )
}