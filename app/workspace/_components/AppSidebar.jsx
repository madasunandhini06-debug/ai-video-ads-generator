"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings2Icon, Video, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "Create Ad",
    icon: Video,
    path: "/workspace/create-ad",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Settings",
    icon: Settings2Icon,
    path: "/workspace/settings",
  },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          style={{ height: "auto" }}
        />
      </SidebarHeader>

      <hr />

      <SidebarContent>
        <SidebarGroup>
          <Link href="/workspace/create-ad">
            <Button className="mt-5 w-full">+ Create New Ad Video</Button>
          </Link>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-5">
                    <Link
                      href={menu.path}
                      className={`text-[17px] ${
                        path === menu.path ? "text-primary bg-blue-100" : ""
                      }`}
                    >
                      <menu.icon className="h-10 w-10" />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;