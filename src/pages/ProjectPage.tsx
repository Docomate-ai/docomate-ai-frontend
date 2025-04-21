import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/loader"; // Make sure this exists
import ContentCard from "@/components/content-card";
import { toast } from "sonner";

type Project = {
  id: string;
  projectName: string;
  repoUrl: string;
  languages: Record<string, number>;
};

type Content = {
  contentType: string;
  contentName: string;
  content: string;
  projectId: string;
  _id: string;
};

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await axios.post(`/project/${id}`);
      if (!res.data) {
        console.error("Project data is missing or invalid.");
        toast.error("Project data is missing or invalid.");
      }
      toast.success(res.data.message);
      return res.data.data.project;
    },
  });

  const { data: contents, isLoading: isContentLoading } = useQuery<Content[]>({
    queryKey: ["contents", id],
    queryFn: async () => {
      const res = await axios.post(`/content/${id}/contents`);
      toast.success(res.data.message);
      return res.data.data.contents;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load project. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Project Info */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{project.projectName}</h1>
        <p className="text-muted-foreground">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {project.repoUrl}
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(project.languages).map(([lang, size]) => (
            <Badge key={lang} variant="outline">
              {lang}: {(size / 1024).toFixed(1)} KB
            </Badge>
          ))}
        </div>
      </div>

      {/* Section 1: Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            onClick={() => navigate(`/project/${id}/readme-sections`)}
            className="cursor-pointer hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle>Generate README</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Let AI generate a professional README for this project.
              </p>
            </CardContent>
          </Card>

          <Card
            onClick={() => navigate(`/project/${id}/chat-codebase`)}
            className="cursor-pointer hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle>Talk with Codebase</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chat with your codebase using natural language.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 2: Saved Readmes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contents</h2>
        {isContentLoading ? (
          <div>Loading saved content...</div>
        ) : contents && contents.length > 0 ? (
          <div className="space-y-4 grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {contents.map((content, ind) => (
              <ContentCard key={ind} content={content} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No saved contents yet.</p>
        )}
      </div>
    </div>
  );
}
