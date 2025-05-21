"use client";

import { useEffect, useRef, useState } from "react";
import LoadingDots from "./LoadingDots";

interface DynamicFormProps {
  setProcessComplete: (isComplete: boolean) => void;
}

export default function DynamicForm({ setProcessComplete }: DynamicFormProps) {
  const [currentStage, setCurrentStage] = useState<
    "name" | "city" | "completed"
  >("name");
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("Current stage:", currentStage, "Input value:", inputValue);
  }, [currentStage]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (currentStage === "completed" && isProcessing) {
      timer = setTimeout(() => {
        setIsProcessing(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStage, isProcessing]);

  useEffect(() => {
    if (currentStage === "completed" && !isProcessing) {
      setProcessComplete(true);
    }
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue === "") {
        alert("Please enter text before pressing Enter! It can be fake");
        return;
      }
      if (currentStage === "name") {
        setName(trimmedValue);
        setCurrentStage("city");
        setInputValue("");
      } else if (currentStage === "city") {
        setCity(trimmedValue);
        setCurrentStage("completed");
        setIsProcessing(true);
        setInputValue("");
        console.log("Final Collected Data (on client):", {
          name,
          city: trimmedValue,
        });
      }
    }
  };

  const getPlaceholder = () => {
    if (currentStage === "name") {
      return "Introduce Yourself";
    } else if (currentStage == "city" && name) {
      return `Your City, ${name}?`;
    }
    return "";
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {currentStage !== "completed" ? (
          <div className="text-center">
            <h2 className="uppercase text-xs mb-4">Click To Type</h2>
            <input
              type="text"
              ref={inputRef}
              id="dynamic-input"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                console.log("Input changed:", e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              className=" text-center sm:text-4xl text-2xl text-[#1a1b1c] focus:outline-none border border-x-0 border-t-0 max-w-[320px]"
              required
            />
          </div>
        ) : isProcessing ? (
          <>
            <p className="mb-4">Processing submission</p>
            <LoadingDots />
          </>
        ) : (
          <div>
            <p className="text-black mb-4">Thank You!</p>
            <p>Proceed for the next step</p>
          </div>
        )}
      </form>
    </div>
  );
}
