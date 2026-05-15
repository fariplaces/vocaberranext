'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  ChartNoAxesColumn,
} from "lucide-react";
import Link from "next/link";
import { FaLaravel, FaReact, FaWordpressSimple } from "react-icons/fa";
import { PiFileHtml, PiGithubLogoBold, PiMicrosoftExcelLogoFill, PiTerminalBold, PiWindowsLogo } from "react-icons/pi";
import { MdCss } from "react-icons/md";
import { RiPhpFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { TbFileTypePhp } from "react-icons/tb";
import { SiAntdesign, SiDocker, SiMui, SiOnlyoffice, SiShadcnui } from "react-icons/si";
import { LuFigma } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/slices/globalSlice";

const DynamicNavigation = ({ sidebarOpen, sideMenu, baseRoute }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const dispatch = useDispatch();
  const pathName = usePathname();

  // Effect to auto-expand the parent menu if a child is active
  useEffect(() => {
    const allItems = [...staticItems, ...dynamicItems];
    allItems.forEach(item => {
      if (item.subItems?.some(sub => pathName === sub.href)) {
        setExpandedMenus(prev => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathName]);

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // The Map
  const SKILL_ICONS = {
    "React": FaReact,
    "Operating System": PiWindowsLogo,
    "HTML": PiFileHtml,
    "JavaScript": IoLogoJavascript,
    "CSS": MdCss,
    "TailwindCSS": RiTailwindCssFill,
    "PHP Procedural": TbFileTypePhp,
    "PHP OOP": RiPhpFill,
    "Terminal": PiTerminalBold,
    "WordPress": FaWordpressSimple,
    "Git": PiGithubLogoBold,
    "Docker": SiDocker,
    "Figma": LuFigma,
    "Office": PiMicrosoftExcelLogoFill,
    "Laravel": FaLaravel,
    "React": FaReact,
    "ShadCN": SiShadcnui,
    "MaterialUI": SiMui,
    "AntDesign": SiAntdesign,
    "Tanstack": SiOnlyoffice,
  };

  const DEFAULT_ICON = FaReact;

  const staticItems = [
    {
      name: "Home",
      icon: ChartNoAxesColumn,
      hasSubmenu: false,
      link: "/dashboard",
    },
  ];


  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      toggleMenu(item.name);
      if (!sidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };


  const dynamicItems = sideMenu.map((skill) => {

    const IconComponent = SKILL_ICONS[skill.title] || DEFAULT_ICON;

    return {
      name: skill.title,
      icon: IconComponent,
      link: `/${baseRoute}/${skill.id}`,
      hasSubmenu: skill.categories.length > 0,
      subItems: skill.categories.map((cat) => ({
        item: cat.title,
        href: `/${baseRoute}/${cat.id}`,
      })),
    };
  });

  // 3. Combine them
  const sidebarItems = [...staticItems, ...dynamicItems];

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden overflow-y-auto py-4">

      {sidebarItems.map((item) => {
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

export default DynamicNavigation;
