"use client";

import React, { useState } from "react";
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

export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={() => {}}>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Full name</FormLabel>

              <FormControl>
                <Input placeholder="John Smith" {...field} />
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
                <Input type="email" placeholder="john@gmail.com" {...field} />
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
