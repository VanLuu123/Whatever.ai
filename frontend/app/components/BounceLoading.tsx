import React from "react";

const BounceLoading = () => {
  return (
    <div className="flex gap-1 items-center bg-gray-200 rounded-lg">
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" />
    </div>
  );
};

export default BounceLoading;
