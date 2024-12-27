import { type DialogProps } from "@radix-ui/react-dialog";
import React from "react";

import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type TTeamEntity } from "@/entities/team.entity";
import { TeamForm } from "@/page-implementations/boards/shared/forms/team.form";

interface CreateTeamDialogProps extends DialogProps {
  isPending?: boolean;
  onSubmit?: (team: Pick<TTeamEntity, "name">) => void;
}
export const CreateTeamDialog = ({
  onSubmit,
  isPending,
  ...props
}: CreateTeamDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            Teams help you to manage projects.
            <br />
            You can invite more users to collaborate.
          </DialogDescription>
        </DialogHeader>
        <TeamForm isPending={isPending} onSubmit={onSubmit} />
        <DialogFooter>
          <ButtonLoading isLoading={isPending} type="submit">
            Create
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
