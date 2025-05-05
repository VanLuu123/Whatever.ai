import React from "react";

interface ChatMessageProps {
  text: string;
  sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  const isUser = sender === "user";

  const parseFormattedSections = () => {
    const lines = text.split("\n").filter(Boolean);
    const elements: React.ReactNode[] = [];
    let currentSection: string | null = null;

    lines.forEach((line, index) => {
      if (line.startsWith("## ")) {
        currentSection = line.replace("## ", "").trim();
        elements.push(
          <h3
            key={`section-${index}`}
            className="mt-4 mb-2 text-lg font-semibold text-gray-700"
          >
            {currentSection}
          </h3>
        );
      } else if (line.startsWith("**") && line.includes("**")) {
        const nameMatch = line.match(/\*\*(.*?)\*\*/);
        const name = nameMatch ? nameMatch[1] : "";
        const details = line
          .replace(/\*\*(.*?)\*\*/, "")
          .trim()
          .replace(/^[-–]\s*/, "");

        // Extract extra info (Cuisine, Rating, etc.)
        const cuisineMatch = details.match(/Cuisine:\s?(.*?)(?=\s?[-–]|$)/i);
        const ratingMatch = details.match(/Rating:\s?(.*?)(?=\s?[-–]|$)/i);
        const priceMatch = details.match(/Price:\s?(.*?)(?=\s?[-–]|$)/i);
        const highlightsMatch = details.match(/[-–]\s?(.*)$/i);

        elements.push(
          <div
            key={`item-${index}`}
            className="mb-3 p-3 border rounded-lg bg-white shadow-sm text-sm text-gray-800"
          >
            <div className="font-bold text-base text-blue-700">{name}</div>
            {cuisineMatch && (
              <div>
                <span className="font-semibold">Cuisine:</span>{" "}
                {cuisineMatch[1]}
              </div>
            )}
            {ratingMatch && (
              <div>
                <span className="font-semibold">Rating:</span> ⭐{" "}
                {ratingMatch[1]}
              </div>
            )}
            {priceMatch && (
              <div>
                <span className="font-semibold">Price:</span> {priceMatch[1]}
              </div>
            )}
            {highlightsMatch && (
              <div>
                <span className="font-semibold">Highlights:</span>{" "}
                {highlightsMatch[1]}
              </div>
            )}
          </div>
        );
      } else if (line.startsWith("**") && !line.includes("**", 2)) {
        // Bold text (for top-level descriptions)
        elements.push(
          <p
            key={`bold-${index}`}
            className="font-semibold text-gray-900 mt-2 mb-1"
          >
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else {
        // Fallback for any other paragraph
        elements.push(
          <p key={`text-${index}`} className="text-gray-800 mb-2">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div
      className={`my-2 px-4 py-3 rounded-xl max-w-2xl ${
        isUser
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-50 text-gray-900 self-start border"
      }`}
    >
      {parseFormattedSections()}
    </div>
  );
};

export default ChatMessage;
