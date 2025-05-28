import { useEffect, useState } from "react";

interface CircleProgressBarProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textColor?: string;
  className?: string;
  animationDuration?: number;
}


export default function CircleProgressBar({
  percentage = 50,
  size = 150,
  strokeWidth = 10,
  circleColor = "#d6d6d6",
  progressColor = "#3e98c7",
  className = "",
   animationDuration = 750,
}: CircleProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const [currentTextPercentage, setCurrentTextPercentage] = useState(percentage)

  useEffect(() => {
    const frameDuration = 16;

    const startValue = currentTextPercentage;
    const endValue = percentage;

    if (startValue === endValue) {
      return;
    }

    const diff = endValue - startValue;
    const totalFrames = Math.max(1, Math.round(animationDuration / frameDuration));
    const incrementPerFrame = diff / totalFrames;

    let currentFrame = 0;

   const animationTimer = setInterval(() => {
      currentFrame++;
      const nextValue = startValue + incrementPerFrame * currentFrame;

      if (currentFrame >= totalFrames) {
        setCurrentTextPercentage(endValue);
        clearInterval(animationTimer);
      } else {
        setCurrentTextPercentage(nextValue);
      }
    }, frameDuration);

    return () => {
      clearInterval(animationTimer);
    };
  }, [percentage, animationDuration]); 

    
  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <circle
        stroke={circleColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      <circle
        stroke={progressColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.35s ease-out",
                    transitionDuration: `${animationDuration}ms`,
          transitionTimingFunction: "ease-out",
         }}
      />

      <text
        x="50%"
        y="50%"
        dominantBaseline={"central"}
        textAnchor="middle"
        fill="textColor"
        fontSize={`${size / 8}px`}
      >
        <tspan fontSize={`${size / 8}px`}>{`${Math.round(currentTextPercentage)}`}</tspan>
        <tspan fontSize={`${size / 12}px`}>%</tspan>
      </text>
    </svg>
  );
}
