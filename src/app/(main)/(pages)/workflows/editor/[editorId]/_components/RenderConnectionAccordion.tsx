"use client";

import React from "react";

import { Connection } from "@/lib/types";
import { EditorState } from "@/providers/EditorProvider";
import { useNodeConnections } from "@/providers/ConnectionsProvider";

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

  return <div></div>;
};
