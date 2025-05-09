"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Message } from "./types";
import ChatBox from "./components/ChatBox";
import { FaChevronRight } from "react-icons/fa6";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useChat } from "./context/ChatContext";
import { config } from "./config";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(true); // Initially show the modal
  const {
    chatMessages,
    setChatMessages,
    isStreaming,
    setIsStreaming,
    sessionId,
  } = useChat();
  const { isSignedIn, isLoaded } = useSession(); // Get isLoaded from useSession
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const currentAiMessage = useRef("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Only hide if Clerk is loaded AND user is signed in
      setShowAuthModal(false);
    } else if (isLoaded && !isSignedIn) {
      // Show modal if Clerk is loaded and NOT signed in
      setShowAuthModal(true);
    }
  }, [isSignedIn, isLoaded]);

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;

    if (!isSignedIn) {
      setShowAuthModal(true); // Show auth modal if not signed in
      return;
    }

    // ... (Your existing handleSubmit logic - backend calls, etc.)
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [chatMessages]);

  return (
    <section className="flex flex-col min-h-screen text-black bg-white justify-center">
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              Authentication Required
            </h2>
            <p className="mb-4">Please sign in or sign up to continue.</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Your chat interface */}
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
              disabled={isStreaming || !isSignedIn} // Disable input if loading or not signed in
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-gray-600 hover:bg-gray-500 text-white p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              aria-label="submit"
              disabled={isStreaming || !isSignedIn}
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
