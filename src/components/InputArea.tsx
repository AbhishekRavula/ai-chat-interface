import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

interface InputAreaProps {
  onSendMessage: (text: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");

      // To prevent loosing of focus for textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-4 rounded-lg">
      <div className="flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="max-h-36 text-black dark:text-white bg-message-input-bg flex-1 resize-none border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 mr-2 custom-scrollbar"
          rows={1}
        />
        <button
          type="submit"
          className="self-end focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          aria-label="Send Message"
        >
          <SendHorizontal className="text-gray-800 dark:text-gray-200" />
        </button>
      </div>
    </form>
  );
};

export default InputArea;
