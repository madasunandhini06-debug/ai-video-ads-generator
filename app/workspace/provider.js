"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import React, { useState } from "react";
import AppSidebar from "./_components/AppSidebar";

function WorkspaceProvider({ children }) {
  const [userDetail, setUserDetail] = useState({
    _id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
    picture: "",
    credits: 999,
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full p-10">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </UserDetailContext.Provider>
  );
}

export default WorkspaceProvider;