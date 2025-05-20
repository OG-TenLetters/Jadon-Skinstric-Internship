"use client"

import { useEffect, useRef, useState } from "react";

export default function CameraTest () {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  
  const requestCamera = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true});
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(playErr => {
            console.error("Error playing video feed:", playErr);
          setError("Failed to play video feed. Your browser might require a direct user interaction to play media.");
        })
        
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err)
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Camera access denied. Please allow camera permissions in your browser settings.");
      } else if (err.name === 'NotFoundError' || err.name === "DevicesNotFoundError") {
        setError("No camera found. Please ensure a camera is connected and recognized by your system")
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError("Camera is in use by another application or not accessible. Please close other apps using the camera.");
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        setError("Browser/device cannot fulfill camera requirements (e.g., specific resolution not available).");
      } else {
        setError(`An unknown error occurred: ${err.message}`);
      }
      setStream(null)
    }
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        console.log("Camera stream stopped")
      }
    }
  }, [stream])


    return (
        

   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Camera Access Test</h1>

      {error && <p className="text-red-500 mb-4 text-center text-lg">{error}</p>}

      <button
        onClick={requestCamera}
        disabled={!!stream} // Disable the button if a stream is already active
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {stream ? "Camera Active" : "Request Camera Access"}
      </button>

      {stream && (
        // The <video> element will display the camera feed
        <video
          ref={videoRef}
          autoPlay        // Automatically start playing the video
          playsInline     // Important for mobile devices to play inline, not fullscreen
          className="mt-8 border-4 border-gray-700 rounded-lg shadow-lg max-w-full h-auto"
          style={{ width: '640px', height: '480px' }} // Set explicit dimensions or use Tailwind's w-full h-auto
        ></video>
      )}

      {!stream && !error && (
        <p className="mt-4 text-gray-400">Click the button to request camera permission.</p>
      )}
    </div>
  
    )
}