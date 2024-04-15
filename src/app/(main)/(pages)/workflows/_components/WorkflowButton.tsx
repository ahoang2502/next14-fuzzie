"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalProivder";

export const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();

  const handleClick = () => {};

  return (
    <Button size="icon" onClick={handleClick} className="">
      <Plus />
    </Button>
  );
};
