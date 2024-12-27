import { useTheme } from "next-themes";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsPageLayout } from "@/page-implementations/settings/settings-page-layout";

export const SettingsAppearance = () => {
  const { theme, setTheme } = useTheme();
  const themeOptions = [
    {
      title: "Light",
      value: "light",
    },
    {
      title: "Dark",
      value: "dark",
    },
    {
      title: "System",
      value: "system",
    },
  ];
  return (
    <SettingsPageLayout>
      <div>Select your themes</div>
      <Select onValueChange={setTheme} value={theme}>
        <SelectTrigger>
          <SelectValue placeholder="Select your theme" />
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsPageLayout>
  );
};
