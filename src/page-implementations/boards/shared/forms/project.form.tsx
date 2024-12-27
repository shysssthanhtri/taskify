import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectEntity } from "@/entities/project.entity";

interface ProjectFormProps {
  project?: FormSchema;
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
}
export type ProjectFormRef = {
  submit: () => void;
};
export const ProjectForm = forwardRef<ProjectFormRef, ProjectFormProps>(
  (props, ref) => {
    const { project, onSubmit, isPending } = props;
    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: project,
    });

    const handleSubmit = useCallback(
      (value: FormSchema) => {
        onSubmit?.(value);
      },
      [onSubmit],
    );

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          void form.handleSubmit(handleSubmit)();
        },
      }),
      [form, handleSubmit],
    );

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your project's name"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);
ProjectForm.displayName = "ProjectForm";

const formSchema = z.object(ProjectEntity.shape).pick({
  name: true,
});
type FormSchema = z.infer<typeof formSchema>;
