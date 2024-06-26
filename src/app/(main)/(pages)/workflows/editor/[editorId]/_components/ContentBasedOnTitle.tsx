"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import { ConnectionProviderProps } from "@/providers/ConnectionsProvider";
import { EditorState } from "@/providers/EditorProvider";
import { Option } from "@/store";
import { nodeMapper } from "@/lib/types";
import { AccordionContent } from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { onContentChange } from "@/lib/editor-utils";
import { GoogleFileDetails } from "./GoogleFileDetails";
import { GoogleDriveFiles } from "./GoogleDriveFiles";
import { ActionButton } from "./ActionButton";

type Props = {
  nodeConnection: ConnectionProviderProps;
  newState: EditorState;
  file: string;
  setFile: (googleFile: any) => void;
  selectedSlackChannels: Option[];
  setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void;
};

export const ContentBasedOnTitle = ({
  nodeConnection,
  newState,
  file,
  setFile,
  selectedSlackChannels,
  setSelectedSlackChannels,
}: Props) => {
  const { selectedNode } = newState.editor;
  const title = selectedNode.data.title;

  useEffect(() => {
    const reqGoogle = async () => {
      const response: { data: { message: { files: any } } } = await axios.get(
        "/api/drive"
      );

      if (response) {
        console.log(response.data.message.files[0]);

        toast.message("Fetched File");
        setFile(response.data.message.files[0]);
      } else toast.error("Something went wrong");
    };
    
    reqGoogle();
  }, []);

  //   @ts-ignore
  const nodeConnectionType: any = nodeConnection[nodeMapper[title]];

  if (!nodeConnection) return <p>Not connected</p>;

  const isConnected =
    title === "Google Drive"
      ? !nodeConnection.isLoading
      : !!nodeConnectionType[
          `${
            title === "Slack"
              ? "slackAccessToken"
              : title === "Discord"
              ? "webhookURL"
              : title === "Notion"
              ? "accessToken"
              : ""
          }`
        ];

  if (!isConnected) return <p>Not connected</p>;

  return (
    <AccordionContent>
      <Card>
        {title === "Discord" && (
          <CardHeader>
            <CardTitle>{nodeConnectionType.webhookName}</CardTitle>

            <CardDescription>{nodeConnectionType.guildName}</CardDescription>
          </CardHeader>
        )}

        <div className="flex flex-col gap-3 px-6 py-3 pb-20">
          <p className="">
            {title === "Notion" ? "Values to be stored" : "Message"}
          </p>

          <Input
            type="text"
            value={nodeConnectionType.content}
            onChange={(event) => onContentChange(nodeConnection, title, event)}
          />

          {JSON.stringify(file) !== "{}" && title !== "Google Drive" && (
            <Card className="w-full">
              <CardContent className="px-2 py-3">
                <div className="flex flex-col gap-4">
                  <CardDescription>Drive File</CardDescription>

                  <div className="flex flex-wrap gap-2">
                    <GoogleFileDetails
                      nodeConnection={nodeConnection}
                      title={title}
                      gFile={file}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {title === "Google Drive" && <GoogleDriveFiles />}

          <ActionButton
            currentService={title}
            nodeConnection={nodeConnection}
            channels={selectedSlackChannels}
            setChannels={setSelectedSlackChannels}
          />
        </div>
      </Card>
    </AccordionContent>
  );
};
