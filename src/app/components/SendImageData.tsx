interface ImageSubmissionData {
  image: string;
}

interface ImageApiResponse {
  message?: string;
  analysisResult?: any;
  error?: string;
}

const API_BASE_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net"; // Define base URL
const API_ENDPOINT_PHASE_TWO = `${API_BASE_URL}/skinstricPhaseTwo`; // Specific endpoint for this operation

export const SendImageData = async (imageData: string): Promise<ImageApiResponse> => {
 try {
    // Strip the prefix if it exists. Your API expects just the Base64 data.
    const base64WithoutPrefix = imageData.includes(',') ? imageData.split(',')[1] : imageData;
    if (!base64WithoutPrefix) {
      throw new Error("Invalid image data format: Could not extract Base64 content.");
    }

    const dataToSend: ImageSubmissionData = { image: base64WithoutPrefix }; // Use 'image' key

    console.log("Sending data to API:", dataToSend); // For debugging

    const response = await fetch(API_ENDPOINT_PHASE_TWO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authorization headers here if your API requires them.
        // For example: 'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) { // Check for HTTP errors (4xx, 5xx)
      let errorData: { message?: string; error?: string } = {};
      try {
        errorData = await response.json(); // Attempt to parse JSON error message
      } catch (parseError) {
        console.error("Failed to parse error response JSON:", parseError);
        errorData.message = response.statusText || `Server error (Status: ${response.status})`;
      }
      throw new Error(errorData.message || errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const responseData: ImageApiResponse = await response.json(); // Parse successful JSON response
    console.log('API Success Response:', responseData);
    return responseData;

  } catch (error: any) {
    console.error('Error in sendImageToSkinstricPhaseTwo:', error);
    // Re-throw the error so the calling component can handle it
    throw error;
  }
};

// You can add other API functions here as well:
/*
export const getUserData = async (userId: string) => {
  // ... fetch logic for getting user data
};
*/