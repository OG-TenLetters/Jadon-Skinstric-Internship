"use client";
import Image from "next/image";
import RadioButton from "../assets/images/radioButton.webp";
import ActiveRadioButton from "../assets/images/activeRadioButton.webp";

interface TempComponentProps {
  itemKey: string;
  ethnicity: string;
  percentage: number;
  isHighlighted?: boolean;
  onItemsClick: (itemKey: string, percentage: number) => void;
}

export default function TempComponent({
  itemKey,
  ethnicity,
  percentage,
  isHighlighted,
  onItemsClick
}: TempComponentProps) {
  return (
    <div
      onClick={() => onItemsClick(itemKey, percentage)}
      tabIndex={0}
      className={`${
        isHighlighted
          ? "bg-black text-white"
          : "bg-gray-100 text-black hover:bg-gray-300"
      } flex justify-between p-4 font-semibold`}
    >
      <div className="flex gap-3 items-center">
        {isHighlighted ? (
          <Image
            className="w-3 h-3"
            src={ActiveRadioButton}
            width={ActiveRadioButton.width}
            height={ActiveRadioButton.height}
            alt="Radio Button icon"
          />
        ) : (
          <Image
            className="w-3 h-3"
            src={RadioButton}
            width={RadioButton.width}
            height={RadioButton.height}
            alt="Radio Button icon"
          />
        )}

        <h3>{ethnicity}</h3>
      </div>
      <div>{percentage}%</div>
    </div>
  );
}
