import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "@/components/loader";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Button } from "@/components/ui/button";
import { Download, Save, SunMoon } from "lucide-react";

type ReadmeResponse = {
  data: {
    data: {
      readme: string;
    };
  };
};

export default function ReadmeResult() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [markdown, setMarkdown] = useState<string>("");

  const [editorMode, setEditorMode] = useState("light");

  const sectionsParam = searchParams.get("sections");

  const parsedSections: string[] = useMemo(() => {
    try {
      return sectionsParam ? JSON.parse(sectionsParam) : [];
    } catch (error) {
      console.error("Invalid sections parameter", error);
      return [];
    }
  }, [sectionsParam]);

  const mutation = useMutation<ReadmeResponse, unknown, string[]>({
    mutationFn: async (sections: string[]) => {
      const res = await axios.post(`/content/${id}/generate-readme`, {
        sections,
      });
      return res;
    },
    onSuccess: (data) => {
      console.log("the data is: ", data.data.data.readme);
      setMarkdown(data.data?.data?.readme || "");
    },
    onError: (err) => {
      console.error("Error fetching readme:", err);
    },
    retry: 1,
  });

  useEffect(() => {
    if (parsedSections.length > 0 && mutation.status === "idle") {
      const formatted = parsedSections.map((sec) => sec.toUpperCase());
      mutation.mutate(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedSections]);

  if (mutation.isError) {
    <div className="h-screen w-screen  top-0 left-0 fixed bg-red-100">
      <p className="text-red-700 text-center mt-4">Something went wrong.</p>;
    </div>;
  }

  return (
    <div className="p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-center">Readme</h1>
        <div className="flex gap-3">
          <Button className="cursor-pointer">
            <Save /> Save
          </Button>
          <Button className="cursor-pointer" variant="outline">
            <Download /> Download
          </Button>
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={() =>
              setEditorMode((editorMode) =>
                editorMode === "light" ? "dark" : "light"
              )
            }
          >
            <SunMoon /> Editor Mode
          </Button>
        </div>
      </header>

      {mutation.status === "pending" ? (
        <LoadingSpinner
          messages={["Generating Your Readme"]}
          fullscreen={true}
        />
      ) : (
        <div className="grid grid-cols-1 mt-6">
          <div className="space-y-2">
            <div data-color-mode={editorMode} className="h-[90vh]">
              <MDEditor
                value={markdown}
                onChange={(val) => setMarkdown(val || "")}
                height="100%"
                visibleDragbar={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
