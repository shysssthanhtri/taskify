import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { type TProjectEntity } from "@/entities/project.entity";

interface ProjectsNavProps {
  projects: Pick<TProjectEntity, "id" | "name">[];
}
export const ProjectsNav = ({ projects }: ProjectsNavProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarGroupContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
