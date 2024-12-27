import { type LucideIcon, Palette, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/config/routes";
import { cn } from "@/lib/utils";

export const SettingsPageSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="">
      <nav className="flex flex-col gap-y-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.path
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "w-[250px] justify-start",
            )}
          >
            <item.icon />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

type Item = {
  title: string;
  path: string;
  icon: LucideIcon;
};
const items: Item[] = [
  {
    title: "Profile",
    path: Routes.settings.profile,
    icon: User,
  },
  {
    title: "Appearance",
    path: Routes.settings.appearance,
    icon: Palette,
  },
];
