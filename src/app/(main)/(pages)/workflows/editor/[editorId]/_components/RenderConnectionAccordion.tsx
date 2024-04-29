"use client";

import React from "react";

import { Connection } from "@/lib/types";
import { EditorState } from "@/providers/EditorProvider";
import { useNodeConnections } from "@/providers/ConnectionsProvider";
import { useFuzzieStore } from "@/store";
import { AccordionContent } from "@/components/ui/accordion";
import { ConnectionCard } from "@/app/(main)/(pages)/connections/_components/ConnectionCard";
import { MultipleSelector } from "@/components/ui/multiple-selector";

type Props = {
  state: EditorState;
  connection: Connection;
};

export const RenderConnectionAccordion = ({ state, connection }: Props) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;

  const { nodeConnection } = useNodeConnections();
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useFuzzieStore();

  const connectionData = (nodeConnection as any)[connectionKey];
  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey]);

  return (
    <AccordionContent key={title}>
      {state.editor.selectedNode.data.title === title && (
        <>
          <ConnectionCard
            title={title}
            icon={image}
            description={description}
            type={title}
            connected={{ [title]: isConnected }}
          />

          {slackSpecial && isConnected && (
            <div className="p-6">
              {slackChannels?.length ? (
                <>
                  <div className="mb-4 ml-1">
                    Select the slack channels to send notification and messages:
                  </div>

                  <MultipleSelector
                    value={selectedSlackChannels}
                    onChange={setSelectedSlackChannels}
                    defaultOptions={slackChannels}
                    placeholder="Select channels"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
                </>
              ) : (
                "No Slack channels found. Please add your Slack bot to your Slack channel"
              )}
            </div>
          )}
        </>
      )}
    </AccordionContent>
  );
};
