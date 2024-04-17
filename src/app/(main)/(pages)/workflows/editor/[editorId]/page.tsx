import React from "react";

import { EditorProvider } from "@/providers/EditorProvider";
import { ConnectionsProvider } from "@/providers/ConnectionsProvider";

const EditorIdPage = () => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
            <div className=""></div>
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default EditorIdPage;
