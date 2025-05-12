"use client";

import React from "react";
import Image from "next/image";
import cat from "/imgs/cat_img.png";
import { GoSidebarCollapse } from "react-icons/go";
import { BiMessageAdd } from "react-icons/bi";
import { useChat } from "../context/ChatContext";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { clearChat } = useChat();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="fixed w-full px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button className="text-gray-800 hover:text-black transition">
          <GoSidebarCollapse size={20} />
        </button>
        <a onClick={clearChat} aria-label="refresh page">
          <Image
            src={cat}
            alt="cat"
            width={50}
            height={50}
            className="rounded-full hover:opacity-80 transition-opacity cursor-pointer"
          />
        </a>
        <h1 className="text-xl font-bold text-gray-800">Whatever.AI</h1>
      </div>

      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={clearChat}
              className="text-gray-700 hover:text-black transition md:mr-2"
              aria-label="New Chat"
            >
              <BiMessageAdd size={20} />
            </button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
