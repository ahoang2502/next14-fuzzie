import React from "react";

import { WorkflowCard } from "./WorkflowCard";

export const Workflows = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <WorkflowCard
          description="cre"
          id="jsl"
          name="auto"
          isPublish={false}
        />
      </section>
    </div>
  );
};
