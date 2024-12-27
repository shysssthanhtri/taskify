import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
  user: z.infer<typeof formSchema>;
}
export const ProfileForm = ({ user }: ProfileFormProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
};

const formSchema = z.object(UserEntity.shape).pick({
  name: true,
  email: true,
  image: true,
  alias: true,
});
