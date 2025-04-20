"use client";

import React, { useContext, useState, createContext } from "react";
import { Message } from "../types";

type ChatContextType = {
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  clearChat: () => void;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        setChatMessages,
        isStreaming,
        setIsStreaming,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
