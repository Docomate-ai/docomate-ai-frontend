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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useState } from "react";

type ProjectFormData = {
  projectName: string;
  repoUrl: string;
};

export function CreateProjectBtn() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ProjectFormData>({
    mode: "onChange", // enables real-time validation
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const res = await axios.post("/project", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Project created successfully!");
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
      reset();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const msg = error.response?.data?.message;
        if (Array.isArray(msg)) {
          msg.forEach((m) => toast.error(m));
        } else if (typeof msg === "string") {
          toast.error(msg);
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Error creating Project");
      }
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutate(formData);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add project name and link to GitHub repo to create a new project.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Name:
              </Label>
              <Input
                id="projectName"
                className="col-span-3"
                {...register("projectName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repoUrl" className="text-right">
                Repository:
              </Label>
              <Input
                id="repoUrl"
                className="col-span-3"
                {...register("repoUrl", { required: true })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || isPending || !isValid}
            >
              {isSubmitting || isPending ? "Creating..." : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
