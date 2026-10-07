import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
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
  useEffect(() => {
    window.location.replace(project.file);
  }, [project.file]);
  return (
    <a
      href={project.file}
      style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "#f5f5f5", fontFamily: "system-ui, sans-serif", textDecoration: "none", fontSize: "1.1rem" }}
    >
      {project.title}
    </a>
  );
}
