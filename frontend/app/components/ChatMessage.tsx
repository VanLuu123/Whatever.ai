import { Message } from "../types";
import React from "react";
import BounceLoading from "./BounceLoading";

const ChatMessage: React.FC<Message> = ({ text, sender }) => {
  const isLoading = text === "__loading__";

  const formatContent = (content: string) => {
    if (!content || isLoading) return content;

    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, pIndex) => {
      if (paragraph.includes("\n- ") || paragraph.match(/\n\d+\./)) {
        const lines = paragraph.split("\n");
        const heading =
          !lines[0].startsWith("- ") && !lines[0].match(/^\d+\./)
            ? lines[0]
            : null;

        const listItems = lines
          .filter((line) => line.startsWith("- ") || line.match(/^\d+\./))
          .map((line) => line.replace(/^- /, "").replace(/^\d+\.\s*/, ""));

        return (
          <div key={pIndex} className="mb-3">
            {heading && <p className="font-medium mb-2">{heading}</p>}
            <ul className="list-disc pl-5 space-y-1">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
        const code = paragraph.substring(3, paragraph.length - 3);
        return (
          <pre
            key={pIndex}
            className="bg-gray-800 text-gray-100 p-3 rounded-md my-2 overflow-x-auto text-sm font-mono"
          >
            {code}
          </pre>
        );
      } else {
        return (
          <p key={pIndex} className="mb-2">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div
      className={`flex w-full my-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar for AI */}
      {sender === "ai" && (
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
          AI
        </div>
      )}

      <div
        className={`px-4 py-3 rounded-lg shadow-sm ${
          sender === "user"
            ? "bg-blue-600 text-white max-w-[80%]"
            : "bg-white border border-gray-200 text-gray-800 max-w-[85%]"
        }`}
      >
        {isLoading ? (
          <BounceLoading />
        ) : (
          <div className={`${sender === "ai" ? "text-left" : ""}`}>
            {formatContent(text)}
          </div>
        )}
      </div>

      {/* Avatar for user */}
      {sender === "user" && (
        <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs ml-2 flex-shrink-0">
          You
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
