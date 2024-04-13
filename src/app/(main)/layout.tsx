import React from "react";

import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />

      <div className="w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
