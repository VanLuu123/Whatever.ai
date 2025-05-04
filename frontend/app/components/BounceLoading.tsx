import React from "react";
// Bounce loading animation
const BounceLoading = () => {
  return (
    <div className="flex gap-1 items-center rounded-lg">
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" />
    </div>
  );
};

export default BounceLoading;
