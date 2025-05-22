"use client";

import { useEffect, useRef, useState } from "react";
import LoadingDots from "./LoadingDots";

interface DynamicFormProps {
  setProcessComplete: (isComplete: boolean) => void;
}
interface SubmissionData {
  name: string;
  city: string;
}
interface ApiResponse {
  message: string;
}

export default function DynamicForm({ setProcessComplete }: DynamicFormProps) {
  const [currentStage, setCurrentStage] = useState<
    "name" | "city" | "completed"
  >("name");
  const [name, setName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const sendForm = async (dataToSend: SubmissionData): Promise<ApiResponse> => {
    const apiUrl =
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        let errorDetail: { message?: string } = {
          message: "An unknown error occurred",
        };
        try {
          errorDetail = await response.json();
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorDetail.message || response.statusText
          }`
        );
      }
      const responseData = await response.json();
      console.log("Success:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
  }, [currentStage, isProcessing, setProcessComplete]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue === "") {
        alert("Please enter text before pressing Enter! It can be fake");
        return;
      }

      const textOnlyRegex = /^[a-zA-Z\s-,]+$/;

      if (!textOnlyRegex.test(trimmedValue)) {
        alert("Please enter valid text (letters and space only).");
        return;
      }

      if (currentStage === "name") {
        setName(trimmedValue);
        setCurrentStage("city");
        setInputValue("");
      } else if (currentStage === "city") {
        const dataToSubmit: SubmissionData = {
          name: name,
          city: trimmedValue,
        };
        setIsProcessing(true);
        setInputValue("");

        try {
          const responseData = await sendForm(dataToSubmit);
          console.log("Form submission successful:", responseData);
          setCurrentStage("completed");
        } catch (error) {
          console.error("Form submission failed:", error);
          setIsProcessing(false);
         
          setCurrentStage("city");
        }
      }
    }
  };

  const getPlaceholder = () => {
    if (currentStage === "name") {
      return "Introduce Yourself";
    } else if (currentStage === "city" && name) {
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
