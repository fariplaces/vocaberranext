import { logoutUser } from "@/store/slices/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = ({ sidebarOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="p-4 ">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
            CN
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full px-5">
        <button
          className="flex w-full justify-center items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default UserInfo;
