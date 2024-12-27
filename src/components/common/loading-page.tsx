import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingPageProps {
  message: string;
}
export const LoadingPage = ({ message }: LoadingPageProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin" />
      {message}
    </div>
  );
};
