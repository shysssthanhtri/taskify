import { Ban } from "lucide-react";
import React from "react";

interface ForbiddenPageProps {
  message?: string;
}
export const ForbiddenPage = ({
  message = "You are not allowed",
}: ForbiddenPageProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Ban className="h-8 w-8" />
      {message}
    </div>
  );
};
