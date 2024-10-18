import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import aiAvatar from "../assets/icons/ai-avatar.png";
import userAvatar from "../assets/icons/user-avatar.png";
import { Message, Sender } from "../store";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4 z-0">
      {messages.map((message, index) => {
        const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={message.id}
            className={`flex gap-2 transform transition-all duration-300 ease-in-out"
             ${message.sender === Sender.USER ? "flex-row-reverse" : "flex-row"}
             ${index === messages.length - 1 ? "animate-fade-in-up" : ""}
            `}
          >
            <img
              src={message.sender === Sender.USER ? userAvatar : aiAvatar}
              alt={`${message.sender} avatar`}
              className="w-6 h-6 rounded-full"
            />
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-xl px-4 py-2 rounded-lg break-words text-message overflow-x-auto custom-scrollbar 
                ${message.sender === Sender.AI ? "markdown" : ""}
                ${
                  message.sender === Sender.USER
                    ? "bg-user-message-bg text-user-message-text"
                    : "bg-ai-message-bg text-ai-message-text"
                }`}
            >
              {message.sender === Sender.AI ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                <span>{message.text}</span>
              )}
              <div className="flex justify-end">
                <span className="text-xs opacity-75">{timestamp}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
