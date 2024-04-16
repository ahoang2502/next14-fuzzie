"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalProvider";
import { CustomModal } from "@/components/global/CustomModal";
import { WorkflowForm } from "@/components/forms/WorkflowForm";

export const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();

  const handleOpenModal = () => {
    setOpen(
      <CustomModal
        title="Create a workflow automation"
        subheading="Workflows is a powerful tool that helps you automate tasks."
      >
        <WorkflowForm />
      </CustomModal>
    );
  };

  return (
    <Button size="icon" onClick={handleOpenModal} className="">
      <Plus />
    </Button>
  );
};
