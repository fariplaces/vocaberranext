import {
  Bell,
  PanelLeft,
  PanelRight,
  Search,
  Settings,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import ThemeToggle from "../ThemeToggle";

const TopBar = ({ handleSidebarToggle, handleNotifictionToggle }) => {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSidebarToggle}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <PanelLeft className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-400">Dashboards</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Employees</span>
            <span className="text-gray-400">/</span>
            <span className="text-white">Create</span>
          </div>
        </div>

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

export default TopBar;
