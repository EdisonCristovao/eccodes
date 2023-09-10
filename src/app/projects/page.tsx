import React from "react";
import CheckBox from "@/components/CheckBox";
import Project from "@/components/Project";
import _ from "lodash";

const projects = [
  {
    name: "_ongaia",
    img: "/imgs/projects/project-1.png",
    techs: ["next"],
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    buttonText: "Go to OnGaia",
  },
  {
    name: "_goddies",
    img: "/imgs/projects/project-2.png",
    techs: ["reactjs", "next"],
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    buttonText: "Go to Goodies",
  },
];

const techs = ["reactjs", "next"];
export default async function page() {
  return (
    <div className="flex ml-[2px] grow text-secondary-grey">
      <div className="w-64 border-r border-lines h-full lg:flex flex-col pl-5 pt-5 hidden ">
        {_.map(techs, (tech) => (
          <CheckBox label={tech} />
        ))}
      </div>
      <div className="flex grow">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] 2xl:grid-cols-[repeat(4,minmax(290px,1fr))] w-full p-6 gap-8 overflow-y-scroll h-[95vh]">
          {_.map(projects, (project) => (
            <div className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={project.description}
                buttonText={project.buttonText}
              />
            </div>
          ))}
          {_.map(projects, (project) => (
            <div className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={project.description}
                buttonText={project.buttonText}
              />
            </div>
          ))}
          {_.map(projects, (project) => (
            <div className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={project.description}
                buttonText={project.buttonText}
              />
            </div>
          ))}
          {_.map(projects, (project) => (
            <div className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={project.description}
                buttonText={project.buttonText}
              />
            </div>
          ))}
          {_.map(projects, (project) => (
            <div className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={project.description}
                buttonText={project.buttonText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
