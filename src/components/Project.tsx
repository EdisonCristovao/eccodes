import Image from "next/image";
import React from "react";
import Button from "@/components/Button";

type ProjectProps = {
  name: string;
  img: string;
  description: string;
  buttonText: string;
  buttonClick?(): () => void;
};
export default function Project({
  name,
  img,
  description,
  buttonText,
  buttonClick,
}: ProjectProps) {
  return (
    <div>
      <label className="">{name}</label>
      <div className="border-[0.1px] border-secondary-grey min-w-[320px] max-w-[320px] rounded-2xl h-[100%] bg-primary-light-dark mt-4">
        <div className="w-full h-36 relative overflow-hidden">
          <Image src={img} width={500} height={500} alt="" />
        </div>
        <div className="p-6 flex flex-col items-start ">
          <label className="mb-3">{description}</label>
          <button
            className="bg-[#1C2B3A] hover:bg-[#263B50] py-3 px-4 rounded-lg text-xs"
            onClick={buttonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
