"use client";

import NavLeft from "@/app/components/NavLeft";
import { useEffect, useRef, useState } from "react";
import CaptureIcon from "../../../assets/svgs/camera-capture.svg";
import { useRouter } from "next/navigation";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let errorTimer: NodeJS.Timeout | undefined;
    if (error) {
      errorTimer = setTimeout(() => {
        setError(null);
        console.log("Error cleared after timeout.");
      }, 5000);
    }
    return () => {
      if (errorTimer) {
        clearTimeout(errorTimer);
        console.log("Error timeout cleared for cleanup.");
      }
    };
  }, [error]);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
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
        currentStream = mediaStream;
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
    requestCamera();

    return () => {
      if (currentStream) {
        console.log(
          "Component unmounting or stream being replaced. Stopping camera stream."
        );
        currentStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      const videoElement = videoRef.current;

      videoElement.srcObject = stream;
      const handleCanPlayThrough = () => {
        videoElement.play().catch((playErr) => {
          console.error(
            "Error playing video feed after canplaythrough:",
            playErr
          );
          setError(
            "Failed to play video feed automatically. Please ensure browser media policies allow it."
          );
        });
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
      videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
      const handleLoadedMetadata = () => {
        if (canvasRef.current) {
          canvasRef.current.width = videoElement.videoWidth;
          canvasRef.current.height = videoElement.videoHeight;
        }
      };
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (capturedPhotoUrl) {
        URL.revokeObjectURL(capturedPhotoUrl);
      }
    };
  }, [capturedPhotoUrl]);

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

    video.pause();

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCapturedPhotoUrl(url);
        setError(null);
      } else {
        setError("Failed to convert canvas to image (Blob was null).");
      }
    }, "image.png");
  };
  const retakePhoto = () => {
    if (capturedPhotoUrl) {
      URL.revokeObjectURL(capturedPhotoUrl);
    }
    setCapturedPhotoUrl(null);
    setError(null);

    setTimeout(() => {
      if (videoRef.current && stream) {
        const videoElement = videoRef.current;
        videoElement.srcObject = stream;
        const handleCanPlayThrough = () => {
          videoElement.play().catch((playErr) => {
            setError("Failed to resume camera feed.");
          });
          videoElement.removeEventListener(
            "canplaythrough",
            handleCanPlayThrough
          );
        };
        videoElement.addEventListener("canplaythrough", handleCanPlayThrough);
        const handleLoadedMetadata = () => {
          if (canvasRef.current) {
            canvasRef.current.width = videoElement.videoWidth;
            canvasRef.current.height = videoElement.videoHeight;
          }
          videoElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        };
        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      } else {
        console.warn(
          "Retake: VideoRef or stream not available after timeout. Cannot resume playback"
        );
      }
    }, 50);
  };
  const keepPhoto = async () => {
    if (!capturedPhotoUrl || !canvasRef.current) {
      console.error("No photo to keep/upload.");
      setError("No photo to keep.");
      return;
    }
    canvasRef.current.toBlob(async (blob) => {
      if (blob) {
        console.log(blob);
      }
    }, "image/png");
    router.push("/pages/select");
  };

  return (
    <div className="overflow-hidden flex h-[90vh] mb-4 relative">
      {error && (
        <div className="animate-fade-in absolute rounded-full px-8 py-3 top-4 left-[50%] translate-x-[-50%] bg-[#5a0000] shadow-lg inset-shadow-[0_0_12px_8px] inset-shadow-[#270000] text-white text-sm font-bold flex justify-center md:w-auto w-[90%] md:max-w-[1000px] z-50">
          {error}
        </div>
      )}
      {capturedPhotoUrl ? (
        <img
          src={capturedPhotoUrl}
          alt="Captured from camera"
          className="-scale-x-100 h-auto w-[100%] object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="-scale-x-100 h-auto w-[100%] object-cover"
        ></video>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
      {capturedPhotoUrl ? (
        <>
          <h3 className="absolute text-white top-32 left-[50%] translate-x-[-50%] font-semibold uppercase">
            Great Shot!
          </h3>
          <div className="absolute text-center text-sm bottom-0 left-[50%] translate-x-[-50%] -translate-y-8 text-white font-semibold">
            <h3 className="mb-4">Preview</h3>
            <div className="p-2 gap-2 flex sm:flex-row justify-center items-center flex-col">
              <button
                onClick={() => retakePhoto()}
                className="p-2 bg-white rounded-xs text-black transition-all duration-150 hover:brightness-90 cursor-pointer"
              >
                Retake
              </button>
              <button
                onClick={() => keepPhoto()}
                className="p-2 bg-gray-950 rounded-xs text-white transition-all duration-150 hover:bg-gray-800 cursor-pointer"
              >
                Use This Photo
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute text-center md:text-sm text-xs bottom-0 left-[50%] translate-x-[-50%] -translate-y-8 text-white uppercase font-semibold">
            <h2 className="mb-4"> to get better results, make sure to have</h2>
            <div className="flex md:gap-0 gap-6 justify-center">
              <h3 className="md:w-full w-16 text-center">
                ◇ Neutral Expression
              </h3>
              <h3 className="md:w-full w-16 text-center">◇ Frontal Pose</h3>
              <h3 className="md:w-full w-16 text-center">
                ◇ Adequate Lighting
              </h3>
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-4 absolute md:right-8 md:top-[50%] md:translate-y-[-50%] right-[50%] bottom-40 md:translate-x-0 translate-x-[50%]">
            <h3 className="text-white uppercase font-bold">Take Picture</h3>
            <img
              onClick={takePhoto}
              className="scale-120 transition-all duration-300 hover:scale-132 hover:opacity-90"
              src={CaptureIcon.src}
              alt=""
            />
          </div>
        </>
      )}

      <div className="absolute text-white md:bottom-8 md:top-auto top-8 left-8 ">
        <NavLeft
          active={true}
          currentLink="/pages/results"
          triangleVariant="white"
          name="Back"
        />
      </div>
    </div>
  );
}
