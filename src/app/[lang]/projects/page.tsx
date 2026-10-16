import type { Metadata, ResolvingMetadata } from "next";
import Project from "@/components/Project";
import { PROJECTS } from "@/content/projects";
import { pages } from "@/dictionaries/pages";
import { fill } from "@/lib/i18n";
import { localeFromParams, pageMetadata } from "@/lib/site";

type ProjectsProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(
  { params }: ProjectsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const lang = await localeFromParams(params);
  return pageMetadata(parent, {
    lang,
    ...pages[lang].seo.pages.projects,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: ProjectsProps) {
  const lang = await localeFromParams(params);
  const { projects } = pages[lang];

  return (
    <div className="flex min-w-0 grow text-muted-foreground">
      <div className="flex min-w-0 grow">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] 2xl:grid-cols-[repeat(4,minmax(290px,1fr))] w-full min-w-0 p-6 gap-8">
          {PROJECTS.map((project, index) => (
            <div key={project.slug} className="flex justify-center items-center">
              <Project
                name={project.name}
                img={project.img}
                description={projects.items[project.slug].description}
                buttonText={fill(projects.open, { name: project.title })}
                url={project.url}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
