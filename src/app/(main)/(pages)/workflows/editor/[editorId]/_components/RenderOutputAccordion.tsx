"use client";

import React from "react";

import { ConnectionProviderProps } from "@/providers/ConnectionsProvider";
import { EditorState } from "@/providers/EditorProvider";
import { useFuzzieStore } from "@/store";
import { ContentBasedOnTitle } from "./ContentBasedOnTitle";

type Props = {
  state: EditorState;
  nodeConnection: ConnectionProviderProps;
};

export const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useFuzzieStore();

  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
};
