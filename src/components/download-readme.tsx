import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function DownloadReadme() {
  const { contentId } = useParams();
  const mutation = useMutation({
    mutationKey: ["contents"],
    mutationFn: async () => {
      const res = await axios.post(`content/${contentId}/download`, null, {
        responseType: "blob",
      });
      return res.data;
    },
    onSuccess: (blob) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = "README.md";
      document.body.appendChild(a);

      // Programmatically click the anchor to trigger the download
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(
        <div>
          <strong>File Downloaded Successfully</strong> <br />
        </div>
      );
    },
    onError: (error) => {
      console.error("Error downloading file:", error);
      toast.error(
        <div>
          <strong>Error Downloading File</strong> <br /> <p>{error.message}</p>
        </div>
      );
    },
  });

  function onDownload() {
    mutation.mutate();
  }

  return (
    <Button className="cursor-pointer" variant="outline" onClick={onDownload}>
      <Download /> {mutation.status === "pending" ? "Downloading" : "Download"}
    </Button>
  );
}
