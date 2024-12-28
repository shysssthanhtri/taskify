import { Plus } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { type TTeamEntity } from "@/entities/team.entity";
import { useTeams } from "@/hooks/use-teams";
import { CreateTeamDialog } from "@/page-implementations/boards/shared/dialogs/create-team.dialog";

export const TeamsSelect = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { teams, setActiveTeamId, activeTeamId, isCreating, create } =
    useTeams();

  const onValueChange = (value: string) => {
    if (value !== CREATE_NEW_TEAM_VALUE) {
      setActiveTeamId(value);
      return;
    }

    setIsDialogOpen(true);
  };

  const onSubmit = (team: Pick<TTeamEntity, "name">) => {
    create(team, {
      onSuccess: (newTeam) => {
        setIsDialogOpen(false);
        setActiveTeamId(newTeam.id);
      },
    });
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Teams</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            onValueChange={onValueChange}
            value={activeTeamId ?? CREATE_NEW_TEAM_VALUE}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
              <SelectSeparator />
              <SelectItem value={CREATE_NEW_TEAM_VALUE}>
                <div className="flex items-center gap-x-2">
                  <Plus className="size-4" />
                  <span>Create new team</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>
      <CreateTeamDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isPending={isCreating}
        onSubmit={onSubmit}
      />
    </>
  );
};

const CREATE_NEW_TEAM_VALUE = `taskify-create-new-team-${new Date().toISOString()}`;
