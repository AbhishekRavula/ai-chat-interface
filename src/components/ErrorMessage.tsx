import React from "react";
import { X } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="mr-2">{message}</div>
        <button
          aria-label="Close Toast"
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
