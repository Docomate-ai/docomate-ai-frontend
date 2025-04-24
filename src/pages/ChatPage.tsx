import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CircleHelp, FunctionSquare, Languages, Settings } from "lucide-react";

interface Chat {
  message: string;
  response: string;
}

function ChatPage() {
  const [input, setInput] = useState("");
  const { id } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentMarkdown, setCurrentMarkdown] = useState("");
  const [view, setView] = useState<"chat" | "canvas">("chat");

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
      if (window.innerWidth < 768) setView("canvas");
    },
    onError: (err) => {
      console.error(err);
      if (err instanceof AxiosError && err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
      setCurrentMarkdown("## Error Occurred: Check console for more info");
      if (window.innerWidth < 768) setView("canvas");
    },
  });

  function handleSend() {
    mutate(input);
    if (window.innerWidth < 768) setView("canvas");
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Box (Chat) */}
      <div
        className={`w-full md:w-1/2 p-6 border-r overflow-y-auto ${
          view === "canvas" ? "hidden md:block" : ""
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Chat with your codebase</h2>
        {chats.length === 0 && (
          <div className="bg-secondary min-h-[50%] max-h-full  rounded-xl p-6 flex-col gap-4 shadow-md flex">
            <header className="text-lg font-semibold text-primary">
              Try asking Docomate AI:
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <CircleHelp className="text-muted-foreground mt-1" />,
                  text: "What is this project about, and what problem does it solve?",
                },
                {
                  icon: (
                    <FunctionSquare className="text-muted-foreground mt-1" />
                  ),
                  text: "Can you break down the generateReadme() function for me?",
                },
                {
                  icon: <Languages className="text-muted-foreground mt-1" />,
                  text: "Which languages and technologies are used in this codebase?",
                },
                {
                  icon: <Settings className="text-muted-foreground mt-1" />,
                  text: "How do I set up and run this project locally?",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-center flex-col items-center gap-3 p-3 bg-background rounded-lg border border-border cursor-pointer hover:bg-muted transition"
                  onClick={() => setInput(item.text)}
                >
                  {item.icon}
                  <p className="text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* chat messages */}
        <div className="space-y-4">
          {chats.map((chat, ind) => {
            return (
              <div key={ind} className="bg-secondary p-2 rounded-md">
                <p>{chat.message}</p>
                <Button
                  variant={"link"}
                  value={chat.response}
                  onClick={() => {
                    setCurrentMarkdown(chat.response);
                    if (window.innerWidth < 768) setView("canvas");
                  }}
                  className="pl-0"
                >
                  View Response
                </Button>
              </div>
            );
          })}
        </div>

        {/* input */}
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

      {/* Right Box (Canvas) */}
      <div
        className={`w-full md:w-1/2 p-6 overflow-y-auto ${
          view === "chat" ? "hidden md:block" : ""
        }`}
      >
        <header className="flex flex-col gap-2 mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Canvas</h2>
          <small className="font-medium">(dark mode not available)</small>
        </header>

        {/* Back button on mobile */}
        {view === "canvas" && (
          <Button
            onClick={() => setView("chat")}
            className="mb-4 block md:hidden"
          >
            Back to Chat
          </Button>
        )}

        <div className="prose max-w-none">
          <Markdown>{currentMarkdown}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
