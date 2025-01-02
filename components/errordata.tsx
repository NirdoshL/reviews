import { AlertCircle, RefreshCcw } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function Errordata() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-red-500 mb-4">
        <AlertCircle size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">
        Error Loading Data
      </h1>
      <p className="text-gray-600 mb-4 text-center max-w-md">
        We&apos;re sorry, but there was a problem loading the data. Please try
        again later or contact support if the issue persists.
      </p>
      <Button className="flex items-center">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Please Refresh
      </Button>
    </div>
  );
}
