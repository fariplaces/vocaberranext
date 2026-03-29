import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  Users,
  ChartNoAxesColumn,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { FaLaravel, FaReact, FaWordpressSimple } from "react-icons/fa";
import { GoTypography } from "react-icons/go";
import { PiFileHtml, PiGithubLogoBold, PiMicrosoftExcelLogoFill, PiTerminalBold, PiWindowsLogo } from "react-icons/pi";
import { MdCss } from "react-icons/md";
import { RiPhpFill, RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { TbFileTypePhp } from "react-icons/tb";
import { SiAntdesign, SiDocker, SiMui, SiOnlyoffice, SiShadcnui } from "react-icons/si";
import { LuFigma } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/slices/skillSlice";
import { LuListTodo } from "react-icons/lu";
import { GiBrain } from "react-icons/gi";
import { RiEnglishInput } from "react-icons/ri";

const NavigationMenu = () => {
  const pathname = usePathname();
  // Initialize expanded menus based on current path
  const [expandedMenus, setExpandedMenus] = useState({});
  const { sideMenu, sidebarOpen } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  // Effect to auto-expand the parent menu if a child is active
  useEffect(() => {
    const allItems = [...staticItems, ...dynamicItems];
    allItems.forEach(item => {
      if (item.subItems?.some(sub => pathname === sub.href)) {
        setExpandedMenus(prev => ({ ...prev, [item.name]: true }));
      }
    });
  }, [pathname]);

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
    // Add as many as you need
  };

  // Fallback icon if no match is found
  const DEFAULT_ICON = FaReact;

  const staticItems = [
    {
      name: "DASHBOARD",
      icon: ChartNoAxesColumn,
      hasSubmenu: true,
      link: "",
      subItems: [
        {
          item: "Tasking Stats",
          href: "/tasks/stats",
        },
        {
          item: "Typing Exercises",
          href: "/typing/stats/exercises",
        },
        {
          item: "Typing Tests",
          href: "/typing/stats/tests",
        },
        {
          item: "Revisions",
          href: "/skills/stats/revisions",
        },
        {
          item: "Skills",
          href: "/skills/stats/skills",
        },
      ],
    },
    {
      name: "Revisions",
      icon: GiBrain,
      hasSubmenu: true,
      link: "",
      subItems: [
        {
          item: "Pending R-I",
          href: "/skills/pendingri",
        },
        {
          item: "Pending R-II",
          href: "/skills/pendingrii",
        },
        {
          item: "Pending R-III",
          href: "/skills/pendingriii",
        },
        {
          item: "Scheduled",
          href: "/skills/scheduled",
        },
      ],
    },
    {
      name: "Taskings",
      icon: LuListTodo,
      hasSubmenu: true,
      link: "",
      subItems: [
        {
          item: "TODO Tasks",
          href: "/tasks/today-tasks",
        },
        {
          item: "Tomorrow Tasks",
          href: "/tasks/tom-tasks",
        },
        {
          item: "Yesterday Tasks",
          href: "/tasks/yes-tasks",
        },
        {
          item: "All Tasks",
          href: "/tasks/all-tasks",
        },
        {
          item: "Default Tasks",
          href: "/tasks/default-tasks",
        },
      ],
    },
    // { name: "COMMUNICATION", icon: Home, hasSubmenu: false },
    {
      name: "Communication Skill",
      icon: RiEnglishInput,
      hasSubmenu: true,
      subItems: [
        {
          item: "Home",
          href: "/",
        },
        {
          item: "Word List",
          href: "word",
        },
        {
          item: "Meanings",
          href: "meaning",
        },
      ],
    },
    {
      name: "Tying",
      icon: GoTypography,
      hasSubmenu: true,
      subItems: [
        {
          item: "Exercises",
          href: "/typing/exercise/course",
        },
        {
          item: "Tests",
          href: "/typing/exercise/test",
        },
      ],
    },
    {
      name: "Manage Typing",
      type: "Admin",
      icon: GoTypography,
      hasSubmenu: true,
      subItems: [
        {
          item: "Exercises List",
          href: "/typing/manage/exercises",
        },
        {
          item: "Tests List",
          href: "/typing/manage/tests",
        },
      ],
    },
    {
      name: "Manage Skills",
      icon: TrendingUp,
      type: "Admin",
      hasSubmenu: true,
      subItems: [
        {
          item: "Skills",
          href: "/skills/manage/skills",
        },
        {
          item: "Parent-Categories",
          href: "/skills/manage/parent-categories",
        },
        {
          item: "Sub-Categories",
          href: "/skills/manage/sub-categories",
        },
        {
          item: "Categories",
          href: "/skills/manage/categories",
        },
        {
          item: "Topics List",
          href: "/skills/manage/topics",
        },
      ],
    },
  ];




  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      // 1. Toggle the local accordion (open/close the list of sub-items)
      toggleMenu(item.name);

      // 2. Force the Sidebar to open if it was collapsed
      if (!sidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };



  const dynamicItems = sideMenu.map((skill) => {
    // Look up the icon, or use the default if not found
    const IconComponent = SKILL_ICONS[skill.title] || DEFAULT_ICON;

    return {
      name: skill.title,
      icon: IconComponent,
      link: `/skills/${skill.id}`,
      hasSubmenu: skill.categories.length > 0,
      subItems: skill.categories.map((cat) => ({
        item: cat.title,
        href: `/skills/${cat.id}`,
      })),
    };
  });

  // 3. Combine them
  const sidebarItems = [...staticItems, ...dynamicItems];

  const filterSkillMenu = sidebarItems.filter(item => !('type' in item));

  const filterAdminMenu = sidebarItems.filter(item => 'type' in item);


  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden overflow-y-auto py-4">
      {/* <div className="px-4 w-full text-center py-2 transition-colors cursor-pointer bg-gray-900 text-white">
        Skills Improvement
      </div> */}
      {filterSkillMenu.map((item) => {
        // Check if the current route matches the parent link OR any sub-item href
        const isDirectActive = item.link && pathname === item.link;
        const isSubActive = item.subItems?.some(sub => pathname === sub.href);
        const isParentActive = isDirectActive || isSubActive;

        // We wrap the header in a Link only if item.link is provided
        const ParentWrapper = item.link ? Link : 'div';

        return (
          <div key={item.name}>
            <ParentWrapper
              href={item.link || "#"}
              className={`flex items-center justify-between px-4 py-2 transition-colors cursor-pointer 
          ${isParentActive ? "bg-gray-700 text-white border-r-4 border-blue-500" : "hover:bg-gray-800 text-gray-400"}
        `}
              onClick={(e) => {
                // If there is a submenu, toggle it. 
                // If it's a direct link, the Link component handles navigation.
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
                  const isChildActive = pathname === subItem.href;
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

      {/* <div className="px-4 w-full text-center py-2 transition-colors cursor-pointer bg-gray-900 text-white">
        ADMIN
      </div> */}
      {filterAdminMenu.map((item) => {
        // Check if any child is active
        const isParentActive = item.subItems?.some(sub => pathname === sub.href);

        return (
          <div key={item.name}>
            <div
              className={`flex items-center justify-between px-4 py-2 transition-colors cursor-pointer 
                ${isParentActive ? "bg-gray-700 text-white border-r-4 border-blue-500" : "hover:bg-gray-800 text-gray-400"}
              `}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                {/* Icon also highlights when active */}
                <item.icon className={`w-5 h-5 ${isParentActive ? "text-blue-400" : ""}`} />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </div>
              {sidebarOpen && item.hasSubmenu && (
                expandedMenus[item.name] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {/* Submenu */}
            {sidebarOpen && item.hasSubmenu && expandedMenus[item.name] && (
              <div className="ml-8 mt-1 space-y-1 border-l border-gray-600">
                {item.subItems.map((subItem, i) => {
                  const isChildActive = pathname === subItem.href;

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

export default NavigationMenu;
