"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { EditUserProfileSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  user: any;
  onUpdate?: any;
};

export const ProfileForm = ({ user, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleUpload = async (
    values: z.infer<typeof EditUserProfileSchema>
  ) => {
    setIsLoading(true);

    try {
      await onUpdate(values.name);
    } catch (error) {
      console.log("🔴 Error updating user info: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    form.reset({ name: user.name, email: user.email });
  }, [user]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleUpload)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Full name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="John Smith" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">
                Email{" "}
                <span className="text-sm dark:text-muted-foreground">
                  (your email cannot be modified)
                </span>
              </FormLabel>

              <FormControl>
                <Input {...field} type="email" placeholder="john@gmail.com" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="self-start bg-[#6b1cd2] text-white hover:bg-[#6b1cd2]/80 font-semibold text-base"
        >
          {isLoading ? (
            <>
              Saving <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};
