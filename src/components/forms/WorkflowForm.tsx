"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { WorkflowFormSchema } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/providers/ModalProvider";
import { onCreateWorkflow } from "@/app/(main)/(pages)/workflows/_actions/workflow-connections";

type Props = {
  title?: string;
  subTitle?: string;
};

export const WorkflowForm = ({ title, subTitle }: Props) => {
  const router = useRouter();
  const { setClose } = useModal();

  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
    const workflow = await onCreateWorkflow(values.name, values.description);

    if (workflow) {
      toast.message(workflow.message);
      router.refresh();
    }

    setClose();
  };

  return (
    <Card className="w-full max-w-[650px] border-none">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Google" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="..." />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="mt-4" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  Saving
                  <Loader2 size={18} className="ml-2 animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
