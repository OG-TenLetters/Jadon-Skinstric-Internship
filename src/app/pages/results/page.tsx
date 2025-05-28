"use client";
import NavLeft from "@/app/components/NavLeft";
import CameraIcon from "../../assets/svgs/camera.svg";
import GalleryIcon from "../../assets/svgs/gallery.svg";
import Vector from "../../assets/svgs/vector.svg";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ShiftingLotus from "@/app/components/ShiftingLotus";
import LoadingDots from "@/app/components/LoadingDots";
import { useRouter } from "next/navigation";
import { useImageApi } from "@/app/hooks/ImageApiContext"; // IMPORT YOUR CONTEXT HOOK HERE
import Image from "next/image";

export default function ResultsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModal, setIsModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { sendImage, loading } = useImageApi();
  const router = useRouter();

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        const reader = new FileReader();

        reader.onloadend = () => {
          setBase64Image(reader.result as string);
        };
        reader.onerror = (error) => {
          console.error("FileReader error: ", error);
          setBase64Image(null);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
        setBase64Image(null);
      }
    } else {
      setSelectedImage(null);
      setBase64Image(null);
    }
    event.target.value = "";
  };

  const showModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  useEffect(() => {
    if (base64Image) {
      const processImage = async () => {
        try {
          await sendImage(base64Image);
          router.push("/pages/select");
        } catch (error: unknown) {
          console.error("Analysis failed:", error);
          let alertMessage = "Analysis failed"
          if (error instanceof Error) {
            alertMessage = error.message
          }
          alert(`Analysis failed: ${alertMessage || "Unknown error"}`);
          setSelectedImage(null);
          setBase64Image(null);
        }
      };
      processImage();
    }
  }, [base64Image, router, sendImage]);

  return (
    <>
      <div className="flex flex-col justify-between items-start md:pt-0 pt-20 md:h-[93vh] h-[100vh]">
        <div className="ml-8 uppercase font-semibold text-sm">
          To Start Analysis
        </div>
        <div
          className={`${
            isModal && "opacity-50"
          }  transition-opacity duration-600 absolute mt-8 right-8`}
        >
          <h3 className="text-xs mb-2">Preview</h3>
          <div className=" relative flex justify-center items-center border border-gray-300 w-32 min-h-32 max-h-60">
            {selectedImage ? <Image fill style={{ objectFit: 'contain', height: '100%', width: '100%' }} src={selectedImage} alt="Preview of selected image" /> : null}
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
        ) : (
          <>
            <div className="flex md:flex-row flex-col w-full h-full md:justify-around  justify-center items-center">
              <div className="flex justify-center items-center w-50 h-full relative">
                <ShiftingLotus />
                <div className="text-center relative">
                  {isModal ? (
                    <div className="z-5 absolute md:top-0 md:bottom-auto bottom-0 md:left-0 left-[50%] md:translate-x-40 translate-x-[-50%] md:translate-y-4 translate-y-45 bg-gray-900">
                      <h3 className="uppercase text-white md:text-sm text-xs font-semibold md:w-80 w-60 p-4 pb-8 border border-x-0 border-t-0 border-white">
                        Allow A.I. to access you camera?
                      </h3>
                      <div className="uppercase text-xs py-2 px-4 flex gap-x-8 justify-end">
                        <h3
                          onClick={() => closeModal()}
                          className="text-[#b6c0c4] hover:brightness-80 transition-brightness duration-150 cursor-pointer"
                        >
                          Deny
                        </h3>
                        <Link href="/pages/camera">
                          <h3 className="text-white hover:brightness-80 transition-brightness duration-150 cursor-pointer">
                            Allow
                          </h3>
                        </Link>
                      </div>
                    </div>
                  ) : null}

                  <Image
                    width={CameraIcon.height}
                    height={CameraIcon.height}
                    onClick={() => showModal()}
                    className="hover:scale-105 transition-scale duration-300 ease-in-out cursor-pointer"
                    src={CameraIcon.src}
                    alt="Take a picture from Camera"
                  />
                  <Image
                    width={Vector.width}
                    height={Vector.height}
                    className="absolute top-0 right-0 md:block hidden translate-y-[-36px] translate-x-[36px] -z-1"
                    src={Vector.src}
                    alt=""
                  />
                  <h3 className="font-medium absolute text-left uppercase text-xs w-100 max-w-[120px] md:top-0 top-auto md:-right-2 right-[50%] md:translate-y-[-64px] md:translate-x-[152px] translate-x-[50%]">
                    Allow A.I. <br /> to scan your face
                  </h3>
                </div>
              </div>
              <div
                className={` ${
                  isModal && "opacity-50 pointer-events-none"
                } flex justify-center  transition-opacity duration-600 items-center w-50% h-full relative`}
              >
                <ShiftingLotus />
                <div className="text-center relative">
                  <Image
                    width={GalleryIcon.width}
                    height={GalleryIcon.height}
                    onClick={() => openFileExplorer()}
                    className="hover:scale-105 transition-scale duration-300 ease-in-out cursor-pointer"
                    src={GalleryIcon.src}
                    alt="Choose photo from Gallery"
                  />
                  <Image
                    width={Vector.width}
                    height={Vector.height}
                    className="absolute rotate-180 md:block hidden bottom-0 left-0 translate-y-[20px] translate-x-[-48px] -z-1"
                    src={Vector.src}
                    alt=""
                  />
                  <h3 className="font-medium absolute w-100 max-w-[120px] text-right uppercase text-xs md:bottom-0 bottom-auto md:top-auto top-0 -translate-y-8 md:left-0 left-[50%] md:translate-y-[52px] md:translate-x-[-168px] translate-x-[-50%]  ">
                    Allow A.I. <br /> access to Gallery
                  </h3>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex w-full justify-between pb-8 px-8">
              <NavLeft
                defaulted={false}
                currentLink="/pages/testing"
                name={"Back"}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
