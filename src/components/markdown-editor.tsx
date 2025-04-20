import LoadingSpinner from "@/components/loader";
import MDEditor from "@uiw/react-md-editor";

import { Dispatch, SetStateAction } from "react";

interface MarkdownEditorProp {
  editorMode: string;
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
  mutationStatus?: string;
}

export default function MarkdownEditor({
  markdown,
  setMarkdown,
  editorMode,
  mutationStatus,
}: MarkdownEditorProp) {
  return (
    <>
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
