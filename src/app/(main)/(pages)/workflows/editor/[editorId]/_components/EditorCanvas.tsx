"use client";

import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, { ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";
import { v4 } from "uuid";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";
import EditorCanvasCardSingle from "./EditorCanvasCardSingle";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";

type Props = {};

const initialNodes: EditorNodeType[] = [];

const initialEdges: {
  id: string;
  source: string;
  target: string;
}[] = [];

export const EditorCanvas = ({}: Props) => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const { dispatch, state } = useEditor();
  const pathname = usePathname();

  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      "Google Drive": EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      "Custom Webhook": EditorCanvasCardSingle,
      "Google Calendar": EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    []
  );

  //   WIP Add loader

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow"
      );

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.type === "Trigger"
      );

      if (type === "Trigger" && triggerAlreadyExists) {
        toast("Only one trigger can be added to automations at the moment");
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, state]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(() =>{},[])

  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <div
            className="relative"
            style={{ width: "100%", height: "100%", paddingBottom: "70px" }}
          >
            <ReactFlow
              className="w-[300px]"
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodes={state.editor.elements}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              fitView
              onClick={handleClickCanvas}
              nodeTypes={nodeTypes}
            ></ReactFlow>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
