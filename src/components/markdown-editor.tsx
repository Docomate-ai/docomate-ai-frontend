import LoadingSpinner from "@/components/loader";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Download, SunMoon } from "lucide-react";
import { SaveContent as SaveReadme } from "@/components/save-readme";
import { Dispatch, SetStateAction, useState } from "react";

interface MarkdownEditorProp {
  projectId: string;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
  mutationStatus: string;
}

export default function MarkdownEditor({
  projectId,
  markdown,
  setMarkdown,
  mutationStatus,
}: MarkdownEditorProp) {
  const [editorMode, setEditorMode] = useState("light");

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-center">Markdown Editor</h1>
        <div className="flex gap-3">
          <SaveReadme markdown={markdown} projectId={projectId || ""} />
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

      {mutationStatus === "pending" ? (
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
    </>
  );
}
