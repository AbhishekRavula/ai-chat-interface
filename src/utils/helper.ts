import { Message } from "../store";

export const getReadableTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const downloadChatHistory = (messages: Message[]) => {
  const headers = ["Timestamp", "Sender", "Message"];
  const rows = messages.map((msg) =>
    [getReadableTimestamp(msg.timestamp), msg.role, msg.content].join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "chat-history.csv";

  link.click();
  URL.revokeObjectURL(url);
};
