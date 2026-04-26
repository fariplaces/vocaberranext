import { logoutUser } from "@/store/actions/authActions";
import { selectUser } from "@/store/selectors/authSelectors";
import { ChevronDown, LogOut } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = ({ sidebarOpen }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  function getInitials(name) {
    const words = name.trim().split(/\s+/); // split by spaces

    if (words.length === 1) {
      return words[0][0].toUpperCase(); // single word → first letter
    }

    return words.map((word) => word[0].toUpperCase()).join("");
  }
  return (
    <div className="p-4 relative">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-600 rounded-full border-gray-400 flex items-center justify-center text-sm font-bold">
          {getInitials(user?.name)}
        </div>
        {sidebarOpen && (
          <div className="flex-1 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <ChevronDown
                onClick={() => setOpen(!open)}
                className="w-4 h-4 text-gray-400"
              />
            </div>
          </div>
        )}
      </div>
      {open && (
        <div className="flex flex-col justify-between p-3 absolute bg-gray-800 w-[80%] rounded-2xl top-[80%] left-[50%] translate-x-[-50%]  mt-2">
          <div className="flex items-center space-x-3">
            {sidebarOpen && (
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <div className="font-semibold text-sm">Name:</div>
                  <p className="font-semibold text-sm">{user?.name}</p>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-sm">Email:</div>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center px-1 ">
            <button
              className="flex items-center justify-center  space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <span>Logout</span>
              <LogOut />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
