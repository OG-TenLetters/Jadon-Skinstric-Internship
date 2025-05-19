"use client";

import { useEffect, useRef, useState } from "react";

export default function DynamicForm() {
  const [currentStage, setCurrentStage] = useState<
    "name" | "city" | "completed"
  >("name");
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("Current stage:", currentStage, "Input value:", inputValue);
  }, [currentStage]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      console.log("Enter pressed. Trimmed value:", trimmedValue);
      if (trimmedValue === "") {
        alert("Please enter text before pressing Enter! It can be fake");
        return;
      }
      if (currentStage === "name") {
        setName(trimmedValue);
        setCurrentStage("city");
        setInputValue("");
        console.log("Stage changed to city. Name set:", trimmedValue);
      } else if (currentStage === "city") {
        setCity(trimmedValue);
        setCurrentStage("completed");
        setInputValue("");
        console.log("Stage completed. City set:", trimmedValue);
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
              className=" text-center text-4xl text-[#1a1b1c] focus:outline-none border border-x-0 border-t-0 max-w-[320px]"
              required
            />
          </div>
        ) : (
          <div>
            <p>Thank You!</p>
            <p>Proceed for the next step</p>
          </div>
        )}
      </form>
    </div>
  );
}
