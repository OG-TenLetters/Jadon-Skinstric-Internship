"use client"
import Image from "next/image"
import RadioButton from "../assets/images/radioButton.webp"

interface TempComponentProps {
    ethnicity: string,
    percentage: number,
    state: () => void 
}

export default function TempComponent ({state, ethnicity, percentage}: TempComponentProps) {

    return (
                    <div
                    onClick={state}
                      tabIndex={0}
                      className="focus:bg-black focus:text-white hover:bg-gray-300 flex justify-between p-4 font-semibold"
                    >
                      <div className="flex gap-3 items-center">
                        <Image
                          className="w-3 h-3"
                          src={RadioButton}
                          alt="Radio Button icon"
                          width={RadioButton.width}
                          height={RadioButton.height}
                        />
                        <h3>{ethnicity}</h3>
                      </div>
                      <div>{percentage}%</div>
                    </div>
    )
}