"use client";

import NavLeft from "@/app/components/NavLeft";
import { useEffect, useRef, useState } from "react";
import CaptureIcon from "../../../assets/svgs/camera-capture.svg";
import { useRouter } from "next/navigation";
import ShiftingLotus from "@/app/components/ShiftingLotus";
import LoadingDots from "@/app/components/LoadingDots";
import { useImageApi } from "@/app/hooks/ImageApiContext";
import Image from "next/image";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { sendImage, loading } = useImageApi();

  const router = useRouter();

  useEffect(() => {
    let errorTimer: NodeJS.Timeout | undefined;
    if (error) {
      errorTimer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      if (errorTimer) {
        clearTimeout(errorTimer);
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
      } catch (err: unknown) {
        console.error("Error accessing camera:", err);

        if (err instanceof Error) {
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
      }
    };
    requestCamera();

    return () => {
      if (currentStream) {
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
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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
        setSelectedImage(url);
        setError(null);
      } else {
        setError("Failed to convert canvas to image (Blob was null).");
      }
    }, "image.png");
  };

  const retakePhoto = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setBase64Image(null);
    setError(null);
    setSelectedImage(null);

    setTimeout(() => {
      if (videoRef.current && stream) {
        const videoElement = videoRef.current;
        videoElement.srcObject = stream;

        const handleCanPlayThrough = () => {
          videoElement.play().catch(() => {
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
        videoElement
          .play()
          .catch((e) =>
            console.warn("Retake: Immediate play attempt failed", e)
          );
      } else {
        console.warn(
          "Retake: VideoRef or stream not available after timeout. Cannot resume playback"
        );
      }
    }, 50);
  };
  const keepPhoto = async () => {
    if (!selectedImage || !canvasRef.current) {
      console.error("No photo to keep/upload.");
      setError("No photo to keep.");
      return;
    }

    try {
      const blob: Blob = await new Promise((resolve, reject) => {
        canvasRef.current!.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error("Failed to create blob from canvas."));
        }, "image/png");
      });

      const base64String: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (e) =>
          reject(new Error("FileReader error: " + e.target?.error?.message));
        reader.readAsDataURL(blob);
      });
      setBase64Image(base64String);
    } catch (err: unknown) {
      console.error("Error during image conversion:", err);
      let errorMessage = "Failed to convert photo for upload.";
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string')
        errorMessage = err
      setError(errorMessage);
      setBase64Image(null);
    }
  };

  useEffect(() => {
    if (base64Image) {
      const processImage = async () => {
        try {
          await sendImage(base64Image);
          router.push("/pages/select");
        } catch (error: unknown) {
          console.error("Analysis failed:", error);
          let alertMessage = "An unknown error occurred during analysis."
          if (error instanceof Error) {
            alertMessage = error.message;
          } else if (typeof error === 'string') {
            alertMessage = error
          }
          alert(`Analysis failed: ${alertMessage}`);
          setSelectedImage(null);
          setBase64Image(null);
        }
      };
      processImage();
    }
  }, [base64Image, router, sendImage]);

  console.log(retakePhoto);

  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col justify-between items-start md:pt-0 pt-20 md:h-[93vh] h-[100vh]">
            <div className="ml-8 uppercase font-semibold text-sm">
              To Start Analysis
            </div>
            <div className="absolute right-8 top-16">
              <h3 className="text-xs mb-2">Preview</h3>
              <div className="relative flex justify-center items-center border border-gray-300 w-32 h-32">
                {selectedImage ? (
                  <Image
                    fill
                    style={{
                      objectFit: "contain",
                      height: "100%",
                      width: "100%",
                    }}
                    src={selectedImage}
                    alt="Preview of selected image"
                  />
                ) : null}
              </div>
            </div>
            {selectedImage || loading ? (
              <>
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-rotate-fast">
                  <ShiftingLotus />
                </div>
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <p className="mb-4">Processing submission</p>
                  <LoadingDots />
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="overflow-hidden flex md:pt-0 pt-17 md:h-[90vh] h-[98vh] mb-4 relative">
            {error && (
              <div className="animate-fade-in absolute rounded-full px-8 py-3 top-4 left-[50%] translate-x-[-50%] bg-[#5a0000] shadow-lg inset-shadow-[0_0_12px_8px] inset-shadow-[#270000] text-white text-sm font-bold flex justify-center md:w-auto w-[90%] md:max-w-[1000px] z-50">
                {error}
              </div>
            )}
            {selectedImage ? (
              <Image
                width={100}
                height={100}
                src={selectedImage}
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
            {selectedImage ? (
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
                  <h2 className="mb-4">
                    {" "}
                    to get better results, make sure to have
                  </h2>
                  <div className="flex md:gap-0 gap-6 justify-center">
                    <h3 className="md:w-full w-16 text-center">
                      ◇ Neutral Expression
                    </h3>
                    <h3 className="md:w-full w-16 text-center">
                      ◇ Frontal Pose
                    </h3>
                    <h3 className="md:w-full w-16 text-center">
                      ◇ Adequate Lighting
                    </h3>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-4 absolute md:right-8 md:top-[50%] md:translate-y-[-50%] right-[50%] bottom-40 md:translate-x-0 translate-x-[50%]">
                  <h3 className="text-white uppercase font-bold">
                    Take Picture
                  </h3>
                  <Image
                    width={CaptureIcon.width}
                    height={CaptureIcon.height}
                    onClick={takePhoto}
                    className="scale-120 transition-all duration-300 hover:scale-132 hover:opacity-90"
                    src={CaptureIcon.src}
                    alt=""
                  />
                </div>
              </>
            )}

            <div className="absolute text-white md:bottom-8 md:top-auto top-24 left-8 ">
              <NavLeft
                defaulted={false}
                currentLink="/pages/results"
                triangleVariant="white"
                name="Back"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
