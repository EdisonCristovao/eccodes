import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

type ProjectProps = {
  name: string;
  img: string;
  description: string;
  buttonText: string;
  buttonClick?(): () => void;
  /** Imagem LCP (primeiro card): carrega com prioridade alta. */
  priority?: boolean;
};
export default function Project({
  name,
  img,
  description,
  buttonText,
  buttonClick,
  priority = false,
}: ProjectProps) {
  return (
    <div>
      <p className="text-base">{name}</p>
      <div className="border border-border bg-card rounded-lg min-w-[320px] max-w-[320px] h-[100%] mt-4">
        <div className="w-full h-36 relative overflow-hidden">
          <Image
            src={img}
            width={500}
            height={500}
            alt=""
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
          />
        </div>
        <div className="p-6 flex flex-col items-start ">
          <p className="mb-3 text-base">{description}</p>
          <Button onClick={buttonClick}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
}
