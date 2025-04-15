import { Message } from "../types";
import React from "react";
import BounceLoading from "./BounceLoading";

const ChatMessage: React.FC<Message> = ({ text, sender }) => {
  const isLoading = text === "__loading__";

  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-[75%] ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {isLoading ? <BounceLoading /> : text}
      </div>
    </div>
  );
};

export default ChatMessage;
