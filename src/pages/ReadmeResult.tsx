import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { toast } from "sonner";
import MarkdownEditor from "@/components/markdown-editor";

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

  const sectionsParam = searchParams.get("sections");

  const parsedSections: string[] = useMemo(() => {
    try {
      return sectionsParam ? JSON.parse(sectionsParam) : [];
    } catch (error) {
      console.error("Invalid sections parameter", error);
      return [];
    }
  }, [sectionsParam]);

  const mutationGenerate = useMutation<ReadmeResponse, unknown, string[]>({
    mutationFn: async (sections: string[]) => {
      const res = await axios.post(`/content/${id}/generate-readme`, {
        sections,
      });
      return res;
    },
    onSuccess: (data) => {
      console.log("the data is: ", data.data.data.readme);
      setMarkdown(data.data?.data?.readme || "");
      toast.success("Readme generated successfully");
    },
    onError: (err) => {
      console.error("Error fetching readme:", err);
      toast.error(
        <div>
          <strong>Error fetching readme</strong>
          <br />
          {err instanceof Error ? err.message : "An unknown error occurred"}
        </div>
      );
    },
    retry: 1,
  });

  useEffect(() => {
    if (parsedSections.length > 0 && mutationGenerate.status === "idle") {
      const formatted = parsedSections.map((sec) => sec.toUpperCase());
      mutationGenerate.mutate(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedSections]);

  if (mutationGenerate.isError) {
    <div className="h-screen w-screen  top-0 left-0 fixed bg-red-100">
      <p className="text-red-700 text-center mt-4">Something went wrong.</p>;
    </div>;
  }

  return (
    <div className="p-6">
      <MarkdownEditor
        projectId={id || ""}
        markdown={markdown}
        setMarkdown={setMarkdown}
        mutationStatus={mutationGenerate.status}
      />
    </div>
  );
}
