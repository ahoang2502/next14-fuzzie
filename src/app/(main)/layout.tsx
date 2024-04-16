import React from "react";

import { Sidebar } from "@/components/sidebar";
import { InfoBar } from "@/components/infobar";
import { ModalProvider } from "@/providers/ModalProvider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen ">
      <Sidebar />

      <div className="w-full">
        <InfoBar />
        <ModalProvider>{children}</ModalProvider>
      </div>
    </div>
  );
};

export default MainLayout;
