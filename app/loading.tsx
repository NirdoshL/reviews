"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 90) {
          return 90;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-blue-200">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <Star className="w-24 h-24 text-yellow-400" />
        </div>
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            className="text-gray-300"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="62"
            cx="80"
            cy="80"
          />
          <circle
            className="text-blue-500"
            strokeWidth="8"
            strokeDasharray={390}
            strokeDashoffset={390 - (progress / 100) * 390}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="62"
            cx="80"
            cy="80"
          />
        </svg>
      </div>
      <div className="mt-4 text-2xl font-bold text-blue-600">
        Loading Reviews...
      </div>
      <div className="mt-2 text-lg text-gray-600">
        {`${Math.round(progress)}%`}
      </div>
      <div className="mt-4 text-sm text-gray-500 max-w-md text-center">
        &quot;Great reviews take time. Just like a perfect rating, perfection is
        worth the wait!&quot;
      </div>
    </div>
  );
}
