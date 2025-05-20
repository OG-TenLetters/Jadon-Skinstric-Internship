"use client";

import NavLeft from "@/app/components/NavLeft";
import { useEffect, useRef, useState } from "react";
import CaptureIcon from "../../../assets/svgs/camera-capture.svg";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const requestCamera = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((playErr) => {
          console.error("Error playing video feed:", playErr);
          setError(
            "Failed to play video feed. Your browser might require a direct user interaction to play media."
          );
        });
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setError(
          "Camera access denied. Please allow camera permissions in your browser settings."
        );
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
      ) {
        setError(
          "No camera found. Please ensure a camera is connected and recognized by your system"
        );
      } else if (
        err.name === "NotReadableError" ||
        err.name === "TrackStartError"
      ) {
        setError(
          "Camera is in use by another application or not accessible. Please close other apps using the camera."
        );
      } else if (
        err.name === "OverconstrainedError" ||
        err.name === "ConstraintNotSatisfiedError"
      ) {
        setError(
          "Browser/device cannot fulfill camera requirements (e.g., specific resolution not available)."
        );
      } else {
        setError(`An unknown error occurred: ${err.message}`);
      }
      setStream(null);
    }
  };
  const takePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      console.error("Video or canvas element not ready, or camera not active.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    if (!context) {
      console.error("Could not get 2D rendering context from canvas.");
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        console.log("Phot captured as Blob:", blob);
      } else {
        console.error("Failed to convert canvas to Blob.");
      }
    }, "image.png");
  };
  const retakePhoto = () => {
    if (capturedPhotoUrl) {
      URL.revokeObjectURL(capturedPhotoUrl);
    }
    setCapturedPhotoUrl(null);
    setError(null);

    if (videoRef.current) {
      videoRef.current.play().catch((playErr) => {
        console.error("Error resuming video feed:", playErr);
        setError("Failed to resume camera feed.");
      });
    }
  };
    const keepPhoto = async () => {
    if (!capturedPhotoUrl || !canvasRef.current) {
      console.error("No photo to keep/upload.");
      setError("No photo to keep.");
      return;
    }
    canvasRef.current.toBlob(async (blob) => {
        if (blob) {
                        // Now you have the blob again, send it via Axios
            // import axios from 'axios';
            // import { useRouter } from 'next/navigation';
            // const router = useRouter(); // If you use it in this component

            // const formData = new FormData();
            // formData.append('image', blob, 'captured_image.png');
            // try {
            //   const response = await axios.post('/api/upload-image', formData);
            //   console.log("Upload successful:", response.data);
            //   router.push(`/display-captured-photo?imageUrl=${encodeURIComponent(response.data.imageUrl)}`);
            // } catch (uploadError) {
            //   console.error("Upload failed:", uploadError);
            //   setError("Photo upload failed.");
            // }
        }
    }, 'image/png')
    }

  useEffect(() => {
    if (stream && videoRef.current) {
      const videoElement = videoRef.current;

      videoElement.srcObject = stream;
      videoElement.play().catch((playErr) => {
        setError("Failed to play video feed. Your browser may be out of date.");
      });
      const handleLoadedMetadata = () => {
        if (canvasRef.current) {
          canvasRef.current.width = videoElement.videoWidth;
          canvasRef.current.height = videoElement.videoHeight;
        }
      };
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Camera stream stopped");
      }
      if (capturedPhotoUrl) {
        URL.revokeObjectURL(capturedPhotoUrl);
      }
    };
  }, [stream, capturedPhotoUrl]);

  useEffect(() => {
    requestCamera();
  }, []);

  return (
    <div className="overflow-hidden flex h-[90vh] mb-4 relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="-scale-x-100 h-auto w-[100%] object-cover"
      ></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="absolute text-center text-sm bottom-0 left-[50%] translate-x-[-50%] -translate-y-36 text-white uppercase font-semibold">
        <h2 className="mb-4"> to get better results, make sure to have</h2>
        <div className="flex gap-8">
          <h3>◇ Neutral Expression</h3>
          <h3>◇ Frontal Pose</h3>
          <h3>◇ Adequate Lighting</h3>
        </div>
      </div>
      <div className="absolute text-white bottom-8 left-8">
        <NavLeft triangleVariant="white" name="Back" />
      </div>
      <div className="flex items-center gap-4 absolute right-8 top-[50%] translate-y-[-50%]">
        <h3 className="text-white uppercase font-bold">Take Picture</h3>
        <img
          onClick={takePhoto}
          className="scale-120 transition-all duration-300 hover:scale-132 hover:opacity-90"
          src={CaptureIcon.src}
          alt=""
        />
      </div>
    </div>
  );
}
