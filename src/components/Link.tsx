import React from "react";

type LinkProps = {
  label: string;
};

export default function Link({ label }: LinkProps) {
  return (
    <div className="py-4 px-6 border-x border-lines">
      <label className="hover:text-white hover:cursor-pointer">{label}</label>
    </div>
  );
}
