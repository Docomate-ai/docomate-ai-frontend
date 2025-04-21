import LoadingSpinner from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { CreateProjectBtn } from "@/components/create-project-btn";
import ProjectCardContainer from "@/components/project-card-container";
import { toast } from "sonner";

export default function App() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await axios.post("/project/projects");
      toast.success(projects.data.message);
      return projects.data;
    },
    retry: 1,
  });

  if (isError) {
    toast.error(error.message);
  }

  return (
    <div className="w-full h-[90vh] p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <section>
        <header className="flex pt-2 pb-4 ml-5 mr-5  border-b-2 justify-between">
          <h2 className="text-2xl font-bold">
            {data && data.data.projects.length === 0
              ? "Please create project ->"
              : "Projects"}
          </h2>
          <CreateProjectBtn />
        </header>
        <div>
          {isLoading ? (
            <LoadingSpinner fullscreen={true} />
          ) : (
            <ProjectCardContainer projects={data.data.projects} />
          )}
        </div>
      </section>
    </div>
  );
}
