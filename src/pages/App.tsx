import LoadingSpinner from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { CreateProjectBtn } from "@/components/create-project-btn";
import ProjectCardContainer from "@/components/project-card-container";

export default function App() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await axios.post("/project/projects");
      return projects.data;
    },
  });

  if (!isLoading && data) {
    console.log(data);
  }

  if (isError) {
    console.log(error);
  }

  return (
    <div className="w-full h-[90vh] p-4">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <hr className="h-[1px] mt-0.5 bg-black" />
      <section>
        <header className="flex  pt-2 pb-2 justify-between">
          <h2 className="text-2xl font-bold">Projects</h2>
          <CreateProjectBtn />
        </header>
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ProjectCardContainer projects={data.data.projects} />
          )}
        </div>
      </section>
    </div>
  );
}
