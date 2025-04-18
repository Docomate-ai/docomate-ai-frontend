import React, { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  messages?: string[];
  intervalSeconds?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  messages,
  intervalSeconds = 2,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === messages.length - 1) {
          return messages.length - 1;
        }
        return (prevIndex + 1) % messages.length;
      });
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [messages, intervalSeconds]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Pulsating Dots Animation */}
        <div className="flex space-x-2">
          <div className="w-5 h-5 bg-violet-400 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-violet-600 rounded-full animate-bounce delay-200"></div>
          <div className="w-5 h-5 bg-violet-800 rounded-full animate-bounce delay-400"></div>
        </div>

        {/* Rotating Messages */}
        {messages && messages.length > 0 && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {messages[currentIndex]}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
