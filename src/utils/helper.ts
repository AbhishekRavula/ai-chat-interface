import { Message } from "../store";

export const getReadableTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const downloadChatHistory = (messages: Message[]) => {
  const content = messages.map(({ timestamp, role, content }) => ({
    timestamp: getReadableTimestamp(timestamp),
    sender: role,
    message: content,
  }));

  const jsonContent = JSON.stringify(content, null, 2); // pretty-print JSON

  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "chat-history.json";

  link.click();
  URL.revokeObjectURL(url);
};
