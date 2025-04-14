import ChatMessage from "./ChatMessage";
import { Message } from "../types";

import React from "react";

type ChatBoxProps = {
  messages: Message[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="space-y-2 pb-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatBox;
