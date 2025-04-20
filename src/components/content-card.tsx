import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useContent from "@/context/content.context";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";

interface ContentCardProp {
  content: {
    _id: string;
    projectId: string;
    contentName: string;
    contentType: string;
    content: string;
  };
}

export default function ContentCard({ content }: ContentCardProp) {
  const navigate = useNavigate();
  const { setContent } = useContent();
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`content/${content._id}`);
      console.log(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents", content.projectId],
      });
      toast.success("Content deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting content");
    },
  });

  function onDelete() {
    mutationDelete.mutate();
  }

  return (
    <Card className="h-[120px]">
      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <CardTitle className="text-sm text-muted-foreground">
          {content.contentName}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              onClick={onDelete}
              disabled={mutationDelete.status === "pending"}
              className="text-red-600 focus:text-red-700"
            >
              {mutationDelete.status === "pending" ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm text-foreground">
          {content.contentType}
        </Badge>
        <Button
          className="cursor-pointer"
          variant="link"
          onClick={() => {
            setContent(content);
            navigate(content._id);
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
