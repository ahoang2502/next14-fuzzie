"use client";

import { Plus } from "lucide-react";

import { WorkflowForm } from "@/components/forms/WorkflowForm";
import { CustomModal } from "@/components/global/CustomModal";
import { Button } from "@/components/ui/button";
import { useBilling } from "@/providers/BillingProvider";
import { useModal } from "@/providers/ModalProvider";

export const WorkflowButton = () => {
  const { setOpen, setClose } = useModal();
  const { credits } = useBilling();

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
    <Button
      size="icon"
      {...(credits !== "0"
        ? {
            onClick: handleOpenModal,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
  );
};
