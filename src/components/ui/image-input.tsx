import React, { type ChangeEvent, useCallback, useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageInputProps {
  value: string | File | null | undefined;
  onChange?: (value: File | undefined) => void;
}
export const ImageInput = ({ value, onChange }: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const previewImage = useMemo(() => {
    if (value instanceof File) return URL.createObjectURL(value);
    return value ?? undefined;
  }, [value]);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      onChange?.(file);
    },
    [onChange],
  );

  const onChooseFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <>
      <div className="group relative h-[150px] w-[150px] rounded-lg border border-input p-4">
        <img src={previewImage} className="h-full w-full" />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            value &&
              "transform opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          )}
        >
          <Button type="button" onClick={onChooseFile} size="sm">
            {value ? "Replace" : "Upload"}
          </Button>
        </div>
      </div>
      <Input
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        className="hidden"
        accept="image/*"
      />
    </>
  );
};
