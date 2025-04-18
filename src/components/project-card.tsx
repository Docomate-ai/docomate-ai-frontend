// components/ProjectCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { LanguagesIcon, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  projectName: string;
  repoUrl: string;
  languages: Record<string, number>;
}

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="hover:shadow-lg transition-shadow cursor-pointer p-2 border-muted hover:border-foreground"
    >
      <CardHeader>
        <CardTitle className="text-xl">{project.projectName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Github className="h-4 w-4" />
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub Repo
          </a>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <LanguagesIcon className="h-4 w-4" />
            <span className="font-medium">Languages</span>
          </div>
          <div className="flex flex-wrap gap-2 ml-6">
            {Object.entries(project.languages).map(([lang, size]) => (
              <Badge key={lang} variant="outline">
                {lang} — {(size / 1024).toFixed(1)} KB
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
