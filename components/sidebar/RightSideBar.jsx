import React from "react";

const RightSideBar = ({ notificationOpen, setNotificationOpen }) => {
  const notifications = [
    {
      id: 1,
      title: "You fixed a bug.",
      time: "Just now",
      avatar: "🐛",
    },
    {
      id: 2,
      title: "New user registered.",
      time: "59 minutes ago",
      avatar: "👤",
    },
    {
      id: 3,
      title: "You fixed a bug.",
      time: "12 hours ago",
      avatar: "🐛",
    },
    {
      id: 4,
      title: "Andi Lane subscribed to you.",
      time: "Today, 11:59 AM",
      avatar: "👥",
    },
    {
      id: 5,
      title: "You fixed a bug.",
      time: "Just now",
      avatar: "🐛",
    },
    {
      id: 6,
      title: "New user registered.",
      time: "59 minutes ago",
      avatar: "👤",
    },
    {
      id: 7,
      title: "You fixed a bug.",
      time: "12 hours ago",
      avatar: "🐛",
    },
    {
      id: 8,
      title: "Andi Lane subscribed to you.",
      time: "Today, 11:59 AM",
      avatar: "👥",
    },
  ];
  return (
    <>
      {notificationOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300"
            onClick={() => setNotificationOpen(false)}
          ></div>

          {/* Notification Sidebar */}
          <div className="absolute right-0 top-0 h-full w-80  bg-black shadow-2xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                  Notifications
                </h2>
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  ✕
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4  hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                        {notification.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideBar;
