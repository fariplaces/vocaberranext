'use client'
import { Bell, PanelLeft, PanelRight, Search, Settings, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import ThemeToggle from "../ThemeToggle";
import { toggleSidebar } from "@/store/slices/globalSlice";

const TopBar = ({ handleNotifictionToggle }) => {
  const pathname = usePathname();
  const { sideMenu, sidebarOpen } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  // --- BREADCRUMB LOGIC ---
  const STATIC_BREADCRUMBS = {
    "/typing/typingDashboard": [
      { label: "Dashboard", id: "typing" },
      { label: "Typing", id: "dash" }
    ],
    "/typing/exercise/course": [
      { label: "Typing", id: "typing" },
      { label: "Exercises", id: "exercise" },
      { label: "Course", id: "course" }
    ],
    "/typing/exercise/test": [
      { label: "Typing", id: "typing" },
      { label: "Exercises", id: "exercise" },
      { label: "Test", id: "test" }
    ],
    "/word": [
      { label: "Communication", id: "comm" },
      { label: "Word List", id: "words" }
    ],
    // Add more as needed...
  };

  // 1. Check for Static Routes first
  let breadcrumbs = STATIC_BREADCRUMBS[pathname] || null;

  // 2. If not a static route, search the Dynamic SideMenu by ID
  if (!breadcrumbs) {
    const pathParts = pathname.split("/");
    const currentId = pathParts[pathParts.length - 1];

    const findPath = (items, targetId, currentPath = []) => {
      for (const item of items) {
        const label = item.title || item.name || item.item;
        const newPath = [...currentPath, { label, id: item.id || item.href }];

        if (item.id === targetId || item.href?.includes(targetId)) return newPath;

        if (item.categories) {
          const found = findPath(item.categories, targetId, newPath);
          if (found) return found;
        }
        if (item.children) {
          const found = findPath(item.children, targetId, newPath);
          if (found) return found;
        }
        if (item.subItems) {
          const found = findPath(item.subItems, targetId, newPath);
          if (found) return found;
        }
      }
      return null;
    };

    breadcrumbs = findPath([...sideMenu], currentId) || [];
  }

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {sidebarOpen ? <PanelLeft className="w-5 h-5" /> : <PanelRight className="w-5 h-5" />}
          </button>

          {/* Breadcrumb Display */}
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>

            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span className="text-gray-200">/</span>
                <span className={`${index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-gray-400"}`}>
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ... Search, Settings, etc ... */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>

          <ThemeToggle />

          <button
            onClick={handleNotifictionToggle}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <PanelRight className="w-6 h-6 " />
          </button>
        </div>
      </div>
    </header>
  );
};
export default TopBar

