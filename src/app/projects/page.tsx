import React from "react";
import CheckBox from "@/components/CheckBox";
import Project from "@/components/Project";

export default async function page() {
  return (
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-64 border-r border-lines h-full lg:flex flex-col pl-5 pt-5 hidden ">
        <CheckBox label="React" />
        <CheckBox label="Node" />
        <CheckBox label="Css" />
      </div>
      <div className="flex grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full pt-36 px-11 gap-8">
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
          <div className="flex justify-center items-center">
            <Project />
          </div>
        </div>
      </div>
    </div>
  );
}
