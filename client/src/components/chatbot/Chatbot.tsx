import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// Message type definition
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Vedansh's virtual assistant. How can I help you today? Feel free to ask me about Vedansh's skills, education, experience, or projects.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }
      
      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 shadow-lg"
        variant={isOpen ? "secondary" : "default"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-background border border-border rounded-md shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-4 font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chat with Vedansh's AI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 max-w-[85%] ${
                    message.sender === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <div className="whitespace-pre-wrap">{message.text}</div>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none text-white">
                        <ReactMarkdown>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-xs mt-1 text-muted-foreground ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 max-w-[85%] mr-auto">
                  <div className="p-3 rounded-lg bg-secondary text-white flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-card">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}