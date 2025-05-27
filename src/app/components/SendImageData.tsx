"use client"

import { createContext } from "react";


interface ImageSubmissionData {
  image: string;
}

interface ImageApiResponse {
  message?: string;
  analysisResult?: any;
  error?: string;
}

const API_BASE_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net";
const API_ENDPOINT_PHASE_TWO = `${API_BASE_URL}/skinstricPhaseTwo`;
export const SendImageData = async (imageData: string): Promise<ImageApiResponse> => {
 try {
    const base64WithoutPrefix = imageData.includes(',') ? imageData.split(',')[1] : imageData;
    if (!base64WithoutPrefix) {
      throw new Error("Invalid image data format: Could not extract Base64 content.");
    }

    const dataToSend: ImageSubmissionData = { image: base64WithoutPrefix }; 


    const response = await fetch(API_ENDPOINT_PHASE_TWO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      let errorData: { message?: string; error?: string } = {};
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error("Failed to parse error response JSON:", parseError);
        errorData.message = response.statusText || `Server error (Status: ${response.status})`;
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const responseData: ImageApiResponse = await response.json();
    const SuccessfulApiData = createContext(responseData)

    return responseData;

  } catch (error: any) {
    console.error('Error in sendImageToSkinstricPhaseTwo:', error);
    throw error;
  }
};

