import React from "react";
import CheckBox from "@/components/CheckBox";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-64 border-r border-lines h-full flex flex-col pl-5 pt-5">
        <CheckBox label="React" />
        <CheckBox label="Node" />
        <CheckBox label="Css" />
      </div>
      <div className="flex grow">
        <div className="w-full border-r border-lines">{children}</div>
      </div>
    </div>
  );
}
