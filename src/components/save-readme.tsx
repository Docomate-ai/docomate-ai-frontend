import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useState } from "react";

interface SaveReadmeProps {
  projectId: string;
  markdown: string;
}

interface PostDataDto {
  content: string;
  contentName: string;
  contentType: string;
}

export function SaveContent({ projectId, markdown }: SaveReadmeProps) {
  const [contentName, setContentName] = useState("my-content");

  const mutationSave = useMutation({
    mutationFn: async (data: PostDataDto) => {
      const res = await axios.put(`content/${projectId}/save`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Readme saved succesfully");
    },
    onError: (err) => {
      console.error("error saving readme\n", err);
      toast.error(
        <div>
          <strong>Error saving readme</strong>
          <br />
          {err.message}
        </div>
      );
    },
  });

  function onSave() {
    const data = {
      content: markdown,
      contentName: contentName,
      contentType: "readme",
    };
    mutationSave.mutate(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Content</DialogTitle>
          <DialogDescription>
            Give Name to your readme before saving.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={contentName}
              onChange={(e) => setContentName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
