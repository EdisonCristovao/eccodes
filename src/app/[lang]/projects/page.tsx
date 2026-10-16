import type { Metadata, ResolvingMetadata } from "next";
import EditorPane from "@/components/editor/EditorPane";
import Project from "@/components/Project";
import { PROJECTS } from "@/content/projects";
import { pages } from "@/dictionaries/pages";
import { EDITOR_FILES } from "@/lib/editor-files";
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

  // Só "encaixa no pane" (D5): a grade é a de hoje; o conteúdo é o item 8.
  return (
    <EditorPane file={EDITOR_FILES.projects} gutter="none" bodyClassName="text-muted-foreground">
      <div className="grid w-full min-w-0 grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-8 py-4 2xl:grid-cols-[repeat(4,minmax(290px,1fr))]">
        {PROJECTS.map((project, index) => (
          <div key={project.slug} className="flex items-center justify-center">
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
    </EditorPane>
  );
}
