"use client";

import Link from "next/link";
import DynamicForm from "../../components/DynamicForm";
import NavLeft from "../../components/NavLeft";
import NavRight from "../../components/NavRight";
import { useState } from "react";

export default function TestingPage() {
  const [processComplete, setProcessComplete] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-between items-start h-[93vh]">
      <div className="ml-8 uppercase font-semibold text-sm">
        To Start Analysis
      </div>
      <div className="flex justify-center items-center w-full h-full relative">
        <div className="animate-rotate-slow1 w-80 h-80 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-25 pointer-events-none"></div>
        <div className="animate-rotate-slow2 w-90 h-90 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-50 opacity-20 pointer-events-none"></div>
        <div className="animate-rotate-slow3 w-100 h-100 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-55 opacity-15 pointer-events-none"></div>
        <div className="animate-rotate-slow4 w-110 h-110 border border-dashed absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rotate-60 opacity-10 pointer-events-none"></div>
        <div className="text-center text-[#8c8d8d]">
          <DynamicForm setProcessComplete={setProcessComplete} />
        </div>
      </div>

      <div className="flex w-full justify-between pb-8 px-8">
        <NavLeft active={true} currentLink="/" name={"Back"} />

        {processComplete === true && (
          <div className="animate-process-complete opacity-0">
            <Link href="/pages/results">
              <NavRight name={"Proceed"} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
