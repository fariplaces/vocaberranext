'use client'
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/slices/globalSlice";
import StaticNavigations from "./StaticMenu";

const StaticNavigation = ({ sidebarOpen }) => {
  const pathName = usePathname();
  // const baseRoute = pathName.split("/")[1];
  const [expandedMenus, setExpandedMenus] = useState({});
  const dispatch = useDispatch();

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      toggleMenu(item.name);
      if (!sidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };


  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
      {StaticNavigations.map((item) => {
        const isDirectActive = item.link && pathName === item.link;
        const isSubActive = item.subItems?.some(sub => pathName === sub.href);
        const isParentActive = isDirectActive || isSubActive;
        const ParentWrapper = item.link ? Link : 'div';

        return (
          <div key={item.name}>
            <ParentWrapper
              href={item.link || "#"}
              className={`flex items-center justify-between px-4 py-2 transition-colors cursor-pointer 
          ${isParentActive ? "bg-gray-700 text-white border-r-4 border-blue-500" : "hover:bg-gray-800 text-gray-400"}
        `}
              onClick={(e) => {
                if (item.hasSubmenu) {
                  handleItemClick(item);
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${isParentActive ? "text-blue-400" : ""}`} />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </div>

              {sidebarOpen && item.hasSubmenu && (
                <div className="hover:bg-gray-600 p-1 rounded-md transition-colors">
                  {expandedMenus[item.name] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              )}
            </ParentWrapper>

            {/* Submenu Logic remains the same */}
            {sidebarOpen && item.hasSubmenu && expandedMenus[item.name] && (
              <div className="ml-8 mt-1 space-y-1 border-l border-gray-600">
                {item.subItems.map((subItem, i) => {
                  const isChildActive = pathName === subItem.href;
                  return (
                    <Link
                      href={subItem.href}
                      key={i}
                      className={`flex py-1.5 px-4 text-sm transition-all
                  ${isChildActive
                          ? "text-white font-bold translate-x-1"
                          : "text-gray-400 hover:text-gray-100"
                        }
                `}
                    >
                      {subItem.item}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default StaticNavigation;
