import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

// ──────────────────────────────────────────────
// PUT YOUR OPENAI API KEY HERE
// ──────────────────────────────────────────────
const OPENAI_API_KEY = "sk-REPLACE_WITH_YOUR_OPENAI_API_KEY";

const SYSTEM_PROMPT = `You are a helpful assistant that ONLY answers questions about Cognizant Technology Solutions and its offerings. You must strictly follow these rules:

1. You may ONLY discuss topics directly related to Cognizant, including but not limited to:
   - Cognizant's services: Digital Engineering, AI & Analytics, Cloud Solutions, IoT, Enterprise Application Services, Quality Engineering & Assurance, Intelligent Process Automation, Consulting, etc.
   - Cognizant's industries: Banking & Financial Services, Healthcare, Life Sciences, Insurance, Manufacturing, Retail & Consumer Goods, Communications, Media & Technology, Energy & Utilities, Travel & Hospitality, etc.
   - Cognizant's platforms and products: Cognizant Neuro, Cognizant Flowsource, Cognizant Skygrade, etc.
   - Cognizant's history, leadership, culture, careers, and corporate information.
   - Cognizant's acquisitions, partnerships, and recent news.

2. If a user asks about anything NOT related to Cognizant, politely decline and redirect them. For example: "I'm here to help with information about Cognizant and its offerings. Could you ask me something about Cognizant's services, solutions, or company information?"

3. Be professional, concise, and helpful. Use bullet points for listing services or features.
4. If you are unsure about specific Cognizant details, say so honestly rather than making up information.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Cognizant Assistant. Ask me anything about Cognizant's services, solutions, industries, or company information.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...updatedMessages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 512,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.error?.message || `API error: ${response.status}`
        );
      }

      const data = await response.json();
      const assistantContent =
        data.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I could not generate a response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMsg}. Please check the API key and try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="chatbot-fab"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold text-sm">Cognizant Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-msg ${
                  msg.role === "user" ? "chatbot-msg--user" : "chatbot-msg--bot"
                }`}
              >
                <div className="chatbot-msg-icon">
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="chatbot-msg-bubble">
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg-icon">
                  <Bot size={14} />
                </div>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-bar">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Cognizant..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chatbot-send"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
