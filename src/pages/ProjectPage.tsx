import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/loader"; // Make sure this exists

type Project = {
  id: string;
  projectName: string;
  repoUrl: string;
  languages: Record<string, number>;
};

// type Readme = {
//   id: string;
//   content: string;
//   createdAt: string;
// };

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
      }
      console.log(res.data.data.project);
      return res.data.data.project;
    },
  });

  // const { data: readmes, isLoading: isReadmesLoading } = useQuery<Readme[]>({
  //   queryKey: ["readmes", id],
  //   queryFn: async () => {
  //     const res = await axios.get(`/content/${id}/readmes`);
  //     return res.data.readmes;
  //   },
  // });

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
            onClick={() => navigate(`/project/${id}/generate-readme`)}
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
      {/* <div className="space-y-4">
        <h2 className="text-xl font-semibold">Saved READMEs</h2>
        {isReadmesLoading ? (
          <div>Loading saved content...</div>
        ) : readmes && readmes.length > 0 ? (
          <div className="space-y-4">
            {readmes.map((readme) => (
              <Card key={readme.id}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">
                    {new Date(readme.createdAt).toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm text-foreground">
                    {readme.content.slice(0, 500)}...
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No saved readmes yet.</p>
        )}
      </div> */}
    </div>
  );
}
