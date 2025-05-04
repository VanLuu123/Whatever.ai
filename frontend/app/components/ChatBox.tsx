import ChatMessage from "./ChatMessage";
import { Message } from "../types";
import React from "react";

type ChatBoxProps = {
  messages: Message[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
    </>
  );
};

export default ChatBox;
