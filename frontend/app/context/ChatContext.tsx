"use client";

import React, { useContext, useState, createContext, useEffect } from "react";
import { Message } from "../types";
import { v4 as uuidv4 } from "uuid";

type ChatContextType = {
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  clearChat: () => void;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string;
  setSessionId: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    let currentSessionId;

    if (storedSessionId) {
      currentSessionId = storedSessionId;
    } else {
      currentSessionId = uuidv4();
      localStorage.setItem("sessionId", currentSessionId);
    }
    setSessionId(currentSessionId);
    const loadChatHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/chats/${currentSessionId}`
        );
        if (res.ok) {
          const messages = await res.json();
          setChatMessages(messages);
        } else {
          console.error("Failed to load chat history:", res.status);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadChatHistory();
  }, []);

  const clearChat = () => {
    setChatMessages([]);
    const newSessionId = uuidv4();
    localStorage.setItem("sessionId", newSessionId);
    setSessionId(newSessionId);
  };

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        setChatMessages,
        isStreaming,
        setIsStreaming,
        clearChat,
        sessionId,
        setSessionId,
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
