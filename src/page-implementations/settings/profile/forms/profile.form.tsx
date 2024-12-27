import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserEntity } from "@/entities/user.entity";

interface ProfileFormProps {
  user: FormSchema;
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
}
export type ProfileFormRef = {
  submit: () => void;
};
export const ProfileForm = forwardRef<ProfileFormRef, ProfileFormProps>(
  ({ user, isPending, onSubmit }: ProfileFormProps, ref) => {
    // 1. Define your form.
    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: user,
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
            name="email"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Your display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alias</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your alias name"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Your shorten name. Used to displayed when avatar is not set.
                  Must not be more than 2 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

ProfileForm.displayName = "ProfileForm";

const formSchema = z.object(UserEntity.shape).pick({
  name: true,
  email: true,
  alias: true,
});
type FormSchema = z.infer<typeof formSchema>;
