import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Users,
  BarChart3,
  Calendar,
  FileText,
  Award,
  UserPlus,
  UserMinus,
  Home,
  HandCoins,
  WholeWord,
} from "lucide-react";
import Link from "next/link";

const NavigationMenu = ({ sidebarOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState({
    Employees: true,
    Typing: true,
    Transactions: false,
    Loans: false,
    Payrolls: false,
    Attendance: false,
    Appreciations: false,
    Onboarding: false,
    Offboarding: false,
    Reports: false,
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const sidebarItems = [
    { name: "Overview", icon: Home, hasSubmenu: false },
    {
      name: "Employees",
      icon: Users,
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
      icon: WholeWord,
      hasSubmenu: true,
      subItems: [
        {
          item: "Stats",
          href: "/typing/typingDashboard",
        },
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

    // {
    //   name: "Transactions",
    //   icon: HandCoins,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // {
    //   name: "Loans",
    //   icon: HandCoins,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // { name: "Meetings", icon: Calendar, hasSubmenu: false },
    // {
    //   name: "Payrolls",
    //   icon: Users,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // {
    //   name: "Attendance",
    //   icon: Calendar,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // { name: "Company Policies", icon: FileText, hasSubmenu: false },
    // {
    //   name: "Appreciations",
    //   icon: Award,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // {
    //   name: "Onboarding",
    //   icon: UserPlus,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // {
    //   name: "Offboarding",
    //   icon: UserMinus,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
    // {
    //   name: "Reports",
    //   icon: BarChart3,
    //   hasSubmenu: true,
    //   subItems: [
    //     "Employees",
    //     "Employee Performance",
    //     "Employee Leaves",
    //     "Addresses",
    //     "Contacts",
    //     "Documents",
    //     "Employee Contracts",
    //   ],
    // },
  ];
  return (
    <nav className="flex-1 overflow-y-auto py-4">
      {sidebarItems.map((item) => (
        <div key={item.name}>
          <div
            className={`flex items-center justify-between px-4 py-2 hover:bg-gray-700 cursor-pointer ${
              item.name === "Employees" ? "bg-gray-700" : ""
            }`}
            onClick={() => item.hasSubmenu && toggleMenu(item.name)}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">{item.name}</span>}
            </div>
            {sidebarOpen &&
              item.hasSubmenu &&
              (expandedMenus[item.name] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              ))}
          </div>

          {/* Submenu */}
          {sidebarOpen && item.hasSubmenu && expandedMenus[item.name] && (
            <div className="ml-8 space-y-1">
              {item.subItems.map((subItem, i) => (
                <Link
                  href={subItem.href}
                  key={i}
                  className="flex py-1 px-4 text-sm text-gray-300 hover:text-white cursor-pointer"
                >
                  {subItem.item}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavigationMenu;
