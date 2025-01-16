import React from "react";

export default function Loader() {
  return (
    <div className="w-screen z-50 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
