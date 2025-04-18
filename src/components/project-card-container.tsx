// components/ProjectCardContainer.tsx
import ProjectCard from "./project-card";

interface Project {
  id: string;
  projectName: string;
  repoUrl: string;
  languages: Record<string, number>;
}

export default function ProjectCardContainer({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
