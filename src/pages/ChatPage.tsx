import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Chat {
  message: string;
  response: string;
}

function ChatPage() {
  const [input, setInput] = useState("");
  const { id } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentMarkdown, setCurrentMarkdown] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (query: string) => {
      const res = await axios.post(`/chat/${id}`, { query });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setChats((chats) => [...chats, { message: input, response: data.data }]);
      setInput(() => "");
      setCurrentMarkdown(data.data);
    },
    onError: (err) => {
      console.error(err);
      if (err instanceof AxiosError && err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
      setCurrentMarkdown("## Error Occured: Check console for more info");
    },
  });

  function handleSend() {
    mutate(input);
  }

  return (
    <div className="flex h-screen">
      {/* Left Box  */}
      <div className="w-1/2 p-6 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chat with your codebase</h2>
        {/* chat messages in this box */}
        <div className="space-y-4">
          {chats.map((chat, ind) => {
            return (
              <div key={ind} className="bg-secondary p-2 rounded-md">
                <p>{chat.message}</p>
                <Button
                  variant={"link"}
                  value={chat.response}
                  onClick={() => setCurrentMarkdown(chat.response)}
                  className="pl-0"
                >
                  View Response
                </Button>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <Button onClick={handleSend} variant="default" disabled={isPending}>
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>

      {/* Right Box - Markdown Viewer */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <header className="flex flex-col gap-2 mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Canvas</h2>
          <small className="font-medium">(dark mode not available)</small>
        </header>
        <div className="prose max-w-none">
          <Markdown>{currentMarkdown}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
