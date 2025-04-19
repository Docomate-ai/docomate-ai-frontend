import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { LanguagesIcon, Github, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";

interface Project {
  id: string;
  projectName: string;
  repoUrl: string;
  languages: Record<string, number>;
}

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete("/project", {
        data: { projectName: project.projectName },
      });
    },
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error("Failed to delete project", err);
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject();
  };

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="hover:shadow-xl transition-shadow cursor-pointer p-2 border-muted hover:border-foreground"
    >
      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <CardTitle className="text-xl font-semibold">
          {project.projectName}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="text-red-600 focus:text-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4">
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

        <div>
          <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground">
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
