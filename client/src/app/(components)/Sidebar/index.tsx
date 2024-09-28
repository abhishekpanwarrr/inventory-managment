"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}
const SideBarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollpsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollpsed));
  };
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollpsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollpsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="https://inventorymanagment.s3.ap-south-1.amazonaws.com//logo.png"
          alt="edstock-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={`${
            isSidebarCollpsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Stock
        </h1>

        <button
          onClick={toggleSidebar}
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="w-4 h-4 " />
        </button>
      </div>
      {/* Links */}
      <div className="flex-grow mt-8">
        <SideBarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollpsed}
        />
        <SideBarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollpsed}
        />
        <SideBarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollpsed}
        />
        <SideBarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollpsed}
        />
        <SideBarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollpsed}
        />
        <SideBarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollpsed}
        />
      </div>
      {/* Footer */}
      <div className={`${isSidebarCollpsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} STOCK
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
