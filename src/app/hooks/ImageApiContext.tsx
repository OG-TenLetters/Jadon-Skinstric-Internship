"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ImageSubmissionData {
  image: string;
}


// Interface for the 'age' probabilities
// The keys are strings (like "0-2", "10-19") and values are numbers (percentages)
interface AgeProbabilities {
  "0-2"?: number;
  "3-9"?: number;
  "10-19"?: number;
  "20-29"?: number;
  "30-39"?: number;
  "40-49"?: number;
  "50-59"?: number;
  "60-69"?: number;
  "70+"?: number;
  [key: string]: number | undefined;
}

interface GenderProbabilities {
  male?: number;
  female?: number;
  [key: string]: number | undefined;
}

interface RaceProbabilities {
  "black"?: number;
  "east asian"?: number; 
  "latino hispanic"?: number;
  "middle eastern"?: number;
  "south asian"?: number;
  "southeast asian"?: number;
  "white"?: number;
  [key: string]: number | undefined;
}

interface DemographicsData {
  age?: AgeProbabilities;
  gender?: GenderProbabilities;
  race?: RaceProbabilities;
}

interface ImageApiResponse {
  success: boolean;
  message: string;
  data?: DemographicsData;
  fullContent?: string;
  type?:string;
  fileName?: string;
  [key: string]: any;
}


interface ImageApiContextType {
  apiResponse: ImageApiResponse | null;
  loading: boolean;
  error: string | null;
  sendImage: (imageData: string) => Promise<void>;
  demographics: DemographicsData | null;
}

export const ImageApiContext = createContext<ImageApiContextType | undefined>(
  undefined
);

const API_BASE_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net";
const API_ENDPOINT_PHASE_TWO = `${API_BASE_URL}/skinstricPhaseTwo`;

export const SendImageData = async (
  imageData: string
): Promise<ImageApiResponse> => {
  try {
    const base64WithoutPrefix = imageData.includes(",")
      ? imageData.split(",")[1]
      : imageData;
    if (!base64WithoutPrefix) {
      throw new Error(
        "Invalid image data format: Could not extract Base64 content."
      );
    }

    const dataToSend: ImageSubmissionData = { image: base64WithoutPrefix };


    const response = await fetch(API_ENDPOINT_PHASE_TWO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      let errorData: { message?: string; error?: string } = {};
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error("Failed to parse error response JSON:", parseError);
        errorData.message =
          response.statusText || `Server error (Status: ${response.status})`;
      }
      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP error! Status: ${response.status}`
      );
    }

    const responseData: ImageApiResponse = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error in sendImageToSkinstricPhaseTwo:", error);
    throw error;
  }
};

interface ImageApiProviderProps {
  children: ReactNode;
}

export const ImageApiProvider = ({ children }: ImageApiProviderProps) => {
  const [apiResponse, setApiResponse] = useState<ImageApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null)

  const sendImage = async (imageData: string) => {
    setLoading(true);
    setError(null);
    setApiResponse(null)
    setDemographics(null)
    try {
      const data = await SendImageData(imageData);
      setApiResponse(data);
      if (data && typeof data.data === 'object' && data.data !== null) {
        setDemographics(data.data as DemographicsData)
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      setApiResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: ImageApiContextType = {
    apiResponse,
    loading,
    error,
    sendImage,
    demographics,
  };

  return (
    <ImageApiContext.Provider value={contextValue}>
      {children}
    </ImageApiContext.Provider>
  );
};

export const useImageApi = () => {
  const context = useContext(ImageApiContext);
  if (context === undefined) {
    throw new Error("useImageApi must be used within an ImageApiProvider");
  }
  return context;
};
