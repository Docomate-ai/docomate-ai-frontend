import MarkdownEditor from "@/components/markdown-editor";
import { Button } from "@/components/ui/button";
import useContent from "@/context/content.context";
import { SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import LoadingSpinner from "@/components/loader";
import DownloadReadme from "@/components/download-readme";

export default function ContentPage() {
  const { content, setContent } = useContent();
  const { projectId, contentId } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [editorMode, setEditorMode] = useState("light");

  // Fetch content only if not already available in context
  const { data, isLoading, isError } = useQuery({
    queryKey: ["content", contentId],
    queryFn: async () => {
      const response = await axios.post(
        `/content/${projectId}/content/${contentId}`
      );
      return response.data.data[0];
    },
    enabled: !content.content, // Only run if context has no content
  });

  // If data comes from API (due to reload), update context and markdown
  useEffect(() => {
    if (!content.content && data?.content) {
      setContent(data.content);
      setMarkdown(data.content);
    }
  }, [data, content.content, setContent]);

  // If content already in context, use it
  useEffect(() => {
    if (content.content) {
      setMarkdown(content.content);
    }
  }, [content.content]);

  if (!content.content && isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading content. Please try again.</div>;
  }

  return (
    <div className="p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-center">Markdown Editor</h1>
        <div className="flex gap-3">
          <DownloadReadme />
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={() =>
              setEditorMode((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            <SunMoon /> Editor Mode
          </Button>
        </div>
      </header>
      <MarkdownEditor
        markdown={markdown}
        setMarkdown={setMarkdown}
        editorMode={editorMode}
      />
    </div>
  );
}
