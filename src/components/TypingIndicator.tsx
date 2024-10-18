import React from "react";

const TypingIndicator = () => {
  return (
    <div
      className="flex items-center justify-start mt-2"
      aria-live="polite"
      aria-label="AI is typing"
    >
      <div className="bg-ai-message-bg rounded-full p-2 flex space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
