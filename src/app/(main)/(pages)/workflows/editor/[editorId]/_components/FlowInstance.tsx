"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useNodeConnections } from "@/providers/ConnectionsProvider";
import { Button } from "@/components/ui/button";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../../../_actions/workflow-connections";

type Props = {
  children: React.ReactNode;
  edges: any[];
  nodes: any[];
};

export const FlowInstance = ({ children, edges, nodes }: Props) => {
  const [isFlow, setIsFlow] = useState([]);
  const pathname = usePathname();
  const { nodeConnection } = useNodeConnections();

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      pathname.split("/").pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );

    if (flow) toast.message(flow.message);
  }, [nodeConnection]);

  const onPublishWorkFlow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split("/").pop()!, true);

    if (response) toast.message(response);
  }, []);

  const onAutomateFlow = async () => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);

    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      });
    });

    setIsFlow(flows);
  };

  useEffect(() => {
    onAutomateFlow();
  }, [edges]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>

        <Button onClick={onPublishWorkFlow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      </div>

      {children}
    </div>
  );
};
