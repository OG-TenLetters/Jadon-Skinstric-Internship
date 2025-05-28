"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface CountdownProgressBarProps {
  currentLink: string
}

export default function CountdownProgressBar({currentLink}: CountdownProgressBarProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(100);
  const duration = 2000;
  const intervalTime = 20;
  const totalSteps = duration / intervalTime;
  const decrementAmount = 100 / totalSteps;

  useEffect(() => {

     const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - decrementAmount;

          if (newProgress <= 0) {
            clearInterval(timer);

            setTimeout(() => {
              router.push(currentLink)
            }, 0)
            return 0;
          }
          return newProgress;
        });
      }, intervalTime);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [router, currentLink, decrementAmount, intervalTime]);
  return (
    <div className="m-auto mt-3 w-full max-w-sm bg-gray-400 rounded-full h-2 overflow-hidden -scale-x-100">
      <div
        className="h-full bg-gray-300 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
