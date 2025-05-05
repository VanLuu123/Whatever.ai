"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import cat from "../imgs/cat_img.png";
import { Message } from "./types";
import ChatBox from "./components/ChatBox";
import { FaChevronRight } from "react-icons/fa6";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useChat } from "./context/ChatContext";
import { config } from "./config";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const {
    chatMessages,
    setChatMessages,
    isStreaming,
    setIsStreaming,
    sessionId,
  } = useChat();
  const currentAiMessage = useRef("");

  //auto scrolling feature
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [chatMessages]);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = {
      text: inputValue,
      sender: "user",
    };

    try {
      await fetch(`${config.backendUrl}/chats/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputValue,
          sender: "user",
          session_id: sessionId,
        }),
      });
      console.log("Saving User Message");
    } catch (error) {
      console.log("Error saving user input", error);
    }

    // Add user's message and a temporary AI "typing" message to simulate loading
    const newMessages: Message[] = [
      ...chatMessages,
      { text: inputValue, sender: "user" },
      { text: "__loading__", sender: "ai" },
    ];
    setChatMessages(newMessages);
    setInputValue("");
    setIsStreaming(true);
    currentAiMessage.current = "";

    // API POST req to send User Query to Backend
    try {
      await fetchEventSource(`${config.backendUrl}/recommend/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatmessages: [...chatMessages, userMessage] }),
        // checks if the SSE connection is opened and connected
        onopen: async (response) => {
          if (response.ok) {
            console.log("Server Sent Event Connection Established");
            return;
          }
          console.log("Server Sent Event Connection Error", response.status);
          setIsStreaming(false);
          throw new Error(
            `Server Sent Event Connection Error, status ${response.status}`
          );
        },
        // accepts the stream of events from backend and appends onto the AI message
        onmessage: async (event) => {
          if (event.data === "[DONE]") {
            try {
              await fetch(`${config.backendUrl}/chats/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  text: currentAiMessage.current,
                  sender: "ai",
                  session_id: sessionId,
                }),
              });
              console.log("Saving AI Message");
            } catch (error) {
              console.log("Error Saving AI Message", error);
            }
            setIsStreaming(false);
            return;
          }
          try {
            currentAiMessage.current += event.data;
            setChatMessages((prev) => {
              const last = prev[prev.length - 1];

              if (last.sender === "ai") {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: currentAiMessage.current },
                ];
              } else {
                return [
                  ...prev,
                  { text: currentAiMessage.current, sender: "ai" },
                ];
              }
            });
          } catch (error) {
            console.log("Fetch on message error", error);
          }
        },
        onerror(error) {
          console.log("Server Sent Event Error", error);
          setIsStreaming(false);
          setChatMessages((prev) => [
            ...prev,
            {
              text: "Sorry, something went wrong with the AI. 😕",
              sender: "ai",
            },
          ]);
          throw error;
        },
        onclose() {
          console.log("Server Sent Event Closed.");
          setIsStreaming(false);
        },
      });
    } catch (error) {
      console.error("Error setting up SSE:", error);
      setIsStreaming(false);
    } finally {
      setIsStreaming(false); // Ensure streaming state is reset incase backend fails
    }
  };

  return (
    <section className="flex flex-col min-h-screen text-black bg-white justify-center">
      <div
        className={
          chatMessages.length === 0
            ? "flex flex-col items-center"
            : "flex-grow overflow-y-auto px-4 py-6"
        }
      >
        <div className="max-w-2xl mx-auto w-full">
          {chatMessages.length === 0 && (
            <div className="flex justify-center items-center mb-6">
              <h1 className="text-3xl font-bold mt-4">
                Hello, Need Recommendations?
              </h1>
            </div>
          )}
          <ChatBox messages={chatMessages} />
        </div>
      </div>

      <div
        className={`w-full ${
          chatMessages.length === 0
            ? "relative items-center"
            : "border-t border-gray-200 bg-white px-4 py-3 sticky bottom-0 shadow-sm"
        }`}
      >
        <form
          className="max-w-2xl mx-auto flex items-center w-full"
          onSubmit={handleSubmit}
          id="chatbox"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-12 px-6 pr-12 rounded-full border border-gray-300 focus:outline-none bg-gray-50 text-base text-gray-700 shadow-sm"
              placeholder="Ask me anything..."
              disabled={isStreaming}
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-gray-600 hover:bg-gray-500 text-white p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              aria-label="submit"
              disabled={isStreaming}
            >
              <FaChevronRight className="text-white text-lg" />
            </button>
            <div ref={ref}></div>
          </div>
        </form>
      </div>
    </section>
  );
}
