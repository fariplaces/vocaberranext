import { ChevronDown } from "lucide-react";
import React from "react";

const UserProfile = ({ sidebarOpen }) => {
  return (
    <div className="p-4 ">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-600 rounded-full border-gray-400 flex items-center justify-center text-sm font-bold">
          SS
        </div>
        {sidebarOpen && (
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Anwar Ali Shah</p>
                <p className="text-xs text-gray-400">HR Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
