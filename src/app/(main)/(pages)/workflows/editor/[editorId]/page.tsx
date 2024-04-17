import React from "react";

import { EditorProvider } from "@/providers/EditorProvider";
import { ConnectionsProvider } from "@/providers/ConnectionsProvider";
import { EditorCanvas } from "./_components/EditorCanvas";

const EditorIdPage = () => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default EditorIdPage;
