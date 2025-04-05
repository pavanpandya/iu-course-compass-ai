import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Bot, User } from "lucide-react";
import { API_BASE_URL } from "@/config";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isHTML?: boolean; 
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your IU Course Compass AI assistant. How can I help you find courses or answer questions about IU Bloomington classes?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response, 
        isUser: false,
        timestamp: new Date(),
        isHTML: true, 
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
      <div className="bg-iu-crimson text-white py-3 px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">IU Course Compass AI</h3>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? "bg-iu-crimson text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!message.isUser && <Bot className="h-4 w-4" />}
                  <span className="font-medium text-sm">
                    {message.isUser ? "You" : "Course Compass AI"}
                  </span>
                  {message.isUser && <User className="h-4 w-4" />}
                  <span className="text-xs opacity-70 ml-auto">
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                {/* 🔥 HTML rendering here */}
                <div className="text-sm whitespace-pre-line">
                  {message.isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text.trim() }} />
                  ) : (
                    <p>{message.text.trim()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder="Ask about courses, professors, or requirements..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button
            type="submit"
            className="h-10 w-10 p-0"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            className="h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            disabled={isLoading}
            title="Voice input (coming soon)"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
