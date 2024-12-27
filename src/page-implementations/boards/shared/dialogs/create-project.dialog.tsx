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
import { type TProjectEntity } from "@/entities/project.entity";
import { ProjectForm } from "@/page-implementations/boards/shared/forms/project.form";

interface CreateProjectDialogProps extends DialogProps {
  isPending?: boolean;
  onSubmit?: (project: Pick<TProjectEntity, "name">) => void;
}
export const CreateProjectDialog = ({
  onSubmit,
  isPending,
  ...props
}: CreateProjectDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Projects help you to manage tasks.
            <br />
            You can invite more users to collaborate.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm isPending={isPending} onSubmit={onSubmit} />
        <DialogFooter>
          <ButtonLoading isLoading={isPending} type="submit">
            Create
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
