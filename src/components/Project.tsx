import Image from "next/image";
import React from "react";
import Button from "@/components/Button";

export default function Project() {
  return (
    <div className="border border-secondary-grey w-[320px] rounded-2xl h-[100%] bg-primary-light-dark">
      <div className="w-full h-36 relative">
        <Image src={"/img1.png"} fill alt="" />
      </div>
      <div className="p-6 flex flex-col items-start ">
        <label className="mb-3">
          Duis aute irure dolor in velit esse cillum dolore.
        </label>
        <Button />
      </div>
    </div>
  );
}
