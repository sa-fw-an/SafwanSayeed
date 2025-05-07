import { Html, useProgress } from "@react-three/drei";
import React from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center font-sans text-center p-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500" />
        <h2 className="text-zinc-900 dark:text-white mt-4 text-lg">
          Loading...
        </h2>
        <p className="text-sm text-gray-300 dark:text-gray-400 font-bold mt-2">
          {progress ? `${progress.toFixed(2)}%` : "Loading..."}
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
