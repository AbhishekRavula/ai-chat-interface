import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import aiAvatar from "../assets/icons/ai-avatar.png";
import userAvatar from "../assets/icons/user-avatar.png";
import { Message, Role } from "../store";
import { getReadableTimestamp } from "../utils/helper";

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
        return (
          <div
            key={message.id}
            className={`flex gap-2 transform transition-all duration-300 ease-in-out"
             ${message.role === Role.USER ? "flex-row-reverse" : "flex-row"}
             ${index === messages.length - 1 ? "animate-fade-in-up" : ""}
            `}
          >
            <img
              src={message.role === Role.USER ? userAvatar : aiAvatar}
              alt={`${message.role} avatar`}
              className="w-6 h-6 rounded-full"
            />
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-xl px-4 py-2 rounded-lg break-words text-message overflow-x-auto custom-scrollbar 
                ${message.role === Role.AI ? "markdown" : ""}
                ${
                  message.role === Role.USER
                    ? "bg-user-message-bg text-user-message-text"
                    : "bg-ai-message-bg text-ai-message-text"
                }`}
            >
              {message.role === Role.AI ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <span>{message.content}</span>
              )}
              <div className="flex justify-end">
                <span className="text-xs opacity-75">
                  {getReadableTimestamp(message.timestamp)}
                </span>
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
