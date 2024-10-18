import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Message,
  RootState,
  Role,
  addMessage,
  setAiTyping,
  setError,
} from "../store";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import Sidebar from "./Sidebar";
import ErrorMessage from "./ErrorMessage";
import aiAvatar from "../assets/icons/ai-avatar.png";
import TypingIndicator from "./TypingIndicator";
import { Menu } from "lucide-react";
import { nanoid } from "nanoid";

const API_KEY = import.meta.env.VITE_API_KEY;

const ChatInterface: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { messages, isAiTyping, error } = useSelector(
    (state: RootState) => state.chat
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (input: string, messages: Message[]) => {
    const url =
      "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions";

    const data = {
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [...messages, { role: Role.USER, content: input }],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.7,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    const result = await response.json();
    return result.choices[0].message.content;
  };

  const getDummyAPIResponse = async (input: string) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title: "AI Response", body: input, userId: 1 }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate AI Typing

    const data = await response.json();
    return data.body;
  };

  const handleSendMessage = async (text: string) => {
    if (text.trim() === "") return;

    const userMessage = {
      id: nanoid(),
      content: text,
      role: Role.USER,
      timestamp: Date.now(),
    };

    dispatch(addMessage(userMessage));
    dispatch(setAiTyping(true));

    try {
      const aiMessage = {
        id: nanoid(),
        content: API_KEY
          ? await getAIResponse(text, messages)
          : await getDummyAPIResponse(text),
        role: Role.AI,
        timestamp: Date.now(),
      };

      dispatch(addMessage(aiMessage));
    } catch {
      dispatch(setError("Failed to get AI response. Please try again."));
    } finally {
      dispatch(setAiTyping(false));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col rounded-tl-lg rounded-bl-lg gap-1 m-2">
        <header className="bg-surface shadow-sm p-4 flex items-center h-16 rounded-lg">
          <button
            aria-label="Open Sidebar"
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2 sm:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="text-gray-800 dark:text-gray-200" />
          </button>
          <h1 className="text-xl font-semibold text-black dark:text-white ml-4">
            AI Chat Interface
          </h1>
        </header>
        <div className="flex-1 overflow-hidden bg-chat-bg rounded-lg">
          <div
            ref={chatContainerRef}
            className="h-full overflow-y-auto p-4 custom-scrollbar"
          >
            <MessageList messages={messages} />
            {isAiTyping && (
              <div className={`flex gap-2 items-center`}>
                <img
                  src={aiAvatar}
                  alt={"ai avatar"}
                  className="w-6 h-6 rounded-full"
                />
                <TypingIndicator />
              </div>
            )}
          </div>
        </div>
        <InputArea onSendMessage={handleSendMessage} />
        {!!error && (
          <ErrorMessage
            message={error}
            onClose={() => dispatch(setError(null))}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
