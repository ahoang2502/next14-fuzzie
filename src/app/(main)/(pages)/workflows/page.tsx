import React from "react";

import { WorkflowButton } from "./_components/WorkflowButton";

const WorkflowsPage = () => {
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Workflows
      </h1>

      <WorkflowButton />
    </div>
  );
};

export default WorkflowsPage;
