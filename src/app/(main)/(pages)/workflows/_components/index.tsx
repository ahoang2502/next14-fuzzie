import React from "react";

import { WorkflowCard } from "./WorkflowCard";
import { onGetWorkflows } from "../_actions/workflow-connections";
import { MoreCredits } from "./MoreCredits";

export const Workflows = async () => {
  const workflows = await onGetWorkflows();

  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <MoreCredits />

        {workflows?.length ? (
          workflows.map((flow) => <WorkflowCard key={flow.id} {...flow} />)
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No workflows found.
          </div>
        )}
      </section>
    </div>
  );
};
