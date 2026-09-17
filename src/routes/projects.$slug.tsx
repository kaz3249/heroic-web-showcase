import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject } from "../lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — Kaze Studio` : "Project — Kaze Studio" },
      { name: "description", content: loaderData ? `Explore ${loaderData.title}, a digital project by Kaze Studio.` : "A selected Kaze Studio project." },
      { property: "og:title", content: loaderData ? `${loaderData.title} — Kaze Studio` : "Project — Kaze Studio" },
      { property: "og:description", content: loaderData ? `Explore ${loaderData.title}, a digital project by Kaze Studio.` : "A selected Kaze Studio project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <iframe className="standalone-project" src={project.file} title={project.title} />;
}