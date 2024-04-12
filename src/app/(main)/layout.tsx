import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
