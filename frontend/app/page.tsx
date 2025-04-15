"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import cat from "../imgs/cat_img.png";
import api from "./api";
import { Message } from "./types";
import ChatBox from "./components/ChatBox";
import { FaChevronRight } from "react-icons/fa6";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatmessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    // temp makes new chat by reloading page (will change later)
    const shouldClear = localStorage.getItem("clear_chat");
    if (shouldClear === "true") {
      setChatMessages([]);
      localStorage.removeItem("clear_chat");
    }
  }, []);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: "user",
    };

    // dummy loading message for AI
    const loadingMessage: Message = {
      text: "__loading__",
      sender: "ai",
    };

    // Add user's message and a temporary AI "typing" message to simulate loading
    const newMessages: Message[] = [
      ...chatmessages,
      { text: inputValue, sender: "user" },
      { text: "__loading__", sender: "ai" },
    ];
    setChatMessages(newMessages);
    setInputValue("");

    // API POST req to send User Query to Backend
    try {
      const response = await api.post("/recommend", {
        chatmessages: [...chatmessages, userMessage],
      });

      const aiResponse: Message = {
        text: response.data.recommendation,
        sender: "ai",
      };

      setChatMessages([...chatmessages, userMessage, aiResponse]);
    } catch (error: any) {
      console.error("Error Sending Request", error);
      setChatMessages([
        ...chatmessages,
        userMessage,
        { text: "Sorry, something went wrong. 😕", sender: "ai" },
      ]);
    }
  };

  return (
    <section className="flex flex-col min-h-screen text-black bg-white justify-center">
      <div
        className={
          chatmessages.length === 0
            ? "flex flex-col items-center"
            : "flex-grow overflow-y-auto px-4 py-6"
        }
      >
        <div className="max-w-2xl mx-auto w-full">
          {chatmessages.length === 0 && (
            <div className="flex justify-center items-center mb-6">
              <Image src={cat} alt="I love coffee!" width={100} height={100} />
              <h1 className="text-3xl font-bold mt-4">Coffee GPT</h1>
            </div>
          )}
          <ChatBox messages={chatmessages} />
        </div>
      </div>

      <div
        className={`w-full ${
          chatmessages.length === 0
            ? "relative items-center"
            : "border-t border-gray-200 bg-white px-4 py-3 sticky bottom-0"
        }`}
      >
        <form
          className="max-w-2xl mx-auto flex items-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-12 px-6 rounded-full border border-gray-300 focus:outline-none bg-white text-base text-gray-700"
            placeholder="Ask me anything..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full focus:outline-none"
          >
            <FaChevronRight className="text-white text-lg" />
          </button>
        </form>
      </div>
    </section>
  );
}
